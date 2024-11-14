import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Callback from '..//AuthCallback/AuthCallback'

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/callback" element={<Callback />} />
    </Routes>
  );
}

export default NavRoutes;
