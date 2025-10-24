import React from 'react';
import './scss/app.scss';
import ConnectionWindow from './pages/ConnectionWindow/ConnectionWindow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationWindow from './pages/RegistrationWindow/RegistrationWindow';
import AuthWindow from './pages/AuthWindow/AuthWindow';
import MainWindow from './pages/MainWindow/MainWindow';
import TerminWindow from './pages/TerminWindow/TerminWindow';
import PersonalAccountWindow from './pages/PersonalAccountWindow/PersonalAccountWindow';
import AddingWindow from './pages/AddingWindow/AddingWindow';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectionWindow />} />
          <Route path="/auth" element={<AuthWindow />} />
          <Route path="/registration" element={<RegistrationWindow />} />
          <Route path="/main" element={<MainWindow />} />
          <Route path="/definition" element={<TerminWindow />} />
          <Route path="/account" element={<PersonalAccountWindow />} />
          <Route path="/add" element={<AddingWindow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
