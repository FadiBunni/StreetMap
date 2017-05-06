const Intersection = require('./entities/Intersection.js');
const Road = require('./entities/Road.js');

var socket = io();

socket.on('connected', 'hey');

var Roads = {}
var Intersections = {}

Intersections[Object.keys(Intersections).length] = new Intersection("10 70");
Intersections[Object.keys(Intersections).length] = new Intersection("20 50");
Intersections[Object.keys(Intersections).length] = new Intersection("35 35");
// Intersections[Object.keys(Intersections).length] = new Intersection("35 80");
// Intersections[Object.keys(Intersections).length] = new Intersection("50 90");
// Intersections[Object.keys(Intersections).length] = new Intersection("65 100");
// Intersections[Object.keys(Intersections).length] = new Intersection("45 75");
// Intersections[Object.keys(Intersections).length] = new Intersection("70 85");
// Intersections[Object.keys(Intersections).length] = new Intersection("55 55");
// Intersections[Object.keys(Intersections).length] = new Intersection("80 70");
// Intersections[Object.keys(Intersections).length] = new Intersection("60 150");
// Intersections[Object.keys(Intersections).length] = new Intersection("65 110");
// Intersections[Object.keys(Intersections).length] = new Intersection("45 70");
// Intersections[Object.keys(Intersections).length] = new Intersection("25 100");
// Intersections[Object.keys(Intersections).length] = new Intersection("35 120");

Roads[Object.keys(Roads).length] = new Road("10 70", "Vestervoldgade", "20 50" , false);
Roads[Object.keys(Roads).length] = new Road("20 50", "Vestervoldgade", "35 35" , false);
// Roads[Object.keys(Roads).length] = new Road("10 70", "SktPedersStraede", "35 80" , true);
// Roads[Object.keys(Roads).length] = new Road("35 80", "SktPedersStraede", "50 90" , true);
// Roads[Object.keys(Roads).length] = new Road("65 100", "SktPedersStraede", "50 90" , true);
// Roads[Object.keys(Roads).length] = new Road("20 50", "Studiestraede", "45 70" , true);
// Roads[Object.keys(Roads).length] = new Road("45 70", "Studiestraede", "70 85" , true);
// Roads[Object.keys(Roads).length] = new Road("60 150", "Noerregade", "65 110" , true);
// Roads[Object.keys(Roads).length] = new Road("65 110", "Noerregade", "65 100" , true);
// Roads[Object.keys(Roads).length] = new Road("65 100", "Noerregade", "70 85" , true);
// Roads[Object.keys(Roads).length] = new Road("70 85", "Noerregade", "80 70" , true);
// Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "55 55" , true);
// Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "35 80" , true);
// Roads[Object.keys(Roads).length] = new Road("25 100", "TeglgaardsStraede", "35 80" , true);
// Roads[Object.keys(Roads).length] = new Road("50 90", "LarslejStraede", "35 120" , true);
// Roads[Object.keys(Roads).length] = new Road("10 70", "Noerrevoldgade", "25 100" , false);
// Roads[Object.keys(Roads).length] = new Road("25 100", "Noerrevoldgade", "35 120" , false);
// Roads[Object.keys(Roads).length] = new Road("35 120", "Noerrevoldgade", "60 150" , false);
// Roads[Object.keys(Roads).length] = new Road("80 70", "Vestergade", "55 55" , false);
// Roads[Object.keys(Roads).length] = new Road("55 55", "Vestergade", "35 35" , false);


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
  var intersectionsList = [];
  var start;
  var end;
  var w,h;
  var path = [];

function Spot(p,i,j){
  //this.intercoord = intercoord;
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.intersectionNeighbors = [];
  this.previous = undefined
  this.intersection = false;
  this.wall = false;

  // if(p.random(1) < 0.4){
  //   this.wall = true;
  // }

  this.show = function(color){
    p.fill(color);
    if(this.wall){
      p.fill(0);
    }
    p.noStroke();
    if(this.intersection){
      p.fill(127,0,255);
      p.textSize(10);
      p.text(i.toString() +","+ j.toString(),i * w-2, j * h-7);
    }
    p.rect(this.i*w,this.j*h,w-1,h-1);
  }

  this.addNeighbors = function(grid,cols,rows){
    var i = this.i;
    var j = this.j;

    //sideways
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

    //diagonal
    if(i > 0 && j > 0){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if(i < cols - 1 && j > 0){
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if(i > 0 && j < rows - 1){
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if(i < cols - 1 && j < rows - 1){
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}

var s = function(p) {

  var cols = 30;
  var rows = 30;
  var grid = new Array(cols);

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);
    var pg = p.createGraphics(100,100);

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


    //adding intersections.
    for(var intersect in Intersections){
      var intercoord = Intersections[intersect].coordinate.split(" ").map(Number)
      for(var i = 0; i < cols; i++){
        for(var j = 0; j< rows; j++){
          if(grid[i][j].i === intercoord[0]/5-1 && grid[i][j].j === intercoord[1]/5-1){
            grid[i][j].intersection = true;
            intersectionsList.push(grid[i][j]);
          }
        }
      }
    }

    //adding neighbors to each intersection.
    for(var i = 0; i < intersectionsList.length; i++){
      var intersection = intersectionsList[i];
      // console.log(intersection);
      for(var road in Roads){
        var r = Roads[road];
        var firstCoord = r.firstCoord.split(" ").map(Number);
        var secondCoord = r.secondCoord.split(" ").map(Number);
        // console.log("road.i " + (coord[0]/5-1));
        // console.log("intersection.i " + intersection.i);
        // console.log("road.j " + (coord[1]/5-1));
        // console.log("intersection.j " + intersection.j);
        if(intersection.i === (firstCoord[0]/5-1) || intersection.i === (firstCoord[1]/5-1)){
          intersection.intersectionNeighbors.push(secondCoord);
        }
      }
      //console.log(intersection.intersectionNeighbors);
      //console.log("nextLoop");
    }

    for(var i = 0; i < cols; i++){
      for(var j = 0; j< rows; j++){
        grid[i][j].addNeighbors(grid,cols,rows);
      }
    }

    //The ending and starting node
    start = grid[1][13];
    end = grid[6][6]
    start.wall = false;
    end.wall = false;

    openSet.push(start);
  };

  p.draw = function() {
    if(openSet.length > 0){

      var lowestIndex = 0;
      for(var i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[lowestIndex].f){
          lowestIndex = i;
        }
      }

      //console.log(lowestIndex);
      var current = openSet[lowestIndex];
      //console.log(current);

      if(current === end){
        p.noLoop();
        console.log("DONE!");
      }

      removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;


      console.log(current.neighbors);
      for(var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        if(!closedSet.includes(neighbor) && !neighbor.wall){
          var tempG = current.g + 1;

          var newPath = false;
          if(openSet.includes(neighbor)){
            if(tempG < neighbor.g){
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          //heuristic begins
          if(newPath){
            neighbor.h = heuristic(neighbor,end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }

    } else {
      console.log("No solution");
      p.noLoop();
      return;
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

    //find the patch
    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
      path.push(temp.previous)
      temp = temp.previous;
    }

    for(var i = 0; i < path.length; i++){
      path[i].show(p.color(0,0,255));
    }

    p.noFill();
    p.stroke(255);
    p.beginShape();
    for(var i = 0; i < path.length; i++){
      p.vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    p.endShape();



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
  //return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
  return myp5.dist(a.i,a.j,b.i,b.j);
}