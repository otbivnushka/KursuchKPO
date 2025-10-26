import React from 'react';
import styles from './SettingsMenu.module.scss';
import settingsIconLight from '../../assets/ui/settings_light.svg';
import settingsIconDark from '../../assets/ui/settings_dark.svg';

const SettingsMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = React.useState(localStorage.getItem('lang') || 'en');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem('lang', lang);
    // здесь можно добавить логику смены языка (через i18next.changeLanguage(lang))
  }, [lang]);

  return (
    <div className={styles.container}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen(!isOpen)}
        aria-label="Toggle settings menu"
      >
        {localStorage.getItem('theme') === 'dark' ? (
          <img
            src={settingsIconLight}
            alt="settings"
            className={`${styles.icon} ${isOpen ? styles.show__icon : ''}`}
          />
        ) : (
          <img
            src={settingsIconDark}
            alt="settings"
            className={`${styles.icon} ${isOpen ? styles.show__icon : ''}`}
          />
        )}
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
        <h3>Settings</h3>

        <div className={styles.setting}>
          <label htmlFor="theme">Theme:</label>
          <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className={styles.setting}>
          <label htmlFor="language">Language:</label>
          <select id="language" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
