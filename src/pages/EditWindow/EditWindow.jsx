import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './EditWindow.module.scss';
import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
import SelectBox from '../../components/SelectBox/SelectBox';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import Button from '../../components/Button/Button';
import createTermPayload from '../../utils/jsonTermin';

const EditWindow = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const labels = ['Easy', 'Normal', 'Medium', 'Hard', 'Extreme'];

  const definitionObj = useSelector((state) =>
    state.definition.items.find((item) => item.id === id)
  );

  const [lang, setLang] = useState('en');

  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState({ en: '', ru: '', de: '' });
  const [categorySelect, setCategorySelect] = useState('');
  const [categoryTextbox, setCategoryTextbox] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');

  const [categories, setCategories] = useState([]);

  // грузим категории
  useEffect(() => {
    const load = async () => {
      const response = await window.api.sendAndWaitResponse({
        Command: 'GET_CATEGORIES',
        Payload: {},
      });

      setCategories(
        response.payload.map((category, idx) => ({
          value: String(idx + 1),
          label: category,
        }))
      );
    };
    load();
  }, []);

  // заполняем поля существующими данными
  useEffect(() => {
    if (!definitionObj) return;

    setTerm(definitionObj.term || '');

    setDefinitions({
      en: definitionObj.translations?.en || '',
      ru: definitionObj.translations?.ru || '',
      de: definitionObj.translations?.de || '',
    });

    setDifficulty(labels.indexOf(definitionObj.difficultyLevel) + 1);
    setSource(definitionObj.source || '');
    setImage(definitionObj.media?.[0]?.url || ''); // если есть

    const idx = categories.findIndex((c) => c.label === definitionObj.category);
    if (idx !== -1) {
      setCategorySelect(String(idx + 1));
    } else {
      setCategoryTextbox(definitionObj.category);
    }
  }, [definitionObj, categories]);

  const handleDefinitionChange = (text) => {
    setDefinitions((prev) => ({
      ...prev,
      [lang]: text,
    }));
  };
  const handleSave = async () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <h1>Edit definition</h1>

        <div className={styles.mainInfo}>
          <div>
            <TextBox label="Term name" value={term} onChange={(e) => setTerm(e.target.value)} />

            <TextArea
              label="Meaning"
              value={definitions[lang] || ''}
              onChange={(e) => handleDefinitionChange(e.target.value)}
            />

            <div className={styles.languageSelector}>
              <LanguageSelector value={lang} onChange={setLang} />
            </div>
          </div>
        </div>

        <div className={styles.category}>
          <SelectBox
            label="Choose category"
            options={categories}
            value={categorySelect}
            onChange={(e) => setCategorySelect(e.target.value)}
          />
          <h3>OR</h3>
          <TextBox
            label="Type new category"
            value={categoryTextbox}
            onChange={(e) => setCategoryTextbox(e.target.value)}
          />
        </div>

        <div className={styles.difficulty}>
          <SliderDifficulty value={difficulty} onChange={setDifficulty} />
        </div>

        <TextBox label="Image" value={image} onChange={(e) => setImage(e.target.value)} />
        <TextBox label="Source" value={source} onChange={(e) => setSource(e.target.value)} />

        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={() => navigate('/main')}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditWindow;
