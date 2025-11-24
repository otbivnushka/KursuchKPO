import React, { useEffect } from 'react';
import './scss/app.scss';
import ConnectionWindow from './pages/ConnectionWindow/ConnectionWindow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useDispatch } from 'react-redux';
import i18n from './i18n/i18n';
import RegistrationWindow from './pages/RegistrationWindow/RegistrationWindow';
import AuthWindow from './pages/AuthWindow/AuthWindow';
import MainWindow from './pages/MainWindow/MainWindow';
import TerminWindow from './pages/TerminWindow/TerminWindow';
import PersonalAccountWindow from './pages/PersonalAccountWindow/PersonalAccountWindow';
import AddingWindow from './pages/AddingWindow/AddingWindow';
import { loadSettings } from './redux/slices/settingsSlice';
import EditWindow from './pages/EditWindow/EditWindow';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  return (
    <div className="app">
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<ConnectionWindow />} /> */}
            <Route path="/" element={<AuthWindow />} />
            <Route path="/registration" element={<RegistrationWindow />} />
            <Route path="/main" element={<MainWindow />} />
            <Route path="/definition/:id" element={<TerminWindow />} />
            <Route path="/account" element={<PersonalAccountWindow />} />
            <Route path="/add" element={<AddingWindow />} />
            <Route path="/edit/:id" element={<EditWindow />} />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </div>
  );
};

export default App;
