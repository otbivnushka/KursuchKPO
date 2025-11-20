import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './MessagesContainer.module.scss';
import NoteBlock from '../NoteBlock/NoteBlock';
import MessageBlock from '../MessageBlock/MessageBlock';
import Button from '../Button/Button';
import { parseLine, formatDateTime } from '../../utils/format';

const MessagesContainer = ({ active, setActive }) => {
  const { t } = useTranslation();
  const tabs = [t('my-notes'), t('my-messages')];
  const userNotes = useSelector((state) => state.user.user.notes);
  const userMessages = useSelector((state) => state.user.user.messages);

  const [notes, setNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const mappedNotes = userNotes.map((u, i) => {
      const [termName, termNote] = parseLine(u.notedData);
      return {
        id: i + 1,
        date: formatDateTime(u.timestamp),
        definition: termName,
        note: termNote,
        source: u.notedTerm,
      };
    });
    const mappedMessages = userMessages.map((u, i) => {
      return {
        id: i + 1,
        date: formatDateTime(u.timestamp),
        author: u.author,
        theme: u.theme,
        content: u.content,
      };
    });
    setNotes(mappedNotes);
    setMessages(mappedMessages);
  }, [userNotes, userMessages]);

  return (
    <div className={styles.message}>
      <div className={styles.message__header}>
        {tabs.map((tab, index) => (
          <div
            className={`${styles.tab} ${active === index ? styles.active : ''}`}
            key={index}
            onClick={() => {
              setActive(index);
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className={styles.message__body}>
        {active === 0 && notes.map((note) => <NoteBlock key={note.id + note.date} note={note} />)}
        {active === 1 &&
          messages.map((note) => <MessageBlock key={note.id + note.date} note={note} />)}
      </div>
    </div>
  );
};

export default MessagesContainer;
