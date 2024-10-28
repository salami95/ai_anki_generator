import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

function Button({ children, variant = 'primary', icon: Icon, onClick, className = '' }: ButtonProps) {
  const baseStyles = 'inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: 'text-indigo-600 hover:text-indigo-500',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}

export default Button;