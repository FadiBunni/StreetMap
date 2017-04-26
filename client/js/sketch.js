const Intersection = require('./entities/Intersection.js');
const Road = require('./entities/Road.js');

var socket = io();

socket.on('connected', 'hey');

var Roads = {}
var Intersections = {}

Intersections[Object.keys(Intersections).length] = new Intersection("10 70");
Intersections[Object.keys(Intersections).length] = new Intersection("20 50");
Intersections[Object.keys(Intersections).length] = new Intersection("35 35");
Intersections[Object.keys(Intersections).length] = new Intersection("35 80");
Intersections[Object.keys(Intersections).length] = new Intersection("50 90");
Intersections[Object.keys(Intersections).length] = new Intersection("65 100");
Intersections[Object.keys(Intersections).length] = new Intersection("45 75");
Intersections[Object.keys(Intersections).length] = new Intersection("70 85");
Intersections[Object.keys(Intersections).length] = new Intersection("55 55");
Intersections[Object.keys(Intersections).length] = new Intersection("80 70");
Intersections[Object.keys(Intersections).length] = new Intersection("60 150");
Intersections[Object.keys(Intersections).length] = new Intersection("65 110");
Intersections[Object.keys(Intersections).length] = new Intersection("45 70");
Intersections[Object.keys(Intersections).length] = new Intersection("25 100");
Intersections[Object.keys(Intersections).length] = new Intersection("35 120");

Roads[Object.keys(Roads).length] = new Road("10 70", "Vestervoldgade", "20 50" , false);
Roads[Object.keys(Roads).length] = new Road("20 50", "Vestervoldgade", "35 35" , false);
Roads[Object.keys(Roads).length] = new Road("10 70", "SktPedersStraede", "35 80" , true);
Roads[Object.keys(Roads).length] = new Road("35 80", "SktPedersStraede", "50 90" , true);
Roads[Object.keys(Roads).length] = new Road("65 100", "SktPedersStraede", "50 90" , true);
Roads[Object.keys(Roads).length] = new Road("20 50", "Studiestraede", "45 70" , true);
Roads[Object.keys(Roads).length] = new Road("45 70", "Studiestraede", "70 85" , true);
Roads[Object.keys(Roads).length] = new Road("60 150", "Noerregade", "65 110" , true);
Roads[Object.keys(Roads).length] = new Road("65 110", "Noerregade", "65 100" , true);
Roads[Object.keys(Roads).length] = new Road("65 100", "Noerregade", "70 85" , true);
Roads[Object.keys(Roads).length] = new Road("70 85", "Noerregade", "80 70" , true);
Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "55 55" , true);
Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "35 80" , true);
Roads[Object.keys(Roads).length] = new Road("25 100", "TeglgaardsStraede", "35 80" , true);
Roads[Object.keys(Roads).length] = new Road("50 90", "LarslejStraede", "35 120" , true);
Roads[Object.keys(Roads).length] = new Road("10 70", "Noerrevoldgade", "25 100" , false);
Roads[Object.keys(Roads).length] = new Road("25 100", "Noerrevoldgade", "35 120" , false);
Roads[Object.keys(Roads).length] = new Road("35 120", "Noerrevoldgade", "60 150" , false);
Roads[Object.keys(Roads).length] = new Road("80 70", "Vestergade", "55 55" , false);
Roads[Object.keys(Roads).length] = new Road("55 55", "Vestergade", "35 35" , false);


for(var intersect in Intersections){
	var inter = Intersections[intersect];
	//console.log(inter.coordinate);
}

for(var road in Roads){
	var r = Roads[road];
	//console.log("Road name: " + r.name + " First coordinate: "+ r.firstCoord + " Second coordinate: " + r.secondCoord + " Length: " + r.length);
}


//A* algorithm
  var openSet = [];
  var closedSet = [];
  var start;
  var end;
  var w,h;

function Spot(p,i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];

  this.show = function(color){
    p.fill(color);
    p.noStroke();
    p.rect(this.i*w,this.j*h,w-1,h-1);
  }

  this.addNeighbors = function(grid,cols,rows){
    var i = this.i;
    var j = this.j;
    if(i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
    }
    if(i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }
    if(j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }
  }
}

var s = function(p) {

  var cols = 5;
  var rows = 5;
  var grid = new Array(cols);

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(400, 400);
    centerCanvas(canvas);

    w = p.width / cols;
    h = p.height / rows;

    //Making a 2d array;
    for(var i = 0; i < cols; i++){
      grid[i] = new Array(rows);
    }

    for(var i = 0; i < cols; i++){
      for(var j = 0; j< rows; j++){
        grid[i][j] = new Spot(p,i,j);
      }
    }

    for(var i = 0; i < cols; i++){
      for(var j = 0; j< rows; j++){
        grid[i][j].addNeighbors(grid,cols,rows);
      }
    }

    console.log(grid);

    //The ending and starting node
    start = grid[0][0];
    end = grid[cols - 1][rows - 1]

    openSet.push(start);

    //console.log(grid);
  };

  p.draw = function() {
    if(openSet.length > 0){

      var lowestIndex = 0;
      for(var i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[lowestIndex].f){
          lowestIndex = i;
        }
      }

      var current = openSet[lowestIndex];

      if(current === end){
        console.log("DONE!");
      }

      removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for(var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        if(!closedSet.includes(neighbor)){
          var tempG = current.g + 1;

          if(openSet.includes(neighbor)){
            if(tempG < neighbor.g){
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          //heuristic begins

          neighbor.h = heuristic(neighbor,end);
          neighbor.f = neighbor.g + neighbor.h;
        }
      }

    } else {
      // no solution
    }

    p.background(0);

    for(var i = 0; i < cols; i++){
      for(var j = 0; j < rows; j++){
        grid[i][j].show(p.color(255));
      }
    }

    //print out open and closed list:
    for(var i = 0; i < openSet.length; i++){
      openSet[i].show(p.color(0,255,0));
    }

    for(var i = 0; i < closedSet.length; i++){
      closedSet[i].show(p.color(255,0,0));
    }
  };
};

var myp5 = new p5(s);

//Ui function
function centerCanvas(canvas) {
  var x = (myp5.windowWidth - myp5.width) / 2;
  var y = (myp5.windowHeight - myp5.height) / 2;
  canvas.position(x, y);
}

//Handy functions
function removeFromArray(arr,elt){
  for(var i = arr.length-1; i>=0; i--){
    if(arr[i] == elt){
      arr.splice(i,1);
    }
  }
}

//heuristic functions
function heuristic(a,b){
  return myp5.dist(a.i,a.j,b.i,b.j);
}