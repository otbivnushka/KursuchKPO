import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './AuthWindow.module.scss';

import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';

import { authorization } from '../../redux/slices/userSlice';

const STATUS = {
  WAITING: 'waiting',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const AuthWindow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, user } = useSelector((state) => state.user);

  const [login, setLogin] = useState('user');
  const [password, setPassword] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status === STATUS.SUCCESS && user) {
      navigate('/main');
    }
    if (status === STATUS.ERROR) {
      setErrorMessage(t('wrong-ip'));
    }
  }, [status, user, navigate, t]);

  const handleCloseApp = () => window.api.closeApp();
  const handleRegistration = () => navigate('/registration');

  const handleLogin = () => {
    if (!login || !password) {
      setErrorMessage(t('error-auth-empty'));
      return;
    }
    setErrorMessage('');
    dispatch(authorization({ login, password }));
  };

  const isLoading = status === STATUS.LOADING;

  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        {isLoading && <LoadingPageScreen isActive={true}>{t('loading')}</LoadingPageScreen>}

        <h3 className="form-header">{t('auth-header')}</h3>

        <div className={styles.connection__inputs}>
          <TextBox
            placeholder={t('login')}
            label={t('login-placeholder')}
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              setErrorMessage('');
            }}
          />

          <TextBox
            placeholder={t('password')}
            label={t('password-placeholder')}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
            error={errorMessage}
          />
        </div>

        <div className={styles.connection__buttons}>
          <div>
            <Button onClick={handleLogin}>{t('log-in-btn')}</Button>
            <Button onClick={handleRegistration}>{t('registration')}</Button>
          </div>
          <Button variant="secondary" onClick={handleCloseApp}>
            {t('close-app')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthWindow;
