// main.js - The Game Runner

// 1. Apni game class ko import karo
const RoyalFlushdownGame = require('./GameFolder/game.js');

// Helper function to create a delay (taaki game jaldi-jaldi na bhage)
const delay = ms => new Promise(res => setTimeout(res, ms));

// --- BOT LOGIC (Computer Player) ---
// Yeh function computer ke liye ek valid move chunta hai
function getBotMove(player, trickSuit) {
    const hand = player.hand;

    // Rule 1: Agar trick ka suit hai, toh wahi suit ka patta dhoondo
    if (trickSuit) {
        const matchingSuitCard = hand.find(card => card.suit === trickSuit);
        if (matchingSuitCard) {
            console.log(`(Bot Logic: Found a matching suit card: ${matchingSuitCard.value}${matchingSuitCard.suit})`);
            return matchingSuitCard; // Wahi patta chalo
        }
    }

    // Rule 2: Agar trick ka suit nahi hai (ya tumhare paas wo suit nahi hai), toh koi bhi patta chal do
    // Hum simple rakhte hain aur pehla patta chal dete hain.
    const firstCard = hand[0];
    console.log(`(Bot Logic: No matching suit found. Playing first card: ${firstCard.value}${firstCard.suit})`);
    return firstCard;
}


// --- MAIN GAME LOOP ---
async function playGame() {
    console.log("<<<<< Welcome to Royal Flushdown! >>>>>\n");

    // 2. Game ko setup karo
    const playerNames = ['Amit', 'Priya', 'Rahul'];
    const game = new RoyalFlushdownGame(playerNames);
    game.startGame(); // Cards phento aur baanto

    // 3. Game ko tab tak chalao jab tak haath mein patte hain
    const totalTricks = game.players[0].hand.length;
    for (let i = 0; i < totalTricks; i++) {
        console.log(`\n--- Starting Trick #${i + 1} ---`);
        
        // Har player ki baari aayegi is loop mein
        for (let j = 0; j < playerNames.length; j++) {
            const currentPlayerIndex = game.currentPlayerIndex;
            const currentPlayer = game.players[currentPlayerIndex];

            console.log(`\nIt's ${currentPlayer.name}'s turn.`);
            
            // Bot se uski move pucho
            const cardToPlay = getBotMove(currentPlayer, game.trickSuit);
            
            // Game engine ko batao ki yeh card khela gaya
            game.playCard(currentPlayerIndex, cardToPlay);
            
            // Thoda sa delay daalo taaki hum output aaram se padh sakein
            await delay(1500); // 1.5 seconds ka pause
        }
    }

    // 4. Game ke ant mein Winner ghoshit karo
    console.log("\n--- GAME OVER ---");
    
    let winner = { name: '', tricksWon: -1 };
    for (const playerIndex in game.players) {
        const player = game.players[playerIndex];
        console.log(`${player.name} won ${player.tricksWon} tricks.`);
        if (player.tricksWon > winner.tricksWon) {
            winner = player;
        }
    }

    // Note: Abhi tie (barabari) handle nahi kiya hai.
    console.log(`\n🎉 The winner is ${winner.name} with ${winner.tricksWon} tricks won! 🎉`);
}

// 5. Game ko shuru karo!
playGame();