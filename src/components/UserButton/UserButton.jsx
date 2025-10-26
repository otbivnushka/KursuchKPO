import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserButton.module.scss';
import userIcon from '../../assets/ui/user.svg';

const UserButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className={styles.button}
      onClick={() => {
        navigate('/account');
      }}
    >
      <img src={userIcon} alt="" />
      <span>User</span>
    </button>
  );
};

export default UserButton;
