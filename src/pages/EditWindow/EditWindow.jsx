import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './EditWindow.module.scss';

import TextBox from '../../components/TextBox/TextBox';
import TextArea from '../../components/TextArea/TextArea';
//import SelectBox from '../../components/SelectBox/SelectBox';
import CategorySelector from '../../components/CategorySelector/CategorySelector';
import SliderDifficulty from '../../components/SliderDifficulty/SliderDifficulty';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import TermRelationManager from '../../components/TermRelationManager/TermRelationManager';
import Button from '../../components/Button/Button';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';

import { formatRelatedTerms, parseRelatedTerms } from '../../utils/format';
import { fetchDefinition } from '../../redux/slices/viewSlice';
import { fetchDefinitions } from '../../redux/slices/definitionSlice';

import axios from 'axios';

const EditWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { items: allTerms, status } = useSelector((state) => state.definition);
  const editingTerm = useSelector((state) => state.view.definitionInfo);

  const [lang, setLang] = useState('en');
  const [definitions, setDefinitions] = useState({ en: '', ru: '', de: '' });
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [source, setSource] = useState('');
  const [categories, setCategories] = useState([]);
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [changeNote, setChangeNote] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const response = (await axios.get(`${window.api.getUrl()}/api/categories`)).data;
      setCategories(
        response.map((cat) => ({
          label: cat,
          value: cat,
        }))
      );
    };
    loadCategories();
  }, []);

  useEffect(() => {
    dispatch(fetchDefinition(id));
    dispatch(fetchDefinitions());
  }, [id, dispatch]);

  useEffect(() => {
    console.log(allTerms, relatedTerms);
  }, [allTerms, relatedTerms]);

  useEffect(() => {
    if (!editingTerm || !editingTerm.term) return;

    setDefinitions({
      en: editingTerm.translations?.en || '',
      ru: editingTerm.translations?.ru || '',
      de: editingTerm.translations?.de || '',
    });

    setSource(editingTerm.source || '');
    setCategory(editingTerm.category || '');
    setDifficulty(editingTerm.difficultyLevelIndex || 3);

    setRelatedTerms(parseRelatedTerms(editingTerm.relatedTerms) || []);
  }, [editingTerm]);

  const handleDefinitionChange = (text) => {
    setDefinitions((prev) => ({ ...prev, [lang]: text }));
  };

  const handleSave = async () => {
    try {
      if (changeNote === '') return alert('Please enter a change note.');
      const labels = ['easy', 'normal', 'medium', 'hard', 'extreme'];
      const body = {
        id,
        newDefinition: definitions,
        newCategory: category,
        newDifficulty: labels[difficulty - 1],
        newSource: source,
        newRelated: formatRelatedTerms(relatedTerms),
        changeNote,
      };
      console.log(body);
      const response = await axios
        .put(`${window.api.getUrl()}/api/terms`, body, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .catch((err) => console.log(err));
      console.log(response);
      if (response.status === 200) {
        navigate('/main');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (status === 'loading') return <LoadingPageScreen>{t('loading')}</LoadingPageScreen>;
  if (status === 'error') return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <h3>
          {t('editing')} {editingTerm.term}
        </h3>

        <div className={styles.mainInfo}>
          <TextBox
            label={t('edit-note')}
            value={changeNote}
            onChange={(e) => setChangeNote(e.target.value)}
          />
          <TextArea
            label={t('meaning')}
            value={definitions[lang]}
            onChange={(e) => handleDefinitionChange(e.target.value)}
          />

          <div className={styles.languageSelector}>
            <LanguageSelector value={lang} onChange={setLang} />
          </div>
        </div>

        <CategorySelector
          categories={categories}
          initialValue={category}
          onChange={(e) => setCategory(e)}
        />
        {/* Difficulty */}
        <div className={styles.difficulty}>
          <SliderDifficulty value={difficulty} onChange={setDifficulty} />
        </div>

        {/* Source */}
        <TextBox label={t('source')} value={source} onChange={(e) => setSource(e.target.value)} />

        {/* Related */}
        <TermRelationManager
          allTerms={allTerms}
          initialRelated={relatedTerms}
          setOnDrop={setRelatedTerms}
        />
        <div className={styles.btnsWrapper}>
          <Button variant="primary" onClick={handleSave}>
            {t('save')}
          </Button>

          <Button variant="secondary" onClick={() => navigate('/main')}>
            {t('cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditWindow;
