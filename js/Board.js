import { BOARD_SIZE, INITIAL_BOARD, LANDSCAPE, BORDER_TILES, BORDER_RULES, CORNERS } from './config.js';
import { getTileSide, canPlaceTileNextTo } from './TileUtils.js';

export class Board {
    constructor() {
        console.log('Initializing Board...');
        try {
            this.initializeBoard();
        } catch (error) {
            console.error('Error creating board:', error);
            throw error;
        }
    }

    initializeBoard() {
        // Очищаємо попередню дошку, якщо вона існує
        const gameBoard = document.getElementById('gameBoard');
        if (gameBoard) {
            gameBoard.innerHTML = '';
        }

        // Створюємо нову пусту дошку
        this.cells = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        
        // Створюємо елементи дошки
        this.createBoard();
        
        // Ініціалізуємо границі
        this.initializeBorders();
        
        console.log('Board created successfully');
    }

    // Рандомне розміщення тайлів на границі
    initializeBorders() {
        // Створюємо масиви доступних позицій для кожної сторони (без кутів)
        const topPositions = Array.from({length: BOARD_SIZE-2}, (_, i) => [0, i+1]);
        const rightPositions = Array.from({length: BOARD_SIZE-2}, (_, i) => [i+1, BOARD_SIZE-1]);
        const bottomPositions = Array.from({length: BOARD_SIZE-2}, (_, i) => [BOARD_SIZE-1, i+1]);
        const leftPositions = Array.from({length: BOARD_SIZE-2}, (_, i) => [i+1, 0]);

        // Функція для випадкового вибору позицій
        const getRandomPositions = (positions, count) => {
            const shuffled = [...positions].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        };

        // Розміщуємо міста (по одному на кожній стороні)
        const placeCities = () => {
            // Для кожної сторони вибираємо одну випадкову позицію для міста
            const topCity = getRandomPositions(topPositions, 1)[0];
            const rightCity = getRandomPositions(rightPositions, 1)[0];
            const bottomCity = getRandomPositions(bottomPositions, 1)[0];
            const leftCity = getRandomPositions(leftPositions, 1)[0];

            // Розміщуємо міста, вибираючи випадковий тайл з відповідного набору
            this.placeTile(topCity[0], topCity[1], 
                BORDER_TILES.top[Math.floor(Math.random() * BORDER_TILES.top.length)], 0);
            this.placeTile(rightCity[0], rightCity[1], 
                BORDER_TILES.right[Math.floor(Math.random() * BORDER_TILES.right.length)], 90);
            this.placeTile(bottomCity[0], bottomCity[1], 
                BORDER_TILES.bottom[Math.floor(Math.random() * BORDER_TILES.bottom.length)], 180);
            this.placeTile(leftCity[0], leftCity[1], 
                BORDER_TILES.left[Math.floor(Math.random() * BORDER_TILES.left.length)], 270);

            // Видаляємо використані позиції
            [topCity, rightCity, bottomCity, leftCity].forEach(pos => {
                const arrays = [topPositions, rightPositions, bottomPositions, leftPositions];
                arrays.forEach(arr => {
                    const index = arr.findIndex(p => p[0] === pos[0] && p[1] === pos[1]);
                    if (index !== -1) arr.splice(index, 1);
                });
            });
        };

        // Розміщуємо дороги (по дві на кожній стороні)
        const placeRoads = () => {
            // Для кожної сторони вибираємо дві випадкові позиції для доріг
            const topRoads = getRandomPositions(topPositions, 2);
            const rightRoads = getRandomPositions(rightPositions, 2);
            const bottomRoads = getRandomPositions(bottomPositions, 2);
            const leftRoads = getRandomPositions(leftPositions, 2);

            // Розміщуємо дороги
            topRoads.forEach(pos => {
                this.placeTile(pos[0], pos[1], 'FRRF', 0);
            });
            rightRoads.forEach(pos => {
                this.placeTile(pos[0], pos[1], 'FRRF', 90);
            });
            bottomRoads.forEach(pos => {
                this.placeTile(pos[0], pos[1], 'FRRF', 180);
            });
            leftRoads.forEach(pos => {
                this.placeTile(pos[0], pos[1], 'FRRF', 270);
            });
        };

        // Розміщуємо кути (завжди поля)
        CORNERS.forEach(([row, col]) => {
            this.placeTile(row, col, 'FFRF', 0);
        });

        // Виконуємо розміщення
        placeCities();
        placeRoads();
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
                
                // Додаємо контейнер для тайлу
                const tileContainer = document.createElement('div');
                tileContainer.className = 'tile-container';
                cell.appendChild(tileContainer);
                
                gameBoard.appendChild(cell);
            }
        }
        console.log('Board elements created');
    }

    isEmptyCell(row, col) {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && this.cells[row][col] === null;
    }

    placeTile(row, col, type, rotation = 0) {
        console.log('Placing tile:', { row, col, type, rotation });
        
        if (this.isEmptyCell(row, col)) {
            // Отримуємо тип тайлу
            let tileType;
            if (typeof type === 'string') {
                tileType = type;
            } else if (type && typeof type === 'object' && type.type) {
                tileType = type.type;
            } else {
                console.error('Invalid tile type:', type);
                return false;
            }
            
            console.log('Using tile type:', tileType);
            
            // Нормалізуємо поворот
            const normalizedRotation = Number(rotation) || 0;
            
            // Створюємо тайл
            this.cells[row][col] = {
                type: tileType,
                rotation: normalizedRotation,
                owner: null
            };
            
            // Оновлюємо відображення
            this.updateCell(row, col);
            return true;
        }
        return false;
    }

    updateCell(row, col) {
        console.log('=== Starting updateCell ===');
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        console.log('Found cell:', cell);
        
        const tile = this.cells[row][col];
        console.log('Tile data:', tile);
        
        if (cell && tile && tile.type) {
            let tileContainer = cell.querySelector('.tile-container');
            
            if (!tileContainer) {
                console.warn('Tile container not found, creating a new one');
                tileContainer = document.createElement('div');
                tileContainer.classList.add('tile-container');
                cell.appendChild(tileContainer);
            }

            console.log('Tile container:', tileContainer);

            // Очищаємо попередні інлайнові стилі
            tileContainer.style.cssText = '';
            
            // Застосовуємо інлайнові стилі
            tileContainer.style.backgroundImage = `url('assets/tiles/${tile.type}.svg')`;
            tileContainer.style.backgroundSize = '100% 100%';
            tileContainer.style.backgroundPosition = 'center';
            tileContainer.style.backgroundRepeat = 'no-repeat';
            tileContainer.style.width = '100%';
            tileContainer.style.height = '100%';
            tileContainer.style.transform = `rotate(${tile.rotation || 0}deg)`;
            tileContainer.style.opacity = '1';
            tileContainer.style.visibility = 'visible';

            console.log('Inline styles applied:', tileContainer.style.cssText);

            cell.classList.add('has-tile');

            if (tile.owner) {
                cell.classList.add(tile.owner === 1 ? 'player1' : 'player2');
            }
        } else {
            console.error('Invalid cell or tile:', { cell, tile });
        }
        console.log('=== Finished updateCell ===');
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

    isValidPlacement(row, col, tileType, rotation) {
        console.log(`Checking placement at (${row}, ${col}) for tile ${tileType} with rotation ${rotation}`);
        
        // Перевірка чи клітинка порожня
        if (!this.isEmptyCell(row, col)) {
            console.log('Cell is not empty');
            return false;
        }

        // Перевірка чи є це першим ходом
        if (this.isEmpty()) {
            console.log('First move, placement is valid');
            return true;
        }

        // Перевірка сусідніх клітинок
        const adjacentCells = [
            { row: row - 1, col: col, direction: 'top' },    // Верхня
            { row: row, col: col + 1, direction: 'right' },  // Права
            { row: row + 1, col: col, direction: 'bottom' }, // Нижня
            { row: row, col: col - 1, direction: 'left' }    // Ліва
        ];

        let hasAdjacentTile = false;

        for (let cell of adjacentCells) {
            if (this.isValidCell(cell.row, cell.col)) {
                const adjacentTile = this.cells[cell.row][cell.col];
                if (adjacentTile) {
                    hasAdjacentTile = true;
                    const isCompatible = canPlaceTileNextTo(tileType, rotation, adjacentTile.type, adjacentTile.rotation, cell.direction);
                    console.log(`Checking adjacent tile at (${cell.row}, ${cell.col}): ${adjacentTile.type} with rotation ${adjacentTile.rotation}`);
                    console.log(`Compatibility check with ${cell.direction} tile: ${isCompatible}`);
                    if (!isCompatible) {
                        console.log('Adjacent tile is not compatible');
                        return false;
                    }
                }
            }
        }

        console.log(`Has adjacent tile: ${hasAdjacentTile}`);
        
        if (!hasAdjacentTile) {
            console.log('No adjacent tiles found');
            return false;
        }

        console.log('Placement is valid');
        return true;
    }

    calculatePoints(row, col) {
        // Спрощена версія підрахунку очок - повертаємо 1 очко за кожну плитку
        return 1;
    }
}