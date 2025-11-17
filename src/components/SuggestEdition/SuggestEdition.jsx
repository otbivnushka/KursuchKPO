import React, { useState } from 'react';
import styles from './SuggestEdition.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';

const SuggestEdition = ({ setSuggestEditionOpened, name }) => {
  const [suggText, setSuggText] = useState('');
  const handleSave = async () => {
    await window.api.sendAndWaitResponse({
      Command: 'SUGG_EDIT',
      Payload: {
        termName: 'Suggestion for: ' + name,
        suggestion: suggText,
      },
    });
    setSuggestEditionOpened(false);
  };
  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal)}>
        <h3>Send Suggestion</h3>
        <TextArea value={suggText} onChange={(e) => setSuggText(e.target.value)}></TextArea>
        <div>
          <Button onClick={() => handleSave()}>Send</Button>
          <Button variant="secondary" onClick={() => setSuggestEditionOpened(false)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestEdition;
