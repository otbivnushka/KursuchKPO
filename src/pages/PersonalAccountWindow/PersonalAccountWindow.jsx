import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PersonalAccountWindow.module.scss';
import userLightImg from '../../assets/ui/light/user_light.svg';
import userDarkImg from '../../assets/ui/dark/user_dark.svg';
import maxImg from '../../assets/ui/max.jpg';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import Button from '../../components/Button/Button';
import { formatDateTime } from '../../utils/format';
import { updateMessages, setUser, resetStatus } from '../../redux/slices/userSlice';
import SendMessage from '../../components/SendMessage/SendMessage';
import axios from 'axios';

const PersonalAccountWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const userInfo = useSelector((state) => state.user.user);
  const { theme } = useSelector((state) => state.settings);
  const [sendMessageOpened, setSendMessageOpened] = useState(false);

  const handleSendMessage = () => {
    setSendMessageOpened(true);
  };

  const handleClearMessages = async () => {
    await axios.delete(`${window.api.getUrl()}/api/message`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    dispatch(updateMessages([]));
  };

  if (!userInfo) {
    return null;
  }

  return (
    <>
      {sendMessageOpened && <SendMessage setSendMessageOpened={setSendMessageOpened} />}
      <div className={styles.wrapper}>
        <div className={styles.account}>
          <div className={styles.info}>
            <div className={styles.info__image}>
              <img src={theme === 'dark' ? userLightImg : userDarkImg} alt="" />
            </div>
            <div className={styles.info__max} onClick={() => handleSendMessage()}>
              <img src={maxImg} alt="" />
              <p>Max</p>
            </div>
            <div className={styles.info__text}>
              <div className={styles.info__date}>ID: {userInfo.id}</div>
              <div className={styles.info__name}>
                {t('name')}: {userInfo.username}
              </div>
              <div className={styles.info__date}>
                {t('date-of-registration')}: {formatDateTime(userInfo.registrationDate)}
              </div>
            </div>
          </div>
          <MessagesContainer active={active} setActive={setActive} />
          <div className={styles.account__footer}>
            <Button
              onClick={() => {
                navigate('/main');
              }}
            >
              {t('go-back')}
            </Button>
            <div style={{ display: 'flex', gap: '10px' }}>
              {active === 1 && (
                <Button variant="secondary" onClick={() => handleClearMessages()}>
                  {t('clear')}
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(setUser(null)); // сброс user
                  dispatch(resetStatus()); // сброс статуса
                  navigate('/');
                }}
              >
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalAccountWindow;
