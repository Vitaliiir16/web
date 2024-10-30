import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTree = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const existingTrees = JSON.parse(localStorage.getItem('trees')) || [];

    if (existingTrees.some((tree) => tree.manufacturer === manufacturer)) {
      alert('Такий виробник вже існує');
      return;
    }

    if (price <= 0) {
      alert('Ціна має бути додатньою');
      return;
    }

    const newTree = { id: Date.now(), manufacturer, price: parseFloat(price) };
    const updatedTrees = [...existingTrees, newTree];

    localStorage.setItem('trees', JSON.stringify(updatedTrees));
    navigate('/');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Виробник"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ціна"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleSubmit}>Додати ялинку</button>
    </div>
  );
};

export default CreateTree;
