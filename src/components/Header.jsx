import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => (
  <header>
    <h1>Магазин ялинок</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>
    </nav>
  </header>
);

export default Header;
