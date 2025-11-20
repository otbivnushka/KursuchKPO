import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDefinitions } from '../../redux/slices/definitionSlice';
import { fetchUserData } from '../../redux/slices/userSlice';
import styles from './MainWindow.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import DefinitionBlock from '../../components/DefinitionBlock/DefinitionBlock';
import UserButton from '../../components/UserButton/UserButton';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import Logo from '../../components/Logo/Logo';
import Aside from '../../components/Aside/Aside';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';
import DefinitionString from '../../components/DefinitionString/DefinitionString';
import sortItems from '../../utils/sort';

const MainWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items: definitions, status } = useSelector((state) => state.definition);
  const { categorySelect, sortBy, viewAs, searchBar } = useSelector((state) => state.settings);
  const { username, personality } = useSelector((state) => state.user.user) || '';
  const [deletion, setDeletion] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDefinitions());
        await dispatch(fetchUserData());
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = () => {
    setDeletion(!deletion);
  };

  if (status === 'loading') return <LoadingPageScreen>{t('loading')}</LoadingPageScreen>;
  if (status === 'error') return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <header>
          <Logo />

          <SearchBar />
          <div className={styles.menues}>
            <UserButton>{username}</UserButton>
            <SettingsMenu />
          </div>
        </header>

        <div className={styles.content}>
          {personality === 'Admin' && <Aside onDeleteToggle={handleDelete} deletion={deletion} />}

          <div
            className={clsx(
              styles.definitions,
              viewAs === 'grid' && styles.definitions__grid,
              personality === 'Admin' && styles.definitions__admin
            )}
          >
            {sortItems(definitions, sortBy)
              .filter((obj) => {
                return categorySelect.length === 0 ? true : obj.category === categorySelect;
              })
              .filter((obj) => {
                return searchBar.length === 0
                  ? true
                  : obj.term.toLowerCase().includes(searchBar.toLowerCase());
              })
              .map((definition, index) =>
                viewAs === 'grid' ? (
                  <DefinitionBlock
                    key={index}
                    id={definition.id}
                    definition={definition.term}
                    category={definition.category}
                    popularity={definition.popularity}
                    dificulty={definition.difficultyLevel}
                    lastEdition={definition.addedDate}
                    rating={definition.difficultyRatings}
                    image_url={definition.media?.[0]?.url}
                    deletion={deletion}
                    setDeletion={setDeletion}
                  />
                ) : (
                  <DefinitionString
                    key={index}
                    id={definition.id}
                    definition={definition.term}
                    category={definition.category}
                    popularity={definition.popularity}
                    dificulty={definition.difficultyLevel}
                    lastEdition={definition.addedDate}
                    rating={definition.difficultyRatings}
                    image_url={definition.media?.[0]?.url}
                    deletion={deletion}
                    setDeletion={setDeletion}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
