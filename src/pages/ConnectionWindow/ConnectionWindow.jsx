import React from 'react';
import styles from './ConnectionWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';

const ConnectionWindow = () => {
  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        <h3 className="form-header">Connection Window</h3>
        <div className={styles.connection__inputs}>
          <TextBox
            placeholder="IP-address"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <TextBox
            placeholder="Port"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.connection__buttons}>
          <Button onClick={() => alert('Primary clicked!')}>Connect</Button>
          <Button variant="secondary" onClick={() => alert('Primary clicked!')}>
            Quit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionWindow;
