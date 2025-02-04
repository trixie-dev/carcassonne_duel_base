import { BOARD_SIZE, INITIAL_BOARD, LANDSCAPE } from './config.js';

export class Board {
    constructor() {
        console.log('Initializing Board...');
        try {
            this.cells = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
            this.createBoard();
            console.log('Board created successfully');
        } catch (error) {
            console.error('Error creating board:', error);
            throw error;
        }
    }

    createBoard() {
        console.log('Creating board elements...');
        const gameBoard = document.getElementById('gameBoard');
        if (!gameBoard) {
            throw new Error('Game board element not found');
        }

        gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 70px)`;
        gameBoard.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 70px)`;

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // Встановлюємо початкові плитки з INITIAL_BOARD
                if (INITIAL_BOARD[row][col]) {
                    this.cells[row][col] = {
                        edges: INITIAL_BOARD[row][col],
                        rotation: 0,
                        owner: null
                    };
                    cell.classList.add('border-tile');
                    this.updateCell(row, col);
                }
                
                gameBoard.appendChild(cell);
            }
        }
        console.log('Board elements created');
    }

    isEmptyCell(row, col) {
        return this.cells[row][col] === null;
    }

    placeTile(row, col, tile, player) {
        console.log(`Placing tile at ${row}, ${col}`);
        if (this.isEmptyCell(row, col)) {
            this.cells[row][col] = {
                edges: tile.type,
                rotation: tile.rotation,
                owner: player
            };
            this.updateCell(row, col);
            return true;
        }
        return false;
    }

    updateCell(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const tile = this.cells[row][col];
        
        if (cell && tile) {
            cell.classList.add('has-tile');
            cell.style.backgroundImage = `url(assets/tiles/${tile.edges}.svg)`;
            cell.style.transform = `rotate(${tile.rotation}deg)`;
            if (tile.owner) {
                cell.classList.add(tile.owner === 1 ? 'player1' : 'player2');
            }
        }
    }

    getValidPlacements(tile) {
        const validPlacements = [];
        
        for (let row = 1; row < BOARD_SIZE - 1; row++) {
            for (let col = 1; col < BOARD_SIZE - 1; col++) {
                if (this.isEmptyCell(row, col)) {
                    // Перевіряємо всі можливі повороти
                    for (let rotation = 0; rotation < 360; rotation += 90) {
                        if (this.isValidPlacement(row, col, tile.type, rotation)) {
                            validPlacements.push({
                                row: row,
                                col: col,
                                rotation: rotation
                            });
                        }
                    }
                }
            }
        }
        
        return validPlacements;
    }

    isValidPlacement(row, col, edges, rotation) {
        // Спрощена перевірка - просто перевіряємо наявність сусідніх плиток
        const directions = [[-1,0], [0,1], [1,0], [0,-1]];
        return directions.some(([dx, dy]) => {
            const newRow = row + dx;
            const newCol = col + dy;
            return this.isValidPosition(newRow, newCol) && this.cells[newRow][newCol] !== null;
        });
    }

    isValidPosition(row, col) {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
    }

    calculatePoints(row, col) {
        // Спрощена версія підрахунку очок - повертаємо 1 очко за кожну плитку
        return 1;
    }
}