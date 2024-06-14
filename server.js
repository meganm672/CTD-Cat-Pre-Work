

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const CAT_API_KEY = process.env.CAT_API_KEY;
const BREED_URL = `https://api.thecatapi.com/v1/breeds`;
const CAT_IMAGE_URL = "https://api.thecatapi.com/v1/images/search";

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Fetch breeds from Cat API
app.get('/breeds', async (req, res) => {
    try {
        const response = await fetch(`${BREED_URL}/?api_key=${CAT_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch breeds');
        }
        const breedData = await response.json();
        const filteredBreeds = breedData.filter(breed => breed.image?.url);
        res.json(filteredBreeds);
    } catch (error) {
        console.error('Error fetching breeds:', error.message);
        res.status(500).json({ error: 'Failed to fetch breeds' });
    }
});

// Fetch cat images from Cat API
app.get('/cat-images', async (req, res) => {
    try {
        const response = await fetch(`${CAT_IMAGE_URL}?limit=9&api_key=${CAT_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cat images');
        }
        const catImages = await response.json();
        res.json(catImages);
    } catch (error) {
        console.error('Error fetching cat images:', error.message);
        res.status(500).json({ error: 'Failed to fetch cat images' });
    }
});

// Fetch a single cat image URL from Cat API
app.get('/single-cat-image', async (req, res) => {
    try {
        const response = await fetch(`${CAT_IMAGE_URL}`);
        if (!response.ok) {
            throw new Error('Failed to fetch single cat image');
        }
        const data = await response.json();
        const imageUrl = data[0].url;
        res.json({ url: imageUrl });
    } catch (error) {
        console.error('Error fetching single cat image:', error.message);
        res.status(500).json({ error: 'Failed to fetch single cat image' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
