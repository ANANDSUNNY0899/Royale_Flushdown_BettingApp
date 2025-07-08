// index.js - Our Game Simulator

// Step 1: Import the game engine
const RoyalFlushdownGame = require('./GameFolder/game.js');

// Step 2: Create a new game with 3 players
const playerNames = ['Amit', 'Priya', 'Rahul'];
const game = new RoyalFlushdownGame(playerNames);

// Step 3: Start the game (shuffles and deals cards)
game.startGame();

// --- MANUAL GAME SIMULATION ---
// In a real app, players would make these moves. Here, we do it manually.

// Let's assume the game is played for one full round (one trick).
// The turn order is Amit -> Priya -> Rahul

// Amit's turn (he starts)
let amitsCard = game.players[0].hand[0]; // Let's just play the first card
game.playCard(0, amitsCard);

// Priya's turn
let priyasCard = game.players[1].hand[0];
game.playCard(1, priyasCard);

// Rahul's turn
let rahulsCard = game.players[2].hand[0];
game.playCard(2, rahulsCard);

// The _endTrick() method will automatically run and declare a winner for the trick.
// The game state will be logged to the console.