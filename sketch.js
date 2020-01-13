// declare variables

var myMap;
var myImage;
var canvas;
var localiMilano = [];
var position;
var localeSingolo;
var lat, lng, local;
var distanza, colorFill, nomeLocale, distanzaLocale, um;
var opa = 0,
  posx = -100,
  posy = -100;

let tLight, tRegular, tBold; // font

var raggio = 1;

var mappa = new Mappa('MapboxGL', "pk.eyJ1IjoiYW5kcmVhYmVuZWRldHRpIiwiYSI6ImNqNWh2eGh3ejFqOG8zM3BrZjRucGZkOGEifQ.SmdBpUoSe3s0tm-OTDFY9Q");

var options = {
  lat: 45.4689727,
  lng: 9.1895752,
  zoom: 12,
  style: "mapbox://styles/mapbox/dark-v8",
  pitch: 3
}



function preload() {
  position = getCurrentPosition();
  table = loadTable("assets/milano.csv", "csv", "header"); //loading the file with the geographical coordinates
  tRegular = loadFont('assets/Teko-Regular.ttf');
  tLight = loadFont('assets/Teko-Light.ttf');
  tBold = loadFont('assets/Teko-SemiBold.ttf');

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("container");


  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // crating the variables for the position of the user
  myLat = position.latitude;
  myLon = position.longitude;

  options.lat = myLat;
  options.lng = myLon;

  // associate each row of the csv with values
  var rows = table.getRows();
  for (var i = 0; i < rows.length; i++) {
    lat = rows[i].getNum("Longitude");
    lng = rows[i].getNum("Latitude");
    local = rows[i].getString("Nome")

    // formula that calculate the distance between the user and the place in the csv
    distanza = calcGeoDistance(myLat, myLon, lat, lng, 'km')
    console.log(distanza, lat, lng)
    if (distanza <= raggio) {
      colorFill = '#c5ff8c';
    } else {
      colorFill = '#2475db';
    }
    localeSingolo = new locale(lat, lng, local, distanza, colorFill);
    localiMilano.push(localeSingolo);
  }
  return distanza
}

function draw() {
  clear();

  var myPosition = myMap.latLngToPixel(myLat, myLon); // find user's position from lat and lon to x and y


  for (var i in localiMilano) {
    localiMilano[i].drawNumber();
  }

  // creation of the user position identifier
  push()
  fill(197, 255, 140, 30)
  ellipse(myPosition.x, myPosition.y, 100);
  fill(170, 185, 214);
  textSize(26);
  textWidth(BOLD);
  stroke('black');
  strokeWeight(4);
  textFont(tBold);
  textAlign(CENTER, CENTER);
  text('YOU', myPosition.x, myPosition.y);
  pop()


  // creation of the mouse over with the name of the bar/restaurant and the distance from the user
  push()
  fill(0, 0, 0, 0)
  textSize(12)
  textAlign(CENTER, CENTER)
  var nome = text(nomeLocale, posx, posy - 20)

  rectMode(CENTER, CENTER)
  stroke(197, 255, 140, opa);
  fill(0, 0, 0, opa);
  rect(posx, posy - 40, 220, 60, 5);

  fill('white')
  textSize(15)
  textAlign(CENTER, CENTER)
  noStroke()
  text(nomeLocale + '\n' + distanzaLocale + um, posx, posy - 50, 200, 350)
  pop()


  fill(0, 0, 0, 200)
  noStroke()
  rect(0, 0, windowWidth, windowHeight / 6);


  // Head text
  push();
  textSize(45);
  textAlign(CENTER);
  textFont(tBold)
  fill('#2475db');
  text('NIGHT LIFE IN MILAN', windowWidth / 2 - 200, windowHeight / 16 - 38, 400, 50);
  pop();

  // Subtitle
  push();
  textSize(33);
  textAlign(CENTER);
  fill(197, 255, 140);
  textFont(tRegular)
  text('Find out a tip on where to go', windowWidth / 2 - 200, windowHeight / 9 - 22, 400, 50);
  pop()

  // indications
  push();
  textSize(20);
  textAlign(CENTER);
  fill(197, 255, 140);
  textFont(tLight)
  text('Click on the icon to obtain your tips', windowWidth / 2 - 200, windowHeight / 9 + 16, 400, 50);
  pop()

  // Callback of the pop up from the html and set the opening and the closure
  push()
  var openPopup = document.getElementById('tips')
  openPopup.addEventListener('click', function() {
    document.getElementById('box').style.display = 'block';
  })
  var closePopup = document.getElementById('close')
  closePopup.addEventListener('click', function() {
    document.getElementById('box').style.display = 'none';
  })
  pop()

}


// defining the variable locale and his objects
var locale = function(la, ln, lc, dt, cl) {
  this.laa = la;
  this.lnn = ln;
  this.name = lc;
  this.color = cl;
  this.dist = dt;

  var point;

// create the points of the bars on the map
  this.drawNumber = function() {
    fill(this.color);
    point = myMap.latLngToPixel(la, ln);
    ellipse(point.x, point.y, 10);
  }


// defining what is displayed on the popup depending on distance
  if (this.dist <= raggio) {
    document.getElementById('box').innerHTML += "• " + this.name + " " + Math.round(this.dist * 100) / 100 + "km" + "<br/>";
  } else if (this.dist > 10) {
    document.getElementById('box').innerHTML += "WE ARE SORRY, THERE IS NOWHERE TO GO NEAR YOUR.";
    document.getElementById('box').style.fontFamily = "'Teko', sans-serif";
    document.getElementById('box').style.fontSize = "34px";
    document.getElementById('box').style.fontWeight = "400";

  }

  this.moved = function() {
    let d = dist(mouseX, mouseY, point.x, point.y)
    if (d <= 10) {
      cursor(HAND);
      opa = 180;
      posx = point.x;
      posy = point.y;
      nomeLocale = this.name;
      distanzaLocale = Math.round(this.dist * 100) / 100;
      um = ' km';
    }
  }

}

function mouseMoved() {
  cursor(ARROW);
  opa = 0;
  nomeLocale = '';
  distanzaLocale = '';
  um = '';
  for (var i in localiMilano) {
    localiMilano[i].moved();
  }
}
