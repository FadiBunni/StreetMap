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
Intersections[Object.keys(Intersections).length] = new Intersection("70 85");
Intersections[Object.keys(Intersections).length] = new Intersection("55 55");
Intersections[Object.keys(Intersections).length] = new Intersection("80 70");
Intersections[Object.keys(Intersections).length] = new Intersection("60 150");
Intersections[Object.keys(Intersections).length] = new Intersection("65 110");
Intersections[Object.keys(Intersections).length] = new Intersection("45 70");
Intersections[Object.keys(Intersections).length] = new Intersection("25 100");
Intersections[Object.keys(Intersections).length] = new Intersection("35 120");

Roads[Object.keys(Roads).length] = new Road("10 70", "Vestervoldgade", "20 50");
Roads[Object.keys(Roads).length] = new Road("20 50", "Vestervoldgade", "10 70");
Roads[Object.keys(Roads).length] = new Road("20 50", "Vestervoldgade", "35 35");
Roads[Object.keys(Roads).length] = new Road("35 35", "Vestervoldgade", "20 50");
Roads[Object.keys(Roads).length] = new Road("10 70", "SktPedersStraede", "35 80");
Roads[Object.keys(Roads).length] = new Road("35 80", "SktPedersStraede", "50 90");
Roads[Object.keys(Roads).length] = new Road("65 100", "SktPedersStraede", "50 90");
Roads[Object.keys(Roads).length] = new Road("20 50", "Studiestraede", "45 70");
Roads[Object.keys(Roads).length] = new Road("45 70", "Studiestraede", "70 85");
Roads[Object.keys(Roads).length] = new Road("60 150", "Noerregade", "65 110");
Roads[Object.keys(Roads).length] = new Road("65 110", "Noerregade", "65 100");
Roads[Object.keys(Roads).length] = new Road("65 100", "Noerregade", "70 85");
Roads[Object.keys(Roads).length] = new Road("70 85", "Noerregade", "80 70");
Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "55 55");
Roads[Object.keys(Roads).length] = new Road("45 70", "Larsbjoernsstraede", "35 80");
Roads[Object.keys(Roads).length] = new Road("25 100", "TeglgaardsStraede", "35 80");
Roads[Object.keys(Roads).length] = new Road("50 90", "LarslejStraede", "35 120");
Roads[Object.keys(Roads).length] = new Road("10 70", "Noerrevoldgade", "25 100");
Roads[Object.keys(Roads).length] = new Road("25 100", "Noerrevoldgade", "10 70");
Roads[Object.keys(Roads).length] = new Road("25 100", "Noerrevoldgade", "35 120");
Roads[Object.keys(Roads).length] = new Road("35 120", "Noerrevoldgade", "25 100");
Roads[Object.keys(Roads).length] = new Road("35 120", "Noerrevoldgade", "60 150");
Roads[Object.keys(Roads).length] = new Road("60 150", "Noerrevoldgade", "35 120");
Roads[Object.keys(Roads).length] = new Road("80 70", "Vestergade", "55 55");
Roads[Object.keys(Roads).length] = new Road("55 55", "Vestergade", "35 35");

//A* algorithm
  var openSet = [];
  var closedSet = [];
  var start;
  var end;
  var w,h;

var s = function(p) {

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);

    //adding neighbors to each intersection.
    for(var intersect in Intersections){
      var inter = Intersections[intersect];
      //console.log(inter.coordinate);
      // console.log(intersection);
      var coord = inter.coordinate.split(" ").map(Number);
      for(var road in Roads){
        var r = Roads[road];
        var firstCoord = r.firstCoord.split(" ").map(Number);
        var secondCoord = r.secondCoord.split(" ").map(Number);
        // console.log("Road " + firstCoord[0]);
        // console.log("intersection " + coord[0]);
        if(coord[0] === firstCoord[0] && coord[1] === firstCoord[1]){
          for(var intersect in Intersections){
            var newinter = Intersections[intersect];
            var newcoord = newinter.coordinate.split(" ").map(Number);
            // console.log("Road " + secondCoord[1]);
            // console.log("intersection " + newcoord[1]);
            if(secondCoord[0] === newcoord[0] && secondCoord[1] === newcoord[1]){
              inter.intersectionNeighbors.push(newinter);
            }
          }
        }
      }
    }

    //The ending and starting node
    start = Intersections[12];
    end = Intersections[5]

    openSet.push(start);
    //console.log(openSet);
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
      //console.log(end);
      if(current == end){
        var curr = current;
        var ret = [];
        while(curr.parent){
          ret.push(curr);
          curr = curr.parent;
        }
        p.noLoop();
        console.log("SLUT!");
        for(var i = 0; i < ret.length; i++){
          var r = ret[i];
          console.log(r.coordinate);
          if(i == ret.length-1){
            for(var road in Roads) {
              var ro = Roads[road];
              if(ro.firstCoord == r.coordinate && ro.secondCoord == start.coordinate) {
                console.log(ro.name);
              }
            }
          }else {
            var r2 = ret[i+1];
            for(var road in Roads) {
              var ro = Roads[road];
              if(ro.firstCoord == r2.coordinate && ro.secondCoord == r.coordinate) {
                console.log(ro.name);
              }
            }
          }

        }
        console.log(start.coordinate)
        console.log("START!");
      }

      removeFromArray(openSet,current);
      closedSet.push(current);

      var neighbors = current.intersectionNeighbors;
      for(var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        //console.log(neighbor);
        if(closedSet.includes(neighbor)){
          continue;
        }
        var tempG = current.g + distBetween(neighbor,current);
        // console.log(neighbor);
        // console.log(current);
        var newPath = false;

        if(!openSet.includes(neighbor)){

          newPath = true;
          neighbor.h = heuristic(neighbor,end);
          openSet.push(neighbor);
        }else if(tempG < neighbor.g ){
          newPath = true;
        }
        //heuristic begins
        //console.log("hey")
        if(newPath){
          neighbor.parent = current;
          neighbor.g = tempG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.debug =  "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
          //console.log(neighbor.debug);
        }
      }
    } else {
      console.log("No solution");
      p.noLoop();
      return;
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

//Handy function
function removeFromArray(arr,elt){
  for(var i = arr.length-1; i >= 0; i--){
    if(arr[i] == elt){
      //console.log(elt)
      arr.splice(i,1);
    }
  }
}

//heuristic functions
function heuristic(neighbor,end){
  var neighborCoord = neighbor.coordinate.split(" ").map(Number);
  var endCord = end.coordinate.split(" ").map(Number);

  //return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
  return myp5.dist(neighborCoord[0],neighborCoord[1],endCord[0],endCord[1]);
}

function distBetween(neighbor,current){
    var neighborCoord = neighbor.coordinate.split(" ").map(Number);
    var currentCoord = current.coordinate.split(" ").map(Number);
    //console.log(myp5.dist(neighborCoord[0],neighborCoord[1],currentCoord[0],currentCoord[1]));
    return myp5.dist(neighborCoord[0],neighborCoord[1],currentCoord[0],currentCoord[1]);
}