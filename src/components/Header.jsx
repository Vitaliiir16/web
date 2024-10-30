import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Магазин ялинок</h1>
    <nav>
      <Link to="/">Каталог</Link>
      <Link to="/create">Створити ялинку</Link>
    </nav>
  </header>
);

export default Header;
