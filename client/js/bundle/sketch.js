(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Intersection(coordinate){
	this.coordinate = coordinate;
	this.intersectionNeighbors = [];
	this.previous = undefined
	this.f = 0;
	this.g = 0;
	this.h = 0;

}

module.exports = Intersection;
},{}],2:[function(require,module,exports){
function Road(firstCoord, name, secondCoord, oneway){
this.firstCoord = firstCoord;
this.name = name;
this.secondCoord = secondCoord;
this.oneway = oneway;
var FCA = firstCoord.split(" ").map(Number);
var SCA = secondCoord.split(" ").map(Number);

this.length = Math.sqrt(Math.pow(FCA[0]-SCA[0],2)+Math.pow(FCA[1]-SCA[1],2));

}

module.exports = Road;
},{}],3:[function(require,module,exports){
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

//A* algorithm
  var openSet = [];
  var closedSet = [];
  var intersectionsList = [];
  var start;
  var end;
  var w,h;
  var path = [];

var s = function(p) {

  p.setup = function() {
    //create canvas and center it
    var canvas = p.createCanvas(800, 800);
    centerCanvas(canvas);

    //w = p.width / cols;
    //h = p.height / rows;



    //adding intersections.
    // for(var intersect in Intersections){
    //   var intercoord = Intersections[intersect].coordinate.split(" ").map(Number)
    //   for(var i = 0; i < cols; i++){
    //     for(var j = 0; j< rows; j++){
    //       if(grid[i][j].i === intercoord[0]/5-1 && grid[i][j].j === intercoord[1]/5-1){
    //         grid[i][j].intersection = true;
    //         intersectionsList.push(grid[i][j]);
    //       }
    //     }
    //   }
    // }

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
          console.log(inter);
          //inter.intersectionNeighbors.push(secondCoord);
          //console.log("heyy");
        }
      }
      //console.log("nextLoop");
      //console.log(inter.intersectionNeighbors);
    }

    // for(var i = 0; i < cols; i++){
    //   for(var j = 0; j< rows; j++){
    //     grid[i][j].addNeighbors(grid,cols,rows);
    //   }
    // }

    //The ending and starting node
    start = Intersections[0];
    end = Intersections[1]

    openSet.push(start);
    //console.log(openSet);
  };

  p.draw = function() {
    if(openSet.length > 0){
      //console.log(openSet);
      var lowestIndex = 0;
      for(var i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[lowestIndex].f){
          lowestIndex = i;
        }
      }

      //console.log(lowestIndex);

      var current = openSet[lowestIndex];
      console.log(current);
      //console.log(end);
      if(current === end){
        p.noLoop();
        console.log("DONE!");
      }

      removeFromArray(openSet,current);
      //console.log(current);
      closedSet.push(current);

      var neighbors = current.intersectionNeighbors;
      //console.log(current);
      if(neighbors){
        for(var i = 0; i < neighbors.length; i++){
          var neighbor = neighbors[i];
          if(!closedSet.includes(neighbor)){
            var tempG = current.g + distBetween(current,neighbor);

            // var newPath = false;
            if(openSet.includes(neighbor)){
              if(tempG < neighbor.g){
                neighbor.g = tempG;
                // newPath = true;
              }
            } else {
              neighbor.g = tempG;
              // newPath = true;
              //console.log(neighbor);
              //console.log(neighbor);
              openSet.push(neighbor);
            }

            //heuristic begins
            // if(newPath){
              neighbor.h = heuristic(neighbor,end);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.previous = current;
            // }
          }
        }
        } else {
          console.log("No solution");
          p.noLoop();
          return;
          // no solution
        }
      }


    p.background(0);

    //print out open and closed list:
    // for(var i = 0; i < openSet.length; i++){
    //   openSet[i].show(p.color(0,255,0));
    // }

    // for(var i = 0; i < closedSet.length; i++){
    //   closedSet[i].show(p.color(255,0,0));
    // }

    // //find the patch
    // path = [];
    // var temp = current;
    // path.push(temp);
    // while(temp.previous){
    //   path.push(temp.previous)
    //   temp = temp.previous;
    // }

    // for(var i = 0; i < path.length; i++){
    //   path[i].show(p.color(0,0,255));
    // }

    // p.noFill();
    // p.stroke(255);
    // p.beginShape();
    // for(var i = 0; i < path.length; i++){
    //   p.vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    // }
    // p.endShape();

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
  for(var i = arr.length-1; i >= 0; i--){
    if(arr[i] == elt){
      //console.log(elt)
      arr.splice(i,1);
    }
  }
}

//heuristic functions
function heuristic(neighbor,end){
  var coordb = end.coordinate.split(" ").map(Number);
  //return Math.abs(a.i-b.i) + Math.abs(a.j-b.j);
  return myp5.dist(neighbor[0],neighbor[1],coordb[0],coordb[1]);
}

function distBetween(current,neighbor){
    var coordb = end.coordinate.split(" ").map(Number);
    // console.log("current" + coordb)
    // console.log("neighbor" + neighbor);
    return myp5.dist(coordb[0],coordb[1],neighbor[0],neighbor[1]);
}
},{"./entities/Intersection.js":1,"./entities/Road.js":2}]},{},[3]);
