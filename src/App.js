import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import TreePage from './components/TreePage';
import { TreeProvider } from './contexts/TreeContext';
import './components/styles.css';

const App = () => (
  <TreeProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<TreePage />} />
      </Routes>
      <Footer />
    </Router>
  </TreeProvider>
);

export default App;
