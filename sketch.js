//Create variables here 
var  dog, happyDog;

var database;
var foodS, foodStock;

function preload()
{
  	//load images here
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
}

function setup() 
{
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    
}


function draw() 
{  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dogImg);
  }
  
    //add styles here
    push();
    stroke("black");
    textSize(20);
    fill("red");
    text("Food Remaining: " + foodS, 150,480);
    text("Press Up Arrow to pet the Dog and make him happy!!", 10,75);
    pop();
  
  drawSprites();
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock (x)
{
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}



