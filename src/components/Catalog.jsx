import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortByPrice, setSortByPrice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTrees = JSON.parse(localStorage.getItem('trees')) || [];
    setTrees(storedTrees);
  }, []);

  const deleteTree = (id) => {
    const updatedTrees = trees.filter((tree) => tree.id !== id);
    localStorage.setItem('trees', JSON.stringify(updatedTrees));
    setTrees(updatedTrees);
  };

  const filteredTrees = trees
    .filter((tree) => tree.manufacturer.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortByPrice ? a.price - b.price : 0));

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук за виробником"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortByPrice(!sortByPrice)}>
        Сортувати за ціною
      </button>
      {filteredTrees.map((tree) => (
        <div key={tree.id}>
          <p>Виробник: {tree.manufacturer}</p>
          <p>Ціна: {tree.price} грн</p>
          <button onClick={() => navigate(`/edit/${tree.id}`)}>Редагувати</button>
          <button onClick={() => deleteTree(tree.id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
