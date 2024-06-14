
let storedBreeds = [];
//Breed API Call
async function fetchBreedsAndRender() {
    try {
        const response = await fetch('/breeds');
        if (!response.ok) {
            throw new Error('Failed to fetch breeds');
        }
        storedBreeds = await response.json();

        const breedSelector = document.getElementById('breed-selector');
        breedSelector.innerHTML = '';
        storedBreeds.forEach((breed, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.innerHTML = breed.name;
            breedSelector.appendChild(option);
        });

        showBreedImage(0); // Show the first breed image by default
    } catch (error) {
        console.error('Error fetching breeds:', error.message);
    }
}

//Showing image for specific breed
function showBreedImage(index) {
    const breed = storedBreeds[index];
    if (breed) {
        document.getElementById("breed-name").textContent = breed.name
        document.getElementById("breed-image").src = breed.image.url;
        document.getElementById("breed-json").textContent = breed.temperament;

        const wikiLink = document.getElementById("wiki-link");
        wikiLink.href = breed.wikipedia_url;
        wikiLink.innerHTML = breed.wikipedia_url;
    }
}
// called when the breeds button is clicked
function showBreedsPage() {
    document.getElementById('breed-button').style.display = 'none';
    document.getElementById('cat-images-button').style.display = 'none';
    document.getElementById('breed-page').style.display = 'block';
    document.getElementById('maincontent').style.display = 'none';
    document.getElementById('cat-images-page').style.display = 'none';
    document.getElementById('back-button-breed').style.display = 'inline-block';
    document.getElementById('back-button-cat-images').style.display = 'none';
}
// called when the cat images button is clicked
function showCatImagesPage() {
    document.getElementById('breed-button').style.display = 'none';
    document.getElementById('cat-images-button').style.display = 'none';
    document.getElementById('back-button-cat-images').style.display = 'inline-block';
    document.getElementById('breed-page').style.display = 'none';
    document.getElementById('maincontent').style.display = 'none';
    document.getElementById('cat-images-page').style.display = 'inline-block';
    document.getElementById('back-button-breed').style.display = 'none';

    getNewCatImages();
}
// called when a back button is pushed
function showMainPage() {
    document.getElementById('breed-button').style.display = "block";
    document.getElementById('cat-images-button').style.display = "block";
    document.getElementById('breed-page').style.display = 'none';
    document.getElementById('maincontent').style.display = 'flex';
    document.getElementById('cat-images-page').style.display = 'none';
    document.getElementById('back-button-breed').style.display = 'none';
    document.getElementById('back-button-cat-images').style.display = 'none';
}

// fetching the cat images for the grid 
async function fetchCatImagesAndRender() {
    try {
        const response = await fetch('/cat-images');
        if (!response.ok) {
            throw new Error('Failed to fetch cat images');
        }
        const data = await response.json();

        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        data.forEach(imageData => {
            let image = document.createElement('img');
            image.src = imageData.url;

            let gridCell = document.createElement('div');
            gridCell.classList.add('col', 'col-lg');
            gridCell.appendChild(image);

            grid.appendChild(gridCell);
        });
    } catch (error) {
        console.error('Error fetching cat images:', error.message);
    }
}


// fetching new batch of cat images
function getNewCatImages() {
    fetchCatImagesAndRender();
}

//fetching a single cat image for the main page
async function fetchSingleCatImageAndRender() {
    try {
        const response = await fetch('/single-cat-image');
        if (!response.ok) {
            throw new Error('Failed to fetch cat image');
        }
        const data = await response.json();
        const imageUrl = data.url;
        document.getElementById('main-cat-image').src = imageUrl;
    } catch (error) {
        console.error('Error fetching cat image:', error.message);
    }
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    fetchBreedsAndRender();
    fetchCatImagesAndRender();
    fetchSingleCatImageAndRender();
});