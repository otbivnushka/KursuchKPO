import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HistoryTable.module.scss';

const HistoryTable = ({ history }) => {
  const { t } = useTranslation();
  if (!history || history.length === 0) {
    return <div className={styles.empty}>{t('no-history')}</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('date')}</th>
            <th>{t('author')}</th>
            <th>{t('change')}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>{item.author}</td>
              <td>{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
