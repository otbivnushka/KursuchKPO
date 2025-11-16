import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SortMenu.module.scss';
import SelectBox from '../SelectBox/SelectBox';
import Button from '../Button/Button';

const SortMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = React.useState(false);

  const [category, setCategory] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');

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

        <label htmlFor="tags">
          <input type="checkbox" name="search" id="tags" />
          {t('search-by-tags')}
        </label>

        <SelectBox
          label={t('category-of-definition')}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: '', label: 'Select parameter' },
            { value: 'popularity', label: 'Popularity' },
            { value: 'difficulty', label: 'Difficulty' },
            { value: 'date', label: 'Last edited' },
          ]}
        />

        <SelectBox
          label="отображение"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: '', label: 'Select parameter' },
            { value: 'string', label: 'В строку' },
            { value: 'grid', label: 'По сетке' },
          ]}
        />

        <Button
          onClick={() => {
            setCategory('');
            setSortBy('');
          }}
        >
          {t('clear')}
        </Button>
      </div>
    </div>
  );
};

export default SortMenu;
