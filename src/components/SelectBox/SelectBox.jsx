import React from 'react';
import clsx from 'clsx';
import styles from './SelectBox.module.scss';

const SelectBox = ({ label, value, onChange, options = [], error = '' }) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={clsx(styles.select, error && styles.selectError)}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default SelectBox;
