import React from 'react';
import styles from './UserButton.module.scss';
import userIcon from '../../assets/ui/user.svg';

const UserButton = () => {
  return (
    <button className={styles.button}>
      <img src={userIcon} alt="" />
      <span>User</span>
    </button>
  );
};

export default UserButton;
