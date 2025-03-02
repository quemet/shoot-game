import Game from "./Game.js";

window.onload = function() {
    const canvas = document.getElementById('game');
    const game = new Game(canvas);

    window.addEventListener('keydown', (event) => game.handleInput(event));
};
