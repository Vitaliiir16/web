import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Catalog from './components/Catalog';
import CreateTree from './components/CreateTree';
import EditTree from './components/EditTree';
import Header from './components/Header';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/create" element={<CreateTree />} />
      <Route path="/edit/:id" element={<EditTree />} />
    </Routes>
  </Router>
);

export default App;
