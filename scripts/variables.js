let controller=[['W','S','A','D','4','5','6','ENTER'],['I','K','J','L','7','8','9',' ']];let players=2;let inputQueue=[];
let graphicsLoaded=false;let titleScreen=true;let mainMenu=true;let pastMenu=false;let menuA=0;let menuB=0;let player=[0,1];let coords=[[1,9,0,0],[1,9,0,0]];
let playerLoaded=false;let playerField=[];let nextRow=[];let fieldPos=0;let fieldScrollSpeed=10;let fieldScrollTimer=0;let scrollOffset=0;let forceScroll=false;
let score=[];let essence=[];let time=0;let tick=[];let combo=[];let gauge=[];let mult=[];let price=1;let ice=[];
let cursor=[];let cursorPulsate=0;let tilesAvailable=3;let isPaused=false;let winner=[];let countdown=0;let gameStart=false;let gameOver=false;
let fade=255;