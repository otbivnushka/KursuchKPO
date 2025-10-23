import React from 'react';
import RatingBar from '../../components/RatingBar/RatingBar';
import ActionsMenu from '../../components/ActionsMenu/ActionsMenu';

import styles from './TerminWindow.module.scss';
// import likeIcon from '../../assets/ui/like.svg';
// import copyIcon from '../../assets/ui/copy.svg';
// import pinIcon from '../../assets/ui/pin.svg';
// import sourceIcon from '../../assets/ui/source.svg';

const TerminWindow = () => {
  return (
    <div className={styles.terminWindow}>
      <header className={styles.header}>
        <h1>Termin</h1>
        {/* <div className={styles.actions}>
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
            <img src={sourceIcon} alt="" />
            <span>Print</span>
          </a>
          <a href="https://example.com/">
            <img src={sourceIcon} alt="" />
            <span>Edit</span>
          </a>
        </div> */}
        <ActionsMenu />
      </header>

      <h3>Category: Tralala</h3>

      <h3>Definition</h3>
      <div className={styles.definition}>
        <img src="" alt="term illustration" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo laboriosam atque dolorum
          provident delectus ab similique obcaecati porro aspernatur molestias magnam facilis
          perspiciatis reiciendis, laudantium consequatur facere, dolore vitae ea. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Illo laboriosam atque dolorum provident delectus
          ab similique obcaecati porro aspernatur molestias magnam facilis perspiciatis reiciendis,
          laudantium consequatur facere, dolore vitae ea. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Illo laboriosam atque dolorum provident delectus ab similique obcaecati
          porro aspernatur molestias magnam facilis perspiciatis reiciendis, laudantium consequatur
          facere, dolore vitae ea. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
          laboriosam atque dolorum provident delectus ab similique obcaecati porro aspernatur
          molestias magnam facilis perspiciatis reiciendis, laudantium consequatur facere, dolore
          vitae ea.
        </p>
      </div>

      <div className={styles.info}>
        <p>Difficulty level: Hard</p>
        <p>Popularity level: Ultra</p>
      </div>

      <div className={styles.rating}>
        <h3>Rate this definition</h3>
        <RatingBar />
        <h5>Total amount of rates: 5</h5>
      </div>

      <div className={styles.corrections}>
        <h3>Corrections history</h3>
      </div>

      <div className={styles.watchAlso}>
        <h3>Watch also:</h3>
        <ul>
          <li>Traalala</li>
          <li>Traalala</li>
          <li>Traalala</li>
        </ul>
      </div>
    </div>
  );
};

export default TerminWindow;
