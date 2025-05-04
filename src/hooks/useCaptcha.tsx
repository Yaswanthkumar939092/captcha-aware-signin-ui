
import { useState, useEffect } from 'react';

export const useCaptcha = () => {
  const [captchaValue, setCaptchaValue] = useState<string>('');
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);

  // Reset captcha state
  const resetCaptcha = () => {
    setCaptchaValue('');
    setCaptchaVerified(false);
    localStorage.removeItem('captchaValue');
    localStorage.removeItem('captchaVerified');
  };

  // Handle captcha verification
  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaValue(value);
      setCaptchaVerified(true);
      localStorage.setItem('captchaValue', value);
      localStorage.setItem('captchaVerified', 'true');
    } else {
      resetCaptcha();
    }
  };

  // Clean up captcha on component unmount
  useEffect(() => {
    return () => {
      resetCaptcha();
    };
  }, []);

  return {
    captchaValue,
    captchaVerified,
    handleCaptchaChange,
    resetCaptcha
  };
};
