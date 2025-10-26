import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';

const RegistrationWindow = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/auth');
  };
  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        <h3 className="form-header">Registration</h3>
        <div className={styles.connection__inputs}>
          <TextBox
            placeholder="New login"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <TextBox
            placeholder="New password"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.connection__buttons}>
          <Button onClick={() => alert('clicked')}>Register</Button>
          <div>
            <Button variant="secondary" onClick={handleGoBack}>
              Go back
            </Button>
            <Button variant="secondary" onClick={() => alert('clicked')}>
              Close app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWindow;
