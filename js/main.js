console.log('Game initialization started');

import { Game } from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    try {
        window.game = new Game();
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Error initializing game:', error);
    }
});