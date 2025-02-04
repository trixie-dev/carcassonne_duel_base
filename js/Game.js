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
                this.handleCurrentTileClick();
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
        console.log('Cell click handled at', row, col);
        
        if (this.tileStack.currentTile) {
            const currentTile = this.tileStack.currentTile;
            console.log('Current tile:', currentTile);
            
            // Отримуємо тип тайлу як рядок
            const tileType = currentTile.type;
            const rotation = currentTile.rotation || 0;
            
            if (this.board.isValidPlacement(row, col, tileType, rotation)) {
                // Розміщуємо тайл
                const success = this.board.placeTile(row, col, tileType, rotation);
                
                if (success) {
                    // Оновлюємо стан гри
                    this.scoreBoard.switchPlayer();
                    this.tileStack.drawNextTile();
                }
                return success;
            }
        }
        return false;
    }

    handleCurrentTileClick() {
        console.log('Current tile clicked');
        if (this.tileStack.currentTile) {
            this.tileStack.currentTile.rotation = (this.tileStack.currentTile.rotation + 90) % 360;
            console.log('Rotated tile to:', this.tileStack.currentTile.rotation);
            this.tileStack.updateCurrentTileDisplay();
        } else {
            console.warn('No current tile to rotate');
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
        
        // Перевірка стану гри після перезапуску
        console.log('Game state after restart:', {
            board: this.board,
            tileStack: this.tileStack,
            scoreBoard: this.scoreBoard
        });
        
        // Повторно прив'язуємо обробники подій
        this.bindEvents();
    }
}