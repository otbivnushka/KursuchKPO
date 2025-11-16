import React, { useState } from 'react';
import styles from './AddNote.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';

const AddNote = ({ pined, setPined, setAddNoteOpened, id }) => {
  const [noteText, setNoteText] = useState(pined?.notedData || '');
  const handleSave = async () => {
    const response = await window.api.sendAndWaitResponse({
      Command: 'ADD_NOTE',
      Payload: {
        term: id,
        note: noteText,
      },
    });
    setAddNoteOpened(false);
    setPined({ notedTerm: id, notedData: noteText });
  };
  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal)}>
        <h3>Add Note</h3>
        <TextArea value={noteText} onChange={(e) => setNoteText(e.target.value)}></TextArea>
        <div>
          <Button onClick={() => handleSave()}>Save</Button>
          <Button variant="secondary" onClick={() => setAddNoteOpened(false)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
