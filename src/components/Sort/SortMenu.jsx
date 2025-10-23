import React from 'react';
import styles from './SortMenu.module.scss';

const SortMenu = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div>
      <button
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={() => setOpen(!isOpen)}
        aria-label="Toggle sort menu"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.sort} ${isOpen ? styles.show : ''}`}>
        <h3>Sort settings</h3>

        <label htmlFor="tags">
          <input type="checkbox" name="search" id="tags" />
          Search by tags
        </label>

        <label for="category">Category of definitions:</label>
        <select id="category" name="category">
          <option value="Value">Value</option>
          <option value="Value">Value</option>
          <option value="Value">Value</option>
        </select>

        <label for="category">Sort by:</label>
        <select id="category" name="category">
          <option value="Value">Value</option>
          <option value="Value">Value</option>
          <option value="Value">Value</option>
        </select>

        <button>Clear</button>
      </div>
    </div>
  );
};

export default SortMenu;
