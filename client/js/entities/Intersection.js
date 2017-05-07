function Intersection(coordinate){
	this.coordinate = coordinate;
	this.intersectionNeighbors = [];
	this.parent = undefined
	this.debug;
	this.f = 0;
	this.g = 0;
	this.h = 0;

}

module.exports = Intersection;