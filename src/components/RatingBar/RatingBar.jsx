import React, { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './RatingBar.module.scss';

const RatingBar = ({ rating = null, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(rating);
  const [btnText, setBtnText] = useState('Отправить');

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleCancel = () => {
    setSelected(null);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(selected);
    setBtnText('Отправлено');
  };

  // если rating === null и пользователь ещё не выбирал — кнопки не показываем
  const showButtons = selected !== null;

  return (
    <div className={styles.wrapper}>
      <h3>{t('rate-this')}</h3>
      <div className={styles.rating}>
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`star${value}`}
              name="rate"
              value={value}
              checked={selected === value}
              onChange={() => handleSelect(value)}
            />
            <label
              htmlFor={`star${value}`}
              title={
                value === 5
                  ? 'Excellent'
                  : value === 4
                  ? 'Good'
                  : value === 3
                  ? 'Average'
                  : value === 2
                  ? 'Poor'
                  : 'Awful'
              }
            ></label>
          </React.Fragment>
        ))}
      </div>

      <div className={clsx(styles.buttons, showButtons && styles.showButtons)}>
        <button type="button" onClick={handleCancel}>
          Отмена
        </button>
        <button type="button" onClick={handleSubmit}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default RatingBar;
