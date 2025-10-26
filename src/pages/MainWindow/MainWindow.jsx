import React, { useEffect, useState } from 'react';
import styles from './MainWindow.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import DefinitionBlock from '../../components/DefinitionBlock/DefinitionBlock';
import UserButton from '../../components/UserButton/UserButton';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';

const MainWindow = () => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const message = 'GET_TERMS;';
      try {
        const response = await window.api.sendAndWaitResponse(message);
        const data = JSON.parse(response);
        setDefinitions(data?.terms || []);
        console.log(data.terms);
      } catch (err) {
        console.error('Ошибка при запросе:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <header>
          <div className={styles.logo}>
            <div className={styles.logo__icon}></div>
            <div className={styles.logo__text}>Вакэблуари</div>
          </div>
          <SearchBar />
          <div className={styles.menues}>
            <UserButton />
            <SettingsMenu />
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.aside}>
            <a className={styles.aside_link} href="https://example.com/">
              Some option
            </a>
            <a className={styles.aside_link} href="https://example.com/">
              Some option
            </a>
            <a className={styles.aside_link} href="https://example.com/">
              Some option
            </a>
          </div>
          <div className={styles.definitions}>
            {definitions.map((definition, index) => (
              <DefinitionBlock
                key={index}
                definition={definition.term}
                category={definition.category}
                popularity={definition.popularity}
                dificulty={definition.difficultyLevel}
                lastEdition={definition.history[0].date}
                image_url={definition.media[0].url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
