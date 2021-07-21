var gameState = "PLAY";
var backgrd, backgroundImg;
var shark, sharkImg;
var stone1Img, stone2Img;
var fish1Img, fish2Img, fish3Img, fish4Img;
var stoneGroup, fishGroup1, fishGroup2, fishGroup3, fishGroup4;
var gameovers, point;
var score;
var randoom;

function preload() {
  backgroundImg = loadImage("divin background.jpg");

  sharkImg = loadImage("shark.png");

  stone1Img = loadImage("stone1.png");
  stone2Img = loadImage("stone2.png");

  fish1Img = loadImage("fish1.png");
  fish2Img = loadImage("fish2.png");
  fish3Img = loadImage("fish3.png");
  fish4Img = loadImage("fish4.png");

  gameovers = loadSound("gameover.mp3");
  point = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 400);

  // Sprite for backgorund
  backgrd = createSprite(330, 200, 10, 10);
  backgrd.addImage("background", backgroundImg);
  backgrd.scale = 2.3;
  backgrd.velocityY = 5;

  // Sprite for shark
  shark = createSprite(300, 300, 10, 10);
  shark.addImage("shark", sharkImg);
  shark.scale = 0.5;

  // Groups
  stoneGroup = new Group();

  fishGroup1 = new Group();
  fishGroup2 = new Group();
  fishGroup3 = new Group();
  fishGroup4 = new Group();

  // Score
  score = 0;
}

function draw() {
  background("black");

  if (gameState === "PLAY") {
    // Moving background
    if (backgrd.y > 300) {
      backgrd.y = 100;
    }

    // Moving shark right & left
    if (keyDown("right_arrow")) {
      shark.x = shark.x + 5;
    }

    if (keyDown("left_arrow")) {
      shark.x = shark.x - 5;
    }

    // Increase score if shark eats Fishes
    if (fishGroup1.isTouching(shark)) {
      fishGroup1.destroyEach();
      score = score + 2;
      point.play();
    }

    if (fishGroup2.isTouching(shark)) {
      fishGroup2.destroyEach();
      score = score + 2;
      point.play();
    }

    if (fishGroup3.isTouching(shark)) {
      fishGroup3.destroyEach();
      score = score + 2;
      point.play();
    }

    if (fishGroup4.isTouching(shark)) {
      fishGroup4.destroyEach();
      score = score + 2;
      point.play();
    }
    if (stoneGroup.isTouching(shark) || shark.y > 600) {
      gameovers.play();

      gameState = "END";
    }
    // Functions for Fishes
    BlueFishes();
    BabyFishes();
    GoldFishes();
    PurpleFishes();

    // Function for stone
    DangerStone();

    drawSprites();

    textSize(20);
    stroke("black");
    strokeWeight(5);
    fill("white");
    text("Score : " + score, 490, 30);
  }
  if (gameState === "END") {
    stroke("red");
    strokeWeight(7);
    fill("white");
    textSize(30);
    text("Game Over press Space to restart", 50, 200);

    if (keyDown("space")) {
      reset();
    }
  }
}
function reset() {
  gameState = "PLAY";
  score = 0;
}

function DangerStone() {
  if (frameCount % 210 === 0) {
    stone = createSprite(50, 0);
    stone.scale = 0.2;
    randoom = Math.round(random(1, 2));
    if (randoom == 1) {
      stone.addImage(stone1Img);
    } else if (randoom == 2) {
      stone.addImage(stone2Img);
    }
    stone.x = Math.round(random(40, 480));
    stone.velocityY = 4 + score / 2;

    shark.depth = stone.depth;
    shark.depth += 1;

    stoneGroup.add(stone);
  }
}

function BlueFishes() {
  if (frameCount % 120 === 0) {
    var fish1 = createSprite(100, -5);
    fish1.addImage("fihs1", fish1Img);
    fish1.velocityY = 4 + score / 2;
    fish1.scale = 0.2;
    fish1.lifetime = 800;
    fishGroup1.add(fish1);
    shark.depth = fish1.depth;
    shark.depth += 1;
  }
}
function BabyFishes() {
  if (frameCount % 190 === 0) {
    var fish2 = createSprite(250, -5);
    fish2.addImage("fihs2", fish2Img);
    fish2.velocityY = 4 + score / 2;
    fish2.scale = 0.35;
    fish2.lifetime = 800;
    fishGroup2.add(fish2);
    shark.depth = fish2.depth;
    shark.depth += 1;
  }
}
function GoldFishes() {
  if (frameCount % 280 === 0) {
    var fish3 = createSprite(200, -5);
    fish3.addImage("fihs3", fish3Img);
    fish3.velocityY = 4 + score / 2;
    fish3.scale = 0.28;
    fish3.lifetime = 800;
    fishGroup3.add(fish3);
    shark.depth = fish3.depth;
    shark.depth += 1;
  }
}
function PurpleFishes() {
  if (frameCount % 300 === 0) {
    var fish4 = createSprite(10, -5);
    fish4.addImage("fihs4", fish4Img);
    fish4.velocityY = 4 + score / 2;
    fish4.scale = 0.3;
    fish4.lifetime = 800;
    fishGroup4.add(fish4);
    shark.depth = fish4.depth;
    shark.depth += 1;
  }
}
