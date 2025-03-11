import Game from "./Game.js"

let game = new Game(
    {
        p1:{
            Symbol:"X",
            scoreContainer:document.getElementById("player-x_score")
        },
        p2:{
            Symbol:"O",
            scoreContainer:document.getElementById("player-o_score")
        },
    },
    {
        boxContainer: document.querySelector(".game-box"),
        result: document.getElementById("result"),
        reset: document.getElementById("resetBTN"), 
    }
);

game.init();

