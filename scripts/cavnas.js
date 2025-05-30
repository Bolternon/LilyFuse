const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const texture=document.getElementById("textures");
const graphics=new Image();graphics.src="./atlas.png";
const instance=setInterval(frameStart,(1000/30));
function drawSprite(gx,gy,x,y,w,h){
    ctx.drawImage(graphics,gx,gy,w,h,x,y,w,h);
};
function initialize(){
    graphicsLoaded=true;
};
graphics.onload=()=>{
    initialize();
};
function frameStart(){
    if(graphicsLoaded){
        if(titleScreen){
            displayMainMenu();
        }else{
            if(mainMenu){
                displayMainMenu();
            }else{
                if(!pastMenu){
                    displayMainMenu();
                }else{
                    if(menuA==0){
                        if(menuB==0){
                            game00();
                        };
                        if(menuB==1){
                            game01();
                        };
                    };
                };
            };
        };
    };
};