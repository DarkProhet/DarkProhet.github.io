/**
 * Файл с помогающими функциями
 */

/**
 * Получить целое псевдослучайное число между
 * минимумом и максимумом включительно
 * @param min - минимум
 * @param max - максимум
 * @returns {number} - случайное число
 */
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

/**
 * Получить вещественное псевдослучайное число между
 * минимумом и максимумом включительно
 * @param min - минимум
 * @param max - максимум
 * @returns {number} - случайное число
 */
function getRandomFloat(min, max)
{
    return Math.random() * (max-min) + min;
}

/**
 * Вернуть строку с лидирующими нулями
 * @param value - значение
 * @param length - длина
 * @returns {string} строка вида {0...0value}
 */
function addLeadingZeros(value, length)
{
    return ('0'.repeat(length) + value).slice(-length);
}

/**
 * Получить случайный ключ объекта
 * @param object - искходный объект
 * @returns {string} - строка-ключ
 */
function getRandomKey(object) {
    var keys = Object.keys(object);
    return keys[getRandomInteger(0, keys.length)];
}

/**
 * Получить позицию мыши относительно canvas
 * @param event события клика
 * @param canvas элемент
 * @returns {{x: number, y: number}} объект с координатами мыши
 */
function getMousePosition(event, canvas)
{
    // возвращает размер элемента и его позицию относительно viewport
    // (точки просмотра или ширины экрана в пикселях CSS в масштабе 100%)
    const rect = canvas.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) / (rect.width / canvas.width),
        y: (event.clientY - rect.top) / (rect.height / canvas.height)
    };
}