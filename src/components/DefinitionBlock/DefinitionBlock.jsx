import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './DefinitionBlock.module.scss';
import Button from '../Button/Button';

const DefinitionBlock = ({
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
    <div className={styles.item}>
      <div className={styles.item__back}>
        <img src={image_url} alt=""></img>
      </div>
      <div className={styles.item__front}>
        <div className={styles.item__info}>
          <h1 className={styles.item__header}>{definition}</h1>
          <div className={styles.item__text}>
            <h4>
              {t('category')}: {category}
            </h4>
            <h4>
              {t('popularity')}: {popularity}
            </h4>
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
    </div>
  );
};

export default DefinitionBlock;
