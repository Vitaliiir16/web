// Імпорт модулів
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataFilePath = path.join(__dirname, 'trees.json');

const readTreesData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const writeTreesData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Отримання
app.get('/api/trees', async (req, res) => {
    try {
        const trees = await readTreesData();
        const searchValue = req.query.q ? req.query.q.toLowerCase() : '';
        const sort = req.query.sort;

        let filteredTrees = trees.filter(tree => tree.brand.toLowerCase().includes(searchValue));
        if (sort === 'price') {
            filteredTrees.sort((a, b) => a.price - b.price);
        } else if (sort === 'height') {
            filteredTrees.sort((a, b) => a.height - b.height);
        }

        res.json(filteredTrees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read trees data' });
    }
});


app.post('/api/trees', async (req, res) => {
    try {
        const trees = await readTreesData();
        const newTree = req.body;
        if (!newTree.brand || !newTree.height || !newTree.price || !newTree.material) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (isNaN(newTree.price)) {
            return res.status(400).json({ error: 'Price must be a number' });
        }

        trees.push(newTree);
        await writeTreesData(trees);
        res.status(201).json(newTree);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add new tree' });
    }
});

// Оновлення
app.put('/api/trees/:index', async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const trees = await readTreesData();
        if (index < 0 || index >= trees.length) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        const updatedTree = req.body;

        if (!updatedTree.brand || !updatedTree.height || !updatedTree.price || !updatedTree.material) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (isNaN(updatedTree.price)) {
            return res.status(400).json({ error: 'Price must be a number' });
        }

        trees[index] = updatedTree;
        await writeTreesData(trees);
        res.json(trees[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tree' });
    }
});


app.delete('/api/trees/:index', async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const trees = await readTreesData();
        if (index < 0 || index >= trees.length) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        const deletedTree = trees.splice(index, 1);
        await writeTreesData(trees);
        res.json(deletedTree[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tree' });
    }
});


app.get('/api/trees/search', async (req, res) => {
    try {
        const searchValue = req.query.q.toLowerCase();
        const trees = await readTreesData();
        const filteredTrees = trees.filter(tree => tree.brand.toLowerCase().includes(searchValue));
        res.json(filteredTrees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search trees' });
    }
});

// тотал прайс
app.get('/api/trees/total-price', async (req, res) => {
    try {
        const trees = await readTreesData();
        const totalPrice = trees.reduce((acc, tree) => acc + tree.price, 0);
        res.json({ total: totalPrice });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate total price' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


