import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CategorySelector.module.scss';
import SelectBox from '../SelectBox/SelectBox';
import TextBox from '../TextBox/TextBox';

const CategorySelector = ({ categories = [], initialValue = '', onChange }) => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState('');
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (!initialValue) return;

    const existsInSelect = categories.some((c) => c.value === initialValue);

    if (existsInSelect) {
      setSelectedValue(initialValue);
      setTextValue('');
    } else {
      setSelectedValue('');
      setTextValue(initialValue);
    }
  }, [initialValue, categories]);

  const handleSelectChange = (e) => {
    const value = e.target.value;

    setSelectedValue(value);
    setTextValue('');

    if (onChange) onChange(value);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;

    setTextValue(value);
    setSelectedValue('');

    if (onChange) onChange(value);
  };

  return (
    <div className={styles.category}>
      <SelectBox
        label={t('choose-cat')}
        options={categories}
        value={selectedValue}
        onChange={handleSelectChange}
      />

      <h3>{t('or')}</h3>

      <TextBox label={t('type-new-cat')} value={textValue} onChange={handleTextChange} />
    </div>
  );
};

export default CategorySelector;
