import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import AuthCallback from '..//AuthCallback/AuthCallback'

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default NavRoutes;
