import React from 'react';
import styles from './AddingWindow.module.scss';
import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
import SelectBox from '../../components/SelectBox/SelectBox';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const AddingWindow = () => {
  const categories = [
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' },
    { value: '3', label: 'Category 3' },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <h1>Add definition</h1>
        <LanguageSelector />
        <div>
          <div>
            <TextBox label="Definition" />
            <TextArea label="Meaning" />
            <SelectBox label="Category" options={categories} />
            <SliderDifficulty />
            <TextBox label="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingWindow;
