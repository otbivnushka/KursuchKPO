import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme, setLang, saveSettings } from '../../redux/slices/settingsSlice';
import styles from './SettingsMenu.module.scss';
import SelectBox from '../SelectBox/SelectBox';
import settingsIconLight from '../../assets/ui/settings_light.svg';
import settingsIconDark from '../../assets/ui/settings_dark.svg';

const SettingsMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme, lang } = useSelector((state) => state.settings);

  const [isOpen, setOpen] = React.useState(false);

  const handleThemeChange = (value) => {
    dispatch(setTheme(value));
    dispatch(saveSettings({ theme: value, lang }));
  };

  const handleLangChange = (value) => {
    dispatch(setLang(value));
    dispatch(saveSettings({ theme, lang: value }));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen(!isOpen)}
        aria-label="Toggle settings menu"
      >
        <img
          src={theme === 'dark' ? settingsIconLight : settingsIconDark}
          alt="settings"
          className={`${styles.icon} ${isOpen ? styles.show__icon : ''}`}
        />
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
        <h3>{t('settings')}</h3>

        <SelectBox
          label={t('theme')}
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
          options={[
            { value: 'light', label: t('light') },
            { value: 'dark', label: t('dark') },
          ]}
        />

        <SelectBox
          label={t('language')}
          value={lang}
          onChange={(e) => handleLangChange(e.target.value)}
          options={[
            { value: 'en', label: t('en') },
            { value: 'ru', label: t('ru') },
            { value: 'de', label: t('de') },
          ]}
        />
      </div>
    </div>
  );
};

export default SettingsMenu;
