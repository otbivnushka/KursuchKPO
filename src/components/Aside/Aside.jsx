import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import minusLightIcon from '../../assets/ui/light/minus_light.svg';
import plusLightIcon from '../../assets/ui/light/plus_light.svg';
import minusDarkIcon from '../../assets/ui/dark/minus_dark.svg';
import plusDarkIcon from '../../assets/ui/dark/plus_dark.svg';
import styles from './Aside.module.scss';

const Aside = ({ onDeleteToggle, deletion }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.settings);

  return (
    <div className={styles.container}>
      <button className={styles.link} onClick={() => navigate('/auth')}>
        <img src={theme === 'dark' ? plusLightIcon : plusDarkIcon} alt="" />
        <span>{t('add-def')}</span>
      </button>

      <button className={styles.link} onClick={onDeleteToggle}>
        <img src={theme === 'dark' ? minusLightIcon : minusDarkIcon} alt="" />
        <span>{deletion ? t('cancel-delete') : t('delete-def')}</span>
      </button>
    </div>
  );
};

export default Aside;
