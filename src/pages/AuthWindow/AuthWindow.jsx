import React from 'react';
import styles from './AuthWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';

const AuthWindow = () => {
  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        <h3 className="form-header">Authorization</h3>
        <div className={styles.connection__inputs}>
          <TextBox
            placeholder="Login"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <TextBox
            placeholder="Password"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.connection__buttons}>
          <Button onClick={() => alert('clicked')}>Log in</Button>
          <Button onClick={() => alert('clicked')}>Registration</Button>
          <Button variant="secondary" onClick={() => alert('clicked')}>
            Close app
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthWindow;
