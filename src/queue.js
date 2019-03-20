const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap;
	}

	push(data, priority) {
		if (this.size() == this.maxSize){
			throw new Error('Уупс!');
		}
	return	this.heap.push(data, priority);
	}

	shift() {
		if(this.heap.parentNodes.length == 0){throw new Error('Уупс!');}
		else {
		return this.heap.pop();}
		
	}

	size() {		
		let l = this.heap.parentNodes.length;
		if( l == 0) {return 0}
		else{
		if (this.heap.parentNodes[0].parent != null){
		l = l + 1;
		}	
		return 	l;	
		}
	}

	isEmpty() {
		
		if(this.heap.parentNodes.length == 0 || this.heap.root == null ){return true}	
		else {return false};
}
}

module.exports = PriorityQueue;
