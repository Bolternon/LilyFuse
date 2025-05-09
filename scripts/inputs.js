function registerInput(e) {
    function removeDuplicatesFrom(array) {
        return Array.from(new Set(array));
    };
    inputQueue[inputQueue.length] = e.key.toUpperCase();
    inputQueue = removeDuplicatesFrom(inputQueue);
};
function processInput() {
    if (gameStart) {
        for (let q = 0; q < inputQueue.length; q++) {
            switch (inputQueue[q]) {
                case 'W': if(coords[1]>0){coords[1]--;}; break;
                case 'S': if(coords[1]<15){coords[1]++;}; break;
                case 'A': if(coords[0]>0){coords[0]--;}; break;
                case 'D': if(coords[0]<7){coords[0]++;}; break;
                case '8': if(coords[1]>0){moveTiles(coords[0],coords[1],0,-1);}; break;
                case '2': if(coords[1]<15){moveTiles(coords[0],coords[1],0,1);}; break;
                case '4': if(coords[0]>0){moveTiles(coords[0],coords[1],-1,0);}; break;
                case '6': if(coords[0]<7){moveTiles(coords[0],coords[1],1,0);}; break;
            };
        };
    } else {
        for (let q = 0; q < inputQueue.length; q++) {
            switch (inputQueue[q]) {
                case 'W': if(coords[1]>0){coords[1]--;}; break;
                case 'S': if(coords[1]<2){coords[1]++;}; break;
                case 'ENTER': startGame(); break;
            };
        };
    };
    inputQueue = [];
};