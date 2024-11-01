function displayTrees() {
    const treeList = document.getElementById('trees');
    if (treeList) {
        treeList.innerHTML = '';
        fetch('/api/trees')
            .then(response => response.json())
            .then(trees => {
                trees.forEach((tree, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                        <button class="edit" onclick="editTree(${tree.id})">Редагувати</button>
                        <button class="delete" onclick="deleteTree(${tree.id})">Видалити</button>
                    `;
                    treeList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching trees:', error));
    }
}

function editTree(id) {
    localStorage.setItem('editTreeId', id);
    window.location.href = 'edit.html';
}

function deleteTree(id) {
    fetch(`/api/trees/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            displayTrees();
            calculateTotalPrice();
        } else {
            alert('Error deleting tree.');
        }
    })
    .catch(error => console.error('Error deleting tree:', error));
}

function sortTrees(criteria) {
    const treeList = document.getElementById('trees');
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    fetch(`/api/trees?sort=${criteria}&q=${encodeURIComponent(searchValue)}`)
        .then(response => response.json())
        .then(trees => {
            treeList.innerHTML = '';
            trees.forEach((tree, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                    <button class="edit" onclick="editTree(${tree.id})">Редагувати</button>
                    <button class="delete" onclick="deleteTree(${tree.id})">Видалити</button>
                `;
                treeList.appendChild(li);
            });
        })
        .catch(error => console.error('Error sorting trees:', error));
}

function searchTrees() {
    const searchValue = document.getElementById('search').value.trim().toLowerCase();
    fetch(`/api/trees?q=${encodeURIComponent(searchValue)}`)
        .then(response => response.json())
        .then(trees => {
            const treeList = document.getElementById('trees');
            treeList.innerHTML = '';
            trees.forEach((tree, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="tree-info">Виробник: ${tree.brand} - Висота: ${tree.height} см, Ціна: ${tree.price} грн, Матеріал: ${tree.material}</span>
                    <button class="edit" onclick="editTree(${tree.id})">Редагувати</button>
                    <button class="delete" onclick="deleteTree(${tree.id})">Видалити</button>
                `;
                treeList.appendChild(li);
            });
        })
        .catch(error => console.error('Error searching trees:', error));
}


function calculateTotalPrice() {
    fetch('/api/trees/total-price')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-price').innerText = data.total;
        })
        .catch(error => console.error('Error calculating total price:', error));
}
