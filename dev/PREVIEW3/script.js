const ROM_DATA = {
  "skins":[
    {"x":512,"y":0}
  ],
  "charaField":[
    [{"x":512,"y":128},{"x":704,"y":128}],
    [{"x":896,"y":128},{"x":1088,"y":128}],
    [{"x":384,"y":512},{"x":384,"y":896}],
    [{"x":0,"y":512},{"x":0,"y":896}],
    [{"x":192,"y":512},{"x":192,"y":896}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}]
  ],
  "charaCutin":[
    [{"x":736,"y":992},{"x":896,"y":992}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":736,"y":992},{"x":896,"y":992}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}],
    [{"x":0,"y":0},{"x":0,"y":0}]
  ],
  "charaWin":[
    {"x":1280,"y":0},
    {"x":0,"y":0},
    {"x":1280,"y":400},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0},
    {"x":0,"y":0}
  ],
  "backgrounds":[],
  "game_banner":{
    "endless":{"x":1216,"y":800},
    "vs":{"x":1344,"y":800},
    "puzzle":{"x":1472,"y":800},
    "round":[]
  },
  "game_score":{"x":928,"y":0},
  "debug":{"x":576,"y":512},
  "game_countdown":{"x":1088,"y":0},
  "game_countdown_go":{"x":960,"y":64},
  "winlose":{"x":576,"y":992},
  "text_white":{"x":0,"y":1280},
  "pause_vs":{"x":1056,"y":992},
  "pause":{"x":160,"y":384}
};
const ROM = new Image();
const RAM = document.getElementById("RAM");
const DISPLAY = document.getElementById("GAME");
const CTX = DISPLAY.getContext("2d");
let controller = [
  {
    "_up":"W",
    "_down":"S",
    "_left":"A",
    "_right":"D",
    "_b":"5",
    "_a":"6"
  },
  {
    "_up":"I",
    "_down":"K",
    "_left":"J",
    "_right":"L",
    "_b":"8",
    "_a":"9"
  }
];
let inputArray = [];
function pageLoad() {
  /*Initialize Input Stream*/{
    document.addEventListener("keydown", (e) => {
      function removeDuplicatesFrom(array) {
        return Array.from(new Set(array));
      };
      (typeof e).toString() == "object" ? inputArray[inputArray.length] = e.key.toUpperCase(): inputArray[inputArray.length] = e;
      inputArray = removeDuplicatesFrom(inputArray);
    });
    document.addEventListener("keyup", (ex) => {
      inputArray = inputArray.filter(e => e !== ex.key.toUpperCase());
    });
  };
  /*Load the Atlas PNG into the ROM*/{
    ROM.src = "./atlas.png";
    ROM.onload = () => {
      setNewScene(-1,"debug",[ROM_DATA.debug]);
      setInterval(main,(1000/30));
    };
  };
};
function setNewScene(new_scene, RAM_SETUP, RAM_REQUEST) {
  let transmit = RAM.getContext("2d");
  switch(RAM_SETUP) {
    case "debug":{
      RAM.width = 640; RAM.height = 480;
      transmit.drawImage(ROM,RAM_REQUEST[0].x,RAM_REQUEST[0].y,640,480,0,0,640,480);
      screen_fade = 0;
      game_scene = new_scene;
    };break;
    case "game":{
      RAM.width = 1520; RAM.height = 1184;
      transmit.drawImage(ROM,RAM_REQUEST[0].x,RAM_REQUEST[0].y,160,64,416,0,160,64);/*Score*/
      transmit.drawImage(ROM,RAM_REQUEST[1].x,RAM_REQUEST[1].y,416,128,0,0,416,128);/*Skin*/
      transmit.drawImage(ROM,RAM_REQUEST[2].x,RAM_REQUEST[2].y,192,384,0,128,192,384);/*Player1*/
      transmit.drawImage(ROM,RAM_REQUEST[3].x,RAM_REQUEST[3].y,192,384,192,128,192,384);/*Player2*/
      transmit.drawImage(ROM,RAM_REQUEST[4].x,RAM_REQUEST[4].y,192,128,384,128,192,128);/*Ready321*/
      transmit.drawImage(ROM,RAM_REQUEST[5].x,RAM_REQUEST[5].y,128,64,384,256,128,64);/*GO*/
      transmit.drawImage(ROM,RAM_REQUEST[6][0].x,RAM_REQUEST[6][0].y,160,240,0,544,160,240);/*P1Win*/
      transmit.drawImage(ROM,RAM_REQUEST[6][1].x,RAM_REQUEST[6][1].y,160,240,160,544,160,240);/*P1Lose*/
      transmit.drawImage(ROM,RAM_REQUEST[7][0].x,RAM_REQUEST[7][0].y,160,240,320,544,160,240);/*P2Win*/
      transmit.drawImage(ROM,RAM_REQUEST[7][1].x,RAM_REQUEST[7][1].y,160,240,480,544,160,240);/*P2Lose*/
      transmit.drawImage(ROM,RAM_REQUEST[8].x,RAM_REQUEST[8].y,360,400,0,784,360,400);/*P1Text*/
      transmit.drawImage(ROM,RAM_REQUEST[9].x,RAM_REQUEST[9].y,360,400,360,784,360,400);/*P2Text*/
      transmit.drawImage(ROM,RAM_REQUEST[10].x,RAM_REQUEST[10].y,160,192,384,320,160,192);/*WinLose*/
      transmit.drawImage(ROM,RAM_REQUEST[11].x,RAM_REQUEST[11].y,128,32,544,480,128,32);/*GameBanner*/
      transmit.drawImage(ROM,RAM_REQUEST[12].x,RAM_REQUEST[12].y,512,256,720,544,512,256);/*PauseMenu*/
      transmit.drawImage(ROM,RAM_REQUEST[13].x,RAM_REQUEST[13].y,1520,32,0,512,1520,32);/*WinFont*/
      transmit.drawImage(ROM,RAM_REQUEST[14].x,RAM_REQUEST[14].y,352,128,720,800,352,128);/*Pause*/
      //transmit.drawImage(ROM,RAM_REQUEST[15].x,RAM_REQUEST[15].y,640,480,576,0,640,480);/*Background*/
      screen_fade = 255;
      game_scene = new_scene;
    };break;
  };
};
let game_scene = 0;
let screen_fade = 255;
let sceneframe1 = true;
function main() {
  CTX.clearRect(0,0,640,480);
  switch(game_scene) {
    case -1: debugMenu(); break;
    case 0: /**/ break;
    case 1: /*Title Opening*/ break;
    case 2: /*Title Screen*/ break;
    /*...*/
    case 9: game1Pvs2P(); break;
  };
  CTX.fillStyle = `rgba(0, 0, 0, ${screen_fade/255})`;
  CTX.fillRect(0,0, 640,480);
};

