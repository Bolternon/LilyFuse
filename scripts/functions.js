function startGame() {
    tileData = gamemodes[coords[1]][0];
    clonerCount = gamemodes[coords[1]][1];
    workingCloners = gamemodes[coords[1]][1];
    clonerQueue = gamemodes[coords[1]][2];
    essence = gamemodes[coords[1]][3];
    coords = [3,9];
    gameStart = true;
};
function identifyTile(x,y) {
    const tile = tileList.find(i => i.id == tileData[y][x][0]);
    return tile.name;
};
function advanceTick() {
    tick++;
    if (tick == fps) {
        time++;
        tick = 0;
    };
};
function clonerCycle() {
    for (let i = 0; i < clonerCount; i++) {
        if (clonerQueue[i][4] > 0) {
            if (clonerQueue[i][3] <= 0) {
                findClonableTile(i);
            } else {
                clonerQueue[i][3]--;
            };
        };
    };
    function findClonableTile(i) {
        const x = clonerQueue[i][0];
        const y = clonerQueue[i][1];
        if (typeof tileData[y][x-1] != "undefined") {
            if (tileData[y][x-1][0] === 0) {
                spawnRandomTile(x-1,y,i);
                return;
            };
        }
        if (typeof tileData[y-1] != "undefined") {
            if (tileData[y-1][x][0] === 0) {
                spawnRandomTile(x,y-1,i);
                return;
            };
        }
        if (typeof tileData[y][x+1] != "undefined") {
            if (tileData[y][x+1][0] === 0) {
                spawnRandomTile(x+1,y,i);
                return;
            };
        }
        if (typeof tileData[y+1] != "undefined") {
            if (tileData[y+1][x][0] === 0) {
                spawnRandomTile(x,y+1,i);
                return;
            };
        };
        clonerQueue[i][4]--;
    };
    function spawnRandomTile(y,x,i) {
        const newTile = Math.floor(Math.random() * 6) + 4;
        const isLily = newTile == 9 ? 1 : 0;
        tileData[x][y][0] = newTile;
        tileData[x][y][1] = isLily;
        clonerQueue[i][3] = clonerQueue[i][2];
    };
};
function gravityCheck() {
    for (let y = 14; y >= 0; y--) {
        for (let x = 0; x < 8; x++) {
            if (tileList[tileData[y][x][0]].gravity && tileData[y+1][x][0] === 0 && !tileData[y][x][2] && !tileData[y][x][4]) {
                tileData[y][x][2] = true;
                tileData[y][x][3] = 6;
            };
            if (tileData[y][x][2]) {
                if (tileData[y][x][3] > 0) {
                    tileData[y][x][3]--;
                } else {
                    if (tileData[y+1][x][0] === 0) {
                        tileData[y][x][3] = 1;
                        tileData[y+1][x] = tileData[y][x];
                        tileData[y][x] = [0,0,false,0,false,0];
                    } else {
                        tileData[y][x][2] = false;
                        tileData[y][x][3] = 0;
                    };
                };
            };
        };
    };
};
function deleteCheck() {
    for (let y = 15; y >= 3; y--) {
        for (let x = 0; x < 8; x++) {
            if (checkID(tileData[y][x][0]) != 0 && !tileData[y][x][4]) {
                let id = tileData[y][x][0];
                if (tileData[y][x][0] == id && tileData[y-1][x][0] == id && tileData[y-2][x][0] == id && tileData[y-3][x][0] == id) {
                    tileData[y][x][4] = true;
                    tileData[y][x][5] = 30;
                    tileData[y-1][x][4] = true;
                    tileData[y-1][x][5] = 30;
                    tileData[y-2][x][4] = true;
                    tileData[y-2][x][5] = 30;
                    tileData[y-3][x][4] = true;
                    tileData[y-3][x][5] = 30;
                };
            };
        };
    };
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 8; x++) {
            if (checkID(tileData[y][x][0]) != 0 && !tileData[y][x][4]) {
                let id = tileData[y][x][0];
                if (tileData[y][x][0] == id && tileData[y+1][x][0] == id && tileData[y+2][x][0] == id && tileData[y+3][x][0] == id) {
                    tileData[y][x][4] = true;
                    tileData[y][x][5] = 30;
                    tileData[y+1][x][4] = true;
                    tileData[y+1][x][5] = 30;
                    tileData[y+2][x][4] = true;
                    tileData[y+2][x][5] = 30;
                    tileData[y+3][x][4] = true;
                    tileData[y+3][x][5] = 30;
                };
            };
        };
    };
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 5; x++) {
            if (checkID(tileData[y][x][0]) != 0 && !tileData[y][x][4]) {
                let id = tileData[y][x][0];
                if (tileData[y][x][0] == id && tileData[y][x+1][0] == id && tileData[y][x+2][0] == id && tileData[y][x+3][0] == id) {
                    tileData[y][x][4] = true;
                    tileData[y][x][5] = 30;
                    tileData[y][x+1][4] = true;
                    tileData[y][x+1][5] = 30;
                    tileData[y][x+2][4] = true;
                    tileData[y][x+2][5] = 30;
                    tileData[y][x+3][4] = true;
                    tileData[y][x+3][5] = 30;
                };
            };
        };
    };
 for (let y = 0; y < 16; y++) {
        for (let x = 7; x >= 3; x--) {
            if (checkID(tileData[y][x][0]) != 0 && !tileData[y][x][4]) {
                let id = tileData[y][x][0];
                if (tileData[y][x][0] == id && tileData[y][x-1][0] == id && tileData[y][x-2][0] == id && tileData[y][x-3][0] == id) {
                    tileData[y][x][4] = true;
                    tileData[y][x][5] = 30;
                    tileData[y][x-1][4] = true;
                    tileData[y][x-1][5] = 30;
                    tileData[y][x-2][4] = true;
                    tileData[y][x-2][5] = 30;
                    tileData[y][x-3][4] = true;
                    tileData[y][x-3][5] = 30;
                };
            };
        };
    };
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 8; x++) {
            if (tileData[y][x][4]) {
                if (tileData[y][x][5] > 0) {
                    tileData[y][x][5]--;
                    if (tileData[y][x][5] % 2 == 0) {
                        drawSprite("flash",32+(x*10),16+(y*10));
                    };
                } else {
                    tileData[y][x] = [0,0,false,0,false,0];
                };
            }
        };
    };
    function checkID(id) {
        if (id == 0 || id == 1 || id == 2 || id == 3) {
            return 0;
        } else {
            return id;
        };
    };
};
function moveTiles(x,y,dx,dy) {
    const tileA = tileData[y][x];
    const tileB = tileData[y+dy][x+dx];
    if (!tileData[y+dy][x+dx][2] && !tileData[y+dy][x+dx][4] && tileList[tileData[y][x][0]].move && tileList[tileData[y+dy][x+dx][0]].move) {
        tileData[y][x] = tileB;
        tileData[y+dy][x+dx] = tileA;
    };
};