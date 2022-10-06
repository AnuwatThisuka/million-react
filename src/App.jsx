import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Home, Login } from './pages';
import ContentWrapper from './components/wrapper/ContentWrapper';
function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ContentWrapper content={Login} />} />
          <Route path="/Home" element={<ContentWrapper content={Home} />} />
          {/* <Route path="*" element={<ContentWrapper content={pagenotfound} />} /> */}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
