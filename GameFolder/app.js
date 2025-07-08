// FINAL WORKING APP.JS

import RoyalFlushdownGame from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("app.js: HTML is ready!");

    // --- 1. GAME SETUP ---
    const playerNames = ['Amit (You)', 'Priya (AI)', 'Rahul (AI)'];
    const game = new RoyalFlushdownGame(playerNames);
    
    // --- 2. GETTING HTML ELEMENTS ---
    const statusDiv = document.getElementById('game-status');
    const playersAreaDiv = document.getElementById('players-area');
    const trickPileDiv = document.getElementById('trick-pile');
    const restartButton = document.getElementById('restart-button');

    // --- 3. RENDER FUNCTION ---


    // FINAL WORKING RENDERGAME FUNCTION

function renderGame() {
    playersAreaDiv.innerHTML = '';
    trickPileDiv.innerHTML = '';
    const currentPlayerName = game.players[game.currentPlayerIndex].name;
    statusDiv.innerHTML = `<h2>Next Turn: ${currentPlayerName}</h2>`;

    // --- NAYA MAPPING LOGIC ---
    const valueNameMap = {
        'A': 'ace', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10', 'J': 'jack', 'Q': 'queen', 'K': 'king'
    };
    const suitNameMap = {
        'H': 'hearts', 'D': 'diamonds', 'C': 'clubs', 'S': 'spades'
    };

    // Har player ka area banao
    for (const playerIndex in game.players) {
        const player = game.players[playerIndex];
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-area';
        let handHTML = '';

        player.hand.forEach(card => {
            // Naye mapping se sahi image ka naam banao
            const imageName = `${valueNameMap[card.value]}_of_${suitNameMap[card.suit]}.png`;
            const imagePath = `assets/Images/PNG-cards-1.3/${imageName}`;

            const isClickable = parseInt(playerIndex) === 0 && game.currentPlayerIndex === 0;
            const clickableClass = isClickable ? 'clickable' : '';
            
            handHTML += `<div class="card ${clickableClass}" data-suit="${card.suit}" data-value="${card.value}">
                            <img src="${imagePath}" alt="${card.value} of ${card.suit}">
                         </div>`;
        });
        playerDiv.innerHTML = `<h3>${player.name}</h3><p>Tricks Won: ${player.tricksWon}</p><div class="hand">${handHTML}</div>`;
        playersAreaDiv.appendChild(playerDiv);
    }

    // Trick pile ke cards dikhao


    console.log(`Rendering trick pile. Cards in trick: ${game.trick.length}`, game.trick);


    game.trick.forEach(play => {
        const card = play.card; // Hum 'play' object se 'card' object nikalenge
        const imageName = `${valueNameMap[card.value]}_of_${suitNameMap[card.suit]}.png`;
        const imagePath = `assets/Images/PNG-cards-1.3/${imageName}`;
        
        console.log(`  - Creating image for trick pile: ${imagePath}`);
        
        trickPileDiv.innerHTML += `<div class="card played-card">
                                      <img src="${imagePath}" alt="${card.value} of ${card.suit}">
                                   </div>`;
    });

    if (game.currentPlayerIndex === 0) {
        addCardClickListeners();
    }
}





//     game.trick.forEach(play => {
//         const card = play.card;
//         const imageName = `${valueNameMap[card.value]}_of_${suitNameMap[card.suit]}.png`;
//         const imagePath = `assets/Image/PNG-cards-1.3/${imageName}`;
        
//         trickPileDiv.innerHTML += `<div class="card played-card">
//                                       <img src="${imagePath}" alt="${card.value} of ${card.suit}">
//                                    </div>`;
//     });

