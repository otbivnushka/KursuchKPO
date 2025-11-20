import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import styles from './UserButton.module.scss';
import userLightIcon from '../../assets/ui/light/user_light.svg';
import userDarkIcon from '../../assets/ui/dark/user_dark.svg';

const UserButton = ({ children }) => {
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.settings);
  return (
    <button
      className={styles.button}
      onClick={() => {
        navigate('/account');
      }}
    >
      <img src={theme === 'dark' ? userLightIcon : userDarkIcon} alt="" />
      <span>{children}</span>
    </button>
  );
};

export default UserButton;
