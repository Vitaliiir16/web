import React from 'react';
import './styles.css';

const Sort = ({ sortOrder, setSortOrder }) => {
  const options = [
    { value: 'none', label: 'Без сортування' },
    { value: 'ascending', label: 'Сортувати за зростанням' },
    { value: 'descending', label: 'Сортувати за спаданням' },
  ];

  return (
    <div className="sort-container">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="srt-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
