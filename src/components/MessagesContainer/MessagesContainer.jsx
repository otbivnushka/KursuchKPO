import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './MessagesContainer.module.scss';
import NoteBlock from '../NoteBlock/NoteBlock';
import MessageBlock from '../MessageBlock/MessageBlock';
import Button from '../Button/Button';
import { parseLine, formatDateTime } from '../../utils/format';
import DefinitionString from '../DefinitionString/DefinitionString';

const MessagesContainer = ({ active, setActive }) => {
  const { t } = useTranslation();
  const tabs = [t('my-notes'), t('my-messages'), t('my-favorites')];
  const userNotes = useSelector((state) => state.user.user.notes);
  const userMessages = useSelector((state) => state.user.user.messages);
  const userFavorites = useSelector((state) => state.user.user.favorites);
  const { items } = useSelector((state) => state.definition);

  const [notes, setNotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const mappedNotes = userNotes.map((u, i) => {
      const [termName, termNote] = parseLine(u.NotedData);
      return {
        id: i + 1,
        date: formatDateTime(u.Timestamp),
        definition: termName,
        note: termNote,
        source: u.NotedTerm,
      };
    });
    setNotes(mappedNotes);
  }, [userNotes]);

  useEffect(() => {
    const mappedMessages = userMessages.map((u, i) => {
      return {
        id: i + 1,
        date: formatDateTime(u.Timestamp),
        author: u.Author,
        theme: u.Theme,
        content: u.Content,
      };
    });
    setMessages(mappedMessages);
  }, [userMessages]);

  useEffect(() => {
    const mappedFavorites = items?.filter((item) => userFavorites.includes(item.id));
    setFavorites(mappedFavorites);
  }, [userFavorites, items]);

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
          messages.map((mess) => <MessageBlock key={mess.id + mess.date} mess={mess} />)}
        {active === 2 &&
          favorites.map((definition, index) => (
            <DefinitionString
              key={index}
              id={definition.id}
              definition={definition.term}
              category={definition.category}
              popularity={definition.popularity}
              dificulty={definition.difficultyLevel}
              lastEdition={definition.addedDate}
              rating={definition.difficultyRatings}
              image_url={definition.mediaUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default MessagesContainer;
