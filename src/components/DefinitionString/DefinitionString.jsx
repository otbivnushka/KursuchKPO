import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './DefinitionString.module.scss';
import Button from '../Button/Button';

const DefinitionString = ({
  id,
  definition,
  category,
  popularity,
  dificulty,
  lastEdition,
  image_url,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.itemString}>
      <div className={styles.itemString__left}>
        <img src={image_url} alt="" />
        <h3>{definition}</h3>
      </div>
      <div className={styles.itemString__info}>
        <div className={styles.category}>
          <h4>
            {t('category')}: {category}
          </h4>
          <h4>
            {t('popularity')}: {popularity}
          </h4>
        </div>
        <div className={styles.difficulty}>
          <h4>
            {t('dificulty')}: {dificulty}
          </h4>
          <h4>
            {t('date')}: {lastEdition}
          </h4>
        </div>
        <Button onClick={() => navigate(`/definition/${id}`)}>{t('read')}</Button>
      </div>
    </div>
  );
};

export default DefinitionString;
