const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Serve Angular static files (adjust path as needed)
const cors = require('cors');
app.use(cors()); // <== Allow all origins by default

// Route to get a specific Pokemon by ID
app.get('/api/pokemon/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific Pokemon Move by Move Name
app.get('/api/pokemon/move/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/move/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific move's strength and weaknesses
app.get('/api/type/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific pokemon's encounters
app.get('/api/pokemon/:id/encounters', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}/encounters`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific pokemon's encounters
app.get('/api/location-area/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/location-area/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific pokemon's species
app.get('/api/pokemon-species/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Route to get a specific pokemon's evolution chain
app.get('/api/evolution-chain/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from PokeAPI' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});