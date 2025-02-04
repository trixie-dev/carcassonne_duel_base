// Константи для типів сторін
export const TILE_SIDES = {
    CITY: 'C',
    ROAD: 'R',
    FIELD: 'F'
};

// Константи для індексів сторін
export const SIDE_INDEX = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
};

/**
 * Отримує сторони тайлу з урахуванням повороту
 * @param {string} tileType - Тип тайлу (наприклад, 'CFFR')
 * @param {number} rotation - Поворот в градусах (0, 90, 180, 270)
 * @returns {string} - Рядок з поверненими сторонами
 */
export function getRotatedSides(tileType, rotation) {
    const normalizedRotation = ((rotation % 360) + 360) % 360; // Нормалізуємо поворот до 0-359
    const shifts = normalizedRotation / 90; // Кількість зсувів
    
    // Перетворюємо рядок на масив і робимо зсув
    let sides = tileType.split('');
    for (let i = 0; i < shifts; i++) {
        sides.unshift(sides.pop());
    }
    
    return sides.join('');
}

/**
 * Перевіряє чи сумісні дві сторони
 * @param {string} side1 - Тип першої сторони (C, R, F)
 * @param {string} side2 - Тип другої сторони (C, R, F)
 * @returns {boolean} - true якщо сторони сумісні
 */
export function areSidesCompatible(side1, side2) {
    console.log(`Checking compatibility between sides: ${side1} and ${side2}`);
    
    // Перевіряємо, що обидві сторони мають допустимі значення
    if (!Object.values(TILE_SIDES).includes(side1) || !Object.values(TILE_SIDES).includes(side2)) {
        console.log('Invalid side type detected');
        return false;
    }

    // Сторони повинні бути однакового типу
    const isCompatible = side1 === side2;
    console.log(`Sides compatibility result: ${isCompatible}`);
    return isCompatible;
}

/**
 * Отримує тип конкретної сторони тайлу з урахуванням повороту
 * @param {string} tileType - Тип тайлу
 * @param {number} rotation - Поворот в градусах
 * @param {number} sideIndex - Індекс сторони (0-3: верх, право, низ, ліво)
 * @returns {string} - Тип сторони (C, R, F)
 */
export function getTileSide(tileType, rotation, sideIndex) {
    const rotatedSides = getRotatedSides(tileType, rotation);
    return rotatedSides[sideIndex];
}

/**
 * Перевіряє чи можна розмістити тайл біля існуючого
 * @param {string} newTileType - Тип нового тайлу
 * @param {number} newRotation - Поворот нового тайлу
 * @param {string} existingTileType - Тип існуючого тайлу
 * @param {number} existingRotation - Поворот існуючого тайлу
 * @param {string} direction - Напрямок розміщення ('top', 'right', 'bottom', 'left')
 * @returns {boolean} - true якщо тайли сумісні
 */
export function canPlaceTileNextTo(newTileType, newRotation, existingTileType, existingRotation, direction) {
    console.log('=== Starting canPlaceTileNextTo ===');
    console.log(`New tile: ${newTileType} (rotation: ${newRotation})`);
    console.log(`Existing tile: ${existingTileType} (rotation: ${existingRotation})`);
    console.log(`Direction: ${direction}`);

    const newSides = getRotatedSides(newTileType, newRotation);
    const existingSides = getRotatedSides(existingTileType, existingRotation);
    
    console.log('New tile sides:', newSides);
    console.log('Existing tile sides:', existingSides);
    
    let newSide, existingSide;
    
    switch (direction) {
        case 'top': // Новий тайл зверху
            newSide = newSides[SIDE_INDEX.BOTTOM];
            existingSide = existingSides[SIDE_INDEX.TOP];
            console.log(`Top placement - comparing new bottom (${newSide}) with existing top (${existingSide})`);
            break;
        case 'right': // Новий тайл справа 
            newSide = newSides[SIDE_INDEX.LEFT];
            existingSide = existingSides[SIDE_INDEX.RIGHT];
            console.log(`Right placement - comparing new left (${newSide}) with existing right (${existingSide})`);
            break;
        case 'bottom': // Новий тайл знизу
            newSide = newSides[SIDE_INDEX.TOP];
            existingSide = existingSides[SIDE_INDEX.BOTTOM];
            console.log(`Bottom placement - comparing new top (${newSide}) with existing bottom (${existingSide})`);
            break;
        case 'left': // Новий тайл зліва
            newSide = newSides[SIDE_INDEX.RIGHT];
            existingSide = existingSides[SIDE_INDEX.LEFT];
            console.log(`Left placement - comparing new right (${newSide}) with existing left (${existingSide})`);
            break;
        default:
            console.error('Invalid direction:', direction);
            return false;
    }

    // Перевіряємо сумісність сторін
    const isCompatible = areSidesCompatible(newSide, existingSide);
    console.log(`Sides compatibility check: ${newSide} vs ${existingSide} = ${isCompatible}`);
    console.log('=== Finished canPlaceTileNextTo ===');
    
    return isCompatible;
} 