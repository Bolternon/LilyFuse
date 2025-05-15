function registerInput(e){
    function removeDuplicatesFrom(array){
        return Array.from(new Set(array));
    };
    inputQueue[inputQueue.length]=e.key.toUpperCase();
    inputQueue=removeDuplicatesFrom(inputQueue);
};
function processInput(){
    if(graphicsLoaded){
        if(titleScreen){

        }else{
            if(mainMenu){

            }else{
                if(!pastMenu){

                }else{
                    if(menuA==0){
                        if(menuB==0){
                            for(let p=0;p<players;p++){
                                for(let q=0;q<inputQueue.length;q++){
                                    switch(inputQueue[q]){
                                        case controller[p][0]:if(!isPaused&&!gameOver){moveCursor(p,0,-1);}else{  };break;
                                        case controller[p][1]:if(!isPaused&&!gameOver){moveCursor(p,0,1);}else{  };break;
                                        case controller[p][2]:if(!isPaused&&!gameOver){moveCursor(p,-1,0);}else{  };break;
                                        case controller[p][3]:if(!isPaused&&!gameOver){moveCursor(p,1,0);}else{  };break;
                                        case controller[p][4]:break;
                                        case controller[p][5]:if(gameStart&&!gameOver&&!isPaused){moveTile(p,0,1);}else{  };break;
                                        case controller[p][6]:if(gameStart&&!gameOver&&!isPaused){moveTile(p,1,0);}else{  };break;
                                        case controller[p][7]:if(gameStart&&!gameOver){isPaused=!isPaused};break;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    inputQueue=[];
};