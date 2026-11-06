import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  href,
  onClick,
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-2.5 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-accent text-white hover:bg-accent-hover shadow-accent-sm hover:shadow-accent-md hover:-translate-y-0.5",
    secondary: "bg-white text-primary border border-border hover:border-accent hover:text-accent shadow-subtle hover:shadow-card hover:-translate-y-0.5",
    dark: "bg-primary text-white hover:bg-neutral-800 shadow-subtle hover:-translate-y-0.5",
    outline: "bg-transparent text-primary border border-border hover:border-primary/40 hover:bg-neutral-100/50",
    ghost: "bg-transparent text-primary-muted hover:text-primary hover:bg-black/5",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        onClick={onClick}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}

