function game00(){
    if(!playerLoaded){
        initializePlayerData(1);
        initializeStartingField();
        initializeNextRow();
    };
    processInput();
    if(gameStart){
        if(isPaused){
        }else{
            advanceTick();
            matchTiles();
            matchTiles();
            doDyingAnimation();
            doGravity();
        };
    };
    displayGameBG();
    displayField();
    displayTiles();
    displayNextRow();
    doMovementAnimation();
    displayCursor();
    displayFrame();
    displayTimer();
    if(!gameStart){
        beginCountdown();
    };
    if(gameOver){
        /*gameEnd();*/
    };
};
function initializePlayerData(p){
    playerLoaded=true;
    coords=[[3,15,0,0],[3,15,0,0]];
    countdown=4;
    gameStart=false;
    price=1;
    playerField=[];
    fieldScrollSpeed=15;
    frieldScrollTimer=15;
    scrollOffset=0;
    nextRow=[];
    score=[];
    essence=[];
    time=0;
    tick=0;
    combo=[];
    gauge=[];
    mult=[];
    ice=[];
    winner=[];
    if(p==0){
        fieldPos=112;
    }else{
        fieldPos=24;
    };
    for (let c=0;c<p+1;c++) {
        playerField[c]=[];
        for(let y=0;y<20;y++){
            playerField[c][y]=[];
            for(let x=0;x<8;x++){
                if(y==0||y==19||x==0||x==7){
                    playerField[c][y][x]=[13,0,0,0];
                }else{
                    playerField[c][y][x]=[0,0,0,0];
                };
            };
        };
        cursor[c]=[];
        for(let i=0;i<2;i++){
            cursor[c][i]=[0,0];
        };
        frieldScrollTimer[c]=fieldScrollSpeed;
        scrollOffset=0;
        nextRow[c]=[];
        score[c]=0;
        essence[c]=/*100*/9999999999;
        combo[c]=1;
        gauge[c]=0;
        mult[c]=0;
        ice[c]=0;
        winner[c]=true;
    };
    tilesAvailable=3;
    /*essence=[2,1]*/
};
function beginCountdown(){
    if(countdown<30){
        drawSprite(720,16,144,128,32,32);
    }else if(countdown<60){
        drawSprite(688,16,144,128,32,32);
    }else if(countdown<90){
        drawSprite(656,16,144,128,32,32);
    }else if(countdown<120){
        drawSprite(624,16,144,128,32,32);
    }else if(countdown<150){
        drawSprite(592,16,144,128,32,32);
    }else if(countdown<180){
        gameStart=true;
    };
    countdown++;
};
function initializeStartingField(){
    for(let c=0;c<playerField.length;c++){
        for(let y=0;y<12;y++){
            for(let x=0;x<6;x++){
                let tile = 0;
                while(true){
                    tile=Math.floor(Math.random()*(tilesAvailable+1));
                    if(tile==0){
                        if(Math.floor(Math.random()*(8))==0){
                            tile=6;
                        }else{
                            tile=Math.floor(Math.random()*(tilesAvailable))+1;
                        };
                    };
                    if(playerField[c][y+6][x+1][0]!=tile&&playerField[c][y+7][x][0]!=tile){break;};
                };
                playerField[c][y+7][x+1][0]=tile;
                playerField[c][y+7][x+1][1]=tile;
            };
        };
    };
};
function initializeNextRow(){
    nextRow=[];
    for(let c=0;c<playerField.length;c++){
        nextRow[c]=[];
        for(let x=0;x<8;x++){
            if(x>0&&x<7){
                let tile = 0;
                while(true){
                    tile=Math.floor(Math.random()*(tilesAvailable+1));
                    if(tile==0){
                        if(Math.floor(Math.random()*(8))==0){
                            tile=6;
                        }else{
                            tile=Math.floor(Math.random()*(tilesAvailable))+1;
                        };
                    };
                    if(nextRow[c][x-1]!=tile&&playerField[c][18][x][0]!=tile){break;};
                };
                nextRow[c][x]=tile;
            }else{
                nextRow[c][x]=13;
            };
        };
    };
};
function pushNewRow(){
    for(let c=0;c<playerField.length;c++){
        for(let y=1;y<18;y++){
            playerField[c][y]=playerField[c][y+1];
        };
        playerField[c][18]=[[13,13,0,0],[nextRow[c][1],nextRow[c][1],0,0],[nextRow[c][2],nextRow[c][2],0,0],[nextRow[c][3],nextRow[c][3],0,0],[nextRow[c][4],nextRow[c][4],0,0],[nextRow[c][5],nextRow[c][5],0,0],[nextRow[c][6],nextRow[c][6],0,0],[13,13,0,0]]
    };
};
function advanceTick(){
    tick++;
    if(tick>=30){
        tick=0;
        time++;
        if(time>19){
            switch(time){
                case 20:fieldScrollSpeed=10;break;
                case 40:fieldScrollSpeed=8;tilesAvailable=4;break;
                case 80:fieldScrollSpeed=6;price=2;break;
                case 160:fieldScrollSpeed=4;tilesAvailable=5;break;
                case 250:fieldScrollSpeed=3;price=3;break;
                case 400:fieldScrollSpeed=2;break;
                case 800:fieldScrollSpeed=1;break;
            };
        };
    };
    fieldScrollTimer--;
    if(fieldScrollTimer<=0){
        fieldScrollTimer=fieldScrollSpeed;
        scrollOffset++;
        if(!gameOver){
            for(let c=0;c<playerField.length;c++){
                essence[c]-=Math.round(price*(1+(time/100)));
                if(essence[c]<=0){
                    essence[c]=0;
                    gameOver=true;
                    winner[c]=false;
                };
            };
        };
        if(scrollOffset>=16){
            scrollOffset=0;
            pushNewRow();
            initializeNextRow();
            for(let c=0;c<playerField.length;c++){
                if(coords[c][1]>9){coords[c][1]--;};
            };
        };
    };
    for(let c=0;c<playerField.length;c++){
        if(gauge[c]>1){
            gauge[c]--;
            if(gauge[c]==1){
                gauge[c]=0;
                combo[c]=1;
            };
        };
    };
};
function gameEnd(){
    for(let c=0;c<playerField.length;c++){
        drawSprite((player[c]*96),224,fieldPos+(176*c),16,96,192);
    };
};
function displayField(){
    for(let c=0;c<playerField.length;c++){
        drawSprite((player[c]*96),224,fieldPos+(176*c),16,96,192);
    };
};
function displayTiles(){
    for(let c=0;c<playerField.length;c++){
        for(let y=7;y<19;y++){
            for(let x=1;x<7;x++){
                if(!isMoving(c,x,y)){
                    drawSprite(playerField[c][y][x][0]*16,0,(x*16)-16+fieldPos+(176*c),(y*16)-112-scrollOffset+16,16,16);
                    if(isDying(c,x,y)&&playerField[c][y][x][2]%2>0){
                        drawSprite(playerField[c][y][x][0]*16,16,(x*16)-16+fieldPos+(176*c),(y*16)-112-scrollOffset+16,16,16);
                    };
                };
            };
        };
    };
};
function displayNextRow(){
    for(let c=0;c<playerField.length;c++){
        for(let x=1;x<7;x++){
            drawSprite(nextRow[c][x]*16,32,(x*16)-16+fieldPos+(176*c),208-scrollOffset,16,16);
        };
    };
};
function displayCursor(){
    for(let c=0;c<playerField.length;c++){
        for(let y=0;y<2;y++){
            for(let x=0;x<2;x++){
                if(x==1&&coords[c][0]==6){
                }else{
                    drawSprite(304+pulsate()+(x*16),16+(y*16),(x*16)+(coords[c][0]*16)-16+fieldPos+(176*c),(y*16)+(coords[c][1]*16)-144-scrollOffset+16,16,16);
                };
            };
        };
    };
    tick();
    function pulsate(){
        if(cursorPulsate>7){return 32;}else{return 0;};
    };
    function tick(){
        cursorPulsate++;
        if(cursorPulsate>15){cursorPulsate=0;};
    };
};
function displayFrame(){
    for(let c=0;c<playerField.length;c++){
        for(let y=0;y<15;y++){
            for(let x=0;x<2;x++){
                drawSprite(208+(x*8),0,(x*104)+fieldPos+(176*c)-8,(y*16)-scrollOffset,8,16);
            };
        };
        for(let y=0;y<2;y++){
            drawSprite(368,16+(y*16),fieldPos+(176*c),y*208,96,16);
            y==0?drawEssence(c):drawScore(c);
        };
    };
    function drawEssence(c){
        let n="000000000000".slice(essence[c].toString().length)+essence[c].toString();
        for(let x=0;x<12;x++){
            drawSprite(224+((n.charCodeAt(x)-48)*8),16,fieldPos+(176*c)+(x*8),0,8,16);
        };
    };
    function drawScore(c){
        let n="000000000000".slice(score[c].toString().length)+score[c].toString();
        for(let x=0;x<12;x++){
            drawSprite(224+((n.charCodeAt(x)-48)*8),32,fieldPos+(176*c)+(x*8),208,8,16);
        };
    };
};
function displayGameBG(){
    for(let y=0;y<15;y++){
        for(let x=0;x<20;x++){
            drawSprite(512,32,(x*16),(y*16)-scrollOffset,16,16);
        };
    };
};
function displayTimer(){
    let n="0000".slice(time.toString().length)+time.toString();
    drawSprite(464,16,136,88,48,32);
    for(let x=0;x<4;x++){
        drawSprite(512+((n.charCodeAt(x)-48)*8),16,144+(x*8),96,8,16);
    };
};
function moveCursor(c,x,y){
    if(coords[c][0]+x<=0||coords[c][0]+x>6||coords[c][1]+y<9||coords[c][1]+y>19||coords[c][2]>0||coords[c][3]>0){
    }else{
        coords[c][0]+=x;
        coords[c][1]+=y;
    };
};
function moveTile(c,dx,dy){
    if(!isMoving(c,coords[c][0],coords[c][1]-1)&&!isMoving(c,coords[c][0]+dx,coords[c][1]-1-dy)&&isNotBarrier(c,coords[c][0],coords[c][1]-1)&&isNotBarrier(c,coords[c][0]+dx,coords[c][1]-1-dy)&&!isDying(c,coords[c][0],coords[c][1]-1)&&!isDying(c,coords[c][0]+dx,coords[c][1]-1-dy)){
        let p=[coords[c][1]-1,coords[c][0]];
        let a=[coords[c][1]-1-dy,coords[c][0]+dx];
        playerField[c][p[0]][p[1]][3]=2;
        playerField[c][a[0]][a[1]][3]=2;
        let tileA=playerField[c][p[0]][p[1]];
        let tileB=playerField[c][a[0]][a[1]];
        playerField[c][p[0]][p[1]]=tileB;
        playerField[c][a[0]][a[1]]=tileA;
        coords[c][2]=dx;
        coords[c][3]=dy;
    };
};
function doMovementAnimation(){
    for(let c=0;c<playerField.length;c++){
        if(coords[c][2]+coords[c][3]>=1){
            let p=[coords[c][1]-1,coords[c][0]];
            let a=[coords[c][1]-1-coords[c][3],coords[c][0]+coords[c][2]];
            if(playerField[c][p[0]][p[1]][3]>=2){
                if(coords[c][2]>=1){
                    drawSprite(playerField[c][p[0]][p[1]][0]*16,0,(p[1]*16)+((playerField[c][p[0]][p[1]][3]*6))-16+fieldPos+(176*c),(p[0]*16)-112-scrollOffset+16,16,16);
                    drawSprite(playerField[c][a[0]][a[1]][0]*16,0,(a[1]*16)-((playerField[c][a[0]][a[1]][3]*6))-16+fieldPos+(176*c),(p[0]*16)-112-scrollOffset+16,16,16);
                }else{
                    drawSprite(playerField[c][p[0]][p[1]][0]*16,0,(p[1]*16)-16+fieldPos+(176*c),(p[0]*16)-((playerField[c][p[0]][p[1]][3]*6))-112-scrollOffset+16,16,16);
                    drawSprite(playerField[c][a[0]][a[1]][0]*16,0,(a[1]*16)-16+fieldPos+(176*c),(p[0]*16)+((playerField[c][a[0]][a[1]][3]*6)-16)-112-scrollOffset+16,16,16);
                };
                playerField[c][p[0]][p[1]][3]--;
                playerField[c][a[0]][a[1]][3]--;
            }else{
                coords[c][2]=0;
                coords[c][3]=0;
                playerField[c][p[0]][p[1]][3]=0;
                playerField[c][a[0]][a[1]][3]=0;
            };
        };
    };
};
function matchTiles(){
    for(let c=0;c<playerField.length;c++){
        for(let y=18;y>=7;y--){
            for(let x=1;x<=6;x++){
                let id=playerField[c][y][x][0];
                if(id>=1&&id<=5){
                    horizontalScan(c,x,y,id);
                };
            };
        };
    };
    for(let c=0;c<playerField.length;c++){
        for(let x=1;x<=6;x++){
            for(let y=7;y<=18;y++){
                let id=playerField[c][y][x][0];
                if(id>=1&&id<=5){
                    verticalScan(c,x,y,id);
                };
            };
        };
    };
    function horizontalScan(c,x,y,id){
        let i=0;
        while(true){
            if((playerField[c][y][x+i+1][0]==id||playerField[c][y][x+i+1][0]==6||playerField[c][y][x+i+1][0]==(id+6))&&(!isDying(c,x+i+1,y)||playerField[c][y][x+i+1][2]==60)&&!isMoving(c,x,y)){
                i++;
            }else{
                break;
            };
        };
        if(i>2){
            for(let m=0;m<i+1;m++){
                if(playerField[c][y][x+m][0]==6){
                    playerField[c][y][x+m][0]=playerField[c][y][x][1]+6;
                };
                playerField[c][y][x+m][2]=45;
            };
            gauge[c]=60;
            combo[c]++;
        };
    };
    function verticalScan(c,x,y,id){
        let i=0;
        while(true){
            if((playerField[c][y+i+1][x][0]==id||playerField[c][y+i+1][x][0]==6||playerField[c][y+i+1][x][0]==(id+6))&&(!isDying(c,x,y+i+1)||playerField[c][y+i+1][x][2]==60)&&!isMoving(c,x,y)){
                i++;
            }else{
                break;
            };
        };
        if(i>2){
            for(let m=0;m<i+1;m++){
                if(playerField[c][y+m][x][0]==6){
                    playerField[c][y+m][x][0]=playerField[c][y][x][1]+6;
                };
                playerField[c][y+m][x][2]=45;
            };
            gauge[c]=60;
            combo[c]++;
        };
    };
};
function doDyingAnimation(){
    for(let c=0;c<playerField.length;c++){
        for(let y=1;y<19;y++){
            for(let x=1;x<7;x++){
                if(isDying(c,x,y)){
                    if(playerField[c][y][x][2]==1){
                        if(playerField[c][y][x][0]==playerField[c][y][x][1]){
                            if(!gameOver){
                                netScore(c,x,y);
                                netEssence(c,x,y);
                            };
                            playerField[c][y][x]=[0,0,0,0];
                        }else{
                            playerField[c][y][x][1]=playerField[c][y][x][0]
                            playerField[c][y][x][2]=0;
                        };
                    }else{
                        playerField[c][y][x][2]--;
                    };
                };
            };
        };
    };
    function netScore(c,x,y){
        let points=0;
        if(playerField[c][y][x][0]>6){
            points=1000;
        }else if(playerField[c][y][x][0]==6){
            points=100;
        }else{
            points=10;
        };
        score[c]+=points*combo[c];
    };
    function netEssence(c,x,y){
        let points=0;
        if(playerField[c][y][x][0]>6){
            points=10;
        }else if(playerField[c][y][x][0]==6){
            points=5;
        }else{
            points=1;
        };
        essence[c]+=points*combo[c];
    };
};
function doGravity(){
    for(let c=0;c<playerField.length;c++){
        for(let i=0;i<20;i++){
            for(let y=18;y>0;y--){
                for(let x=1;x<7;x++){
                    if(!isAir(c,x,y)&&!isDying(c,x,y)&&!isMoving(c,x,y)&&isAir(c,x,y+1)&&!isDying(c,x,y+1)&&!isMoving(c,x,y+1)){
                        playerField[c][y+1][x]=playerField[c][y][x];
                        playerField[c][y][x]=[0,0,0,0];
                    };
                };
            };
        };
    };
};
function isValidTile(c,x,y){
    if(playerField[c][y][x][0]==0||playerField[c][y][x][0]==13){return false;}else{return true};
};
function isAir(c,x,y){
    if(playerField[c][y][x][0]==0){return true;}else{return false};
};
function isNotBarrier(c,x,y){
    if(playerField[c][y][x][0]==13){return false;}else{return true};
};
function isDying(c,x,y){
    if(playerField[c][y][x][2]>0){return true;}else{return false;};
};
function isMoving(c,x,y){
    if(playerField[c][y][x][3]==0){return false;}else{return true;};
};