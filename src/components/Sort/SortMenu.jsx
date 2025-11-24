import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SortMenu.module.scss';
import SelectBox from '../SelectBox/SelectBox';
import Button from '../Button/Button';
import { setCategorySelect, setSortBy, setViewAs } from '../../redux/slices/settingsSlice';

const SortMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const [categorySelectList, setCategorySelectList] = useState([]);

  const { categorySelect, sortBy, viewAs } = useSelector((state) => state.settings);
  const { categories } = useSelector((state) => state.definition);

  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(setCategorySelect([]));
    const mapped = categories.map((u) => ({
      label: u,
      value: u,
    }));
    mapped.unshift({ label: t('select-cat'), value: '' });
    setCategorySelectList(mapped);
  }, [categories, dispatch, t]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={() => (isOpen ? setOpen(false) : setOpen(true))}
        aria-label="Toggle sort menu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div ref={menuRef} className={`${styles.sort} ${isOpen ? styles.show : ''}`}>
        <h3>{t('search-settings')}</h3>

        <SelectBox
          label={t('category-of-definition')}
          value={categorySelect}
          onChange={(e) => {
            dispatch(setCategorySelect(e.target.value));
          }}
          options={categorySelectList}
        />
        <SelectBox
          label={t('sort-by')}
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          options={[
            { value: 'name', label: t('name') },
            { value: 'popularity', label: t('popularity') },
            { value: 'rate', label: t('rate') },
            { value: 'date', label: t('date') },
          ]}
        />

        <SelectBox
          label={t('view-as')}
          value={viewAs}
          onChange={(e) => dispatch(setViewAs(e.target.value))}
          options={[
            { value: 'string', label: t('string') },
            { value: 'grid', label: t('grid') },
          ]}
        />

        <Button
          onClick={() => {
            dispatch(setCategorySelect(''));
            dispatch(setSortBy('name'));
          }}
        >
          {t('clear')}
        </Button>
      </div>
    </div>
  );
};

export default SortMenu;
