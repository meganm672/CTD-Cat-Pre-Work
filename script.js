
const BREED_URL = `https://api.thecatapi.com/v1/breeds`;
const CAT_IMAGE_URL = "https://api.thecatapi.com/v1/images/search"
const API_KEY = "live_s43IkOpOVF2G1mmgzo7sUAGA9uqzMIeRgbPj194VWliOEv1rPEhEIi8uuWuECTF7"

let storedBreeds = [];

fetch(`${BREED_URL}/?api_key=${API_KEY}`)
    .then((response) => {
        return response.json()
    })
    .then((breedData) => {
        //filter to only include those with an `image` object
        breedData = breedData.filter(img => img.image?.url != null);

        storedBreeds = breedData;
        const breedSelector = document.getElementById('breed-selector');
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');

            //skip any breeds that don't have an image
            if (!breed.image) continue

            //use the current array index
            option.value = i;
            option.innerHTML = `${breed.name}`;
            breedSelector.appendChild(option);
        }
        //show the first breed by default
        showBreedImage(0)
    })
    .catch(function (error) {
        console.log(error);
    });

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

function showBreedsPage() {
    document.getElementById('breed-button').style.display = 'none';
    document.getElementById('cat-images-button').style.display = 'none';
    document.getElementById('breed-page').style.display = 'block';
    document.getElementById('maincontent').style.display = 'none';
    document.getElementById('cat-images-page').style.display = 'none';
    document.getElementById('back-button-breed').style.display = 'inline-block';
    document.getElementById('back-button-cat-images').style.display = 'none';
}

function showCatImagesPage() {
    document.getElementById('breed-button').style.display = 'none';
    document.getElementById('cat-images-button').style.display = 'none';
    document.getElementById('back-button-cat-images').style.display = 'inline-block';
    document.getElementById('breed-page').style.display = 'none';
    document.getElementById('maincontent').style.display = 'none';
    document.getElementById('cat-images-page').style.display = 'inline-block';
    document.getElementById('back-button-breed').style.display = 'none';

    getNewCatImages(); // Load images when navigating to the page
}

function showMainPage() {
    document.getElementById('breed-button').style.display = "block";
    document.getElementById('cat-images-button').style.display = "block";
    document.getElementById('breed-page').style.display = 'none';
    document.getElementById('maincontent').style.display = 'flex';
    document.getElementById('cat-images-page').style.display = 'none';
    document.getElementById('back-button-breed').style.display = 'none';
    document.getElementById('back-button-cat-images').style.display = 'none';
}


fetch(`${CAT_IMAGE_URL}?limit=9&api_key=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let imagesData = data;
        imagesData.map(function (imageData) {
            let image = document.createElement('img');
            image.src = `${imageData.url}`;

            let gridCell = document.createElement('div');
            gridCell.classList.add('col');
            gridCell.classList.add('col-lg');
            gridCell.appendChild(image);

            document.getElementById('grid').appendChild(gridCell)
        });
    })
    .catch(function (error) {
        console.log(error);
    })

function getNewCatImages() {
    fetch(`${CAT_IMAGE_URL}?limit=9&api_key=${API_KEY}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let imagesData = data;
            let grid = document.getElementById('grid');
            grid.innerHTML = '';

            imagesData.forEach(function (imageData) {
                let image = document.createElement('img');
                image.src = `${imageData.url}`;

                let gridCell = document.createElement('div');
                gridCell.classList.add('col');
                gridCell.classList.add('col-lg');
                gridCell.appendChild(image);

                grid.appendChild(gridCell);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}


    fetch(`${CAT_IMAGE_URL}`)
        .then((response) => response.json())
        .then((data) => {
                document.getElementById('main-cat-image').src = data[0].url;
        })
        .catch
        (function (error) {
            console.log(error);
        });


