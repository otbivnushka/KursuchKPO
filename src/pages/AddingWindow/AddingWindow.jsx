import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './AddingWindow.module.scss';
import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
import SelectBox from '../../components/SelectBox/SelectBox';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import DragAndDropUpload from '../../components/DragAndDropUpload/DragAndDropUpload';
import TermRelationManager from '../../components/TermRelationManager/TermRelationManager';
import Button from '../../components/Button/Button';
import createTermPayload from '../../utils/jsonTermin';
import { formatRelatedTerms } from '../../utils/format';
import axios from 'axios';

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
  const [image, setImage] = useState(null);
  const allTerms = useSelector((state) => state.definition.items); // allTerms
  const [relatedTerms, setRelatedTerms] = useState([]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {}, [relatedTerms, lang]);
  useEffect(() => {
    const load = async () => {
      const response = (await axios.get('http://localhost:8888/api/categories')).data;

      setCategories(
        response.map((category, idx) => ({
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

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // убираем "data:image/png;base64,"
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFile = async (file) => {
    setImage(file);
  };

  const handleAdd = async () => {
    try {
      if (!image) {
        alert('Please select an image');
        return;
      }
      const base64 = await fileToBase64(image);
      const res = await axios.post('http://localhost:8888/api/upload', {
        name: image.name,
        base64: base64,
      });
      const imageUrl = res.data.url;
      const labels = ['easy', 'normal', 'medium', 'hard', 'extreme'];
      const category = categoryTextbox || categories[categorySelect - 1].label;
      const payload = createTermPayload(
        {
          term,
          definition: '_',
          category,
          translations: {
            en: definitions.en,
            ru: definitions.ru,
            de: definitions.de,
          },
          source,
          media: imageUrl ? [{ url: imageUrl }] : [],
          difficultyLevel: labels[difficulty - 1],
          relatedTerms: formatRelatedTerms(relatedTerms),
        },
        'currentUser'
      );
      const response = await axios.post('http://localhost:8888/api/terms', payload);

      if (response.status === 200) navigate('/main');
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
        <DragAndDropUpload onFileSelected={handleFile} />
        <TextBox label={t('source')} value={source} onChange={(e) => setSource(e.target.value)} />
        <TermRelationManager
          allTerms={allTerms || []}
          initialRelated={relatedTerms}
          setOnDrop={setRelatedTerms}
        />
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
