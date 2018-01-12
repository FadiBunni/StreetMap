function Clause(l){
	this.literals = [l];
	this.Neighbors = [];
	this.parent = undefined
	this.f = 0;
	this.g = 0;
	this.h = 0;
}

module.exports = Clause;