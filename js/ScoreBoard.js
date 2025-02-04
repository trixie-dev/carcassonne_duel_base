import { JOKERS_PER_PLAYER } from './config.js';

export class ScoreBoard {
    constructor() {
        console.log('Initializing ScoreBoard...');
        this.currentPlayer = 1;
        this.scores = { 1: 0, 2: 0 };
        this.jokers = { 1: 2, 2: 2 }; // Кожен гравець починає з 2 джокерами
        this.updateDisplay();
        console.log('ScoreBoard initialized');
    }

    updateDisplay() {
        console.log('Updating score display...');
        try {
            // Оновлюємо поточного гравця
            document.getElementById('currentPlayer').textContent = `Гравець ${this.currentPlayer}`;
            
            // Оновлюємо рахунок
            document.getElementById('player1Score').textContent = this.scores[1];
            document.getElementById('player2Score').textContent = this.scores[2];
            
            // Оновлюємо джокери
            document.getElementById('player1Jokers').textContent = '🃏'.repeat(this.jokers[1]);
            document.getElementById('player2Jokers').textContent = '🃏'.repeat(this.jokers[2]);
        } catch (error) {
            console.error('Error updating score display:', error);
        }
    }

    switchPlayer() {
        console.log('Switching player...');
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.updateDisplay();
    }

    addPoints(player, points) {
        console.log(`Adding ${points} points to player ${player}`);
        this.scores[player] += points;
        this.updateDisplay();
    }

    useJoker() {
        console.log(`Player ${this.currentPlayer} using joker`);
        if (this.jokers[this.currentPlayer] > 0) {
            this.jokers[this.currentPlayer]--;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    hasJokers() {
        return this.jokers[this.currentPlayer] > 0;
    }

    reset() {
        console.log('Resetting score board...');
        this.currentPlayer = 1;
        this.scores = { 1: 0, 2: 0 };
        this.jokers = { 1: 2, 2: 2 };
        this.updateDisplay();
    }
} 