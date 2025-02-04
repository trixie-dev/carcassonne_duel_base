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
    // Просто повертаємо оригінальні сторони без обертання
    return tileType;
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
    console.log('\n=== Starting canPlaceTileNextTo ===');
    console.log(`New tile: ${newTileType}`);
    console.log(`Existing tile: ${existingTileType}`);
    console.log(`Direction: ${direction}`);

    // Отримуємо сторони тайлів
    const newSides = newTileType.split('');
    const existingSides = existingTileType.split('');
    
    console.log('New sides array:', newSides);
    console.log('Existing sides array:', existingSides);
    
    let newSide, existingSide;
    
    // Визначаємо, які сторони мають з'єднуватися
    switch (direction) {
        case 'top': // Новий тайл зверху - його низ має співпадати з верхом існуючого
            newSide = newSides[2]; // BOTTOM
            existingSide = existingSides[0]; // TOP
            break;
        case 'right': // Новий тайл справа - його лівий бік має співпадати з правим боком існуючого
            newSide = newSides[3]; // LEFT
            existingSide = existingSides[1]; // RIGHT
            break;
        case 'bottom': // Новий тайл знизу - його верх має співпадати з низом існуючого
            newSide = newSides[0]; // TOP
            existingSide = existingSides[2]; // BOTTOM
            break;
        case 'left': // Новий тайл зліва - його правий бік має співпадати з лівим боком існуючого
            newSide = newSides[1]; // RIGHT
            existingSide = existingSides[3]; // LEFT
            break;
        default:
            console.error('Invalid direction:', direction);
            return false;
    }

    console.log(`Checking sides: ${newSide} and ${existingSide}`);
    const isCompatible = areSidesCompatible(newSide, existingSide);
    console.log(`Compatible: ${isCompatible}`);
    
    return isCompatible;
}

/**
 * Перевіряє чи сумісні дві сторони
 * @param {string} side1 - Тип першої сторони (C, R, F)
 * @param {string} side2 - Тип другої сторони (C, R, F)
 * @returns {boolean} - true якщо сторони сумісні
 */
export function areSidesCompatible(side1, side2) {
    console.log(`\nChecking compatibility between sides: ${side1} and ${side2}`);
    
    // Перевіряємо, що обидві сторони мають допустимі значення
    if (!Object.values(TILE_SIDES).includes(side1) || !Object.values(TILE_SIDES).includes(side2)) {
        console.log('Invalid side type detected');
        return false;
    }

    // Правила сумісності:
    // 1. Місто (C) має з'єднуватися з містом (C)
    // 2. Дорога (R) має з'єднуватися з дорогою (R)
    // 3. Поле (F) має з'єднуватися з полем (F)
    const isCompatible = side1 === side2;
    
    // Додаткове логування для діагностики
    if (!isCompatible) {
        console.log(`Incompatible sides: ${side1} cannot connect to ${side2}`);
        console.log(`Required: ${side1} should be equal to ${side2}`);
    } else {
        console.log(`Compatible sides: ${side1} matches ${side2}`);
    }
    
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