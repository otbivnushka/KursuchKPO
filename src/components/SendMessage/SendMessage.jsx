import React, { use, useState, useEffect } from 'react';
import styles from './SendMessage.module.scss';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import clsx from 'clsx';
import SelectBox from '../SelectBox/SelectBox';
import TextBox from '../TextBox/TextBox';

const SendMessage = ({ setSendMessageOpened }) => {
  const [messText, setMessText] = useState('');
  const [theme, setTheme] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const load = async () => {
      const response = await window.api.sendAndWaitResponse({
        Command: 'GET_USERS',
        Payload: {},
      });

      if (response?.payload) {
        const mapped = response.payload.map((u) => ({
          label: u.login,
          value: u.id,
        }));

        setUsersList(mapped);
      }
    };

    load();
  }, []);

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);
  const handleSave = async () => {
    const response = await window.api.sendAndWaitResponse({
      Command: 'SEND_MESSAGE',
      Payload: {
        to: selectedUser,
        theme: theme,
        content: messText,
      },
    });
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
