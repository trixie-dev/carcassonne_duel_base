export const BOARD_SIZE = 9;

// Типи ландшафту
export const LANDSCAPE = {
    CITY: 'C',
    ROAD: 'R',
    FIELD: 'F'
};

// Початкова матриця поля (null означає порожню клітинку)
export const INITIAL_BOARD = [
    // Верхній рядок (0)
    ['FFFF', 'RFFF', 'CFFF', 'RFFF', 'CFFF', 'RFFF', 'CFFF', 'RFFF', 'FFFF'],
    // Рядок 1
    ['FFFR', null, null, null, null, null, null, null, 'FRFF'],
    // Рядок 2
    ['FFFC', null, null, null, null, null, null, null, 'FCFF'],
    // Рядок 3
    ['FFFR', null, null, null, null, null, null, null, 'FRFF'],
    // Рядок 4
    ['FFFC', null, null, null, null, null, null, null, 'FCFF'],
    // Рядок 5
    ['FFFR', null, null, null, null, null, null, null, 'FRFF'],
    // Рядок 6
    ['FFFC', null, null, null, null, null, null, null, 'FCFF'],
    // Рядок 7
    ['FFFR', null, null, null, null, null, null, null, 'FRFF'],
    // Нижній рядок (8)
    ['FFFF', 'FFRF', 'FFCF', 'FFRF', 'FFCF', 'FFRF', 'FFCF', 'FFRF', 'FFFF']
];

// Конфігурація тайлів для гри (тип та кількість)
export const TILE_CONFIG = {
    'CCRF': 4,
    'CCFR': 4,
    'CFRF': 11,
    'CRRF': 9,
    'CRFF': 9,
    'FFCR': 4,
    'FFRF': 4,
    'FRRF': 9,
    'FFCC': 4,
    'RRFF': 6
};

// Початкові фіксовані міста та дороги на границях
export const FIXED_BORDERS = {
    cities: [
        // Верхня границя
        { position: [0, 2], edges: 'CFFF' },
        { position: [0, 4], edges: 'CFFF' },
        { position: [0, 6], edges: 'CFFF' },
        // Права границя
        { position: [2, 8], edges: 'FCFF' },
        { position: [4, 8], edges: 'FCFF' },
        { position: [6, 8], edges: 'FCFF' },
        // Нижня границя
        { position: [8, 2], edges: 'FFCF' },
        { position: [8, 4], edges: 'FFCF' },
        { position: [8, 6], edges: 'FFCF' },
        // Ліва границя
        { position: [2, 0], edges: 'FFFC' },
        { position: [4, 0], edges: 'FFFC' },
        { position: [6, 0], edges: 'FFFC' }
    ],
    roads: [
        // Верхня границя
        { position: [0, 1], edges: 'RFFF' },
        { position: [0, 3], edges: 'RFFF' },
        { position: [0, 5], edges: 'RFFF' },
        { position: [0, 7], edges: 'RFFF' },
        // Права границя
        { position: [1, 8], edges: 'FRFF' },
        { position: [3, 8], edges: 'FRFF' },
        { position: [5, 8], edges: 'FRFF' },
        { position: [7, 8], edges: 'FRFF' },
        // Нижня границя
        { position: [8, 1], edges: 'FFRF' },
        { position: [8, 3], edges: 'FFRF' },
        { position: [8, 5], edges: 'FFRF' },
        { position: [8, 7], edges: 'FFRF' },
        // Ліва границя
        { position: [1, 0], edges: 'FFFR' },
        { position: [3, 0], edges: 'FFFR' },
        { position: [5, 0], edges: 'FFFR' },
        { position: [7, 0], edges: 'FFFR' }
    ],
    corners: [
        { position: [0, 0], edges: 'FFFF' },  // Верхній лівий кут
        { position: [0, 8], edges: 'FFFF' },  // Верхній правий кут
        { position: [8, 8], edges: 'FFFF' },  // Нижній правий кут
        { position: [8, 0], edges: 'FFFF' }   // Нижній лівий кут
    ]
};

// Кількість джокерів на гравця
export const JOKERS_PER_PLAYER = 2;

// Очки за різні типи ландшафту
export const POINTS = {
    CITY: {
        COMPLETE: 2,    // Множник для завершеного міста
        INCOMPLETE: 1   // Очки за незавершене місто
    },
    ROAD: {
        COMPLETE: 2,    // Множник для завершеної дороги
        INCOMPLETE: 1   // Очки за незавершену дорогу
    }
};

// Кольори гравців
export const PLAYER_COLORS = {
    1: '#e74c3c',
    2: '#3498db'
};