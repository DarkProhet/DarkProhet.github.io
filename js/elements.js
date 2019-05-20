/**
 * Первичная инициализация элементов HTML страницы
 */
function initializeElements()
{
    $(".game-over").hide();
    $(".rules").hide();
    $(".settings").hide();

    $("#start-button").click(function() {
        levels = parseInt($("#count-of-levels").val());
        difficulty = parseInt($("#difficulty").val());
        startGame($("#mode").val());
    });

    jqCanvas.mouseup(function (event) {
        if(event.button === 0)
            iteration(event);
    });

    handlersInitialization();
}

/**
 * Интнциализация обработчиков для кнопок
 */
function handlersInitialization()
{
    $("#start-again").click(function () {
        $(".game-over").fadeOut(500, function () {
            $(".main-menu").fadeIn(500);
        });
    });

    $("#rules-button").click(function () {
        $(".main-menu").fadeOut( 500, function () {
            $(".rules").fadeIn(500);
        });
    });

    $("#rules-back-button").click(function () {
        $(".rules").fadeOut(500, function () {
            $(".main-menu").fadeIn(500);
        });
    });

    $("#settings-button").click(function()
    {
        $(".main-menu").fadeOut(500, function () {
            $(".settings").fadeIn(500);
        });
    });

    $("#settings-back-button").click(function () {
        $(".settings").fadeOut(500, function () {
            $(".main-menu").fadeIn(500);
        });
    });
}