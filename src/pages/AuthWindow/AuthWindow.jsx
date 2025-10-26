import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthWindow.module.scss';
import Button from '../../components/Button/Button';
import TextBox from '../../components/TextBox/TextBox';
import LoadingPageScreen from '../../components/LoadingPageScreen/LoadingPageScreen';

const AuthWindow = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseApp = () => {
    window.api.closeApp();
  };
  const handleRegistration = () => {
    navigate('/registration');
  };
  const handleLogin = async () => {
    if (!login || !password) {
      setErrorMessage('Please enter login and password');
      return;
    }
    const message = `AUTH;role=Пользователь;login=${login};password=${password};`;
    setIsLoading(true);
    const response = await window.api.sendAndWaitResponse(message);
    setIsLoading(false);
    if (response === 'Admin' || response === 'User') {
      navigate('/main');
    } else if (response === 'Invalid') {
      setPassword('');
      setErrorMessage('Wrong login or password');
    }
  };

  return (
    <div className={styles.connection}>
      <div className={styles.connection__form}>
        {isLoading && (
          <LoadingPageScreen isActive={isLoading} onClose={() => setIsLoading(false)}>
            Loading...
          </LoadingPageScreen>
        )}
        <h3 className="form-header">Authorization</h3>
        <div className={styles.connection__inputs}>
          <TextBox
            placeholder="Login"
            label="Login"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
              setErrorMessage('');
            }}
          />
          <TextBox
            placeholder="Password"
            label="Password"
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
            <Button onClick={handleLogin}>Log in</Button>
            <Button onClick={handleRegistration}>Registration</Button>
          </div>
          <Button variant="secondary" onClick={handleCloseApp}>
            Close app
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthWindow;
