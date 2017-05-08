function States(coordinate){
	this.intersectionNeighbors = [];
	this.parent = undefined
	this.f = 0;
	this.g = 0;
	this.h = 0;

}

module.exports = States;