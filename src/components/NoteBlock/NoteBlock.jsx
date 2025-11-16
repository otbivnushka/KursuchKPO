import React from 'react';
import styles from './NoteBlock.module.scss';

const NoteBlock = ({ note }) => {
  return (
    <div className={styles.noteBlock}>
      <div className={styles.header}>
        <span className={styles.date}>{note.date}</span>
        <span className={styles.definition}>{note.definition}</span>
      </div>
      <div className={styles.content}>{note.note}</div>
    </div>
  );
};

export default NoteBlock;
