import React from 'react';
import styles from './DefinitionBlock.module.scss';

const DefinitionBlock = ({
  definition,
  category,
  popularity,
  dificulty,
  lastEdition,
  image_url,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__back}>
        <img src={image_url} alt=""></img>
      </div>
      <div className={styles.item__front}>
        <div className={styles.item__info}>
          <h1 className={styles.item__header}>{definition}</h1>
          <div className={styles.item__text}>
            <h4>Category: {category}</h4>
            <h4>Popularity: {popularity}</h4>
            <h4>Dificulty: {dificulty}</h4>
            <h4>Last edition: {lastEdition}</h4>
          </div>
          <button className={styles.item__button}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default DefinitionBlock;

// <div className={styles.definition}>
//   <div>
//     <h2>Definition</h2>
//     <h4>Category: Network</h4>
//     <h4>Popularity: High</h4>
//     <h4>Dificulty: Easy</h4>
//     <h4>Last edition: 2022</h4>
//   </div>
//   <div className={styles.definition__hover}>
//     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore earum velit inventore illum
//     temporibus voluptas quia. Quasi ex expedita nulla tempora deserunt earum doloremque,
//     laboriosam provident maiores ducimus dolorum harum!
//   </div>
// </div>
