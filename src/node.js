class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null
	}

	appendChild(node) {
		if (this.left == null){
		this.left =  node;}
		else if (this.right == null){
		this.right = node;}
		node.parent = this;
	}

	removeChild(node) {
		if (this.left == node){
			this.left =  null;
			node.parent = null;}
			else if (this.right == node){
			this.right = null;
			node.parent = null;}
			else{
			throw new Error('Уупс!');}
	}

	remove() {
	if (this.parent != null){
	this.parent.removeChild(this);}
		
	}

	swapWithParent() {
	
		if (this.parent != null){
		if (this == this.parent.left){
			if(this.parent.parent != null){
				if(this.parent == this.parent.parent.left){
					this.parent.parent.left = this
				}
				else if (this.parent == this.parent.parent.right){
					this.parent.parent.right = this
				}
				
			}
				let a = this.right;
			this.right = this.parent.right;
			this.parent.right = a;
		
			this.parent.left = this.left;
			this.left = this.parent;
			this.parent = this.parent.parent;
			this.left.parent =this;			
			
		}
		else if(this == this.parent.right){
			let a = this.left;
			this.left = this.parent.left;
			this.left.parent = this;
			this.parent.left = a;
			this.parent.right = this.right;
			this.right = this.parent;
			this.parent = this.right.parent;
			this.right.parent = this;
		}
	}
	
	}
}

module.exports = Node;
