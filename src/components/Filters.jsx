import React from 'react';
import Sort from './Sort';
import './styles.css';

const Filters = ({ search, setSearch, sortOrder, setSortOrder }) => (
  <div className="srch">
    <input
      type="text"
      placeholder="Пошук за виробником"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
  </div>
);

export default Filters;