let debug_pointer = 2;
function debugMenu() {
  CTX.drawImage(RAM,0,0);
  CTX.font = "20px sans-serif";
  CTX.fillStyle = "white";
  CTX.fillText("Refactored:",0,20);
  CTX.fillText("Lilyfuse   [PREVIEW3]",0,40);
  CTX.fillText("~~Debug Menu~~",0,70);
  CTX.fillText("Developed by ZetcherGames",0,460);
  CTX.fillText("©Zetcher 2025 [DO NOT LEAK]",0,480);
  for (let i = 0; i < inputArray.length; i++)
  switch (inputArray[i]) {
    case controller[0]._up:{
      if (debug_pointer > 0) debug_pointer--;
    }; break;
    case controller[0]._down:{
      if (debug_pointer < 2) debug_pointer++;
    }; break;
    case controller[0]._left:{
      if (debug_pointer == 0 && menu_char_select[0] > 0) menu_char_select[0]--;
      if (debug_pointer == 1 && menu_char_select[1] > 0) menu_char_select[1]--;
    }; break;
    case controller[0]._right:{
      if (debug_pointer == 0 && menu_char_select[0] < 19) menu_char_select[0]++;
      if (debug_pointer == 1 && menu_char_select[1] < 19) menu_char_select[1]++;
    }; break;
    case controller[0]._b:
    case controller[0]._a:{
      switch(debug_pointer) {
        case 2:setNewScene(9,"game",[
          ROM_DATA.game_score,
          ROM_DATA.skins[0],
          ROM_DATA.charaField[menu_char_select[0]][0],
          ROM_DATA.charaField[menu_char_select[1]][1],
          ROM_DATA.game_countdown,
          ROM_DATA.game_countdown_go,
          ROM_DATA.charaCutin[menu_char_select[0]],
          ROM_DATA.charaCutin[menu_char_select[1]],
          ROM_DATA.charaWin[menu_char_select[0]],
          ROM_DATA.charaWin[menu_char_select[1]],
          ROM_DATA.winlose,
          ROM_DATA.game_banner.vs,
          ROM_DATA.pause_vs,
          ROM_DATA.text_white,
          ROM_DATA.pause,
          /*ROM_DATA.backgrounds[0]*/
        ]);;break
      };
    }; break;
  };
  const characters = [
    "DJ 155",
    "Xor",
    "Vivi",
    "Bug",
    "Orbl",
    "Mark",
    "DJ 511",
    "8Ball",
    "RedShirt",
    "Kerkan",
    "Colly",
    "Four",
    "Six",
    "Zero",
    "Nebulus",
    "Catbomb",
    "Vending Machine 1",
    "Vending Machine 2",
    "Vending Machine 3",
    "Vending Machine 4"
  ];
  let menu = [
    `Set Player1: <${characters[menu_char_select[0]]}>`,
    `Set Player2: <${characters[menu_char_select[1]]}>`,
    `Launch 2-Player VS.`
  ];
  for (let i = 0; i < 3; i++) {
    if (debug_pointer == i) menu[i] = `> `+ menu[i];
    CTX.fillText(menu[i],0,100+(i*20));
  };
};


