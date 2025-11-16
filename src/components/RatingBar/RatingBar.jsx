import React, { useState } from 'react';
import styles from './RatingBar.module.scss';

const RatingBar = ({ rating = null, onSubmit, onCancel }) => {
  const [selected, setSelected] = useState(rating);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleCancel = () => {
    setSelected(null);
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(selected);
  };

  // если rating === null и пользователь ещё не выбирал — кнопки не показываем
  const showButtons = selected !== null;

  return (
    <div className={styles.wrapper}>
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

      {showButtons && (
        <div className={styles.buttons}>
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
          <button type="button" onClick={handleSubmit}>
            Отправить
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingBar;
