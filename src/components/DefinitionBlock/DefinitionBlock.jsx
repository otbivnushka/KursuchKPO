import React from 'react';
import styles from './DefinitionBlock.module.scss';

const DefinitionBlock = () => {
  return (
    <div class={styles.item}>
      <div class={styles.item__back}>
        <img src="https://avatarko.ru/img/kartinka/14/zhivotnye_kot_13379.jpg" alt=""></img>
      </div>
      <div class={styles.item__front}>
        <div class={styles.item__info}>
          <h1 class={styles.item__header}>Definition</h1>
          <p class={styles.item__text}>
            <h4>Category: Network</h4>
            <h4>Popularity: High</h4>
            <h4>Dificulty: Easy</h4>
            <h4>Last edition: 2022</h4>
          </p>
          <button class={styles.item__button}>Подробнее</button>
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
