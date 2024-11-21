const container = document.getElementById('shirt-container');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');

shirts.forEach((shirt) => {
    const shirtCard = document.createElement('div');
    shirtCard.classList.add('shirt-card');

    const firstColorKey = Object.keys(shirt.colors)[0];
    let previewImage;

    if (shirt.colors[firstColorKey]?.front || shirt.colors[firstColorKey]?.back) {
        previewImage = shirt.colors[firstColorKey].front || shirt.colors[firstColorKey].back;
    } else {
        previewImage = shirt.default.front || shirt.default.back;
    }

    shirtCard.innerHTML = `
        <img src="${previewImage}" alt="${shirt.name}">
        <h3>${shirt.name}</h3>
        <p>Available in ${Object.keys(shirt.colors).length} colors</p>
        <button class="quick-view">Quick View</button>
        <button>See Page</button>
    `;

    const quickViewButton = shirtCard.querySelector('.quick-view');
    quickViewButton.addEventListener('click', () => {
        openModal(shirt, firstColorKey);
    });

    container.appendChild(shirtCard);
});

function openModal(shirt, color) {
    modalContent.innerHTML = `
        <span id="close-modal" class="close">&times;</span>
    `;

    if (shirt.colors[color]?.front || shirt.colors[color]?.back) {
        const { front, back } = shirt.colors[color];
        if (front) {
            const frontImg = document.createElement('img');
            frontImg.src = front;
            frontImg.alt = `${shirt.name} (${color}) - Front`;
            frontImg.style.margin = '10px';
            modalContent.appendChild(frontImg);
        }
        if (back) {
            const backImg = document.createElement('img');
            backImg.src = back;
            backImg.alt = `${shirt.name} (${color}) - Back`;
            backImg.style.margin = '10px';
            modalContent.appendChild(backImg);
        }
    } else {
        const { front, back } = shirt.default;
        if (front) {
            const frontImg = document.createElement('img');
            frontImg.src = front;
            frontImg.alt = `${shirt.name} (default) - Front`;
            frontImg.style.margin = '10px';
            modalContent.appendChild(frontImg);
        }
        if (back) {
            const backImg = document.createElement('img');
            backImg.src = back;
            backImg.alt = `${shirt.name} (default) - Back`;
            backImg.style.margin = '10px';
            modalContent.appendChild(backImg);
        }
    }

    modal.style.display = 'flex';

    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});