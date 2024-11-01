class Tree {
    constructor(brand, height, price, material) {
        this.brand = brand;
        this.height = height;
        this.price = price;
        this.material = material;
    }
}

let trees = JSON.parse(localStorage.getItem('trees')) || [];


document.addEventListener('DOMContentLoaded', () => {
    const treeForm = document.getElementById('tree-form');
    
    if (treeForm) {
        
        treeForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            addTree(); 
        });
    } 

    const treeIndex = localStorage.getItem('editTreeIndex');
    if (treeIndex !== null && document.getElementById('edit-form')) {

        loadTreeForEdit(treeIndex);
        const editForm = document.getElementById('edit-form');
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveEditedTree(treeIndex);
        });
    }
});

function addTree() {
    const brand = document.getElementById('brand').value.trim();
    const height = parseInt(document.getElementById('height').value);
    const price = parseInt(document.getElementById('price').value);
    const material = document.getElementById('material').value.trim();

    const anplagiat = trees.some(tree => tree.brand.toLowerCase() === brand.toLowerCase());
    if (anplagiat) {
        alert('Ця назва вже використовується');
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('Ціна має бути додатньою');
        return;
    }

    if (isNaN(height) || height <= 0) {
        alert('Висота має бути додатньою');
        return;
    }
    const newTree = new Tree(brand, height, price, material);
    trees.push(newTree);
    localStorage.setItem('trees', JSON.stringify(trees));
    window.location.href = 'index.html';
}

function loadTreeForEdit(index) {
    const tree = trees[index];
    document.getElementById('edit-brand').value = tree.brand;
    document.getElementById('edit-height').value = tree.height;
    document.getElementById('edit-price').value = tree.price;
    document.getElementById('edit-material').value = tree.material;
}

function saveEditedTree(index) {
    const editedTree = new Tree(
        document.getElementById('edit-brand').value.trim(),
        parseInt(document.getElementById('edit-height').value),
        parseInt(document.getElementById('edit-price').value),
        document.getElementById('edit-material').value.trim()
    );

    trees[index] = editedTree;
    localStorage.setItem('trees', JSON.stringify(trees));
    localStorage.removeItem('editTreeIndex');
    window.location.href = 'index.html';
}
