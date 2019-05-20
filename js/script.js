var canvas, jqCanvas, context;
var firstColor, secondColor, thirdColor;
var randomColor, randomColorName;
var levels;
var colorData;
var listOfFiles;
var curLevel;
var difficulty;
var points, error, middleError;

$(document).ready(function () {
    initialize();
});

function initialize()
{
    jqCanvas = $("#canvas");
    canvas = jqCanvas.get(0);
    context = canvas.getContext('2d');

    canvas.width = 150;
    canvas.height = 150;
    
    $(window).on("beforeunload", function()
    {
        saveStorage();
    });
    
    $.getJSON("resources/listOfFiles.json").done(function (data) {
        listOfFiles = data;

        $.each(listOfFiles, function (key, value) {
            $("#mode").append(
                $("<option>")
                    .attr("value", key)
                    .text(value.name));
        });
        
         loadStorage();
    });

    initializeElements();

    firstColor = getRandomColor();
    secondColor = getRandomColor();
    thirdColor = getRandomColor();

    draw();
}

function loadStorage()
{    
    if(window.localStorage)
    {
        if(localStorage.settings === undefined)
            return;
        
        var settings = JSON.parse(localStorage.settings);
        $("#count-of-levels").val(settings.levels);
        
        $("#difficulty option:selected, #mode option:selected").each(function()
        {
            this.selected = false;
        });
        
        $("#difficulty").val(settings.diffuculty);
        $("#mode [value='" + settings.mode + "']").attr("selected", "selected");
    }
}

function saveStorage()
{
    var settings = {};
    settings.levels = $("#count-of-levels").val();
    settings.diffuculty = $("#difficulty").val();
    settings.mode = $("#mode").val();
    if(window.localStorage)
        localStorage.setItem("settings", JSON.stringify(settings));
}

function startGame(mode)
{    
    curLevel = 0;
    points = 0;
    middleError = 0;

    $("#number-of-levels").html(levels);

    var file = listOfFiles[mode].filePath;

    $(".main-menu").fadeOut(500, function () {
        $(this).hide();

        $.getJSON(file).done(function (data) {
            colorData = data;
            update();
        });
    });
    $(".canvas-background").toggleClass("animate-canvas-background");
}

function update()
{
    if(curLevel >= levels)
    {
        endGame();
        return;
    }

    randomColorName = getRandomKey(colorData);
    randomColor = colorData[randomColorName];

    $(".level-data").removeClass("animate-level").delay(1000).queue(function () {
        $("#current-level").html(++curLevel);
        $("#current-color").html(randomColorName);
        $(this).addClass("animate-level").dequeue();
    });

    // TODO: Удалить
    console.log("Заграданный цвет", randomColor);
    //$("body").css("background-color", randomColor);

    generateColors();
    redraw(difficulty);
}

function generateColors()
{
    var colors = {};

    switch(difficulty)
    {
        case 2:
            colors = easyMode(randomColor);

            firstColor = colors.firstColor;
            secondColor = colors.secondColor;
            break;
        case 3:
            colors = mediumMode(randomColor);
            
            firstColor = colors.firstColor;
            secondColor = colors.secondColor;
            thirdColor = colors.thirdColor;
            break;
    }
}

function iteration(event)
{
    var eventLocation = getMousePosition(event, canvas);

    var imageData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1);
    var data = imageData.data;
    var color = getRGB(data[0], data[1], data[2]);
    var rgbRandomColor = hexToRGB(randomColor);

    error = calculateError(color, rgbRandomColor);
    middleError += error;
    points += (255 - error) * (difficulty - 1.5);

    update();
}

function calculateError(selectedColor, currentColor)
{
    var r = Math.abs(selectedColor.r - currentColor.r);
    var g = Math.abs(selectedColor.g - currentColor.g);
    var b = Math.abs(selectedColor.b - currentColor.b);

    return ((r + g + b) / 3) * 100 / 255;
}

// TODO: Удалить
function isHasColor(rgbColor)
{
    for(var i = 0; i < 150; i++)
        for(var j = 0; j < 150; j++)
        {
            var data = context.getImageData(i, j, 1, 1).data;
            if(rgbColor.r === data[0] && rgbColor.g === data[1] && rgbColor.b === data[2])
            {
                console.log("Такой цвет есть на canvas");
                return;
            }
        }

    console.log("Такого цвета нет на canvas");
}

// TODO: Удалить
function printColorData(x, y, name) {
    var data = context.getImageData(x, y, 1, 1).data;
    var color = getRGB(data[0], data[1], data[2]);

    console.log(name, color);
}

function endGame()
{
    firstColor = getRandomColor();
    secondColor = getRandomColor();
    thirdColor = getRandomColor();
    redraw();

    $("#points").html(Math.round(points));
    $("#error").html(Math.round(middleError / levels * 100) / 100 + "%");
    
    $(".canvas-background").toggleClass("animate-canvas-background");
    $(".level-data").removeClass("animate-level");
    $(".game-over").fadeIn(500);
}

