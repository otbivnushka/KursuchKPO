import React from 'react';
import styles from './PersonalAccountWindow.module.scss';
import userImg from '../../assets/ui/user.svg';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';

const PersonalAccountWindow = () => {
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
      </div>
    </div>
  );
};

export default PersonalAccountWindow;
