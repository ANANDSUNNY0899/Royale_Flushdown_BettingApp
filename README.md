# Royal Flushdown - A Classic Card Game in the Browser

This project is a from-scratch implementation of the classic trick-taking card game, "Royal Flushdown," built with modern, vanilla JavaScript. It's a testament to what can be accomplished with core web technologies: HTML, CSS, and pure JavaScript.

The game is fully interactive, featuring smart AI opponents, a polished user interface, and a complete gameplay loop.

 


## My Journey with This Project

This project started as an exercise to deepen my understanding of JavaScript's core concepts. The goal was to build more than just a simple webpage; I wanted to create a fully functional, stateful application. The journey involved:

-   **Object-Oriented Design:** I designed and built a `RoyalFlushdownGame` class from the ground up to manage the game's state, including the deck, players, hands, and game rules.
-   **DOM Mastery:** Instead of using a framework, I focused on mastering the Document Object Model (DOM). The entire user interface is rendered dynamically by manipulating HTML elements directly with JavaScript.
-   **Complex Logic and AI:** I developed the logic for the game's rules, trick-winning conditions, and built computer-controlled (AI) opponents that can follow suit and play strategically.
-   **Event-Driven Programming:** The game is highly interactive, relying on event listeners to handle player input and drive the game forward.
-   **Intensive Debugging:** A significant part of the process was debugging complex issues, from asynchronous timing problems (`setTimeout`) to visual rendering bugs and logical errors. This was a fantastic learning experience!

---

## Key Features

-   **Interactive UI:** Play cards simply by clicking on them. The interface provides clear feedback on whose turn it is.
-   **Intelligent AI Opponents:** Challenge yourself against two AI players who understand and follow the game's rules.
-   **Polished Gameplay Experience:** The game flow is designed to feel natural, with strategic pauses that allow the player to follow the action.
-   **Complete Game Loop:** The game handles everything from shuffling and dealing to scoring tricks and declaring a final winner.
-   **"Play Again" Functionality:** Once a game is over, you can instantly start a new one without refreshing the page.

---

## How to Run This Project

This project uses ES6 Modules, which require a local server to run due to browser security (CORS) policies.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```

2.  **Navigate into the project folder:**
    ```bash
    cd YOUR_REPOSITORY_NAME
    ```

3.  **Launch a local server.** The easiest method is with the **Live Server** extension in VS Code.
    -   Install the "Live Server" extension.
    -   In VS Code, right-click the `index.html` file.
    -   Select "Open with Live Server".

The game will automatically open in your browser, ready to play.

---

## Technologies Used

-   **HTML5:** For the structure of the game board.
-   **CSS3:** For all styling, layout, and a responsive design.
-   **Vanilla JavaScript (ES6+):** For all game logic, state management, AI, and DOM manipulation. No external libraries or frameworks were used.

---

## Future Goals

I'm proud of where the project is, but there's always room to grow. Here are some features I'm considering for the future:

-   [ ] **Enhanced AI:** Making the AI opponents even smarter, perhaps by having them choose which high or low card to play strategically.
-   [ ] **Visual Feedback:** Replacing `alert()` pop-ups with custom, on-screen messages for a more seamless experience.
-   [ ] **Scoring and Rounds:** Adding a scoring system to play multiple rounds until a target score is reached.
