const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var rope
var fruit
var fruit_con

let engine;
let world;
var ground;

var melonImage
var backgroundImage
var rabbitImage

var rabbit
var cutbutton

var sadrabbit
var eatrabbit
var blinkrabbit
var ground2

function preload(){
 melonImage = loadImage("melon.png")
 backgroundImage = loadImage("background.png")
 rabbitImage = loadImage("Rabbit-01.png")
 sadrabbit = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
 eatrabbit= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
 blinkrabbit= loadAnimation("blink_1.png","blink_2.png","blink_3.png")
 eatrabbit.playing = true
 sadrabbit.playing = true
 blinkrabbit.playing = true
 eatrabbit.looping = false
 sadrabbit.looping = false
}




function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:245,y:30})
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  var fruit_opitions = {
    density: 0.001
  }
  fruit = Bodies.circle(300,300,15,fruit_opitions)
  Composite.add(rope.body,fruit)
  fruit_con = new Link(rope,fruit)
  imageMode(CENTER)
  sadrabbit.frameDelay = 20
  eatrabbit.frameDelay = 20
  blinkrabbit.frameDelay = 20
  rabbit = createSprite(250,640)
  rabbit.scale = 0.2
  rabbit.addAnimation("blinking",blinkrabbit)
  rabbit.addAnimation("eating",eatrabbit)
  rabbit.addAnimation("criying",sadrabbit)
  cutbutton = createImg("cut_btn.png")
  cutbutton.position(220,30)
  cutbutton.size(50,50)
  cutbutton.mouseClicked(drop)
  ground2 = createSprite(width / 2, 650, 500,10)
}

function draw() 
{
  background(51);
  image(backgroundImage,250, 350, 500,700)
  if(fruit != null){
  image(melonImage,fruit.position.x,fruit.position.y,60,60)
  }
  ground.show();
  rope.show()
  Engine.update(engine);


if(collide(fruit,rabbit) == true){
  rabbit.changeAnimation("eating")
} 
if(collide(fruit,ground2) == true){
  rabbit.changeAnimation("criying")
} 
drawSprites()
}
function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con = null
  console.log("hi")
  
}

function collide(body,sprite){
  if(body != null){
    var D = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(D <= 10){
      World.remove(engine.world,fruit)
      fruit = null
      return true
    }
    else{
      return false
    }
  }
}