import React, { useState } from 'react';
import styles from './ConnectionWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import { useNavigate } from 'react-router-dom';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';

const ConnectionWindow = () => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!ip || !port) {
      alert('Please enter IP and Port');
      return;
    }
    setIsLoading(true);
    const result = await window.api.connectToServer({ ip, port });
    console.log(result);
    setIsLoading(false);
    if (result.success) {
      navigate('/auth');
    } else {
      setErrorMessage('Wrong IP or port');
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
            Connecting...
          </LoadingPageScreen>
        )}
        <h3 className={styles.formHeader}>Connection Window</h3>

        <div className={styles.connection__inputs}>
          <TextBox
            label="IP Address"
            placeholder="Enter server IP"
            value={ip}
            onChange={(e) => {
              setIp(e.target.value);
              setErrorMessage('');
            }}
            error={errorMessage}
          />
          <TextBox
            label="Port"
            placeholder="Enter port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>

        <div className={styles.connection__buttons}>
          <Button onClick={handleConnect}>Connect</Button>
          <Button variant="secondary" onClick={handleCloseApp}>
            Close app
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionWindow;
