import { JOKERS_PER_PLAYER } from './config.js';

export class ScoreBoard {
    constructor() {
        console.log('Initializing ScoreBoard...');
        this.currentPlayer = 1;
        this.scores = [0, 0]; // Змінюємо на масив
        this.jokers = [2, 2]; // Змінюємо на масив
        this.updateDisplay();
        console.log('ScoreBoard initialized');
    }

    updateDisplay() {
        console.log('Updating score display...');
        const player1Score = document.getElementById('player1Score');
        const player2Score = document.getElementById('player2Score');
        const currentPlayerElement = document.getElementById('currentPlayer');
        
        if (player1Score) player1Score.textContent = this.scores[0];
        if (player2Score) player2Score.textContent = this.scores[1];
        if (currentPlayerElement) currentPlayerElement.textContent = `Гравець ${this.currentPlayer}`;
        
        console.log('Current scores:', this.scores);
    }

    switchPlayer() {
        console.log('Switching player...');
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updateDisplay();
    }

    addPoints(points) {
        console.log(`Adding ${points} points to player ${this.currentPlayer}`);
        const playerIndex = this.currentPlayer - 1;
        this.scores[playerIndex] += points;
        console.log(`New score for player ${this.currentPlayer}:`, this.scores[playerIndex]);
        this.updateDisplay();
    }

    useJoker() {
        console.log(`Player ${this.currentPlayer} using joker`);
        const playerIndex = this.currentPlayer - 1;
        if (this.jokers[playerIndex] > 0) {
            this.jokers[playerIndex]--;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    hasJokers() {
        return this.jokers[this.currentPlayer - 1] > 0;
    }

    reset() {
        console.log('Resetting score board...');
        this.currentPlayer = 1;
        this.scores = [0, 0];
        this.jokers = [2, 2];
        this.updateDisplay();
    }
} 