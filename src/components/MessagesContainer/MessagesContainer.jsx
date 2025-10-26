import React from 'react';
import styles from './MessagesContainer.module.scss';

const MessagesContainer = () => {
  const [active, setActive] = React.useState(0);
  const tabs = ['My notes', 'My messages'];
  const notes = [
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
    { id: 1, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 1' },
    { id: 2, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 2' },
    { id: 3, date: '10-01-2025 22:32', definition: 'Broadcast', note: 'Note 3' },
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
        <div className={styles.table__row__header}>
          <div className={styles.table__column_1}>Date</div>
          <div className={styles.table__column_2}>Definition</div>
          <div className={styles.table__column_3}>Note</div>
        </div>
        <div className={styles.table}>
          {notes.map((note, index) => (
            <div className={`${styles.table__row}`} key={index}>
              <div className={styles.table__column_1}>{note.date}</div>
              <div className={styles.table__column_2}>{note.definition}</div>
              <div className={styles.table__column_3}>{note.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
