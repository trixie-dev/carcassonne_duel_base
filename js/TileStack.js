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
        const currentTileElement = document.getElementById('currentTile');
        if (currentTileElement && this.currentTile) {
            currentTileElement.style.backgroundImage = `url('assets/tiles/${this.currentTile.type}.svg')`;
            currentTileElement.style.transform = `rotate(${this.currentTile.rotation}deg)`;
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