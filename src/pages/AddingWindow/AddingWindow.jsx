import React, { useState } from 'react';
import styles from './AddingWindow.module.scss';
import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
import SelectBox from '../../components/SelectBox/SelectBox';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import Button from '../../components/Button/Button';
import createTermPayload from '../../utils/jsonTermin';

const AddingWindow = () => {
  const [lang, setLang] = useState('en');

  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState({ en: '', ru: '', de: '' });
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');

  const categories = [
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' },
    { value: '3', label: 'Category 3' },
  ];

  // Обработчик изменения текста в TextArea
  const handleDefinitionChange = (text) => {
    setDefinitions((prev) => ({
      ...prev,
      [lang]: text,
    }));
  };

  const handleAdd = async () => {
    try {
      const payload = createTermPayload(
        {
          term,
          definition: definitions.en, // можно выбрать основной язык или объединять все переводы
          category,
          translations: {
            en: definitions.en,
            ru: definitions.ru,
            de: definitions.de,
          },
          source,
          media: image ? [{ url: image }] : [],
          difficultyLevel: difficulty,
        },
        'currentUser'
      );
      console.log(payload);
      const response = await window.api.sendAndWaitResponse({
        Command: 'ADD_TERM',
        Payload: payload,
      });
      console.log(response);
      alert('Payload готов к отправке в консоли');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <h1>Add definition</h1>
        <div>
          <TextBox label="Term" value={term} onChange={(e) => setTerm(e.target.value)} />

          <LanguageSelector value={lang} onChange={(newLang) => setLang(newLang)} />
          <p>Language: {lang}</p>

          <TextArea
            label="Meaning"
            value={definitions[lang]}
            onChange={(e) => handleDefinitionChange(e.target.value)}
          />

          <SelectBox
            label="Category"
            options={categories}
            value={category}
            onChange={setCategory}
          />
          <SliderDifficulty value={difficulty} onChange={setDifficulty} />
          <p>Difficulty: {difficulty}</p>
          <TextBox label="Image" value={image} onChange={(e) => setImage(e.target.value)} />
          <TextBox label="Source" value={source} onChange={(e) => setSource(e.target.value)} />

          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddingWindow;
