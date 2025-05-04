
import React from 'react';

interface SignInFooterProps {
  captchaValue: string;
  captchaVerified: boolean;
  handleCaptchaChange: (value: string | null) => void;
  error: string | null;
  errorDescription: string | null;
}

const SignInFooter: React.FC<SignInFooterProps> = ({
  captchaValue,
  captchaVerified,
  handleCaptchaChange,
  error,
  errorDescription
}) => {
  return (
    <div className="mt-6">
      <div className="mb-4">
        {/* This is a placeholder for ReCAPTCHA */}
        <div className="flex items-center justify-center border rounded-md p-3 bg-gray-50">
          <div 
            className={`h-5 w-5 border rounded-sm mr-2 ${captchaVerified ? 'bg-green-500 border-green-500' : 'border-gray-300'}`} 
            onClick={() => handleCaptchaChange('captcha-verified')}
          />
          <span>I'm not a robot</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded">
          <p className="font-bold">{error}</p>
          <p>{errorDescription}</p>
        </div>
      )}

      <p className="text-sm text-gray-600 text-center mt-4">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default SignInFooter;
