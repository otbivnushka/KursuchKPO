import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './AddingWindow.module.scss';
import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
import SelectBox from '../../components/SelectBox/SelectBox';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import Button from '../../components/Button/Button';
import createTermPayload from '../../utils/jsonTermin';

const AddingWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');

  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState({ en: '', ru: '', de: '' });
  const [categorySelect, setCategorySelect] = useState('');
  const [categoryTextbox, setCategoryTextbox] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await window.api.sendAndWaitResponse({
        Command: 'GET_CATEGORIES',
        Payload: {},
      });

      setCategories(
        response.payload.map((category, idx) => ({
          value: String(idx + 1), // если хочешь 1,2,3,4...
          label: category, // если с сервера приходит строка
        }))
      );
    };

    load();
  }, []);

  // Обработчик изменения текста в TextArea
  const handleDefinitionChange = (text) => {
    setDefinitions((prev) => ({
      ...prev,
      [lang]: text,
    }));
  };

  const handleAdd = async () => {
    try {
      const labels = ['easy', 'normal', 'medium', 'hard', 'extreme'];
      const category = categoryTextbox || categories[categorySelect - 1].label;
      const payload = createTermPayload(
        {
          term,
          definition: '123', // можно выбрать основной язык или объединять все переводы
          category,
          translations: {
            en: definitions.en,
            ru: definitions.ru,
            de: definitions.de,
          },
          source,
          media: image ? [{ url: image }] : [],
          difficultyLevel: labels[difficulty - 1],
        },
        'currentUser'
      );
      console.log(payload);
      const response = await window.api.sendAndWaitResponse({
        Command: 'ADD_TERM',
        Payload: payload,
      });
      console.log(response);
      if (response.success) navigate('/main');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <h3>{t('add-def-title')}</h3>
        <div className={styles.mainInfo}>
          <div>
            <TextBox
              label={t('term-name')}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <TextArea
              label={t('meaning')}
              value={definitions[lang]}
              onChange={(e) => handleDefinitionChange(e.target.value)}
            />
            <div className={styles.languageSelector}>
              <LanguageSelector value={lang} onChange={(newLang) => setLang(newLang)} />
            </div>
          </div>
        </div>
        <div className={styles.category}>
          <SelectBox
            label={t('choose-cat')}
            options={categories}
            value={categorySelect}
            onChange={(e) => setCategorySelect(e.target.value)}
          />
          <h3>{t('or')}</h3>
          <TextBox
            label={t('type-new-cat')}
            value={categoryTextbox}
            onChange={(e) => setCategoryTextbox(e.target.value)}
          />
        </div>
        <div className={styles.difficulty}>
          <SliderDifficulty value={difficulty} onChange={setDifficulty} />
        </div>
        <TextBox label={t('image')} value={image} onChange={(e) => setImage(e.target.value)} />
        <TextBox label={t('source')} value={source} onChange={(e) => setSource(e.target.value)} />

        <Button variant="primary" onClick={handleAdd}>
          {t('add')}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/main')}>
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};

export default AddingWindow;
