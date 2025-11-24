import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddNote.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';
import axios from 'axios';
import { parseLine } from '../../utils/format';

const AddNote = ({ pined, setPined, setAddNoteOpened, id, name }) => {
  const { t } = useTranslation();
  const [noteText, setNoteText] = useState(parseLine(pined?.NotedData)[1] ?? '');
  const handleSave = async () => {
    const response = await axios.post(
      'http://localhost:8888/api/note',
      {
        term: id,
        note: '(' + name + '): ' + noteText,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }
    );
    setAddNoteOpened(false);
    setPined({ notedTerm: id, NotedData: noteText });
  };
  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal)}>
        <h3>{t('add-note')}</h3>
        <TextArea value={noteText} onChange={(e) => setNoteText(e.target.value)}></TextArea>
        <div>
          <Button onClick={() => handleSave()}>{t('save')}</Button>
          <Button variant="secondary" onClick={() => setAddNoteOpened(false)}>
            {t('back')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
