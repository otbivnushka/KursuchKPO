import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NoteBlock.module.scss';

const NoteBlock = ({ note }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.noteBlock}>
      <div className={styles.header}>
        <span className={styles.date}>{note.date},</span>
        <span className={styles.notefor}>Note for:</span>
        <span className={styles.definition} onClick={() => navigate(`/definition/${note.source}`)}>
          {note.definition}
        </span>
      </div>
      <div className={styles.content}>{note.note}</div>
    </div>
  );
};

export default NoteBlock;
