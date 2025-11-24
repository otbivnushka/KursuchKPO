import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './MessageBlock.module.scss';

const MessageBlock = ({ mess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={styles.noteBlock}>
      <div className={styles.header}>
        <span className={styles.date}>{mess.date},</span>
        <span className={styles.label}>{t('message-from')}:</span>
        <span className={styles.author}>{mess.author},</span>
        <span className={styles.label}>{t('theme')}:</span>
        <span className={styles.author}>{mess.theme}</span>
      </div>
      <div className={styles.content}>{mess.content}</div>
    </div>
  );
};

export default MessageBlock;
