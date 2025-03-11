export default class Game {
    constructor(players, elements) {
        this.players = players;
        this.boxContainer = elements.boxContainer;
        this.result = elements.result;
        this.resetBtn = elements.reset;
        this.board = Array(9).fill(null); //Using Array
        this.currentPlayer = this.players.p1;
        this.gameOver = false;

    }

    init() {
        this.boxes = this.boxContainer.querySelectorAll(".box");
        this.boxes.forEach((box, index) => {

            box.addEventListener("click", () => { this.movement(index, box) });
        });

        this.resetBtn.addEventListener("click", () => this.resetGame());
    }

    movement(index, box) {
        // console.log(this.board[index]);
        if (this.board[index] || this.gameOver) return;

        this.board[index] = this.currentPlayer.Symbol;
        box.textContent = this.currentPlayer.Symbol;

        if (this.checkWinner()) {
            this.updateScore();
            this.gameOver = true;
            return;
        }

        this.currentPlayer = this.currentPlayer === this.players.p1 ? this.players.p2 : this.players.p1;
        console.log(this.currentPlayer);
    }

    checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            // console.log(this.board[a] && this.board[a])
            // console.log(this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]);
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.result.style.display = "block";
                this.result.textContent = `${this.currentPlayer.Symbol} wins!`
                // alert(`${this.currentPlayer.Symbol} wins!`);
                return true;
            }
        }

        return this.isDraw();
    }

    isDraw() {
        if (this.board.every(cell => cell)) {
            this.result.style.display = "block";
            this.result.textContent = `It's Draw `
        }
        return false;
    }


    updateScore() {
        if (this.currentPlayer.Symbol === "X") {
            this.players.p1.scoreContainer.textContent = parseInt(this.players.p1.scoreContainer.textContent) + 1;
            // console.log(this.players.p1.scoreContainer);
            // console.log(this.players.p2.scoreContainer);
        } else {
            this.players.p2.scoreContainer.textContent = parseInt(this.players.p2.scoreContainer.textContent) + 1;
            // console.log(this.players.p1.scoreContainer);
            // console.log(this.players.p2.scoreContainer);
        }
    }

    resetGame() {
        this.board.fill(null);
        this.boxes.forEach(box => (box.textContent = ""));
        this.currentPlayer = this.players.p1;
        this.gameOver = false;
        this.result.style.display = "none";

    }
}
