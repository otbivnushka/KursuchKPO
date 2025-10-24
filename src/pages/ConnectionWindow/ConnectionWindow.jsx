import React, { useState } from 'react';
import styles from './ConnectionWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import { useNavigate } from 'react-router-dom';

const ConnectionWindow = () => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (!ip || !port) {
      alert('Please enter IP and Port');
      return;
    }

    const result = await window.api.connectToServer({ ip, port });
    console.log(result);
    if (result) {
      alert('✅ Connected!');
      navigate('/auth');
    } else {
      alert('❌ Connection failed:');
    }
  };

  const handleClose = () => {
    // пример — закрытие через ipc
    window.api?.closeApp?.();
  };

  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        <h3 className={styles.formHeader}>Connection Window</h3>

        <div className={styles.connection__inputs}>
          <TextBox
            label="IP Address"
            placeholder="Enter server IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
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
          <Button variant="secondary" onClick={handleClose}>
            Close app
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionWindow;
