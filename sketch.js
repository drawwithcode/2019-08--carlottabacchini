var myImage0;
var myImage1;
var myImage2;
var myImage3;
let maldiveClicked = false;
var myMap;
var canvas;
var myPos;

var mappa = new Mappa("Leaflet");
//
var maldiveLat = 0.5306000;
var maldiveLng = 72.9996900;
//
var options = {
  lat: 0,
  lng: 0,
  zoom: 3,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

var maldive = {
  lat: maldiveLat,
  lng: maldiveLng,
}


function preload(){
  myImage0 = loadImage("./assets/0.jpg")
  myImage1 = loadImage("./assets/1.jpg")
  myImage2 = loadImage("./assets/3.jpg")
  myImage3 = loadImage("./assets/4.jpg")

  myPos = getCurrentPosition();


}

function setup() {

  createCanvas(windowWidth,windowHeight)

  options.lat = myPos.latitude;
  options.lng = myPos.longitude;

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)


  myMap.onChange(drawPoint);

  function drawPoint() {
    clear();
    var disAway = calcGeoDistance(myPos.latitude, myPos.longitude, maldiveLat, maldiveLng, "km");

    push();
    var textMaldive = ("You are" + Math.round(disAway) + "Km away from where you want to be", 70, 70);
    fill(255);
    noStroke()
    pop();


    push();
    var maldive = myMap.latLngToPixel(maldiveLat, maldiveLng);
    ellipse(maldive.x, maldive.y, 8, 8);
    noFill();
    stroke(255, 217, 0);
    pop();

    push();
    fill(255, 217, 0);
    noStroke();
    var me = myMap.latLngToPixel(myPos.latitude, myPos.longitude);
    ellipse(me.x, me.y, 5, 5);
    pop();

    push();
    stroke(255, 217, 0);
    strokeWeight(0.8);
    line(me.x,me.y,maldive.x,maldive.y);

  }

}

function draw() {
  let s = 'CLICK ON THE PLACE YOU WANT TO BE';
  stroke('black');
  strokeWeight(0.5);
  noFill()
  textSize(33);
  textStyle(BOLD)
  textAlign(CENTER,CENTER);
  text(s, width/2, height/16);

image(myImage0,width/2 + 30,height/2 + 50, 533, 365);
image(myImage1,width/2 + 30,height/2 - 340, 533, 356);
image(myImage2,width/2 - 530 ,height/2 + 50, 533, 365);
if (maldiveClicked == false) {
   image(myImage3,500 ,500, 200, 300);
 }
}

function mouseClicked(){
  console.log('confirmation that the mouse got clicked!');
  console.log(mouseX, mouseY); //where is the mouse anyway?

  if(
    mouseX > 500 && //if the mouse is greather than 200 we're over the image
    mouseX < 800 && //if the mouse is less than 300 were over the image (since the image is at 200 and is 100 wide = 300)
    mouseY > 500 && //same idea but on the vertical axis.
    mouseY < 800
  ){
    maldiveClicked = true //set the click boolean to be true since we clicked, this will turn off the conditional statement above in the draw step and should make the image no-longer render since that code is now 'skipped'
    madive.drawPoint;

  }

  // img4.mouseClicked(function() {
  //   lat: maldiveLat;
  //   lng: maldiveLng;
  //   console.log("maldive")
  // })



}
