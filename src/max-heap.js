const Node = require('./node');

class MaxHeap {
	constructor(root, parentNodes) {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);		
	}
	

	pop(){
		if (this.parentNodes.length > 1){
		if(this.parentNodes[0].parent != null){
			this.parentNodes.unshift(this.parentNodes[0].parent)};	
		let a = this.parentNodes.shift();
		if(this.parentNodes.length > 0){
			this.parentNodes[0].parent = null};	
		return a.data;
		} else if (this.parentNodes.length == 1){		
		return this.detachRoot()[0].data;
		}	
	}
		
	
	detachRoot() {
		let a = this.parentNodes.length - 1;
		if(this.parentNodes.length == 1){
			this.root = null;}
		return this.parentNodes.splice(a, 1);
	}

	restoreRootFromLastInsertedNode(detached) {
		
		let a = this.parentNodes.length - 1;
		if( a > 0){
		let pP = this.root;
		let lP = this.root.left;
		let rP = this.root.right;
		
		let childBeRoot;
		if(this.parentNodes[a].parent.left == this.parentNodes[a]){
			childBeRoot = this.parentNodes[a].parent.right; 
			this.parentNodes[a].parent.right = null; 
			this.parentNodes.unshift(this.parentNodes[a].parent);}
		this.root = childBeRoot;
		this.root.parent = null;
		this.root.left = lP;
		this.root.right = rP;
		this.root.left.parent = this.root;
		this.root.right.parent = this.root;
		} else{
			this.parentNodes.unshift(this.parentNodes[a].parent.right); 
			this.root = this.parentNodes[a];
			this.root.parent = null;
			this.root.left = this.parentNodes[a+1];
			this.root.left.parent = this.root;
			this.root.right = null;
		}
	}

	size() {
		let l = this.parentNodes.length;
	if (l == 0 ) { return 0}
	else{
		if(this.parentNodes[0].parent != null){
			l = l + 1;
		}
	return 	l;	
	}
	
	}

	isEmpty() {
		if(this.parentNodes.length == 0 || this.root == null ){return true}	
		else {return false};
	}

	clear() {
		this.root = null;
		this.parentNodes.length = 0;
		
		//this.parentNodes.splice(0, this.parentNodes.length);
		//this.parentNodes = [];
	}

	insertNode(node) {
		let l = this.parentNodes.length;
		if (this.root == null || l == 0 ){ 
			this.root = node; };
		    this.parentNodes.push(node);
			l = this.parentNodes.length;
		
		let a = l-1;
		
		if ( a > 0 ){		    
			if(this.parentNodes[0].left == null){
			this.parentNodes[0].left = this.parentNodes[a];
			this.parentNodes[a].parent = this.parentNodes[0]
			} else 
			if(this.parentNodes[0].right == null){
			this.parentNodes[0].right = this.parentNodes[a];
			this.parentNodes[a].parent = this.parentNodes[0]};			
			};	
      
	     if(this.parentNodes[0].left != null && this.parentNodes[0].right != null){
			 this.parentNodes.splice(0, 1);
		 }
	}

	shiftNodeUp(node) {
		let l = this.parentNodes.length;
		let a = Math.ceil(Math.log2(l));
		
		while( a > 0) {
			   if(node.priority > node.parent.priority){
				   
				let indexParent = this.parentNodes.indexOf(node.parent);
				if (indexParent == -1) {
					this.parentNodes.unshift(node.parent);
				    indexParent = 0;
				};
				let indexChild = this.parentNodes.indexOf(node);
			if(indexParent >= 0) {this.parentNodes[indexParent] = node};
			if(indexChild >= 0 ){this.parentNodes[indexChild] = node.parent};
			node.swapWithParent();
			if(node.parent == null){ this.root = node}
			
		if(this.parentNodes[0].left != null && this.parentNodes[0].right != null){
			this.parentNodes.splice(0, 1);
		}
		};
		a = a - 1;};
	}

	shiftNodeDown(node) {
		if ( node.left.priority > node.right.priority){
			if(node.priority < node.left.priority){
				let indexChild = this.parentNodes.indexOf(node.left);
				this.parentNodes[indexChild] = node;
				this.root = node.left;
				node.left.swapWithParent();				
			};		
			
			
			if(node.priority < node.left.priority){
				let indexChild = this.parentNodes.indexOf(node.left);
				let indexParent = this.parentNodes.indexOf(node);
				
				this.parentNodes[indexParent] = node.left;
				this.parentNodes[indexChild] = node;
				node.left.swapWithParent();
			};
			
			
					this.root.left = this.parentNodes[0];
					this.root.right = this.parentNodes[1];
					this.root.left.left = this.parentNodes[2];
					
				}
			
		 else if ( node.left.priority < node.right.priority){
				
			if(node.priority < node.right.priority){
				this.root = node.right;
				this.root.right = node;
				node.right.swapWithParent();
				
			};
			
			
			
			 if(node.priority < node.left.priority){
				let indexChild = this.parentNodes.indexOf(node.left);
				let indexParent = this.parentNodes.indexOf(node);
				this.parentNodes[indexParent] = node.left;
				this.parentNodes[indexChild] = node;
				node.left.swapWithParent();
				this.root.right.left = this.parentNodes[indexChild];
			};  
				
			}
	}
}

module.exports = MaxHeap;
