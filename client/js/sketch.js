const Intersection = require('./entities/Intersection.js');
const Road = require('./entities/Road.js');
const Literal = require('./entities/Literal.js');
const Clause = require('./entities/Clause.js');

var socket = io();

socket.on('connected','hey');

var Roads = {};
var Intersections = {};
var notAlpha;
var KB = {};

KB[Object.keys(KB).length] = new Clause(new Array(new Literal("a",false),new Literal("b",false),new Literal("c",false)));
KB[Object.keys(KB).length] = new Clause(new Array(new Literal("a",true),new Literal("d",true)));
KB[Object.keys(KB).length] = new Clause(new Array(new Literal("b",true),new Literal("c",false)));
KB[Object.keys(KB).length] = new Clause(new Array(new Literal("c",true),new Literal("f",false)));
KB[Object.keys(KB).length] = new Clause(new Array(new Literal("f",true)));
notAlpha = new Clause(new Array(new Literal("d", false)));

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

    // adding neighbors to clauses which are all the other clauses but not itself.
    for(var clauses in KB){
      var clause = KB[clauses];
      for(var tclauses in KB){
        var tclause = KB[tclauses];
        if(clause != tclause){
          clause.Neighbors.push(tclause);
        }
      }
      //console.log(clause);
    }

    //The ending and starting node
    start = KB[0];
    // end = KB[Object.keys(KB)[Object.keys(KB).length - 1]];
    //console.log(start);
    openSet.push(start);
    //console.log(openSet);
  };

  //draw is already a loop, noo need of a while loop.
  p.draw = function() {
    if(openSet.length > 0){
      var lowestIndex = 0;
      for(var i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[lowestIndex].f){
          lowestIndex = i;
        }
      }

      //   console.log(lowestIndex);
      var current = openSet[lowestIndex];
      //console.log(end);
      if(current == null){
        // var curr = current;
        // var ret = [];
        // while(curr.parent){
        //   ret.push(curr);
        //   curr = curr.parent;
        // }
        p.noLoop();
        console.log("SLUT!");
      }

      compareClauses(current,notAlpha);

      removeFromArray(openSet,current);
      closedSet.push(current);
      //console.log(openSet);

      var neighbors = current.Neighbors;
      //console.log(neighbors);
      for(var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        if(closedSet.includes(neighbor)){
          continue;
        }
        //console.log(neighbor);

        var tempG = closedSet.length ;
        //console.log(tempG);

        var newPath = false;
        if(!openSet.includes(neighbor)){
          newPath = true;
          neighbor.h = notAlpha.literals.length;
          //console.log(neighbor.h);
          openSet.push(neighbor);
        }else if(tempG < neighbor.g ){
          newPath = true;
        }

        //console.log("hey")
        if(newPath){
          neighbor.parent = current;
          neighbor.g = tempG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.debug =  "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
          console.log(neighbor.debug);
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

//Handy functions
function removeFromArray(arr,elt){
  for(var i = arr.length-1; i >= 0; i--){
    if(arr[i] == elt){
      arr.splice(i,1);
    }
  }
}

function compareClauses(current,notAlpha){
  var currentLiterals = current.literals;
  var notAlpha = notAlpha.literals;

  //console.log(notAlpha);
  for(var lit in notAlpha){
    var notl = notAlpha[lit];
    for(var i = 0; i < notAlpha[0].length; i++){
      for(var lit in currentLiterals){
        var l = currentLiterals[lit];
        for(var j = 0; j < currentLiterals[0].length; j++){
          //console.log("name: " + l[i].name + " | truthValue: " + l[i].truthValue);
          if(notl[i].name === l[j].name && notl[i].truthValue != l[j].truthValue){

            notAlpha.splice(i,1);

          } else if(notl[i].name === l[j].name && notl[i].truthValue === l[j].truthValue){

            //notAlpha.push(l[j]);
          } else{

            notAlpha.push(l[j]);
          }
        }
      }
      //console.log("name: " + notl[i].name + " | truthValue: " + notl[i].truthValue);
    }
  }
  // console.log(currentLiterals);
  console.log(notAlpha);
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