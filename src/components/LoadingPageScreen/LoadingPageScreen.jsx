import React from 'react';
import styles from './LoadingPageScreen.module.scss';
import loadingGif from '../../assets/loading/loaging_white.gif';
import clsx from 'clsx';

const LoadingPageScreen = ({ isActive, children }) => {
  if (!isActive) return null;

  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal)}>
        <img src={loadingGif} alt="" />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LoadingPageScreen;