class GameField {
  constructor(player_position, game_speed = 5) {
    this.canvas_position = player_position == 0 ? 32 : 416;
    this.field_canvas = document.createElement("canvas");
    this.field_canvas.width = 192;
    this.field_canvas.height = 384;
    this.field_ctx = this.field_canvas.getContext("2d");
    this.field_data = this.populate();
    this.field_fall = 0;
    this.field_shake = 0;
    this.field_clear = 0;
    this.field_texture = player_position == 0 ? 0 : 192;
    this.queue_canvas = document.createElement("canvas");
    this.queue_canvas.width = 192;
    this.queue_canvas.height = 64;
    this.queue_ctx = this.queue_canvas.getContext("2d");
    this.queue_next_canvas = document.createElement("canvas");
    this.queue_next_canvas.width = 64;
    this.queue_next_canvas.height = 32;
    this.queue_next_ctx = this.queue_next_canvas.getContext("2d");
    this.queue_next_position = player_position == 0 ? 240 : 336;
    this.queue = {
      "current":[1,2],
      "next":[3,4]
    };
    this.queue_rng = this.splitmix32(session.seed);
    this.game_cursor = {
      "pos":2,
      "lag":0,
      "wait":0,
      "swap":0,
      "delay":0,
      "timer":0,
      "descend":0,
      "speed":game_speed,
      "dropped":false
    };
    this.score_position = {
      "x":player_position == 0 ? 240 : 272,
      "y":player_position == 0 ? 144 : 176
    };
    this.score_canvas = document.createElement("canvas");
    this.score_canvas.width = 128;
    this.score_canvas.height = 32;
    this.score_ctx = this.score_canvas.getContext("2d");
    this.score = 0;
    this.game_wait = 0;
    this.game_turnmode = 0;
    this.game_frame1 = true;
    this.game_chain = 0;
    this.game_clears = 0;
    this.game_lowest_clear = 0;
    this.essence_canvas = document.createElement("canvas");
    this.essence_canvas.width = 32;
    this.essence_canvas.height = 192;
    this.essence_ctx = this.essence_canvas.getContext("2d");
    this.essence_position = player_position == 0 ? 240 : 368;
    this.essence_rng = this.splitmix32(session.seed);
    this.essence_cleared = false;
    this.essence = {
      "rows":0,
      "giving":0,
      "getting":0
    };
    this.attack_color = DATA_CHAR_STAT[menu_char_select[player_position]].type;
    this.attack_mult = DATA_CHAR_STAT[menu_char_select[player_position]].dmg[DATA_CHAR_STAT[menu_char_select[1-player_position]].type]
    this.cpu_rng = this.splitmix32(session.seed);
  };
  populate() {
    let field = [];
    for (let y = 0; y < 12; y++) {
      field[y] = [];
      for (let x = 0; x < 6; x++) {
        field[y][x] = {
          "id":0,
          "infused":false,
          "essence":false,
          "clear":false
        };
      };
    };
    return field;
  };
  splitmix32(a) {
    return function() {
      a |= 0;
      a = a + 0x9e3779b9 | 0;
      let t = a ^ a >>> 16;
      t = Math.imul(t, 0x21f0aaad);
      t = t ^ t >>> 15;
      t = Math.imul(t, 0x735a2d97);
      return Math.round((((t = t ^ t >>> 15) >>> 0) / 4294967296) * 100000);
    };
  };
  scanTopRow() {
    for (let i = 0; i < 6; i++)
    if (this.field_data[0][i].id > 0) {
      return true;
    };
  };
  pushQueue() {
    this.queue.current = [this.queue.next[0],this.queue.next[1]];
    for (let i = 0; i < 2; i++) {
      let r = this.queue_rng() % 16;
      if (r == 15) this.queue.next[i] = 6;
      else this.queue.next[i] = (r % 5) + 1;
    };
  };
  dropQueue() {
    for (let x = this.game_cursor.pos; x < this.game_cursor.pos+2; x++)
    for(let y = 11; y >= 0; y--)
    if (this.field_data[y][x].id == 0) {
      this.field_data[y][x] = {
        "id":this.queue.current[x - this.game_cursor.pos],
        "infused":false,
        "essence":false,
        "clear":false
      };
      break;
    };
  };
  drawQueue() {
    this.queue_next_ctx.clearRect(0,0,64,32);
    for (let i = 0; i < 2; i++)
    this.queue_next_ctx.drawImage(RAM,(this.queue.next[i] - 1) * 32,0,32,32,i*32,0,32,32);
    CTX.fillStyle = `rgba(0, 0, 0, 0.5)`;
    CTX.fillRect(this.queue_next_position-2,62, 68,36);
    CTX.drawImage(this.queue_next_canvas,this.queue_next_position,64);
  };
  sendDamage(player_position) {
    this.game_chain = 0;
    p[1 - player_position].essence.getting += this.essence.giving;
    this.essence.giving = 0;
  };
  makeDamage(player_position) {
    this.game_chain++;
    let calc_score = 0;
    let score_table = {
      "ore":0,
      "ore_p":0,
      "lily":0,
      "infused":0,
      "infused_p":0,
      "infused_o":0
    };
    for (let y = 0; y < 12; y++)
    for (let x = 0; x < 6; x++)
    if (this.field_data[y][x].clear)
    if (!this.field_data[y][x].essence || (this.field_data[y][x].id > 6 && this.field_data[y][x].infused) || this.field_data[y][x].id > 0) {
      if (this.field_data[y][x].id == (this.attack_color + 1)) {
        /*If Ore == Player Color*/
        /*calc_score += 50;*/
        score_table.ore_p++;
      }else if (this.field_data[y][x].id < 6) {
        /*If Ore != Player Color*/
        /*calc_score += 10;*/
        score_table.ore++;
      }else if (this.field_data[y][x].id == 6) {
        /*If Water Lily*/
        /*calc_score += 500;*/
        score_table.lily++;
      }else if ((this.field_data[y][x].id == (this.attack_color + 7) && this.field_data[y][x].infused)) {
        /*If Infused Lily == Player Color*/
        /*calc_score += 2500;*/
        score_table.infused_p++;
      }else if ((this.field_data[y][x].id == (p[1 - player_position].attack_color + 7) && this.field_data[y][x].infused)) {
        /*If Infused Lily == Opponent Color*/
        /*calc_score += 1000 * this.attack_mult;*/
        score_table.infused_o++;
      }else if (this.field_data[y][x].id > 6 && this.field_data[y][x].infused) {
        /*If Infused Lily != Player/Opponent Color*/
        /*calc_score += 1000;*/
        score_table.infused++;
      }else if (this.field_data[y][x].id > 6 && !this.field_data[y][x].infused) {
        /*If Water Lily (Infused Same Turn)*/
        /*calc_score += 500;*/
        score_table.lily++;
      };
      let base_power = (score_table.ore * 10) + (score_table.ore_p * 50) + (score_table.lily * 250);
      let infused_power = (score_table.infused * 500) + (score_table.infused_p * 1500) + (score_table.infused_o * (500 * this.attack_mult));
      calc_score = (base_power + infused_power) * Math.floor((this.game_chain * this.game_clears) / 2);
      this.essence.giving += Math.floor((calc_score)/400);
    };
    this.score += calc_score;
  };
  clearEssence() {
    for (let x = 0; x < 6; x++) {
      this.field_data[12-this.essence.rows][x].id = (this.essence_rng() % 5) + 1;
      this.field_data[12-this.essence.rows][x].clear = true;
    };
    this.essence.rows--;
    this.essence_cleared = true;
  };
  pushEssence() {
    for (let y = 0; y < 11; y++) this.field_data[y] = this.field_data[y+1];
    this.field_data[11] = [];
    for (let x = 0; x < 6; x++) {
      this.field_data[11][x] = {
        "id":12,
        "infused":false,
        "essence":true,
        "clear":false
      };
    };
    this.essence.rows++;
  };
  drawEssence(giving) {
    this.essence_ctx.clearRect(0,0,32,192);
    let e = this.essence.getting + giving;
    for (let i = 5; i >= 0; i--) {
      let y = 0;
      if (e >= 18) e -= 18;
      else if (e >= 6) {
        y = 32;
        e -= 6;
      }else if (e > 0) {
        y = 64;
        e -= 1;
      }else y = 96;
      this.essence_ctx.drawImage(RAM,384,y,32,32,0,i * 32,32,32);
    };
    CTX.drawImage(this.essence_canvas,this.essence_position,256);
  };
  drawScore(player_position) {
    this.score_ctx.clearRect(0,0,128,32);
    let n = "00000000".slice(this.score.toString().length)+this.score.toString();
    for (let i = 0; i < 8; i++)
    this.score_ctx.drawImage(RAM,416+((n.charCodeAt(i)-48)*16),player_position * 32,16,32,i * 16,0,16,32);
    CTX.drawImage(this.score_canvas,this.score_position.x,this.score_position.y);
  };
  drawCursor() {
    this.queue_ctx.clearRect(0,0,192,64);
    this.queue_ctx.drawImage(RAM,(this.queue.current[0] - 1) * 32,0,32,32,(this.game_cursor.pos * 32) + (this.game_cursor.swap * 8),this.game_cursor.timer,32,32);
    this.queue_ctx.drawImage(RAM,(this.queue.current[1] - 1) * 32,0,32,32,((this.game_cursor.pos + 1) * 32) - (this.game_cursor.swap * 8),this.game_cursor.timer,32,32);
    CTX.drawImage(this.queue_canvas,this.canvas_position,32);
  };
  drawLoser(player_position) {
    CTX.drawImage(RAM,(player_position * 320) + 160,544,160,240,this.canvas_position + 16,192,160,240);
  };
  drawWinner(player_position) {
    CTX.drawImage(RAM,player_position * 320,544,160,240,this.canvas_position + 16,192 - session.descend,160,240);
  };
  drawWinLose(player_position) {
    CTX.drawImage(RAM,384,320+(player_position==session.winner?0:96),160,96,
    (this.canvas_position+16)-session.win_pulse,80-session.win_pulse,160+(session.win_pulse*2),96+(session.win_pulse*2));
  };
  drawField() {
    this.field_ctx.clearRect(0,0,192,384);
    this.field_ctx.drawImage(RAM,this.field_texture,128,192,384,0,0,192,384);
    if (!session.paused)
    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 6; x++) {
        if (this.field_data[y][x].id != 0 && !this.field_data[y][x].clear) {
          this.field_ctx.drawImage(RAM,(this.field_data[y][x].id - 1) * 32,this.field_data[y][x].essence ? 64 : 0,32,32,x*32,(y*32) + this.field_shake,32,32);
        };
      };
    };
    CTX.fillStyle = `rgba(0, 0, 0, 0.5)`;
    CTX.fillRect(this.canvas_position-2,62+this.field_fall, 196,388);
    CTX.drawImage(this.field_canvas,this.canvas_position,64+this.field_fall);
  };
  drawClear() {
    if (!session.paused)
    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 6; x++) {
        if (this.field_data[y][x].clear) {
          if (!this.field_data[y][x].essence)
          this.field_ctx.drawImage(RAM,(this.field_data[y][x].id - 1) * 32,(this.field_clear % 2) * 32,32,32,x*32,(y*32) + this.field_shake,32,32);
          else
          this.field_ctx.drawImage(RAM,(this.field_data[y][x].id - 1) * 32,((this.field_clear % 2) * 32) + 64,32,32,x*32,(y*32) + this.field_shake,32,32);
        };
      };
    };
    CTX.drawImage(this.field_canvas,this.canvas_position,64);
  };
};







