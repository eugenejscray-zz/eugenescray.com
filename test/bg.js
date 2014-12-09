// runtime
// We have to make this so we can have multiple animation lines in the canvas.
$(document).ready(function(){
	document.getElementById('bg').height = $(document).height();
	document.getElementById('bg').width = $(document).width();

	var animation = new animatedLine();
	animation.init();

});

function animatedLine(){
	// these should be passed into the object.
	this.curpointX = Math.floor($(document).width() / 2),
	this.curpointY = Math.floor($(document).height() / 2),
	this.NORTH = 1,
	this.NORTHEAST = 2;
	this.EAST = 3;
	this.SOUTHEAST = 4;
	this.SOUTH = 5;
	this.SOUTHWEST = 6; 
	this.WEST = 7;
	this.NORTHWEST = 8;

	// Lets make this into an object.
	// We will then be calling the object withing a line drawer to animate this in the background.
	var testola = this;
	this.startpointx = this.curpointX;
	this.startpointy = this.curpointY;
	this.curposx = this.curpointX;
	this.curposy = this.curpointY;
	this.endpointx = this.curpointX;
	this.endpointy = this.curpointY;
	this.myinterval = {};

	this.init = function() {
	   	this.myinterval = setInterval( function() { console.log(testola); testola.animate(this.endpointx,this.endpointy);}, 1);
	   	clearInterval(this.myinterval);
	}

	animate = function(endpointx, endpointy) {
		this.startpointy = this.curposy;
		this.startpointx = this.curposx;
		if (this.curposx == endpointx && this.curposy == endpointy){
			this.drawLine();
			return false;
		}
		else if(endpointx != this.curposx && endpointy != this.curposy){
			// this will screw up if we have half pixel somewhere. ( will always be diagnol)
			this.curposy += (endpointy > this.curposy ? 1 : -1);			
			this.curposx += (endpointx > this.curposx ? 1 : -1);
		}
		else if(endpointx != this.curposx){
			this.curposx += (endpointx > this.curposx ? 1 : -1);
		}
		else if(endpointy != this.curposy){
			this.curposy += (endpointy > this.curposy ? 1 : -1);
		}
		else{
			console.log("We have a problem");
		}

	    this.drawShape(this.curposx, this.curposy, "#000");
	}

	this.drawShape = function(tendpointx, tendpointy, clor){
	    var canvas = document.getElementById('bg');
	    var ctx = canvas.getContext('2d');
	    
	    ctx.strokeStyle = clor;
	    ctx.globalAlpha = 0.2;
	    ctx.beginPath();
	    ctx.moveTo(this.startpointx ,this.startpointy );
	    ctx.lineTo(tendpointx,tendpointy);
	    ctx.stroke();
	} 

	this.drawLine = function(){
		
		clearInterval(this.myinterval);

		// calculate the next point with direction and distance.
		var direction = Math.floor(Math.random() * 8) + 1;
		var distance = Math.floor(Math.random() * 10) + 1;

		var newPointY, newPointX;

		switch(direction){
			case this.NORTH:
				newPointX = this.endpointx;
				newPointY = this.endpointy - distance;
				this.setAnimationVariables(newPointX, newPointY);
				break; 
			case this.NORTHEAST:
				newPointX = this.endpointx + distance;
				newPointY = this.endpointy - distance;
				this.setAnimationVariables(newPointX, newPointY);
				break;
			case this.EAST:
				newPointX = this.endpointx + distance;
				newPointY = this.endpointy;
				this.setAnimationVariables(newPointX, newPointY);
				break; 
			case this.SOUTHEAST: 
				newPointX = this.endpointx + distance;
				newPointY = this.endpointy + distance;
				this.setAnimationVariables(newPointX, newPointY);
				break;
			case this.SOUTH:
				newPointX = this.endpointx;
				newPointY = this.endpointy + distance;
				this.setAnimationVariables(newPointX, newPointY);
				break;
			case this.SOUTHWEST:
				newPointX =  this.endpointx - distance;
				newPointY = this.endpointy + distance;
				this.setAnimationVariables(newPointX, newPointY);				
				break;
			case this.WEST:
				newPointX = this.endpointx - distance;
				newPointY = this.endpointy;
				this.setAnimationVariables(newPointX, newPointY);
				break;
			case this.NORTHWEST:
				newPointX = this.endpointx - distance;
				newPointY = this.endpointy - distance;
				this.setAnimationVariables(newPointX, newPointY);
				break;
			default:
				console.log("We have a problem");
		}
		this.init();
	}

	// Helper function to set variables for animation. 
	// TODO refactor to get rid of some of these variables. (at least one)
	this.setAnimationVariables = function(newPointX, newPointY){

		// we can check this inside of here. 
		// check the newpoints. Verify its inside the canvas.
		if(newPointY > 0 && newPointX > 0 && newPointY < $(document).height() && newPointX < $(document).width()){
			this.startpointx = this.endpointx;
			this.startpointy = this.endpointy;
			this.curpointX = this.endpointx;
			this.curpointY = this.endpointy;
			this.endpointx = newPointX;
			this.endpointy = newPointY;
			
		}
		else {
			// this may be fatal because we are still putting execution onto the stack. We need to refactor to either avoid recursion or avoid drawing the line.
			this.drawLine();
		}
	}
}



// gets the starting point to the middle.
// make this into an object
