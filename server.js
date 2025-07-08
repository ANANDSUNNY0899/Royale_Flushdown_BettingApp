// server.js

const express = require('express');
const cors = require('cors'); // <-- ADD THIS LINE
const RoyalFlushdownGame = require('./GameFolder/game.js');

const app = express();
const PORT = 3001;

app.use(cors());
// --- GAME SETUP ---
// For now, we create ONE global game instance when the server starts.
const playerNames = ['Amit', 'Priya', 'Rahul'];
const game = new RoyalFlushdownGame(playerNames);
game.startGame();
// ------------------


// --- API ENDPOINT ---
// This is a "route". When a browser requests the URL '/api/gamestate',
// this function will run and send back the game's current state as JSON.
app.get('/api/gamestate', (req, res) => {
    // We send the entire game object. The frontend can decide what to show.
    res.json(game); 
});


// --- START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Game server running on http://localhost:${PORT}`);
});