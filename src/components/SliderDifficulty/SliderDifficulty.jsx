import React from 'react';
import styles from './SliderDifficulty.module.scss';

const SliderDifficulty = ({ value, onChange }) => {
  const labels = ['Easy', 'Normal', 'Medium', 'Hard', 'Extreme'];

  return (
    <div className={styles.sliderWrapper}>
      <label className={styles.label}>Difficulty: {labels[value - 1]}</label>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.slider}
      />
      <div className={styles.scale}>
        {labels.map((label, index) => (
          <span key={index} className={styles.tick}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SliderDifficulty;
