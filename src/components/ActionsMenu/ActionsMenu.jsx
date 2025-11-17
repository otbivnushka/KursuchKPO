import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../redux/slices/userSlice';
import styles from './ActionsMenu.module.scss';
import likeIcon from '../../assets/ui/like.svg';
import likedIcon from '../../assets/ui/liked.svg';
import copyIcon from '../../assets/ui/copy.svg';
import pinIcon from '../../assets/ui/pin.svg';
import pinedIcon from '../../assets/ui/pined.svg';
import sourceIcon from '../../assets/ui/source.svg';
import printIcon from '../../assets/ui/print.svg';
import editIcon from '../../assets/ui/edit.svg';
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

  const definitionInfo = useSelector((state) =>
    state.definition.items.find((item) => item.id === id)
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const favorites = useSelector((state) => state.user.user?.favorites);
  const pin = useSelector((state) => state.user.user?.notes);

  useEffect(() => {
    if (favorites) {
      setLiked(favorites.includes(id));
    }
    if (pin) {
      setPined(pin.find((item) => item.notedTerm === id));
    }
  }, [pin, favorites, id]);

  const handleLike = async () => {
    const response = await window.api.sendAndWaitResponse({
      Command: 'UPDATE_FAVORITE',
      Payload: {
        term: definitionInfo.id,
        isFavorite: !liked,
      },
    });
    setLiked(!liked);
    console.log(response);
  };

  const handlePin = async () => {
    setAddNoteOpened(true);
  };

  const handleSugg = async () => {
    setAddSuggestionOpened(true);
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
          id={id}
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
            <img src={liked ? likedIcon : likeIcon} alt="" />
            <span>{t('like')}</span>
          </button>
          <button
            onClick={() =>
              navigator.clipboard.writeText(definitionInfo.term + ' - ' + definitionInfo.definition)
            }
          >
            <img src={copyIcon} alt="" />
            <span>{t('copy')}</span>
          </button>
          <button onClick={() => handlePin()}>
            <img src={pined ? pinedIcon : pinIcon} alt="" />
            <span>{t('pin')}</span>
          </button>
          <button onClick={() => window.api.openBrowserWindow(definitionInfo.source)}>
            <img src={sourceIcon} alt="" />
            <span>{t('source')}</span>
          </button>
          <button onClick={() => handlePrint()}>
            <img src={printIcon} alt="" />
            <span>{t('print')}</span>
          </button>
          <button onClick={() => handleSugg()}>
            <img src={editIcon} alt="" />
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