let session = 0;
let p = [];
class GameSession {
  constructor() {
    this.start = false;
    this.paused = false;
    this.pause_wait = 0;
    this.pause_select = 0;
    this.pause_select_wait = 0;
    this.pause_exit = false;
    this.wait = 0;
    this.countdown = 4;
    this.counttime = 800;
    this.waitcount = 30;
    this.time = 0;
    this.score = 0;
    this.seed = 0;
    this.gameover = false;
    this.descend = 432;
    this.winner = 0;
    this.win_pulse = 0;
    this.win_alt = true;
    this.win_delay = 150;
    this.win_chara_pos = 360;
    this.win_text_at = 1;
    this.win_select = 0;
    this.win_select_wait = 0;
    this.win_exit = false;
  };
};



















function game1Pvs2P() {
  if (sceneframe1) {
    session = 0;
    session = new GameSession();
    p = [];
    p[0] = new GameField(0);
    p[1] = new GameField(1);
    for (let t = 0; t < 2; t++) {
      p[t].pushQueue();
    };
    sceneframe1 = false;
  };
  CTX.drawImage(RAM,544,480,128,32,256,16,128,32);
  if (!session.start)
  /*Begin Countdown*/{
    for (let t = 0; t < 2; t++) {
      p[t].drawField();
      p[t].drawQueue();
    };
    if (screen_fade > 0) screen_fade -= 16;
    else if (session.countdown == 4) {
      CTX.drawImage(RAM,384,128,192,64,224-(session.counttime/2),192-(session.counttime/4),192+session.counttime,64+(session.counttime/2));
      if(session.counttime>0)session.counttime-=32;
      else if(session.waitcount>0)session.waitcount--;else{session.counttime=480;session.waitcount=4;session.countdown =3;};
    }else if(session.countdown>0) {
      CTX.drawImage(RAM,384+((3-session.countdown)*64),192,64,64,288-(session.counttime/2),192-(session.counttime/2),64+session.counttime,64+session.counttime);
      if(session.counttime>0)session.counttime-=32;
      else if(session.waitcount>0)session.waitcount--;else{session.counttime=480;session.waitcount=4;session.countdown--;};
    }else if(session.countdown==0){
      CTX.drawImage(RAM,384,256,128,64,256-(session.counttime/2),192-(session.counttime/2),128+session.counttime,64+session.counttime);
      if(session.counttime>0)session.counttime-=32;else if(session.waitcount>0)session.waitcount--;
      else{for(let t=0;t<2;t++)p[t].pushQueue();session.start=true;};
    };
  }else if (session.paused)
  /*Pause The Game*/{
    for (let t = 0; t < 2; t++) {
      p[t].drawField();
      p[t].drawScore(t);
      p[t].drawEssence(p[1-t].essence.giving);
    };
    /*Darken Screen*/{
      CTX.fillStyle = `rgba(0, 0, 0, 0.75)`;
      CTX.fillRect(0,0, 640,480);
      CTX.drawImage(RAM,720,800,352,128,144,64,352,128);
    };
    for (let i = 0; i < 4; i++) CTX.drawImage(RAM,720+(i==session.pause_select?256:0),544+(i*64),256,64,192,192+(i*64),256,64);
    if (!session.pause_exit)
    /*Players' Pause Inputs*/{
      for (let t = 0; t < 2; t++) for (let i = 0; i < inputArray.length; i++)
      switch(inputArray[i]) {
        case controller[t]._up:/*Navigate Up*/{
          if (session.pause_select_wait <= 0) {
            if (session.pause_select > 0) {
              session.pause_wait = 0;session.pause_select_wait = 4;session.pause_select--;
            };
          };
        };break;
        case controller[t]._down:/*Navigate Down*/{
          if (session.pause_select_wait <= 0) {
            if (session.pause_select < 3) {
              session.pause_wait = 0;session.pause_select_wait = 4;session.pause_select++;
            };
          };
        };break;
        case controller[t]._b:/*Cancel (Resume)*/{
          if (session.pause_wait <= 0) {
            session.pause_wait = 10;session.pause_select_wait = 0;session.paused = false;
          };
        };break;
        case controller[t]._a:/*Select*/{
          if (session.pause_wait <= 0) {
            switch(session.pause_select) {
              case 0:{session.pause_wait = 10;session.pause_select_wait = 0;session.paused = false;};break;
              case 1:case 2:case 3:{session.pause_exit = true;};break;
            };
          };
        };break;
      };
    }
    else
    /*Exit Game To Other Scene*/{
      if (screen_fade >= 255)
      switch(session.pause_select) {
        case 1:{
          /*TODO*/
        };break;
        case 2:{
          /*TODO*/
        };break;
        case 3:{
          /*TODO*/
        };break;
      }else screen_fade += 64;
    };
    /*Process Delays*/{
      if (session.pause_wait > 0) session.pause_wait--;
      if (session.pause_select_wait > 0) session.pause_select_wait--;
    };
  }else if (!session.gameover)
  /*Determine Turn Phase*/{
    for (let t = 0; t < 2; t++)
    switch(p[t].game_turnmode) {
      case 0:/*Player Control*/{
        p[t].drawField();
        p[t].drawQueue();
        p[t].drawCursor();
        p[t].drawScore(t);
        p[t].drawEssence(p[1-t].essence.giving);
        if (p[t].scanTopRow()) {
          session.winner = 1 - t;
          session.gameover = true;
        };
        p[t].game_cursor.dropped = false;
        /*Process Player Input Functions*/{
          for (let i = 0; i < inputArray.length; i++)
          switch(inputArray[i]) {
            case controller[t]._up:
            case controller[t]._down:/*Drop Queue*/{
              p[t].dropQueue();
              p[t].game_cursor.timer = 0;
              p[t].game_cursor.descend = 0;
              p[t].game_cursor.delay = 0;
              p[t].game_cursor.dropped = true;
              p[t].field_shake = 16;
              p[t].game_wait = 3;
              p[t].game_turnmode = 1;
            }; break;
            case controller[t]._left:/*Move Queue Left*/{
              if (p[t].game_cursor.pos > 0 && p[t].game_cursor.lag <= 0){
                p[t].game_cursor.pos--;
                p[t].game_cursor.lag = 3;
              };
            }; break;
            case controller[t]._right:/*Move Queue Right*/{
              if (p[t].game_cursor.pos < 4 && p[t].game_cursor.lag <= 0){
                p[t].game_cursor.pos++;
                p[t].game_cursor.lag = 3;
              };
            }; break;
            case controller[t]._b:/*Pause Session*/{
              if (session.pause_wait <= 0) {
                session.pause_wait = 10;
                session.paused = true;
              };
            }; break;
            case controller[t]._a:/*Swap Queues*/{
              if (p[t].game_cursor.swap == 0 && p[t].game_cursor.wait <= 0){
                p[t].game_cursor.swap++;
                p[t].game_cursor.wait = 4;
              };
            }; break;
          };
        };
        /*Process Animations/Delays From The Inputs*/{
          if (session.pause_wait > 0) session.pause_wait--;
          if (p[t].game_cursor.lag > 0) p[t].game_cursor.lag--;
          if (p[t].game_cursor.swap == 0 && p[t].game_cursor.wait > 0) p[t].game_cursor.wait--;
          if (p[t].game_cursor.swap < 3) if (p[t].game_cursor.swap > 0) p[t].game_cursor.swap++;
          else; else {
            p[t].game_cursor.swap = 0;
            p[t].queue.current = [p[t].queue.current[1],p[t].queue.current[0]]
          };
          if (p[t].game_cursor.descend < p[t].game_cursor.speed) p[t].game_cursor.descend++;
          else {
            p[t].game_cursor.descend = 0;
            p[t].game_cursor.timer++;
          };
          if (p[t].game_cursor.timer == 32 && !p[t].game_cursor.dropped) {
            p[t].dropQueue();
            p[t].game_cursor.timer = 0;
            p[t].game_cursor.descend = 0;
            p[t].game_cursor.delay = 0;
            p[t].field_shake = 16;
            p[t].game_wait = 3;
            p[t].game_turnmode = 1;
          };
        };
      }; break;
      case 1:/*Drop Queue Animation*/{
        if (p[t].game_frame1) {
          if (p[t].essence.getting >= 6) {
            p[t].pushEssence();
            p[t].essence.getting -= 6;
            p[t].field_shake = 0;
            p[t].game_wait = 7;
          };
          p[t].game_frame1 = false;
        };
        p[t].drawField();
        p[t].drawQueue();
        p[t].drawScore(t);
        p[t].drawEssence(p[1-t].essence.giving);
        /*Process Animations*/{
          if (p[t].field_shake > 0) p[t].field_shake -= 4;
          else if (p[t].game_wait > 0) p[t].game_wait--;
          if (p[t].game_wait <= 0 && p[t].field_shake <= 0) {
            p[t].pushQueue();
            p[t].game_frame1 = true;
            p[t].game_turnmode = 2;
          };
        };
      }; break;
      case 2:/*Scan Field Data for Clears*/{
        p[t].drawField();
        p[t].drawQueue();
        p[t].drawScore(t);
        p[t].drawEssence(p[1-t].essence.giving);
        p[t].game_clears = 0;
        /*Scan For Clears*/{
          p[t].game_lowest_clear = 0;
          p[t].game_clears += VerticalScan("+",t);
          p[t].game_clears += HorizontalScan("+",t);
          p[t].game_clears += DiagonalScan_B("+",t);
          p[t].game_clears += DiagonalScan_F("+",t);
          if (p[t].game_clears > 0) p[t].makeDamage(t); else p[t].sendDamage(t);
          if (p[t].game_lowest_clear < 11 && p[t].game_lowest_clear == (11 - p[t].essence.rows)) p[t].clearEssence();
        };
        /*Determine If Clears Are Detected*/{
          if (p[t].game_clears == 0) p[t].game_turnmode = 0;
          else {
            p[t].game_turnmode = 3;
            p[t].field_clear = 15;
          };
        };
      }; break;
      case 3:/*Do Clear Animation & Gravity*/{
        p[t].drawField();
        p[t].drawQueue();
        p[t].drawClear();
        p[t].drawScore(t);
        p[t].drawEssence(p[1-t].essence.giving);
        /*Do CLear Animation*/{
          if (p[t].field_clear > 0) p[t].field_clear--;
        };
        /*Process Deleting/Adjusting Cleared Tiles*/{
          if (p[t].field_clear <= 0) {
            for (let y = 0; y < 12; y++)
            for (let x = 0; x < 6; x++)
            if (p[t].field_data[y][x].clear) {
              if (p[t].field_data[y][x].id > 6 && !p[t].field_data[y][x].infused){
                p[t].field_data[y][x].infused = true;
                p[t].field_data[y][x].clear = false;
              }else if (p[t].field_data[y][x].essence) {
                p[t].field_data[y][x].essence = false;
                p[t].field_data[y][x].clear = false;
              }else
              p[t].field_data[y][x] = {
                "id":0,
                "infused":false,
                "essence":false,
                "clear":false
              };
            };
            let fallCount = 0;
            /*Count Number Of Tiles Fallen*/{
              while (true) {
                let tempCount = 0;
                for (let y = 11; y > 0; y--)
                for (let x = 0; x < 6; x++)
                if (p[t].field_data[y][x].id <= 0 && p[t].field_data[y-1][x].id > 0) {
                  p[t].field_data[y][x] = p[t].field_data[y-1][x];
                  p[t].field_data[y-1][x] = {
                    "id":0,
                    "infused":false,
                    "essence":false,
                    "clear":false
                  };
                  tempCount++;
                };
                if (tempCount <= 0) break;
                else fallCount += tempCount;
              };
              if (p[t].essence_cleared) {
                p[t].essence_cleared = false;
                p[t].game_wait = 3;
                p[t].game_turnmode = 4;

              }else if (fallCount <= 0) p[t].game_turnmode = 0;
              else {
                p[t].field_shake = 16;
                p[t].game_wait = 3;
                p[t].game_turnmode = 4;
              };
            };
          };
        };
      }; break;
      case 4:/*Drop Tile Animation*/{
        p[t].drawField();
        p[t].drawQueue();
        p[t].drawScore(t);
        p[t].drawEssence(p[1-t].essence.giving);
        /*Process Animations*/{
          if (p[t].field_shake > 0) p[t].field_shake -= 4;
          else if (p[t].game_wait > 0) p[t].game_wait--;
          if (p[t].game_wait <= 0 && p[t].field_shake <= 0) p[t].game_turnmode = 2;
        };
      };
    };
  }else
  /*GameOver Screen*/{
    for (let t = 0; t < 2; t++) {
      if (t != session.winner) p[t].drawLoser(t);
      p[t].drawField();
      p[t].drawQueue();
      p[t].drawCursor();
      if (t == session.winner) p[t].drawWinner(t);
      p[t].drawScore(t);
      p[t].drawEssence(p[1-t].essence.giving);
      p[t].drawWinLose(t);
      if (t != session.winner && p[t].field_fall < 480) p[t].field_fall += Math.round((p[t].field_fall/5)+1);
      if (t == session.winner && session.descend > 0) session.descend = Math.floor(session.descend/1.2);
    };
    /*Pulsate The Win/Lose Board*/{
      if (session.win_alt) if (session.win_pulse < 16) session.win_pulse += .5; else session.win_alt = false;
      else if (session.win_pulse > 0) session.win_pulse -= .5; else session.win_alt = true;
    };
    /*Results Screen*/{
      if (session.win_delay <= 0) {
        CTX.fillStyle = `rgba(0, 0, 0, ${(360 - session.win_chara_pos)/720})`;
        CTX.fillRect(0,0, 640,480);
        CTX.drawImage(RAM,session.winner*360,784,360,400,0-session.win_chara_pos,80,360,400);
        CTX.fillRect(0,352, 640,128);
        if (session.win_chara_pos > 0) session.win_chara_pos = Math.floor(session.win_chara_pos/1.2);
        else {
          for (let i = 0; i < DATA_CHAR_STAT[menu_char_select[session.winner]].name.length; i++)
          CTX.drawImage(RAM,0+((DATA_CHAR_STAT[menu_char_select[session.winner]].name.charAt(i).charCodeAt()-32)*16),512,16,32,16+(i*16),360,16,32);
          let placeholder_text = "I am a test message! Plz replace with default character text from a setlist!";/*76 Chars Long*/
          for (let i = 0; i < session.win_text_at; i++) {
            let x = i; let y = 0;
            if (x >= 38) {
              x -= 38;
              y++;
            };
            CTX.drawImage(RAM,0+((placeholder_text.charAt(i).charCodeAt()-32)*16),512,16,32,16+(x*16),400+(y*32),16,32);
          };
          if (session.win_text_at < placeholder_text.length) session.win_text_at++;
        };
      }else {
        for (let i = 0; i < inputArray.length; i++)
        switch(inputArray[i]) {
          case controller[0]._b: case controller[1]._b: case controller[0]._a: case controller[1]._a:{
            if (session.win_delay <= 120) session.win_delay = 0;
          };break;
        };
        if (session.win_delay > 0) session.win_delay--;
      };
      if (session.win_text_at == 76) {
        for (let i = 0; i < 3; i++) CTX.drawImage(RAM,720+(i==session.win_select?256:0),608+(i*64),256,64,372,120+(i*64),256,64);
        if (!session.win_exit)
        /*Players' Inputs*/{
          for (let t = 0; t < 2; t++) for (let i = 0; i < inputArray.length; i++)
          switch(inputArray[i]) {
            case controller[t]._up:/*Navigate Up*/{
              if (session.win_select_wait <= 0) {
                if (session.win_select > 0) {
                  session.win_select_wait = 4;session.win_select--;
                };
              };
            };break;
            case controller[t]._down:/*Navigate Down*/{
              if (session.win_select_wait <= 0) {
                if (session.win_select < 2) {
                  session.win_select_wait = 4;session.win_select++;
                };
              };
            };break;
            case controller[t]._b: case controller[t]._a:/*Select*/{
              session.win_exit = true;
            };break;
          };
        }
        else
        /*Exit Game To Other Scene*/{
          if (screen_fade >= 255)
          switch(session.win_select) {
            case 0:{
              /*TODO*/
            };break;
            case 1:{
              /*TODO*/
            };break;
            case 2:{
              /*TODO*/
            };break;
          }else screen_fade += 64;
        };
        /*Process Delays*/{
          if (session.win_select_wait > 0) session.win_select_wait--;
        };
      };
    };
  };
};









































