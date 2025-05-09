function frameStart() {
    drawBackground();
    drawField();
    if (!gameStart) {
        processInput();
    };
    drawMenu();
    if (gameStart) {
        advanceTick();
        clonerCycle();
        gravityCheck();
        deleteCheck();
        processInput();
        drawTiles();
        drawCursor();
    };
};
function drawBackground() {
    for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 16; x++) {
            drawSprite("bg",x*16,y*16);
        };
    };
};
function drawField() {
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 8; x++) {
            drawSprite("field",32+(x*10),16+(y*10));
            drawSprite("field",144+(x*10),16+(y*10));
        };
    };
};
function drawMenu() {
    if (gameStart) {
        drawSentence("ESSENCE",144,16);
        drawSentence("TIME",144,16*5);
        drawSentence("SCORE",144,16*9);
        drawNumbers(essence,144,16*2);
        drawNumbers(time,144,16*6);
        drawNumbers(score,144,16*10);
    } else {
        drawSentence("LILYFUSE",144,16);
        drawSentence("ALPHA TEST",144,12*2);
        drawSentence("SELECTGAME",144,16*3);
        for (let i = 0; i < 3; i++) {
            const fields = ["A","B","C"];
            const select = coords[1] == i ? "O " : "  ";
            drawSentence(select+"GAME "+fields[i],144,16*(4+i));
        };
    };
    function drawNumbers(number,x,y) {
        const string = "00000000".slice(number.toString().length)+number.toString();
        for (let z = 0; z < string.length; z++) {
            drawNum(string.charAt(z),(x+(z*8)),y);
        };
    };
    function drawSentence(string,x,y) {
        for (let z = 0; z < string.length; z++) {
            drawChar(string.charAt(z),(x+(z*8)),y);
        };
    };
    function drawNum(char,x,y) {
        ctx.drawImage(graphics,((char.charCodeAt()-48)*8),40,8,8,x,y,8,8);
    };
    function drawChar(char,x,y) {
        ctx.drawImage(graphics,((char.charCodeAt()-65)*8),48,8,8,x,y,8,8);
    };
};
function drawCursor() {
    const pointer = [["blank","cursor","blank"],["cursor","cursor","cursor"],["blank","cursor","blank"]];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            drawSprite(pointer[y][x],22+(coords[0]*10)+(x*10),6+(coords[1]*10)+(y*10));
        };
    };
};
function drawTiles() {
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 8; x++) {
            drawSprite(identifyTile(x,y),32+(x*10),16+(y*10));
        };
    };
};