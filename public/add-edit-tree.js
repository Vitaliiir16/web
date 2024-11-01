class Tree {
    constructor(brand, height, price, material) {
        this.brand = brand;
        this.height = height;
        this.price = price;
        this.material = material;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const treeForm = document.getElementById('tree-form');
    const editForm = document.getElementById('edit-form');

    if (treeForm) {
        treeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addTree();
        });
    } 

    const treeIndex = localStorage.getItem('editTreeIndex');
    if (treeIndex !== null && editForm) {
        loadTreeForEdit(treeIndex);
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

    fetch('/api/trees')
        .then(response => response.json())
        .then(trees => {
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

            const newTree = { brand, height, price, material };

            return fetch('/api/trees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTree)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ялинку успішно додано")
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error adding tree:', error);
        });
}


function loadTreeForEdit(index) {
    fetch(`/api/trees`)
    .then(response => response.json())
    .then(trees => {
        const tree = trees[index];
        document.getElementById('edit-brand').value = tree.brand;
        document.getElementById('edit-height').value = tree.height;
        document.getElementById('edit-price').value = tree.price;
        document.getElementById('edit-material').value = tree.material;
    });
}

function saveEditedTree(index) {
    const editedTree = new Tree(
        document.getElementById('edit-brand').value.trim(),
        parseInt(document.getElementById('edit-height').value),
        parseInt(document.getElementById('edit-price').value),
        document.getElementById('edit-material').value.trim()
    );

    fetch(`/api/trees/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedTree)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Error updating tree.');
        }
    });
}

