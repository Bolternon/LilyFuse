function registerInput(e){
    function removeDuplicatesFrom(array){
        return Array.from(new Set(array));
    };
    if((typeof e).toString() == "object"){
        inputQueue[inputQueue.length]=e.key.toUpperCase();
    }else{
        inputQueue[inputQueue.length]=e;
    };
    inputQueue=removeDuplicatesFrom(inputQueue);
};
function processInput(){
    if(graphicsLoaded){
        if(titleScreen){
            for(let q=0;q<inputQueue.length;q++){
                switch(inputQueue[q]){
                    case controller[0][4]:titleScreen=false;break;
                    case controller[0][7]:titleScreen=false;break;
                };
            };
        }else{
            if(mainMenu){
                for(let q=0;q<inputQueue.length;q++){
                    switch(inputQueue[q]){
                        case controller[0][0]:if(menuB>=0){menuB=0;};break;
                        case controller[0][1]:if(menuB<=1){menuB=1;};break;
                        case controller[0][4]:mainMenu=false;break;
                        case controller[0][7]:mainMenu=false;break;
                    };
                };
            }else{
                if(!pastMenu){
                    for(let p=0;p<players;p++){
                        for(let q=0;q<inputQueue.length;q++){
                            switch(inputQueue[q]){
                                case controller[p][2]:if(player[p]>0){player[p]--;};break;
                                case controller[p][3]:if(player[p]<4){player[p]++;};break;
                                case controller[p][4]:pastMenu=true;break;
                                case controller[p][7]:pastMenu=true;break;
                            };
                        };
                    };
                }else{
                    if(menuA==0){
                        if(menuB==0){
                            for(let q=0;q<inputQueue.length;q++){
                                switch(inputQueue[q]){
                                    case controller[0][0]:if(!isPaused&&!gameOver){moveCursor(0,0,-1);}else{  };break;
                                    case controller[0][1]:if(!isPaused&&!gameOver){moveCursor(0,0,1);}else{  };break;
                                    case controller[0][2]:if(!isPaused&&!gameOver){moveCursor(0,-1,0);}else{  };break;
                                    case controller[0][3]:if(!isPaused&&!gameOver){moveCursor(0,1,0);}else{  };break;
                                    case controller[0][4]:if(gameStart&&!gameOver){isPaused=!isPaused};break;
                                    case controller[0][5]:if(gameStart&&!gameOver&&!isPaused){moveTile(0,0,1);}else{  };break;
                                    case controller[0][6]:if(gameStart&&!gameOver&&!isPaused){moveTile(0,1,0);}else{  };break;
                                    case controller[0][7]:if(gameStart&&!gameOver){isPaused=!isPaused};break;
                                };
                            };
                        };
                        if(menuB==1){
                            for(let p=0;p<players;p++){
                                for(let q=0;q<inputQueue.length;q++){
                                    switch(inputQueue[q]){
                                        case controller[p][0]:if(!isPaused&&!gameOver){moveCursor(p,0,-1);}else{  };break;
                                        case controller[p][1]:if(!isPaused&&!gameOver){moveCursor(p,0,1);}else{  };break;
                                        case controller[p][2]:if(!isPaused&&!gameOver){moveCursor(p,-1,0);}else{  };break;
                                        case controller[p][3]:if(!isPaused&&!gameOver){moveCursor(p,1,0);}else{  };break;
                                        case controller[p][4]:if(gameStart&&!gameOver){isPaused=!isPaused};break;
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