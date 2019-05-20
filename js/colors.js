/**
 * Файл для работы с цветами
 */

/**
 * Перевод из RGB в HEX
 * @param r - красный канал
 * @param g - зеленый канал
 * @param b - синий канал
 * @returns {string} строка вида {#RRGGBB}
 */
function rgbToHEX(r, g, b) {
    return "#"
        + addLeadingZeros(parseInt(r).toString(16), 2)
        + addLeadingZeros(parseInt(g).toString(16), 2)
        + addLeadingZeros(parseInt(b).toString(16), 2);
}

/**
 * Получить объект цвета RGB
 * @param r - красный канал
 * @param g - зеленый канал
 * @param b - синий канал
 * @returns {{r: number, b: number, g: number}} - объект цвета,
 * содержащий три параметра с соответсвующими каналами
 */
function getRGB(r, g, b) {
    return {
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b)
    }
}

/**
 * Перевод цвета из HEX в RGB
 * Используется регульное выражение из https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param hex - строка вида {#RRGGBB}
 * @returns {{r: number, b: number, g: number}} - объект цвета,
 * содержащий три параметра с соответсвующими каналами
 */
function hexToRGB(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    }
}

/**
 * Перевод цвета из HEX в RGBA
 * @param hex - исходный цвет
 * @param alpha - альфа-канал
 * @returns {string} строка вида {rgba(r, g, b, a)}
 */
function hexToRGBA(hex, alpha)
{
    var color = hexToRGB(hex);
    return "rgba("
        + color.r + ","
        + color.g + ","
        + color.b + ","
        + alpha + ")";
}

/**
 * Получить случайный цвет в формате HEX
 * @returns {string} - строка вида {#RRGGBB}
 */
function getRandomColor()
{
    var r = addLeadingZeros(getRandomInteger(0, 255).toString(16), 2),
        g = addLeadingZeros(getRandomInteger(0, 255).toString(16), 2),
        b = addLeadingZeros(getRandomInteger(0, 255).toString(16), 2);

    return "#" + r + g + b;
}