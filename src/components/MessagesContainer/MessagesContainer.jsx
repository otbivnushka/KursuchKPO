import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MessagesContainer.module.scss';
import NoteBlock from '../NoteBlock/NoteBlock';

const MessagesContainer = () => {
  const { t } = useTranslation();
  const [active, setActive] = React.useState(0);
  const tabs = [t('my-notes'), t('my-messages')];
  const notes = [
    {
      id: 1,
      date: '10-01-2025 22:32',
      definition: 'Broadcast',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos maxime reprehenderit similique libero, beatae inventore molestiae sapiente sit nisi commodi autem rem aliquid vel ad consequatur eveniet harum. Quia!',
    },
    {
      id: 2,
      date: '10-01-2025 22:32',
      definition: 'Broadcast',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos maxime reprehenderit similique libero, beatae inventore molestiae sapiente sit nisi commodi autem rem aliquid vel ad consequatur eveniet harum. Quia!',
    },
    {
      id: 3,
      date: '10-01-2025 22:32',
      definition: 'Broadcast',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos maxime reprehenderit similique libero, beatae inventore molestiae sapiente sit nisi commodi autem rem aliquid vel ad consequatur eveniet harum. Quia!',
    },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
  ];

  return (
    <div>
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
        {notes.map((note) => (
          <NoteBlock key={note.id + note.date} note={note} />
        ))}
      </div>
    </div>
  );
};

export default MessagesContainer;
