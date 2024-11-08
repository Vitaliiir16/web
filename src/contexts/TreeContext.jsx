import React, { createContext, useState, useEffect } from 'react';

export const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetch('/trees.json')
      .then(response => response.json())
      .then(data => setTrees(data))
      .catch(error => console.error('Error fetching trees:', error));
  }, []);

  return (
    <TreeContext.Provider value={{ trees, setTrees }}>
      {children}
    </TreeContext.Provider>
  );
};
