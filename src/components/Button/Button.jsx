import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', disabled = false, onClick }) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        disabled && styles.disabled
      )}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
