import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

const TreePage = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    fetch('/trees.json')
      .then(response => response.json())
      .then(data => {
        const selectedTree = data.find(tree => tree.id === parseInt(id));
        setTree(selectedTree);
      })
      .catch(error => console.error('Error fetching tree:', error));
  }, [id]);

  if (!tree) return <p>Loading...</p>;

  return (
    <div className="tree-page">
      <h2>Виробник: {tree.manufacturer}</h2>
      <p>Ціна: {tree.price} грн</p>
      <p>Висота: {tree.height} см</p>
      <p>Опис: {tree.description}</p>
      <Link to="/catalog" className="back-button">Назад до каталогу</Link>
    </div>
  );
};

export default TreePage;