
import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
const CharList = lazy (() => import ('../charList/CharList'));
const CharElement = lazy (() => import ('../charElement/CharElement'));



function App() {
  return (
      <Router>
          <div className="App">
              <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                      <Route path="/" element={<CharList />} />
                      <Route path="/CharElement/:animalId" element={<CharElement />} />

                  </Routes>
              </Suspense>
          </div>
      </Router>
  );
}

export default App; 