import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SuggestEdition.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';

const SuggestEdition = ({ setSuggestEditionOpened, name }) => {
  const { t } = useTranslation();
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
        <h3>{t('send-sug')}</h3>
        <TextArea value={suggText} onChange={(e) => setSuggText(e.target.value)}></TextArea>
        <div>
          <Button onClick={() => handleSave()}>{t('send')}</Button>
          <Button variant="secondary" onClick={() => setSuggestEditionOpened(false)}>
            {t('back')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestEdition;
