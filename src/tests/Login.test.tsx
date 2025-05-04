
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext';
import Login from '@/pages/Login';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock the useCaptcha hook
vi.mock('@/hooks/useCaptcha', () => ({
  useCaptcha: () => ({
    captchaValue: 'mock-captcha-value',
    captchaVerified: true,
    handleCaptchaChange: vi.fn(),
    resetCaptcha: vi.fn(),
  }),
}));

// Mock useNavigate
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clean up localStorage between tests
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with valid inputs', async () => {
    const mockLogin = vi.fn().mockResolvedValue(undefined);
    
    // Mock useUser hook
    vi.mock('@/context/UserContext', () => ({
      useUser: () => ({
        login: mockLogin,
        user: null,
      }),
    }));
    
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for login to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('displays error when login fails', async () => {
    // Mock the toast function to verify it's called
    const mockToast = vi.fn();
    vi.mock('@/hooks/use-toast', () => ({
      useToast: () => ({
        toast: mockToast,
      }),
    }));
    
    // Mock login to reject
    const mockLogin = vi.fn().mockRejectedValue(new Error('Login failed'));
    vi.mock('@/context/UserContext', () => ({
      useUser: () => ({
        login: mockLogin,
        user: null,
      }),
    }));

    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Wait for the error toast to be shown
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Login failed',
          variant: 'destructive',
        })
      );
    });
  });
});
