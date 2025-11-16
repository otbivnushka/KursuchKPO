import React, { useEffect, useState } from 'react';
import styles from './Alert.module.scss';

const Alert = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`${styles.alert} ${styles[type]} ${visible ? styles.show : ''}`}>
      {message}
      <button className={styles.close} onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
