import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styles from './Logo.module.scss';
import logoLight from '../../assets/logo/book_light.svg';
import logoDark from '../../assets/logo/book_dark.svg';

const Logo = () => {
  const { t } = useTranslation();
  const { theme } = useSelector((state) => state.settings);
  return (
    <div className={styles.logo}>
      <img src={theme === 'dark' ? logoLight : logoDark} alt="" className={styles.logo__icon} />
      <div className={styles.logo__text}>{t('service-name')}</div>
    </div>
  );
};

export default Logo;
