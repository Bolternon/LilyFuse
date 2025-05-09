const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const texture = document.getElementById("textures");
const width = 256;
const height = 192;
const graphics = new Image(); graphics.src = "./atlas.png";
const spritesheet = [
    {"name":"bg","posX":0,"poxY":0,"width":16,"height":16},
    {"name":"field","posX":16,"poxY":0,"width":10,"height":10},
    {"name":"cursor","posX":26,"poxY":0,"width":10,"height":10},
    {"name":"blank","posX":36,"poxY":0,"width":10,"height":10},
    {"name":"flash","posX":46,"poxY":0,"width":10,"height":10},
    {"name":"clino","posX":0,"poxY":16,"width":10,"height":10},
    {"name":"mala","posX":10,"poxY":16,"width":10,"height":10},
    {"name":"gold","posX":20,"poxY":16,"width":10,"height":10},
    {"name":"obsid","posX":30,"poxY":16,"width":10,"height":10},
    {"name":"flame","posX":40,"poxY":16,"width":10,"height":10},
    {"name":"ice","posX":50,"poxY":16,"width":10,"height":10},
    {"name":"cloner","posX":60,"poxY":16,"width":10,"height":10},
    {"name":"lilyclino","posX":0,"poxY":26,"width":10,"height":10},
    {"name":"lilymala","posX":10,"poxY":26,"width":10,"height":10},
    {"name":"lilygold","posX":20,"poxY":26,"width":10,"height":10},
    {"name":"lilyobsid","posX":30,"poxY":26,"width":10,"height":10},
    {"name":"lilyflame","posX":40,"poxY":26,"width":10,"height":10},
    {"name":"lily","posX":50,"poxY":26,"width":10,"height":10},
    {"name":"block","posX":60,"poxY":26,"width":10,"height":10},
];
function drawSprite(name,x,y) {
    const sprite = spritesheet.find(i => i.name == name);
    ctx.drawImage(graphics,sprite.posX,sprite.poxY,sprite.width,sprite.height,x,y,sprite.width,sprite.height);
};
function initialize() {
    
};
graphics.onload = () => {
    initialize();
};
