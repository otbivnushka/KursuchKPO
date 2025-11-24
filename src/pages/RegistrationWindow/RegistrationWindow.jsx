import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';

const RegistrationWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setErrorText('');
  }, [login, password, repeatPassword, secretKey]);

  const handleGoBack = () => {
    navigate('/');
  };
  const handleRegistration = async () => {
    if (password === '' || login === '') {
      setErrorText('Empty login or password');
      return;
    }
    if (password !== repeatPassword) {
      setErrorText('Passwords do not match');
      return;
    }
    let response = {};
    if (isAdmin) {
      response = await axios.post(`${window.api.getUrl()}/api/user/reg`, {
        login: login,
        password: password,
        adminKey: secretKey,
      });
    } else {
      response = await axios.post(`${window.api.getUrl()}/api/user/reg`, {
        login: login,
        password: password,
      });
    }
    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        <h3 className="form-header">{t('registration')}</h3>
        <div className={styles.connection__inputs}>
          <TextBox
            placeholder={t('login')}
            label={t('new-login')}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            error={errorText}
          />
          <TextBox
            label={t('new-password')}
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextBox
            label={'Repeat password'}
            placeholder={t('password')}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {isAdmin && (
            <TextBox
              label={'Enter admin secret key'}
              placeholder={t('password')}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          )}
        </div>
        <div className={styles.connection__buttons}>
          <Button onClick={() => handleRegistration()}>{t('registration')}</Button>
          <div>
            <Button variant="secondary" onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? t('dont-want-to-be-admin') : t('want-to-be-admin')}
            </Button>
            <Button variant="secondary" onClick={handleGoBack}>
              {t('go-back')}
            </Button>
            <Button variant="secondary" onClick={() => window.api.closeApp()}>
              {t('close-app')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWindow;