/*Reusable Tile Matching Functions*/
function VerticalScan(str, t = 0) {
  let clears = 0;
  for (let x = 0; x < 6; x++)
  for (let y = 0; y < 10; y++) {
    if (p[t].field_data[y][x].id <= 0 || p[t].field_data[y][x].id >= 6 || p[t].field_data[y][x].essence);
    else {
      let id = p[t].field_data[y][x].id; let i = 0; let l = [];
      while ((y + i) < 12)
      if (p[t].field_data[y+i][x].id == id || p[t].field_data[y+i][x].id >= 6) {
        l[i] = p[t].field_data[y+i][x].id;
        i++;
      }else break;
      if (l.length < 3);
      else {
        while (l.length >= 3 || l[0] != l[l.length-1])
        if (l[0] != l[l.length-1]) l.pop();
        else break;
        if (l.length > 2) {
          for (let c = 0; c < l.length; c++) {
            if (p[t].field_data[y+c][x].id > 6 && p[t].field_data[y+c][x].id != (id + 6)) {
              p[t].field_data[y+c][x].id = id + 6;
              p[t].field_data[y+c][x].infused = false;
            };
            if (p[t].field_data[y+c][x].id == 6) p[t].field_data[y+c][x].id = id + 6;
            if (!p[t].field_data[y+c][x].clear) clears++;
            p[t].field_data[y+c][x].clear = true;
            AdjacentScan(t,x,y+c,id);
          };
        };
      };
    };
  };
  switch (str) {
    case "+": return clears;
    case "?": return (clears > 0);
  };
};
function HorizontalScan(str, t = 0) {
  let clears = 0;
  for (let y = 0; y < 12; y++)
  for (let x = 0; x < 4; x++) {
    if (p[t].field_data[y][x].id <= 0 || p[t].field_data[y][x].id >= 6 || p[t].field_data[y][x].essence);
    else {
      let id = p[t].field_data[y][x].id; let i = 0; let l = [];
      while ((x + i) < 6)
      if (p[t].field_data[y][x+i].id == id || p[t].field_data[y][x+i].id >= 6) {
        l[i] = p[t].field_data[y][x+i].id;
        i++;
      }else break;
      if (l.length < 3);
      else {
        while (l.length >= 3 || l[0] != l[l.length-1])
        if (l[0] != l[l.length-1]) l.pop();
        else break;
        if (l.length > 2) {
          for (let c = 0; c < l.length; c++) {
            if (p[t].field_data[y][x+c].id > 6 && p[t].field_data[y][x+c].id != (id + 6)) {
              p[t].field_data[y][x+c].id = id + 6;
              p[t].field_data[y][x+c].infused = false;
            };
            if (p[t].field_data[y][x+c].id == 6) p[t].field_data[y][x+c].id = id + 6;
            if (!p[t].field_data[y][x+c].clear) clears++;
            p[t].field_data[y][x+c].clear = true;
            AdjacentScan(t,x+c,y,id);
          };
        };
      };
    };
  };
  switch (str) {
    case "+": return clears;
    case "?": return (clears > 0);
  };
};
function DiagonalScan_B(str, t = 0) {
  let clears = 0;
  for (let x = 0; x < 4; x++)
  for (let y = 0; y < 10; y++) {
    if (p[t].field_data[y][x].id <= 0 || p[t].field_data[y][x].id >= 6 || p[t].field_data[y][x].essence);
    else {
      let id = p[t].field_data[y][x].id; let i = 0; let l = [];
      while (((y + i) < 12) && ((x + i) < 6))
      if (p[t].field_data[y+i][x+i].id == id || p[t].field_data[y+i][x+i].id >= 6) {
        l[i] = p[t].field_data[y+i][x+i].id;
        i++;
      }else break;
      if (l.length < 3);
      else {
        while (l.length >= 3 || l[0] != l[l.length-1])
        if (l[0] != l[l.length-1]) l.pop();
        else break;
        if (l.length > 2) {
          for (let c = 0; c < l.length; c++) {
            if (p[t].field_data[y+c][x+c].id > 6 && p[t].field_data[y+c][x+c].id != (id + 6)) {
              p[t].field_data[y+c][x+c].id = id + 6;
              p[t].field_data[y+c][x+c].infused = false;
            };
            if (p[t].field_data[y+c][x+c].id == 6) p[t].field_data[y+c][x+c].id = id + 6;
            if (!p[t].field_data[y+c][x+c].clear) clears++;
            p[t].field_data[y+c][x+c].clear = true;
            AdjacentScan(t,x+c,y+c,id);
          };
        };
      };
    };
  };
  switch (str) {
    case "+": return clears;
    case "?": return (clears > 0);
  };
};
function DiagonalScan_F(str, t = 0) {
  let clears = 0;
  for (let y = 2; y < 12; y++)
  for (let x = 0; x < 4; x++) {
    if (p[t].field_data[y][x].id <= 0 || p[t].field_data[y][x].id >= 6 || p[t].field_data[y][x].essence);
    else {
      let id = p[t].field_data[y][x].id; let i = 0; let l = [];
      while (((y - i) >= 0) && ((x + i) < 6))
      if (p[t].field_data[y-i][x+i].id == id || p[t].field_data[y-i][x+i].id >= 6) {
        l[i] = p[t].field_data[y-i][x+i].id;
        i++;
      }else break;
      if (l.length < 3);
      else {
        while (l.length >= 3 || l[0] != l[l.length-1])
        if (l[0] != l[l.length-1]) l.pop();
        else break;
        if (l.length > 2) {
          for (let c = 0; c < l.length; c++) {
            if (p[t].field_data[y-c][x+c].id > 6 && p[t].field_data[y-c][x+c].id != (id + 6)) {
              p[t].field_data[y-c][x+c].id = id + 6;
              p[t].field_data[y-c][x+c].infused = false;
            };
            if (p[t].field_data[y-c][x+c].id == 6) p[t].field_data[y-c][x+c].id = id + 6;
            if (!p[t].field_data[y-c][x+c].clear) clears++;
            p[t].field_data[y-c][x+c].clear = true;
            AdjacentScan(t,x+c,y-c,id);
          };
        };
      };
    };
  };
  switch (str) {
    case "+": return clears;
    case "?": return (clears > 0);
  };
};
function AdjacentScan(t = 0, x, y, id) {
  for (let iy = 0; iy < 3; iy++) {
    for (let ix = 0; ix < 3; ix++)
    if (((y - 1 + iy) >= 0 && (y - 1 + iy) < 12) && ((x - 1 + ix) >= 0 && (x - 1 + ix) < 6))
    if ((iy == 0 && ix == 1) || (iy == 1 && ix == 0) || (iy == 1 && ix == 2) || (iy == 2 && ix == 1))
    if (
      p[t].field_data[y-1+iy][x-1+ix].id == 6 ||
      (p[t].field_data[y-1+iy][x-1+ix].id >= 6 && p[t].field_data[y-1+iy][x-1+ix].infused) ||
      (p[t].field_data[y-1+iy][x-1+ix].id >= 12 && !p[t].field_data[y-1+iy][x-1+ix].essence)
    ) p[t].field_data[y-1+iy][x-1+ix].clear = true;
  };
  if (y > p[t].game_lowest_clear) p[t].game_lowest_clear = y;
};





