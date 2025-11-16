import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './PersonalAccountWindow.module.scss';
import userImg from '../../assets/ui/user.svg';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import Button from '../../components/Button/Button';

const PersonalAccountWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.account}>
        <div className={styles.info}>
          <div className={styles.info__image}>
            <img src={userImg} alt="" />
          </div>
          <div className={styles.info__text}>
            <div className={styles.info__name}>{t('name')} Жмышенко Валерий Альбертович</div>
            <div className={styles.info__date}>{t('date-of-registration')} 23.04.2024</div>
          </div>
        </div>
        <MessagesContainer />
        <div className={styles.account__footer}>
          <Button
            onClick={() => {
              navigate('/main');
            }}
          >
            {t('go-back')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigate('/auth');
            }}
          >
            {t('logout')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountWindow;
