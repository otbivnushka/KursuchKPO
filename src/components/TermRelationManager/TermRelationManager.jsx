import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './TermRelationManager.module.scss';

const ItemTypes = {
  TERM: 'term',
};

// Один термин для drag & drop
const TermItem = ({ term, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TERM,
    item: term,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={styles.termItem} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {term.term}
    </div>
  );
};

// Контейнер для терминов (drop target)
const TermList = ({ terms, onDropTerm }) => {
  const { t } = useTranslation();
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TERM,
    drop: (item) => onDropTerm(item),
  }));

  return (
    <div ref={drop} className={styles.termList}>
      {terms.length === 0 && <div className={styles.placeholder}>{t('drag-here')}</div>}
      {terms.map((term) => (
        <TermItem key={term.id} term={term} />
      ))}
    </div>
  );
};

const TermRelationManager = ({ allTerms, initialRelated = [], setOnDrop }) => {
  const { t } = useTranslation();
  const [availableTerms, setAvailableTerms] = useState(
    allTerms ? allTerms.filter((t) => !initialRelated?.find((r) => r.id === t.id)) : []
  );
  const [relatedTerms, setRelatedTerms] = useState(initialRelated || []);

  useEffect(() => {
    setOnDrop(relatedTerms);
  }, [relatedTerms, setOnDrop]);

  const handleDropToRelated = (term) => {
    if (relatedTerms.find((t) => t.id === term.id)) return;
    setRelatedTerms((prev) => [...prev, term]);
    setAvailableTerms((prev) => prev.filter((t) => t.id !== term.id));
  };

  const handleDropToAvailable = (term) => {
    if (availableTerms.find((t) => t.id === term.id)) return;
    setAvailableTerms((prev) => [...prev, term]);
    setRelatedTerms((prev) => prev.filter((t) => t.id !== term.id));
  };

  return (
    <>
      <label className={styles.label}>{t('choose-related-terms')}</label>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <div className={styles.column}>
            <h3>{t('all-terms')}</h3>
            <TermList terms={availableTerms} onDropTerm={handleDropToAvailable} />
          </div>

          <div className={styles.column}>
            <h3>{t('related-terms')}</h3>
            <TermList terms={relatedTerms} onDropTerm={handleDropToRelated} />
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default TermRelationManager;
