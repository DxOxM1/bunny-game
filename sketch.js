//Renaming
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

function preload(){
  bg = loadImage("ImagesSound/background.png")
  hungrybunny = loadImage("ImagesSound/Rabbit-01.png")
  food = loadImage("ImagesSound/melon.png")
  rabbitBlinking = loadAnimation("ImagesSound/blink_1.png", "ImagesSound/blink_2.png","ImagesSound/blink_3.png")
  rabbitEating = loadAnimation("ImagesSound/eat_0.png","ImagesSound/eat_1.png","ImagesSound/eat_2.png","ImagesSound/eat_3.png","ImagesSound/eat_4.png")
  rabbitSad = loadAnimation("ImagesSound/sad_1.png","ImagesSound/sad_2.png","ImagesSound/sad_3.png")

  rabbitBlinking.playing = true
  rabbitSad.playing = true
  rabbitEating.playing = true
  rabbitSad.looping = false
  rabbitEating.looping = false

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  rabbitBlinking.frameDelay = 17
  rabbitEating.frameDelay = 17
  rabbitSad.frameDelay = 50
  ground = new Ground(200,680,600,20);
  rope = new Rope(7, {x:250, y:30})
  fruit = Bodies.circle(250,250,30)
  Matter.Composite.add(rope.body,fruit)
  FruitConnection = new Link(rope,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  button = createImg("ImagesSound/cut_btn.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)
  bunny = createSprite(250,600,20,20)
  // sprite.addAnimation("label", variable)
  bunny.addAnimation("blinking",rabbitBlinking)
  bunny.addAnimation("hungry",rabbitEating)
  bunny.addAnimation("Upset",rabbitSad)
  
  bunny.scale = 0.3
}

function draw() 
{
  background(bg);
  //ground.show();
  rope.show();
  push()
  imageMode(CENTER)
  if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,90,90)
  }
  pop()
  Engine.update(engine);
  
if(Touching(fruit, bunny)){
  bunny.changeAnimation("hungry",rabbitEating)
}
 
if(fruit!=null && fruit.position.y > 640){
  bunny.changeAnimation("Upset",rabbitSad)
  bunny.x = 250
}
  drawSprites()
}
function drop(){
  rope.break()
  FruitConnection.breakFruit()
  FruitConnection = null
}
//!= not equal
function Touching(body,sprite){
  if(body!=null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(distance < 80){
      World.remove(world, fruit)
      fruit = null
      return true
    } else{
      return false
    }
  }
}