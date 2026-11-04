import React from 'react';

export const LoadingSpinner = ({ 
  size = 'medium', 
  label = 'Carregando dados...', 
  showLabel = false 
}) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-[3px]',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-[5px]',
  };

  return (
    <div 
      className="flex flex-col items-center justify-center gap-3 p-4" 
      role="status" 
      aria-live="polite"
    >
      <div
        className={`
          ${sizeClasses[size] || sizeClasses.medium}
          rounded-full
          animate-spin
          border-[#B0BEC5]/40 
          border-t-[#004D40]
        `}
      />

      {showLabel ? (
        <span className="text-sm font-medium text-slate-600 animate-pulse">
          {label}
        </span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;