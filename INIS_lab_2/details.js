document.addEventListener('DOMContentLoaded', () => {
    const shirtData = JSON.parse(localStorage.getItem('selectedShirt'));

    if (!shirtData) {
        window.location.href = 'index.html';
        return;
    }

    const container = document.querySelector('#details-container');

    const title = document.createElement('h1');
    title.textContent = shirtData.name;

    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.id = 'shirt-image';

    const firstColorKey = Object.keys(shirtData.colors)[0];
    const defaultImagePath = 
        (shirtData.colors[firstColorKey]?.front || 
        shirtData.colors[firstColorKey]?.back) || 
        shirtData.default.front;

    image.src = `${defaultImagePath}`;
    imageContainer.appendChild(image);

    const price = document.createElement('h2');
    price.textContent = shirtData.price;

    const description = document.createElement('p');
    description.textContent = shirtData.description;

    const sideButtons = document.createElement('div');
    sideButtons.classList.add('buttons');
    const frontButton = document.createElement('button');
    const backButton = document.createElement('button');
    frontButton.textContent = 'Front';
    backButton.textContent = 'Back';
    frontButton.classList.add('side-button');
    backButton.classList.add('side-button');

    frontButton.addEventListener('click', () => {
        const firstColor = Object.keys(shirtData.colors)[0];
        const frontImage = shirtData.colors[firstColor]?.front || shirtData.default.front;
        image.src = `${frontImage}`;
    });

    backButton.addEventListener('click', () => {
        const firstColor = Object.keys(shirtData.colors)[0];
        const backImage = shirtData.colors[firstColor]?.back || shirtData.default.back;
        image.src = `${backImage}`;
    });

    sideButtons.appendChild(frontButton);
    sideButtons.appendChild(backButton);

    const colorButtons = document.createElement('div');
    colorButtons.classList.add('color-buttons');

    Object.keys(shirtData.colors).forEach((color) => {
        const colorButton = document.createElement('button');
        colorButton.style.backgroundColor = color;
        colorButton.classList.add('color-button');

        colorButton.addEventListener('click', () => {
            const frontImage = shirtData.colors[color]?.front || shirtData.default.front;
            const backImage = shirtData.colors[color]?.back || shirtData.default.back;

            if (frontButton.classList.contains('active')) {
                image.src = `${frontImage}`;
            } else {
                image.src = `${backImage}`;
            }
        });

        colorButtons.appendChild(colorButton);
    });

    container.appendChild(title);
    container.appendChild(imageContainer);
    container.appendChild(price);
    container.appendChild(description);
    container.appendChild(sideButtons);
    container.appendChild(colorButtons);

    frontButton.classList.add('active');
    frontButton.addEventListener('click', () => {
        frontButton.classList.add('active');
        backButton.classList.remove('active');
    });

    backButton.addEventListener('click', () => {
        backButton.classList.add('active');
        frontButton.classList.remove('active');
    });
});
