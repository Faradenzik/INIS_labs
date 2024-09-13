const productList = document.getElementById('product-list');

function createProductCard(shirt) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    
    if (Object.keys(shirt.colors).length > 0) {
        const firstColorKey = Object.keys(shirt.colors)[0]; 
        productImage.src = shirt.colors[firstColorKey].front;
    } else {
        productImage.src = shirt.default.front;
    }
    
    if (shirt.name == null) {
        shirt.name = 'No title';
    }
    productImage.alt = shirt.name;
    productCard.appendChild(productImage);

    const productName = document.createElement('h3');
    productName.textContent = shirt.name;
    productCard.appendChild(productName);

    const productColors = document.createElement('p');
    const availableColors = Object.keys(shirt.colors).length;
    if (availableColors > 0) {
        productColors.textContent = `Available in ${availableColors} colors`;
    } else {
        productColors.textContent = `Not available`;
    }
    productCard.appendChild(productColors);

    const quickViewBtn = document.createElement('button');
    quickViewBtn.textContent = 'Quick View';
    quickViewBtn.onclick = () => openModal(shirt);
    productCard.appendChild(quickViewBtn);

    const seePageBtn = document.createElement('button');
    seePageBtn.textContent = 'See Page';
    productCard.appendChild(seePageBtn);

    productList.appendChild(productCard);
}


let currentImageIndex = 0;
function openModal(shirt) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const colorSelect = document.getElementById('color-select');

    modalTitle.textContent = shirt.name;
    modalPrice.textContent = `Price: ${shirt.price}`;
    modalDescription.textContent = shirt.description;

    colorSelect.innerHTML = '';
    const colors = Object.keys(shirt.colors);

    colors.forEach((color) => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    function updateImage() {
        const selectedColor = colorSelect.value;
        const colorImages = shirt.colors[selectedColor];
        const imagesArray = [colorImages.front, colorImages.back];
        modalImage.src = imagesArray[currentImageIndex];
    }

    updateImage();

    document.querySelector('.prev').onclick = function() {
        currentImageIndex = (currentImageIndex === 0) ? 1 : 0;
        updateImage();
    };

    document.querySelector('.next').onclick = function() {
        currentImageIndex = (currentImageIndex === 0) ? 1 : 0;
        updateImage();
    };

    colorSelect.onchange = function() {
        currentImageIndex = 0;
        updateImage();
    };

    modal.style.display = 'block';

    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

shirts.forEach(createProductCard);