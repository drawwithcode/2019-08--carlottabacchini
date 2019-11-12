var myImage0
var myImage1
var myImage2
var myImage3

var myMap;
var canvas;
var myPos;

var mappa = new Mappa('Leaflet');
//
var maldiveLat = 0.5306000;
var maldiveLng = 72.9996900;
//
var options = {
  lat: 0,
  lng: 0,
  zoom: 3,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
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

}

function draw() {
  let s = 'CLICK ON THE PLACE YOU WANT TO BE';
  stroke('black');
  strokeWeight(0.5);
  noFill()
  textSize(33);
  textStyle(BOLD)
  textAlign(CENTER,CENTER);
  text(s, width/2, height/15);

image(myImage0,width/2 + 30,height/2 + 50, 533, 365);
image(myImage1,width/2 + 30,height/2 - 340, 533, 356);
image(myImage2,width/2 - 530 ,height/2 + 50, 533, 365);
image(myImage3,width/2 - 530 ,height/2 - 340, 533, 355);


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
