import React, { useState } from 'react';
import styles from './ActionsMenu.module.scss';
import likeIcon from '../../assets/ui/like.svg';
import copyIcon from '../../assets/ui/copy.svg';
import pinIcon from '../../assets/ui/pin.svg';
import sourceIcon from '../../assets/ui/source.svg';
import printIcon from '../../assets/ui/print.svg';
import editIcon from '../../assets/ui/edit.svg';

const ActionsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.actions}>
      <button
        className={`${styles.burger} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle actions menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.links} ${open ? styles.show : ''}`}>
        <a href="https://example.com/">
          <img src={likeIcon} alt="" />
          <span>Like</span>
        </a>
        <a href="https://example.com/">
          <img src={copyIcon} alt="" />
          <span>Copy</span>
        </a>
        <a href="https://example.com/">
          <img src={pinIcon} alt="" />
          <span>Pin</span>
        </a>
        <a href="https://example.com/">
          <img src={sourceIcon} alt="" />
          <span>Open source</span>
        </a>
        <a href="https://example.com/">
          <img src={printIcon} alt="" />
          <span>Print</span>
        </a>
        <a href="https://example.com/">
          <img src={editIcon} alt="" />
          <span>Edit</span>
        </a>
      </div>
    </div>
  );
};

export default ActionsMenu;
