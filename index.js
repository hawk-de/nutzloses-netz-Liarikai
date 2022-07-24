let clicked = false;

let fly;
let fly_spritesheet;
let bg, Background;
let Troll;


let bridge = 0;


function preload() {
  bg = loadSpriteSheet("assets/bg_spritesheet.png", 600, 600, 2);
  fly_spritesheet = loadSpriteSheet('assets/fly_sprites.png', 50, 50, 4);
  TrollAnimationIdle = loadAnimation("assets/idle_1.png", "assets/idle_4.png");
  twitchLeft = loadAnimation("assets/twitch_left_0000.png", "assets/twitch_left_0011.png");
  twitchRight = loadAnimation("assets/twitch_right_0000.png", "assets/twitch_right_0009.png");
  eyeroll = loadAnimation("assets/mid_0000.png", "assets/mid_0013.png");
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  background(90);
  frameRate(15);

  Background = createSprite(width / 2, height / 2);
  Background.addAnimation("flimmer", bg);
  Troll = createSprite(width / 2, height / 2);
  Troll.addAnimation("Idle", TrollAnimationIdle);

  Troll.addAnimation("twitchleft", twitchLeft, eyeroll);

  Troll.addAnimation("twitchright", twitchRight);

  Troll.addAnimation("eyeroll", eyeroll);

  fly = createSprite(mouseX, mouseY, 50);
  fly.addAnimation("buzzing", fly_spritesheet);
  fly.visible = false;
}

function draw() {
  background(90);
  drawSprites();

  fly.attractionPoint(4, mouseX, mouseY);
  fly.maxSpeed = 20;
  if (Troll.animation.getFrame() == Troll.animation.getLastFrame()) {
    if (clicked == true) {
      if (bridge == 0) {
        CheckSquares();
      } else {
        bridge = bridge - 1;
          Troll.changeAnimation("Idle");
      }
    } else {
        Troll.changeAnimation("Idle");
    }
  }
}


function mouseClicked() {
  clicked = !clicked;
  if (clicked == false) {
    fly.visible = false;
  } else {
    fly.visible = true;
  }
}

function squares() {
  if (mouseX > 0 && mouseX < 200) {
    return 1;
  } else if (mouseX > 200 && mouseX < 400) {
    return 2;
  } else if (mouseX > 400 && mouseX < 600) {
    return 3;
  } else { return 0 }
}

function CheckSquares() {

  if (squares() == 1) {
    Troll.changeAnimation("twitchleft");
  } else if (squares() == 2) {
    Troll.changeAnimation("eyeroll");
  } else if (squares() == 3) {
    Troll.changeAnimation("twitchright");
  } else {
    Troll.changeAnimation("Idle");
  }

  bridge = 5;
}