//     if (game.currentPlayerIndex === 0) {
//         addCardClickListeners();
//     }
// }


    // function renderGame() {
    //     playersAreaDiv.innerHTML = '';
    //     trickPileDiv.innerHTML = '';
    //     const currentPlayerName = game.players[game.currentPlayerIndex].name;
    //     statusDiv.innerHTML = `<h2>Next Turn: ${currentPlayerName}</h2>`;

    //     for (const playerIndex in game.players) {
    //         const player = game.players[playerIndex];
    //         const playerDiv = document.createElement('div');
    //         playerDiv.className = 'player-area';
    //         let handHTML = '';
    //         player.hand.forEach(card => {
    //             const isClickable = parseInt(playerIndex) === 0 && game.currentPlayerIndex === 0;
    //             const clickableClass = isClickable ? 'clickable' : '';
                
    //             // IMPORTANT: Check your image names. This assumes 10H.png, not TH.png
    //             const imageName = `${card.value}${card.suit}.png`; 
    //             const imagePath = `assets/PNG-cards-1.3/${imageName}`;

    //             handHTML += `<div class="card ${clickableClass}" data-suit="${card.suit}" data-value="${card.value}">
    //             <img src="${imagePath}" alt="${card.value} of ${card.suit}">
    //          </div>`;
    //         });
    //         playerDiv.innerHTML = `<h3>${player.name}</h3><p>Tricks Won: ${player.tricksWon}</p><div class="hand">${handHTML}</div>`;
    //         playersAreaDiv.appendChild(playerDiv);
    //     }

    //     game.trick.forEach(play => {
    //         const imageName = `${play.card.value}${play.card.suit}.png`;
    //         const imagePath = `assets/PNG-cards-1.3/${imageName}`;
    //         trickPileDiv.innerHTML += `<div class="card played-card">
    //                                       <img src="${imagePath}" alt="${play.card.value} of ${play.card.suit}">
    //                                    </div>`;
    //     });

    //     if (game.currentPlayerIndex === 0) {
    //         addCardClickListeners();
    //     }
    // }

    // --- 4. EVENT HANDLING & AI LOGIC ---
    function getComputerMove(player, trickSuit) {
        const hand = player.hand;
        if (trickSuit) {
            const matchingSuitCard = hand.find(card => card.suit === trickSuit);
            if (matchingSuitCard) return matchingSuitCard;
        }
        return hand[0]; 
    }

    function addCardClickListeners() {
        const clickableCards = document.querySelectorAll('.card.clickable');
        clickableCards.forEach(cardElement => {
            cardElement.removeEventListener('click', handleHumanTurn);
            cardElement.addEventListener('click', handleHumanTurn);
        });
    }
    
    function handleHumanTurn(event) {
        const cardDiv = event.target.closest('.card');
        if (!cardDiv) return;
        const suit = cardDiv.dataset.suit;
        const value = cardDiv.dataset.value;
        const cardToPlay = { suit, value };
        
        // Human ki chaal ke liye master function ko call karo
        processGameTurn(cardToPlay);
    }
    
    // YEH NAYA MASTER FUNCTION HAI
    function processGameTurn(cardPlayed = null) {
        const currentPlayerIndex = game.currentPlayerIndex;
        let cardToPlay = cardPlayed;

        // Agar turn AI ka hai, toh uski chaal decide karo
        if (currentPlayerIndex > 0) {
            const currentPlayer = game.players[currentPlayerIndex];
            cardToPlay = getComputerMove(currentPlayer, game.trickSuit);
        }

        if (!cardToPlay) return;

        // Card ko play karo
        game.playCard(currentPlayerIndex, cardToPlay);
        renderGame(); // Screen update karo

        // Check karo ki trick poori hui ya nahi
        const isTrickComplete = game.trick.length === Object.keys(game.players).length;

        if (isTrickComplete) {
            // Trick poori hone ke baad thoda ruko
            setTimeout(() => {
                alert(`${game.players[game.trickWinner].name} wins the trick!`);
                game.startNewTrick(); // Board saaf karo
                renderGame(); // Saaf board dikhao

                if (!checkGameOver()) {
                    // Agli trick shuru karo
                    setTimeout(() => processGameTurn(), 1000); 
                }
            }, 1500);
        } else if (game.currentPlayerIndex > 0) {
            // Agar trick chal rahi hai aur agla turn AI ka hai
            setTimeout(() => processGameTurn(), 1500);
        }
    }

    function checkGameOver() {
        if (game.players[0].hand.length === 0) {
            let winner = { name: '', tricksWon: -1 };
            for (const i in game.players) {
                if (game.players[i].tricksWon > winner.tricksWon) {
                    winner = game.players[i];
                }
            }
            setTimeout(() => alert(`GAME OVER! Winner is ${winner.name}`), 500);
            restartButton.style.display = 'block';
            return true;
        }
        return false;
    }

    // --- 5. START AND RESTART LOGIC ---
    function startNewGame() {
        game.resetGame();
        renderGame();
        restartButton.style.display = 'none';

        // Pehla turn shuru karo
        processGameTurn();
    }

    restartButton.addEventListener('click', startNewGame);

    startNewGame();

});