let inputQueue = [];
let fps = 30;
const instance = setInterval(frameStart,(1000/fps));
let gameStart = false;
let coords = [0,0];
let tileData = [
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
    [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
];
const tileList = [
    {"id":0,"name":"blank","move":true,"gravity":false},
    {"id":1,"name":"block","move":false,"gravity":false},
    {"id":2,"name":"cloner","move":false,"gravity":false},
    {"id":3,"name":"ice","move":true,"gravity":true},
    {"id":4,"name":"clino","move":true,"gravity":true},
    {"id":5,"name":"mala","move":true,"gravity":true},
    {"id":6,"name":"gold","move":true,"gravity":true},
    {"id":7,"name":"obsid","move":true,"gravity":true},
    {"id":8,"name":"flame","move":true,"gravity":true},
    {"id":9,"name":"lily","move":true,"gravity":true},
    {"id":10,"name":"lilyclino","move":true,"gravity":true},
    {"id":11,"name":"lilymala","move":true,"gravity":true},
    {"id":12,"name":"lilygold","move":true,"gravity":true},
    {"id":13,"name":"lilyobsid","move":true,"gravity":true},
    {"id":14,"name":"lilyflame","move":true,"gravity":true},
];
let tick = 0;
let time = 0;
let score = 0;
let combo = [0,0];
let price = 0;
let essence = 0;
let clonerCount = 0;
let workingCloners = 0;
let clonerQueue = [];
let gravityQueue = [];
let deleteQueue = [];
const gamemodes = [
    [
        [
            [[1,0,false,0,false,0],[1,0,false,0,false,0],[1,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[1,0,false,0,false,0],[1,0,false,0,false,0],[1,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[1,0,false,0,false,0],[2,0,false,0,false,0],[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0],[2,0,false,0,false,0],[1,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0]],
            [[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0]],
            [[8,0,false,0,false,0],[9,1,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0]],
            [[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0]],
            [[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0]],
        ],
        4,
        [
            [3,0,150,100,15],
            [4,0,150,150,15],
            [1,5,150,200,15],
            [6,5,150,250,15],
        ],
        1000
    ],
    [
        [
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[2,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[2,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[2,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[2,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[2,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[2,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[1,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[1,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[4,0,false,0,false,0],[9,1,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[8,0,false,0,false,0],[7,0,false,0,false,0],[6,0,false,0,false,0],[5,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[4,0,false,0,false,0],[5,0,false,0,false,0],[6,0,false,0,false,0],[7,0,false,0,false,0],[8,0,false,0,false,0],[9,1,false,0,false,0],[0,0,false,0,false,0]],
        ],
        6,
        [
            [0,1,150,60,15],
            [7,1,150,40,15],
            [0,5,150,105,15],
            [7,5,150,120,15],
            [0,9,150,70,15],
            [7,9,150,150,15],
        ],
        10000
    ],
    [
        [
            [[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0],[2,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
            [[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0],[0,0,false,0,false,0]],
        ],
        8,
        [
            [0,0,150,85,15],
            [1,0,150,100,15],
            [2,0,150,30,15],
            [3,0,150,40,15],
            [4,0,150,120,15],
            [5,0,150,60,15],
            [6,0,150,135,15],
            [7,0,150,150,15],
        ],
        100000
    ]
];