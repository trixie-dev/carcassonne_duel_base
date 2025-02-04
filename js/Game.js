import { Board } from './Board.js';
import { TileStack } from './TileStack.js';
import { ScoreBoard } from './ScoreBoard.js';

export class Game {
    constructor() {
        console.log('Creating game components...');
        
        try {
            this.board = new Board();
            console.log('Board created');
            
            this.tileStack = new TileStack();
            console.log('TileStack created');
            
            this.scoreBoard = new ScoreBoard();
            console.log('ScoreBoard created');
            
            this.initializeGame();
            this.bindEvents();
            
            console.log('Game initialization complete');
        } catch (error) {
            console.error('Error in Game constructor:', error);
            throw error;
        }
    }

    initializeGame() {
        console.log('Initializing game...');
        this.tileStack.drawNextTile();
    }

    bindEvents() {
        console.log('Binding events...');
        
        // Обробник для клітинок
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                console.log(`Cell clicked: ${row}, ${col}`);
                this.handleCellClick(row, col);
            });
        });

        // Обробник для обертання плитки
        const currentTile = document.getElementById('currentTile');
        if (currentTile) {
            currentTile.addEventListener('click', () => {
                console.log('Rotating tile');
                this.tileStack.rotateTile();
            });
        } else {
            console.error('currentTile element not found');
        }

        // Обробник для кнопок
        const skipButton = document.getElementById('skipButton');
        const jokerButton = document.getElementById('jokerButton');
        const newGameButton = document.getElementById('newGameButton');

        if (skipButton) skipButton.addEventListener('click', () => this.skipTurn());
        if (jokerButton) jokerButton.addEventListener('click', () => this.toggleJokerMode());
        if (newGameButton) newGameButton.addEventListener('click', () => this.restartGame());
    }

    handleCellClick(row, col) {
        console.log(`Handling cell click at ${row}, ${col}`);
        // Базова логіка для тестування
        if (this.board.isEmptyCell(row, col)) {
            this.board.placeTile(row, col, this.tileStack.currentTile, this.scoreBoard.currentPlayer);
            this.tileStack.drawNextTile();
            this.scoreBoard.switchPlayer();
        }
    }

    skipTurn() {
        console.log('Skipping turn');
        this.tileStack.skipTile();
        this.scoreBoard.switchPlayer();
    }

    toggleJokerMode() {
        console.log('Toggling joker mode');
        // Базова логіка для тестування
    }

    restartGame() {
        console.log('Restarting game');
        this.board = new Board();
        this.tileStack.reset();
        this.scoreBoard.reset();
    }
}