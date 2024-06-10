
const BREED_URL= `https://api.thecatapi.com/v1/breeds`;
const CAT_IMAGE_URL= "https://api.thecatapi.com/v1/images/search?limit=9"
const API_KEY="live_s43IkOpOVF2G1mmgzo7sUAGA9uqzMIeRgbPj194VWliOEv1rPEhEIi8uuWuECTF7"

let storedBreeds= [];

fetch(`${BREED_URL}/?api_key=${API_KEY}`)
.then((response) =>{
    return response.json()
})
.then((breedData) =>{
    //filter to only include those with an `image` object
    breedData = breedData.filter(img=> img.image?.url!=null);
    
    storedBreeds = breedData;
    const breedSelector = document.getElementById('breed-selector');
    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');
        
        //skip any breeds that don't have an image
        if(!breed.image)continue
        
        //use the current array index
        option.value = i;
        option.innerHTML = `${breed.name}`;
        breedSelector.appendChild(option);
    }
    //show the first breed by default
    showBreedImage(0)
})
.catch(function(error) {
    console.log(error);
});

function showBreedImage(index){ 
    const breed = storedBreeds[index];
    if (breed) {
        document.getElementById("breed-image").src = breed.image.url;
        document.getElementById("breed-json").textContent = breed.temperament;
        
        const wikiLink = document.getElementById("wiki-link");
        wikiLink.href = breed.wikipedia_url;
        wikiLink.innerHTML = breed.wikipedia_url;
    }
}

function showBreedsPage() {
    document.getElementById('breed-page').style.display = 'block';
    document.getElementById('maincontent').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('breed-button').style.display ="none";
}

function showMainPage() {
    document.getElementById('breed-page').style.display = 'none';
    document.getElementById('maincontent').style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('breed-button').style.display ="block";
}

fetch(`${CAT_IMAGE_URL}&api_key=${API_KEY}`)
.then((response) =>{
    return response.json();
})
.then((data) => {
    let imagesData = data;
    imagesData.map(function(imageData){
        let image = document.createElement('img');
        image.src = `${imageData.url}`;

        let gridCell = document.createElement('div');
        gridCell.classList.add('col');
        gridCell.classList.add('col-lg');
        gridCell.appendChild(image);

        document.getElementById('grid').appendChild(gridCell)
    });
})
.catch(function(error){
    console.log(error);
})

function getNewCatImages() {
    fetch(`${CAT_IMAGE_URL}&api_key=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let imagesData = data;
        let grid = document.getElementById('grid');
        grid.innerHTML = ''; // Clear existing images
        
        imagesData.forEach(function(imageData) {
            let image = document.createElement('img');
            image.src = `${imageData.url}`;

            let gridCell = document.createElement('div');
            gridCell.classList.add('col');
            gridCell.classList.add('col-lg');
            gridCell.appendChild(image);

            grid.appendChild(gridCell);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}