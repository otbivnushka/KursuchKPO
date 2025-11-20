import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchBar } from '../../redux/slices/settingsSlice';
import SortMenu from '../../components/Sort/SortMenu';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);
  return (
    <div className={styles.searchBar}>
      <input
        placeholder={t('search')}
        className={styles.input}
        type="text"
        onChange={(e) => dispatch(setSearchBar(e.target.value))}
      />
      <button
        className={clsx(
          styles.searchButton,
          theme === 'light' ? styles.searchButtonIconDark : styles.searchButtonIconLight
        )}
      ></button>
      <SortMenu />
    </div>
  );
};

export default SearchBar;
