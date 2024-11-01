import React, { useState, useEffect } from 'react';
import './styles.css';
import TreeModal from './TreeModal';

const Catalog = () => {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [selectedTree, setSelectedTree] = useState(null);

  useEffect(() => {
    fetch('/trees.json')
      .then(response => response.json())
      .then(data => setTrees(data))
      .catch(error => console.error('Error fetching trees:', error));
  }, []);

  const handleResetFilters = () => {
    setSortOrder('none');
    setSearch('');
  };

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
      <div className="srch">
        <input
          type="text"
          placeholder="Пошук за виробником"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="srt" onClick={() => setSortOrder('ascending')}>Сортувати за зростанням</button>
        <button className="srt" onClick={() => setSortOrder('descending')}>Сортувати за спаданням</button>
        <button className="srt" onClick={handleResetFilters}>Без сортування</button>
      </div>
      <div className="trees-container">
        {sortedTrees.map((tree) => (
          <div className="tree-item" key={tree.id}>
            <p>Виробник: {tree.manufacturer}</p>
            <p>Ціна: {tree.price} грн</p>
            <button onClick={() => setSelectedTree(tree)}>Переглянути</button>
          </div>
        ))}
      </div>
      {selectedTree && (
        <TreeModal tree={selectedTree} onClose={() => setSelectedTree(null)} />
      )}
    </div>
  );
};

export default Catalog;
