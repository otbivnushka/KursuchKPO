import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { removeTermById } from '../../redux/slices/definitionSlice';
import { useDispatch } from 'react-redux';
import styles from './DefinitionString.module.scss';
import Button from '../Button/Button';
import { formatDateTime, averageToString } from '../../utils/format';

const DefinitionString = ({
  id,
  definition,
  category,
  popularity,
  dificulty,
  lastEdition,
  rating,
  image_url,
  deletion,
  setDeletion,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleDeletion = async () => {
    await axios.delete(`${window.api.getUrl()}/api/terms`, {
      data: { term: id },
    });
    dispatch(removeTermById(id));
  };
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
            {t('dificulty')}: {t(dificulty)}
          </h4>
          <h4>
            {t('date')}: {formatDateTime(lastEdition)}
          </h4>
        </div>
        <div className={styles.rate}>
          <h4>
            {t('rate')}: {averageToString(rating)}
          </h4>
        </div>
        {deletion ? (
          <Button onClick={() => handleDeletion()}>{t('delete-def')}</Button>
        ) : (
          <Button onClick={() => navigate(`/definition/${id}`)}>{t('read')}</Button>
        )}
      </div>
    </div>
  );
};

export default DefinitionString;
