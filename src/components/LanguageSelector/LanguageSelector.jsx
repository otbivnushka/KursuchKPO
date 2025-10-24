import React, { useState } from 'react';
import styles from './LanguageSelector.module.scss';
import clsx from 'clsx';

const LanguageSelector = ({ languages = ['en', 'ru', 'de'], defaultLang = 'en', onChange }) => {
  const [selected, setSelected] = useState(defaultLang);

  const handleSelect = (lang) => {
    setSelected(lang);
    if (onChange) onChange(lang);
  };

  return (
    <div className={styles.languageSelector}>
      {languages.map((lang) => (
        <div
          key={lang}
          className={clsx(styles.lang, selected === lang && styles.active)}
          onClick={() => handleSelect(lang)}
        >
          {lang.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
