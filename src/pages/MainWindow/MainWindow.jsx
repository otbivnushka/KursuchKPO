import React from 'react';
import styles from './MainWindow.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import DefinitionBlock from '../../components/DefinitionBlock/DefinitionBlock';
import UserButton from '../../components/UserButton/UserButton';

const MainWindow = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <header>
          <div className={styles.logo}>
            <div className={styles.logo__icon}></div>
            <div className={styles.logo__text}>Вакэблуари</div>
          </div>
          <div>
            <SearchBar />
          </div>
          <UserButton />
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
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
            <DefinitionBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWindow;
