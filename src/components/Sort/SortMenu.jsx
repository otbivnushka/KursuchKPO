import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SortMenu.module.scss';
import SelectBox from '../SelectBox/SelectBox';
import Button from '../Button/Button';
import { setCategorySelect, setSortBy, setViewAs } from '../../redux/slices/settingsSlice';

const SortMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isOpen, setOpen] = React.useState(false);

  const categorySelect = useSelector((state) => state.settings.categorySelect);
  const sortBy = useSelector((state) => state.settings.sortBy);
  const viewAs = useSelector((state) => state.settings.viewAs);

  return (
    <div>
      <button
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={() => setOpen(!isOpen)}
        aria-label="Toggle sort menu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.sort} ${isOpen ? styles.show : ''}`}>
        <h3>{t('search-settings')}</h3>

        <SelectBox
          label={t('category-of-definition')}
          value={categorySelect}
          onChange={(e) => {
            dispatch(setCategorySelect(e.target.value));
            console.log(e.target.value);
          }}
          options={[
            { value: '', label: 'Select category' },
            { value: 'frontend', label: 'Frontend' },
            { value: 'backend', label: 'Backend' },
            { value: 'database', label: 'Database' },
          ]}
        />

        <SelectBox
          label={t('sort-by')}
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          options={[
            { value: 'name', label: 'Name' },
            { value: 'popularity', label: 'Popularity' },
            { value: 'difficulty', label: 'Difficulty' },
            { value: 'date', label: 'Last edited' },
          ]}
        />

        <SelectBox
          label="View as"
          value={viewAs}
          onChange={(e) => dispatch(setViewAs(e.target.value))}
          options={[
            { value: 'string', label: 'String' },
            { value: 'grid', label: 'Grid' },
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
