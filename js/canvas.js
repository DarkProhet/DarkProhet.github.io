function redraw(mode)
{
    jqCanvas.fadeOut(500, function () {
        draw(mode);

        jqCanvas.fadeIn(1000);
    });
}

function draw(mode)
{
    switch(mode)
    {
        case 2:
            doubleGradientDraw();
            break;
        case 3:
            tripleGradientDraw();
            break;
        default:
            tripleGradientDraw();
            break;
    }
}

function doubleGradientDraw()
{
    var linearGradient = context.createLinearGradient(
        -getRandomInteger(0, 50), getRandomInteger(0, 150),
        getRandomInteger(150, 170), getRandomInteger(0, 150));

    linearGradient.addColorStop(0, firstColor);
    linearGradient.addColorStop(1, secondColor);

    context.fillStyle = linearGradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function tripleGradientDraw()
{
    var firstData = [
            0, 0, 2,
            0, 0, canvas.width + 28],
        secondData = [
            75, 150, 2,
            75, 150, canvas.width],
        thirdData = [
            canvas.width, 0, 2,
            canvas.width, 0, canvas.width];

    addPoint(
        hexToRGBA(firstColor, 1),
        hexToRGBA(secondColor, 0),
        ...firstData);
    addPoint(
        hexToRGBA(secondColor, 1),
        hexToRGBA(thirdColor, 0),
        ...secondData);
    addPoint(
        hexToRGBA(thirdColor, 1),
        hexToRGBA(firstColor, 0),
        ...thirdData);
}

function addPoint(firstColor, secondColor, ...gradientData) {
    var radialGradient = context.createRadialGradient(...gradientData);
    radialGradient.addColorStop(0, firstColor);
    radialGradient.addColorStop(1, secondColor);
    context.fillStyle = radialGradient;
    context.fillRect(0,0,canvas.width,canvas.height);
}
