/**
 * Простой режим игры
 * @param color случайный цвет
 * @returns {{secondColor: string, firstColor: string}} объект из двух цветов в HEX
 */
function easyMode(color)
{
    var alpha = getRandomFloat(0.4, 0.6); //0.5;
    var rgbColor = hexToRGB(color);
    var generatedColor = generateColorOn(rgbColor, alpha);

    var r = (rgbColor.r - alpha * generatedColor.r) / (1 - alpha);
    var g = (rgbColor.g - alpha * generatedColor.g) / (1 - alpha);
    var b = (rgbColor.b - alpha * generatedColor.b) / (1 - alpha);

    var firstColor = rgbToHEX(r, g, b);
    var secondColor = rgbToHEX(generatedColor.r, generatedColor.g, generatedColor.b);

    if(Math.random() > 0.5)
        return {
            firstColor: firstColor,
            secondColor: secondColor
        };
    else
        return {
            firstColor: secondColor,
            secondColor: firstColor
        };
}


/**
 * Средний режим игры
 * @param color случайный цвет
 * @returns {{thirdColor: string, secondColor: string, firstColor: string}} объект из трех цветов в HEX
 */
function mediumMode(color)
{
    var firstColor = getRandomColor();
    var secondColor = getRandomColor();
    var thirdColor = getRandomColor();

    switch (getRandomInteger(1, 3)) {
        case 1:
            firstColor = color;
            break;
        case 2:
            secondColor = color;
            break;
        case 3:
            thirdColor = color;
            break;
    }

    return {
        firstColor: firstColor,
        secondColor: secondColor,
        thirdColor: thirdColor
    };
}

/**
 * Генерация цвета, учитывая коэффициент изменения
 * @param color объект RGB цвета
 * @param alpha коэффициент изменения цвтеа
 * @returns {{r: number, b: number, g: number}} объект цвета RGB
 */
function generateColorOn(color, alpha) {
    var r = getRandomInteger(color.r, Math.min(255, color.r * (1 / alpha)));
    var g = getRandomInteger(color.g, Math.min(255, color.g * (1 / alpha)));
    var b = getRandomInteger(color.b, Math.min(255, color.b * (1 / alpha)));

    return getRGB(r, g, b);
}