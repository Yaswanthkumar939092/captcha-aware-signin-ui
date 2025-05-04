
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectComponentProps {
  target: string;
  delay?: number;
}

const RedirectComponent = ({ target, delay = 0 }: RedirectComponentProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(target);
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, target, delay]);

  return null;
};

export default RedirectComponent;
