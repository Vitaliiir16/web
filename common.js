let trees = JSON.parse(localStorage.getItem('trees')) || [];

function displayTrees() {
    const treeList = document.getElementById('trees');
    if (treeList) {
        treeList.innerHTML = '';
        trees.forEach((tree, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                <button class="edit" onclick="editTree(${index})">Редагувати</button>
                <button class="delete" onclick="deleteTree(${index})">Видалити</button>
           ` ;
            treeList.appendChild(li);
        });
    }
}

function editTree(index) {
    localStorage.setItem('editTreeIndex', index);
    window.location.href = 'edit.html';
}


function deleteTree(index) {
    trees.splice(index, 1);
    localStorage.setItem('trees', JSON.stringify(trees));
    displayTrees();
    calculateTotalPrice();
}

function sortTrees(criteria) {
    if (criteria === 'price') {
        trees.sort((a, b) => a.price - b.price);
    } else if (criteria === 'height') {
        trees.sort((a, b) => a.height - b.height);
    }
    displayTrees();
}

function searchTrees() {
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    const filteredTrees = trees.filter(tree => tree.brand.toLowerCase().includes(searchValue));

    const treeList = document.getElementById('trees');
    treeList.innerHTML = '';
    filteredTrees.forEach((tree, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="tree-info">${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
            <button class="edit" onclick="editTree(${index})">Редагувати</button>
            <button class="delete" onclick="deleteTree(${index})">Видалити</button>
        `;
        treeList.appendChild(li);
    });
}

function calculateTotalPrice() {
    const total = trees.reduce((acc, tree) => acc + tree.price, 0);
    document.getElementById('total-price').innerText = total;
}