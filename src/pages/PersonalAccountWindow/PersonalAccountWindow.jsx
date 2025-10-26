import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PersonalAccountWindow.module.scss';
import userImg from '../../assets/ui/user.svg';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import Button from '../../components/Button/Button';

const PersonalAccountWindow = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.account}>
        <div className={styles.info}>
          <div className={styles.info__image}>
            <img src={userImg} alt="" />
          </div>
          <div className={styles.info__text}>
            <div className={styles.info__name}>Имя: Жмышенко Валерий Альбертович</div>
            <div className={styles.info__date}>Дата регистрации: 23.04.2024</div>
          </div>
        </div>
        <MessagesContainer />
        <div className={styles.account__footer}>
          <Button
            onClick={() => {
              navigate('/main');
            }}
          >
            Return back
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigate('/auth');
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountWindow;