/*Character Game Data*/
const DATA_CHAR_STAT = [
  /*0:Red;1:Blue;2:Green;3:Yellow;4:Purple;5:Black;6:White*/
  {"name":"155","type":1,"dmg":[.5,1,2,.5,1,3,.5]},
  {"name":"xor","type":0,"dmg":[1,2,.5,2,1,3,.5]},
  {"name":"viv","type":4,"dmg":[.5,.5,2,3,1,3,.5]},
  {"name":"bug","type":2,"dmg":[2,.5,1,1,2,3,.5]},
  {"name":"orb","type":3,"dmg":[2,2,.5,1,3,3,1]},
  {"name":"mrk","type":5,"dmg":[1,1,1,1,1,1,1]},
  {"name":"511","type":3,"dmg":[1,1,1,1,1,1,1]},
  {"name":"8bl","type":4,"dmg":[1,1,1,1,1,1,1]},
  {"name":"red","type":0,"dmg":[1,1,1,1,1,1,1]},
  {"name":"krk","type":3,"dmg":[1,1,1,1,1,1,1]},
  {"name":"col","type":1,"dmg":[1,1,1,1,1,1,1]},
  {"name":"dv4","type":0,"dmg":[1,1,1,1,1,1,1]},
  {"name":"dv6","type":2,"dmg":[1,1,1,1,1,1,1]},
  {"name":"dv0","type":2,"dmg":[1,1,1,1,1,1,1]},
  {"name":"neb","type":6,"dmg":[1,1,1,1,1,1,1]},
  {"name":"cat","type":2,"dmg":[1,1,1,1,1,1,1]},
  {"name":"vm1","type":0,"dmg":[1,1,1,1,1,1,1]},
  {"name":"vm2","type":4,"dmg":[1,1,1,1,1,1,1]},
  {"name":"vm3","type":3,"dmg":[1,1,1,1,1,1,1]},
  {"name":"vm4","type":1,"dmg":[1,1,1,1,1,1,1]}
];


let menu_char_select = [0,2];