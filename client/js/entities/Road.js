function Road(firstCoord, name, secondCoord){
this.firstCoord = firstCoord;
this.name = name;
this.secondCoord = secondCoord;
var FCA = firstCoord.split(" ").map(Number);
var SCA = secondCoord.split(" ").map(Number);

this.length = Math.sqrt(Math.pow(FCA[0]-SCA[0],2)+Math.pow(FCA[1]-SCA[1],2));

}

module.exports = Road;