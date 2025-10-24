import React from 'react';
import clsx from 'clsx';
import styles from './TextArea.module.scss';

const TextArea = ({ label, placeholder = '', value, onChange, error = '', rows = 4 }) => {
  return (
    <div className={styles.textareaWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={clsx(styles.textarea, error && styles.textareaError)}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextArea;
