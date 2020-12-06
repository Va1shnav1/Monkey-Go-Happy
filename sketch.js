var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage, invisibleGround;
var sTime=0;
var score=0;
var gameOverImg;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage =loadImage("ground.png");
  gameOverImg = loadImage("gOver.png");
}



function setup() {
  createCanvas(400, 400);
  ground=createSprite(400, 350, 900, 10);
  ground.addImage(groundImage);
  ground.scale=0.1;
  ground.velocityX=-4;
  
  monkey=createSprite(80, 325, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  //monkey.debug=true;
  
  invisibleGround = createSprite(200,335,400,10);
  invisibleGround.visible = false;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup =createGroup();
  
   sTime=Math.ceil(frameCount/frameRate());
}


function draw() {
  background("lightblue");
  if(gameState===PLAY){
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
  
    if(ground.x<50){
        ground.x = 200;
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+1;
    }
    food();
    obstacles();
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score, 300, 50);
    
    stroke("black");
    textSize(20);
    fill("black");
    sTime=Math.ceil(frameCount/frameRate());
    text("survivel Time:"+sTime, 100, 50);
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;  
    } 
    
  }else if(gameState===END){
     background("white");
     var GO = createSprite(200, 200, 20, 20);
     GO.addImage(gameOverImg);
     GO.scale=0.5;
     monkey.destroy();
     obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     ground.velocityX=0;
    
    stroke("red");
    textSize(20);
    fill("red");
    text("Score:"+score, 300, 280);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Survivel Time:"+sTime, 50, 280);
  }
  monkey.collide(invisibleGround);
  
  drawSprites();
}
function food(){
  if(frameCount%80===0){
    var banana = createSprite(400, 200, 10, 10);
    banana.y=Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=Math.round(random(-2,-8));
    banana.lifetime=450;
    //banana.debug=true;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%300===0){
    var rock = createSprite(400, 305, 20, 20);
    rock.addImage(obstacleImage);
    rock.velocityX=ground.velocityX;
    rock.scale=0.2; 
    rock.lifetime=450;
    //rock.debug=true;
    rock.setCollider("circle", 0, 0, 225);
    obstacleGroup.add(rock);
  }
}




