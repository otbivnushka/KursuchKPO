import React from 'react';
import styles from './TextBox.module.scss';
import clsx from 'clsx';

const TextBox = ({ label, placeholder = '', value, onChange, error = '', type = 'text' }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.input, error && styles.inputError)}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextBox;
