import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Filters from './Filters';
import { TreeContext } from '../contexts/TreeContext';
import './styles.css';

const Catalog = () => {
  const { trees } = useContext(TreeContext);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredTrees = trees.filter((tree) =>
    tree.manufacturer.toLowerCase().includes(search.trim().toLowerCase())
  );

  const sortedTrees = filteredTrees.sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.price - b.price;
    } else if (sortOrder === 'descending') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div>
      <Filters search={search} setSearch={setSearch} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <TreeList trees={sortedTrees} />
    </div>
  );
};

const TreeList = ({ trees }) => (
  <div className="trees-container">
    {trees.map((tree) => (
      <div className="tree-item" key={tree.id}>
        <img className='tree-img' src={`${process.env.PUBLIC_URL}/tree.png`} alt="Ялинка 1" />
        <p>Виробник: {tree.manufacturer}</p>
        <p>Ціна: {tree.price} грн</p>
        <Link to={`/catalog/${tree.id}`} className="view-button">Переглянути</Link>
      </div>
    ))}
  </div>
);

export default Catalog;
