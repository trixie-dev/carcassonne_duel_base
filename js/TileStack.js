import { TILE_CONFIG } from './config.js';

export class TileStack {
    constructor() {
        console.log('Initializing TileStack...');
        this.currentTile = null;
        this.tiles = this.initializeTiles();
        this.drawNextTile();
        console.log('TileStack initialized');
    }

    initializeTiles() {
        console.log('Creating initial tiles...');
        let tiles = [];
        // Генеруємо тайли відповідно до конфігурації
        for (const [type, count] of Object.entries(TILE_CONFIG)) {
            for (let i = 0; i < count; i++) {
                tiles.push({ type, rotation: 0 });
            }
        }
        // Перемішуємо тайли
        return tiles.sort(() => Math.random() - 0.5);
    }

    drawNextTile() {
        console.log('Drawing next tile...');
        if (this.tiles.length === 0) {
            console.log('No more tiles available');
            return false;
        }

        this.currentTile = this.tiles.pop();
        this.updateCurrentTileDisplay();
        console.log('Drew tile:', this.currentTile);
        return true;
    }

    updateCurrentTileDisplay() {
        console.log('Updating current tile display...');
        const currentTileElement = document.getElementById('currentTile');
        const tilesLeftElement = document.getElementById('tilesLeft');
        
        if (currentTileElement && this.currentTile) {
            currentTileElement.style.backgroundImage = `url(assets/tiles/${this.currentTile.type}.svg)`;
            currentTileElement.style.transform = `rotate(${this.currentTile.rotation}deg)`;
        } else {
            console.error('Current tile element not found or no current tile');
        }

        if (tilesLeftElement) {
            tilesLeftElement.textContent = this.tiles.length;
        }
    }

    rotateTile() {
        console.log('Rotating current tile...');
        if (this.currentTile) {
            this.currentTile.rotation = (this.currentTile.rotation + 90) % 360;
            this.updateCurrentTileDisplay();
        }
    }

    skipTile() {
        console.log('Skipping current tile...');
        if (this.currentTile) {
            this.tiles.unshift(this.currentTile);
        }
        return this.drawNextTile();
    }

    reset() {
        console.log('Resetting tile stack...');
        this.tiles = this.initializeTiles();
        this.drawNextTile();
    }

    isEmpty() {
        return this.tiles.length === 0;
    }
} 