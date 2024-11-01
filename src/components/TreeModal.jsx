import React from 'react';
import './styles.css';

const TreeModal = ({ tree, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Виробник: {tree.manufacturer}</h2>
        <p>Ціна: {tree.price} грн</p>
        <p>Висота: {tree.height} см</p>
        <p>Опис: {tree.description}</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default TreeModal;
