import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDefinition } from '../../redux/slices/viewSlice';
import RatingBar from '../../components/RatingBar/RatingBar';
import ActionsMenu from '../../components/ActionsMenu/ActionsMenu';
import styles from './TerminWindow.module.scss';
import Button from '../../components/Button/Button';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';
import { parseTerms } from '../../utils/format';
import axios from 'axios';

const TerminWindow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Получаем данные из нового слайса
  const { definitionInfo, status } = useSelector((state) => state.view);
  const userRate = useSelector((state) =>
    state.user.user.ratedTerms?.find((item) => item.Term === id)
  );
  const language = useSelector((state) => state.settings.lang);

  useEffect(() => {
    if (id) {
      dispatch(fetchDefinition(id));
    }
  }, [id, dispatch]);

  const handleRate = async (value) => {
    if (!definitionInfo?.Id) return;
    await axios.post(
      'http://localhost:8888/api/rate',
      { term: definitionInfo.Id, rating: value },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };

  const handleCancelRate = async () => {
    if (!definitionInfo?.Id) return;
    await axios.post(
      'http://localhost:8888/api/rate',
      { term: definitionInfo.Id, rating: 0 },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };

  if (status === 'loading') return <LoadingPageScreen>{t('loading')}</LoadingPageScreen>;
  if (status === 'error') return <div>Ошибка при загрузке данных</div>;

  return (
    <div className={styles.terminWindow}>
      <header className={styles.header}>
        <h1>{definitionInfo.term}</h1>
        <div>
          <ActionsMenu id={definitionInfo.Id} />
          <Button onClick={() => navigate('/main')}>{t('go-back')}</Button>
        </div>
      </header>

      <h3 className={styles.category}>
        {t('category')}: {definitionInfo.category}
      </h3>

      <h3 className={styles.category}>{t('definition')}</h3>
      <div className={styles.definition}>
        {definitionInfo.media.length > 0 && (
          <img src={definitionInfo.media[0].url} alt="term illustration" />
        )}
        <p>{definitionInfo.translations[language]}</p>
      </div>

      <div className={styles.info}>
        <div>
          {t('dificulty')}: {definitionInfo.difficultyLevel}
        </div>
        <div>
          {t('popularity')}: {definitionInfo.popularity}
        </div>
      </div>

      <div className={styles.ratingWrapper}>
        <div className={styles.rating}>
          <RatingBar
            rating={userRate?.Rating ?? null}
            onSubmit={handleRate}
            onCancel={handleCancelRate}
          />
          <h5>
            {t('total-rate')}: {definitionInfo.difficultyRatings.length}
          </h5>
        </div>
      </div>

      <div className={styles.watchAlso}>
        <h3>{t('watch-also')}</h3>
        <p>
          {parseTerms(definitionInfo.relatedTerms).map((item) => (
            <span key={item.id} onClick={() => navigate(`/definition/${item.id}`)}>
              {item.term}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default TerminWindow;
