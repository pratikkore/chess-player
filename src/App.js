import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Playerlist from './Component/Playerlist';
import PlayerProfile from './Component/PlayerProfile';

function App() {
  return(
      <Router>
        <Routes>
          <Route exact path="/" element={<Playerlist />} />
          <Route path="/playersProfile/:username" element={<PlayerProfile />} />
        </Routes>
      </Router>
  )
}

export default App;
