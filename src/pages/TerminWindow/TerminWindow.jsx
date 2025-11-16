import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RatingBar from '../../components/RatingBar/RatingBar';
import ActionsMenu from '../../components/ActionsMenu/ActionsMenu';

import styles from './TerminWindow.module.scss';
import Button from '../../components/Button/Button';

const TerminWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const definitionInfo = useSelector((state) => state.definition.items).find(
    (item) => item.id === id
  );

  return (
    <div className={styles.terminWindow}>
      <header className={styles.header}>
        <h1>{definitionInfo.term}</h1>
        <div>
          <ActionsMenu id={definitionInfo.id} />
          <Button onClick={() => navigate('/main')}>{t('go-back')}</Button>
        </div>
      </header>

      <h3>
        {t('category')}: {definitionInfo.category}
      </h3>

      <h3>{t('definition')}</h3>
      <div className={styles.definition}>
        <img src={definitionInfo.media[0]?.url} alt="term illustration" />
        <p>{definitionInfo.definition}</p>
      </div>

      <div className={styles.info}>
        <div>
          {t('dificulty')}: {definitionInfo.difficultyLevel}
        </div>
        <div>
          {t('popularity')}: {definitionInfo.popularity}
        </div>
      </div>

      <div className={styles.rating}>
        <h3>{t('rate-this')}</h3>
        <RatingBar
          rating={null}
          onSubmit={(value) => console.log('Submitted rating:', value)}
          onCancel={() => console.log('Rating canceled')}
        />
        <h5>
          {t('total-rate')}
          {definitionInfo.difficultyRatings.length}
        </h5>
      </div>

      <div className={styles.corrections}>
        <h3>{t('corrections-history')}</h3>
      </div>

      <div className={styles.watchAlso}>
        <h3>{t('watch-also')}</h3>
        <ul>
          {definitionInfo.relatedTerms.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TerminWindow;
