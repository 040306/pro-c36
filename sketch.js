var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var e3;
//create feed and lastFed variable here

var feed
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feedTheDog=createButton("Feed the dog he hungry give him some food");
  feedTheDog.position(900,95);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 e2 = database.ref('feedTime')
 e2.on('value',function(data){
 e3 = data.val();  
 })
 
 textSize(15)
 fill("black")
  //write code to display text lastFed time here
 if(e3>12){
 text("last fed time: "+e3%12+"PM",350,25)
 }else if(e3===0){
 text("last fed time: 12AM",350,25)  
 }else{
 text("last fed time: "+e3+"AM",350,25)  
 }
 
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var e = foodObj.getFoodStock()
  if(e <= 0){
    foodObj.updateFoodStock(e*0)
  }
  else{
  
    foodObj.updateFoodStock(e-1) 
  }
 database.ref()
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
