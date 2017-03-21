(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Intersection(coordinate){
	this.coordinate = coordinate;

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

for(var intersect in Intersections){
	var inter = Intersections[intersect];
	console.log(inter.coordinate);
}

for(var road in Roads){
	var r = Roads[road];
	console.log(r.length);
}




},{"./entities/Intersection.js":1,"./entities/Road.js":2}]},{},[3]);
