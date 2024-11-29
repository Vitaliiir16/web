const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const trees = require('./trees.json');


app.get('/trees', (req, res) => {
  const { search = '', sort } = req.query;
  console.log('Received request with search:', search, 'and sort:', sort);

  let filteredTrees = trees.filter((tree) =>
    tree.manufacturer.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

 
  if (sort === 'ascending') {
    filteredTrees.sort((a, b) => a.price - b.price);
  } else if (sort === 'descending') {
    filteredTrees.sort((a, b) => b.price - a.price);
  }

  res.json(filteredTrees);
});

app.get('/trees/:id', (req, res) => {
  const { id } = req.params; 
  const tree = trees.find((tree) => tree.id === parseInt(id));
  if (tree) {
    res.json(tree);
  } else {
    res.status(404).json({ message: 'Tree not found' }); 
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
