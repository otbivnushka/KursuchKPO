import React from 'react';
import SortMenu from '../../components/Sort/SortMenu';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input className={styles.input} type="text" />
      <button className={styles.searchButton}></button>
      <SortMenu />
    </div>
  );
};

export default SearchBar;
