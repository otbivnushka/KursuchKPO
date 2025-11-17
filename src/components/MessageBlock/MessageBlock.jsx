import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MessageBlock.module.scss';

const MessageBlock = ({ note }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.noteBlock}>
      <div className={styles.header}>
        <span className={styles.date}>{note.date},</span>
        <span className={styles.label}>Message from:</span>
        <span className={styles.author}>{note.author},</span>
        <span className={styles.label}>Theme:</span>
        <span className={styles.author}>{note.theme}</span>
      </div>
      <div className={styles.content}>{note.content}</div>
    </div>
  );
};

export default MessageBlock;
