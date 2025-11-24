import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../redux/slices/userSlice';
import styles from './ActionsMenu.module.scss';
import likeLightIcon from '../../assets/ui/light/like_light.svg';
import likedLightIcon from '../../assets/ui/light/liked_light.svg';
import copyLightIcon from '../../assets/ui/light/copy_light.svg';
import pinLightIcon from '../../assets/ui/light/pin_light.svg';
import pinedLightIcon from '../../assets/ui/light/pined_light.svg';
import sourceLightIcon from '../../assets/ui/light/source_light.svg';
import printLightIcon from '../../assets/ui/light/print_light.svg';
import editLightIcon from '../../assets/ui/light/edit_light.svg';

import likeDarkIcon from '../../assets/ui/dark/like_dark.svg';
import likedDarkIcon from '../../assets/ui/dark/liked_dark.svg';
import copyDarkIcon from '../../assets/ui/dark/copy_dark.svg';
import pinDarkIcon from '../../assets/ui/dark/pin_dark.svg';
import pinedDarkIcon from '../../assets/ui/dark/pined_dark.svg';
import sourceDarkIcon from '../../assets/ui/dark/source_dark.svg';
import printDarkIcon from '../../assets/ui/dark/print_dark.svg';
import editDarkIcon from '../../assets/ui/dark/edit_dark.svg';

import AddNote from '../AddNote/AddNote';
import SuggestEdition from '../SuggestEdition/SuggestEdition';

const ActionsMenu = ({ id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pined, setPined] = useState({});
  const [addNoteOpened, setAddNoteOpened] = useState(false);
  const [addSuggestionOpened, setAddSuggestionOpened] = useState(false);
  const { theme } = useSelector((state) => state.settings);
  const definitionInfo = useSelector((state) => state.view.definitionInfo);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const favorites = useSelector((state) => state.user.user?.favorites);
  const pin = useSelector((state) => state.user.user?.notes);
  const personality = useSelector((state) => state.user.user?.personality);

  useEffect(() => {
    if (favorites) setLiked(favorites.includes(id));
  }, [favorites, id]);

  useEffect(() => {
    if (pin) setPined(pin.find((item) => item.NotedTerm === id));
  }, [pin, id]);

  const handleLike = async () => {
    setLiked(!liked);
    const response = await axios.post(
      `${window.api.getUrl()}/api/terms/like`,
      {
        term: definitionInfo.id,
        isFavorite: !liked,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };

  const handlePin = async () => {
    setAddNoteOpened(true);
  };

  const handleSugg = async () => {
    if (personality === 'Admin') {
      navigate(`/edit/${id}`);
    } else {
      setAddSuggestionOpened(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {addNoteOpened && (
        <AddNote
          pined={pined}
          setPined={setPined}
          setAddNoteOpened={setAddNoteOpened}
          id={definitionInfo.id}
          name={definitionInfo.term}
        ></AddNote>
      )}
      {addSuggestionOpened && (
        <SuggestEdition
          setSuggestEditionOpened={setAddSuggestionOpened}
          name={definitionInfo.term}
        ></SuggestEdition>
      )}
      <div className={styles.actions}>
        <button
          className={`${styles.burger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle actions menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.links} ${open ? styles.show : ''}`}>
          <button onClick={() => handleLike()}>
            <img
              src={
                liked
                  ? theme === 'dark'
                    ? likedLightIcon
                    : likedDarkIcon
                  : theme === 'dark'
                  ? likeLightIcon
                  : likeDarkIcon
              }
              alt=""
            />
            <span>{t('like')}</span>
          </button>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                definitionInfo.term + ' - ' + definitionInfo.translations.ru
              )
            }
          >
            <img src={theme === 'dark' ? copyLightIcon : copyDarkIcon} alt="" />
            <span>{t('copy')}</span>
          </button>
          <button onClick={() => handlePin()}>
            <img
              src={
                pined
                  ? theme === 'dark'
                    ? pinedLightIcon
                    : pinedDarkIcon
                  : theme === 'dark'
                  ? pinLightIcon
                  : pinDarkIcon
              }
              alt=""
            />
            <span>{t('pin')}</span>
          </button>
          <button onClick={() => window.api.openBrowserWindow(definitionInfo.source)}>
            <img src={theme === 'dark' ? sourceLightIcon : sourceDarkIcon} alt="" />
            <span>{t('source')}</span>
          </button>
          <button onClick={() => handlePrint()}>
            <img src={theme === 'dark' ? printLightIcon : printDarkIcon} alt="" />
            <span>{t('print')}</span>
          </button>
          <button onClick={() => handleSugg()}>
            <img src={theme === 'dark' ? editLightIcon : editDarkIcon} alt="" />
            <span>{t('edit')}</span>
          </button>
          {/* <button onClick={() => navigate(`/edit/${id}`)}>
            <img src={editIcon} alt="" />
            <span>{t('edit')}</span>
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ActionsMenu;
