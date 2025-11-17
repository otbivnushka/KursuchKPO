import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './DefinitionBlock.module.scss';
import Button from '../Button/Button';
import { formatDateTime, averageToString } from '../../utils/format';
import crossIcon from '../../assets/ui/cross.svg';
import { fetchDefinitions } from '../../redux/slices/definitionSlice';

const DefinitionBlock = ({
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeletion = async () => {
    const response = await window.api.sendAndWaitResponse({
      Command: 'DELETE_TERM',
      Payload: {
        term: id,
      },
    });
    dispatch(fetchDefinitions());
  };
  return (
    <div className={styles.block}>
      {deletion && (
        <button className={styles.item__deletion} onClick={() => handleDeletion()}>
          <img src={crossIcon} alt="" />
        </button>
      )}
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
                {t('date')}: {formatDateTime(lastEdition).split(' ')[0]}
              </h4>
              <h4>Оценка: {averageToString(rating)}</h4>
            </div>
            <Button onClick={() => navigate(`/definition/${id}`)}>{t('read')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefinitionBlock;
