import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTree = () => {
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const trees = JSON.parse(localStorage.getItem('trees')) || [];
    const tree = trees.find((t) => t.id === parseInt(id));
    if (tree) {
      setManufacturer(tree.manufacturer);
      setPrice(tree.price);
    }
  }, [id]);

  const handleSubmit = () => {
    const trees = JSON.parse(localStorage.getItem('trees')) || [];
    const updatedTrees = trees.map((tree) =>
      tree.id === parseInt(id) ? { ...tree, manufacturer, price: parseFloat(price) } : tree
    );

    localStorage.setItem('trees', JSON.stringify(updatedTrees));
    navigate('/');
  };

  return (
    <div>
      <input
        type="text"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleSubmit}>Зберегти</button>
    </div>
  );
};

export default EditTree;
