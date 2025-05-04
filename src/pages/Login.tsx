
import React, { useState } from 'react';
import { useCaptcha } from '@/hooks/useCaptcha';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SignInHeader from '@/components/auth/SigninHeader';
import SignInFooter from '@/components/auth/SigninFooter';

const Login = () => {
  const { captchaValue, captchaVerified, handleCaptchaChange, resetCaptcha } = useCaptcha();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      toast({
        title: "Captcha required",
        description: "Please verify that you are not a robot",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(username, password);
      resetCaptcha();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <SignInHeader />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !captchaVerified}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <SignInFooter 
            captchaValue={captchaValue}
            captchaVerified={captchaVerified}
            handleCaptchaChange={handleCaptchaChange}
            error={error}
            errorDescription={errorDescription}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
