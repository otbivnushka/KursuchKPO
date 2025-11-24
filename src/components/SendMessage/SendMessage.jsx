import React, { use, useState, useEffect } from 'react';
import styles from './SendMessage.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';
import SelectBox from '../SelectBox/SelectBox';
import TextBox from '../TextBox/TextBox';
import axios from 'axios';

const SendMessage = ({ setSendMessageOpened }) => {
  const [messText, setMessText] = useState('');
  const [theme, setTheme] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const load = async () => {
      const { data: response } = await axios.get(`${window.api.getUrl()}/api/user`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      if (response !== null) {
        const mapped = response.map((u) => ({
          label: u.login,
          value: u.id,
        }));

        setUsersList(mapped);
        setSelectedUser(mapped[0].value);
      }
    };

    load();
  }, []);

  const handleSave = async () => {
    await axios.post(
      `${window.api.getUrl()}/api/message`,
      {
        to: selectedUser,
        theme: theme,
        content: messText,
      },
      { headers: { Authorization: localStorage.getItem('token') } }
    );
    setSendMessageOpened(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal)}>
        <h3>Write Message</h3>
        <SelectBox
          label="Choose user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          options={usersList}
        />
        <TextBox label="Theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
        <TextArea
          label="Type a message here"
          value={messText}
          onChange={(e) => setMessText(e.target.value)}
        ></TextArea>
        <div className={styles.modal__buttons}>
          <Button onClick={() => handleSave()}>Save</Button>
          <Button variant="secondary" onClick={() => setSendMessageOpened(false)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
