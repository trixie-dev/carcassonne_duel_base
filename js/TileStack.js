import { TILE_CONFIG } from './config.js';

export class TileStack {
    constructor() {
        this.initializeTiles();
        this.currentTile = null;
        this.currentRotation = 0;
        this.drawNextTile();
        console.log('TileStack initialized');
    }

    initializeTiles() {
        console.log('Initializing tile stack...');
        this.tiles = [];
        
        // Додаємо тайли відповідно до конфігурації
        for (const [tileType, count] of Object.entries(TILE_CONFIG)) {
            for (let i = 0; i < count; i++) {
                this.tiles.push(tileType);
            }
        }
        
        // Перемішуємо тайли
        this.shuffle();
        
        console.log(`Created tile stack with ${this.tiles.length} tiles`);
    }

    shuffle() {
        for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        }
    }

    drawNextTile() {
        console.log('Drawing next tile...');
        if (this.tiles && this.tiles.length > 0) {
            const nextTileType = this.tiles.pop();
            console.log('Next tile type:', nextTileType);
            
            this.currentTile = {
                type: nextTileType,
                rotation: 0
            };
            
            // Оновлюємо відображення
            this.updateCurrentTileDisplay();
            console.log('Current tile set to:', this.currentTile);
            return this.currentTile;
        }
        return null;
    }

    updateCurrentTileDisplay() {
        console.log('Updating current tile display...');
        const tileDisplay = document.getElementById('currentTile');
        if (tileDisplay && this.currentTile) {
            console.log('Setting tile display:', this.currentTile);
            
            // Встановлюємо зображення
            const imageUrl = `assets/tiles/${this.currentTile.type}.svg`;
            tileDisplay.style.backgroundImage = `url(${imageUrl})`;
            
            // Встановлюємо поворот
            if (this.currentTile.rotation) {
                tileDisplay.style.transform = `rotate(${this.currentTile.rotation}deg)`;
            } else {
                tileDisplay.style.transform = '';
            }
            
            // Оновлюємо лічильник тайлів
            const tilesLeftElement = document.getElementById('tilesLeft');
            if (tilesLeftElement) {
                tilesLeftElement.textContent = this.tiles.length;
            }
        } else {
            console.error('Current tile display element not found or no current tile');
        }
    }

    rotateCurrentTile() {
        if (this.currentTile) {
            this.currentTile.rotation = (this.currentTile.rotation + 90) % 360;
            this.updateCurrentTileDisplay();
            console.log('Rotated tile to:', this.currentTile.rotation);
        }
    }

    skipTile() {
        console.log('Skipping current tile...');
        if (this.currentTile) {
            this.tiles.unshift(this.currentTile.type);
            return this.drawNextTile();
        }
        return null;
    }

    reset() {
        console.log('Resetting tile stack...');
        this.initializeTiles();
        this.currentTile = null;
        this.currentRotation = 0;
        return this.drawNextTile();
    }

    isEmpty() {
        return this.tiles.length === 0;
    }
} 