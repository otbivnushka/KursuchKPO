import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDefinitions } from '../../redux/slices/definitionSlice';
import styles from './MainWindow.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import DefinitionBlock from '../../components/DefinitionBlock/DefinitionBlock';
import UserButton from '../../components/UserButton/UserButton';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import Logo from '../../components/Logo/Logo';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';
//import DefinitionString from '../../components/DefinitionString/DefinitionString';

const MainWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: definitions, status } = useSelector((state) => state.definition);

  useEffect(() => {
    dispatch(fetchDefinitions());
    console.log(definitions);
  }, [dispatch]);

  if (status === 'loading') return <LoadingPageScreen>{t('loading')}</LoadingPageScreen>;
  if (status === 'error') return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <header>
          <Logo />

          <SearchBar />

          <div className={styles.menues}>
            <UserButton />
            <SettingsMenu />
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.aside}>
            <button className={styles.aside_link} onClick={() => navigate('/add')}>
              Add definition
            </button>
            <button className={styles.aside_link} href="https://example.com/">
              Some option
            </button>
            <button className={styles.aside_link} href="https://example.com/">
              Some option
            </button>
          </div>

          <div className={styles.definitions}>
            {definitions.map((definition, index) => (
              <DefinitionBlock
                key={index}
                id={definition.id}
                definition={definition.term}
                category={definition.category}
                popularity={definition.popularity}
                dificulty={definition.difficultyLevel}
                lastEdition={definition.history?.[0]?.date}
                image_url={definition.media?.[0]?.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
