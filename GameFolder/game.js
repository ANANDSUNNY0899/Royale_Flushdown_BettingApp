class RoyalFlushdownGame {
    constructor(playerNames) {
        // Player setup
        this.players = {};
        playerNames.forEach((name, index) => {
            this.players[index] = { name: name, hand: [], tricksWon: 0 };
        });

        // Game state
        this.deck = this._createDeck();
        this.currentPlayerIndex = 0;
        this.trick = []; // Cards played in the current trick
        this.trickSuit = null; // The suit that must be followed
        this.trickWinner = null;
    }


    // --- Private Helper Methods (Internal Logic) ---

    _createDeck() {
        const suits = ['H', 'D', 'C', 'S']; // Hearts, Diamonds, Clubs, Spades
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        return deck;
    }


    _shuffleDeck() {
        // Fisher-Yates shuffle algorithm for true randomness
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    // --- Public Game Methods (Actions) ---

    startGame() {
        this._shuffleDeck();
        this._dealCards();
        console.log("--- Game Started ---");
        this.logGameState();
    }

    _dealCards() {
        const numPlayers = Object.keys(this.players).length;
        // Deal 5 cards to each player
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < numPlayers; j++) {
                this.players[j].hand.push(this.deck.pop());
            }
        }
    }

playCard(playerIndex, card) {
    // 1. Basic Turn Validation
    if (playerIndex !== this.currentPlayerIndex) {
        console.error(`Error: It's not Player ${playerIndex}'s turn.`);
        return;
    }

    const playerHand = this.players[playerIndex].hand;

    // 2. Card in Hand Validation (Kya player ke paas yeh card hai?)
    const cardInHand = playerHand.find(c => c.suit === card.suit && c.value === card.value);
    if (!cardInHand) {
        console.error(`Error: Player does not have the card ${card.value}${card.suit} in their hand.`);
        return;
    }

    // 3. "Follow Suit" Rule Validation (Sabse important check)
    // Yeh check tabhi kaam karega jab yeh trick ka pehla patta NAHI hai.
    if (this.trickSuit) { 
        const hasTrickSuit = playerHand.some(c => c.suit === this.trickSuit);

        // Agar player ke paas trick ka suit HAI, lekin woh alag suit chal raha hai...
        if (hasTrickSuit && card.suit !== this.trickSuit) {
            console.error(`Error: Invalid move. You must follow the suit '${this.trickSuit}'.`);
            return; // Move ko roko
        }
    }

    // --- Agar saare checks pass ho gaye, tabhi aage badho ---

    // Add card to the trick
    this.trick.push({ playerIndex, card });

    // Remove card from player's hand
    this.players[playerIndex].hand = this.players[playerIndex].hand.filter(
        c => !(c.suit === card.suit && c.value === card.value)
    );
    
    // If this is the first card of the trick, set the suit
    if (this.trick.length === 1) {
        this.trickSuit = card.suit;
    }
    
    console.log(`${this.players[playerIndex].name} played ${card.value} of ${card.suit}`);
    
    // Move to the next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % Object.keys(this.players).length;

    // If trick is complete (all players have played)
    if (this.trick.length === Object.keys(this.players).length) {
        this._endTrick();
    }
}
    
    _endTrick() {
        console.log("--- Trick Over ---");
        // Find the winner of the trick
        let winningPlay = this.trick[0];
        for(let i = 1; i < this.trick.length; i++) {
            const currentPlay = this.trick[i];
            // Rule: Winner must have followed the trick's suit
            if (currentPlay.card.suit === this.trickSuit) {
                // If the current card is higher than the winning card
                if (this._getCardValue(currentPlay.card.value) > this._getCardValue(winningPlay.card.value)) {
                    winningPlay = currentPlay;
                }
            }
        }

        this.trickWinner = winningPlay.playerIndex;
        this.players[this.trickWinner].tricksWon++;
        
        console.log(`${this.players[this.trickWinner].name} wins the trick!`);

        // // Reset for the next trick
        // this.trick = [];
        // this.trickSuit = null;
        // this.currentPlayerIndex = this.trickWinner; // Winner starts the next trick
        
        // this.logGameState();
    }


    // src/game.js - YEH NAYA FUNCTION JODIYE

// ... (upgraded _endTrick function ke baad) ...

startNewTrick() {
    console.log("--- Preparing for New Trick ---");
    // Reset for the next trick
    this.trick = [];
    this.trickSuit = null;
    // Winner starts the next trick
    this.currentPlayerIndex = this.trickWinner; 
    this.trickWinner = null; // trick winner ko bhi reset kar do
}


    
    // Helper to compare card ranks
    _getCardValue(value) {
        const ranks = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':11, 'Q':12, 'K':13, 'A':14};
        return ranks[value];
    }
    
    logGameState() {
        console.log("Current Game State:");
        console.log(JSON.stringify(this.players, null, 2)); // Pretty print the state
        console.log(`Next turn: ${this.players[this.currentPlayerIndex].name}`);
        console.log('--------------------');
    }

    resetGame() {
        console.log("--- Resetting Game ---");
        // Sabhi players ke jeete hue tricks ko 0 kar do
        for (const playerIndex in this.players) {
            this.players[playerIndex].tricksWon = 0;
        }

        // Ek nayi gaddi (deck) banao
        this.deck = this._createDeck();
        
        // Game state ko shuruwati haalath mein le aao
        this.currentPlayerIndex = 0;
        this.trick = [];
        this.trickSuit = null;
        this.trickWinner = null;
        
        // Naye game ke liye patte phento aur baanto
        this.startGame();
    }
}


// This line makes the class available to other files
export default RoyalFlushdownGame;
