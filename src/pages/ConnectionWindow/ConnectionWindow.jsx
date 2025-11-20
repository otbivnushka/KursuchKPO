import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ConnectionWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import { useNavigate } from 'react-router-dom';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';

const ConnectionWindow = () => {
  const [ip, setIp] = useState('5.35.94.193');
  const [port, setPort] = useState('8888');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleConnect = async () => {
    if (!ip || !port) {
      setErrorMessage(t('enter-ip'));
      setIp('');
      setPort('');
      return;
    }
    setIsLoading(true);
    const result = await window.api.connectToServer({ ip, port });
    setIsLoading(false);
    if (result.success) {
      navigate('/auth');
    } else {
      setErrorMessage(t('wrong-ip'));
      setIp('');
      setPort('');
    }
  };

  const handleCloseApp = () => {
    window.api.closeApp();
  };

  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        {isLoading && (
          <LoadingPageScreen isActive={isLoading} onClose={() => setIsLoading(false)}>
            {t('connecting')}
          </LoadingPageScreen>
        )}
        <h3 className={styles.formHeader}>{t('connect-header')}</h3>

        <div className={styles.connection__inputs}>
          <TextBox
            label={t('ip-address')}
            placeholder={t('ip-address-placeholder')}
            value={ip}
            onChange={(e) => {
              setIp(e.target.value);
              setErrorMessage('');
            }}
            error={errorMessage}
          />
          <TextBox
            label={t('port')}
            placeholder={t('port-placeholder')}
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>

        <div className={styles.connection__buttons}>
          <Button onClick={handleConnect}>{t('connect')}</Button>
          <Button variant="secondary" onClick={handleCloseApp}>
            {t('close-app')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionWindow;
