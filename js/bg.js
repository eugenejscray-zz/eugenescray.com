// runtime
$(document).ready(function(){
	document.getElementById('bg').height = $(document).height();
	document.getElementById('bg').width = $(document).width();

	// ranomize the spot.


	for(var i = 0; i < 12; i++){
		yCord = Math.floor($(document).height() / 12) * i;
		xCord = ( i % 2 == 0 ? Math.floor($(document).width() / 3) : Math.floor($(document).width() * 2 / 3) ) ;

		animation = new animatedLine(xCord, yCord, "#0F5791");
		animation.init();
	}

});

function animatedLine(startx, starty, colorStr){
	// these should be passed into the object.
	this.curpointX = startx,
	this.curpointY = starty,
	this.NORTH = 1,
	this.NORTHEAST = 2;
	this.EAST = 3;
	this.SOUTHEAST = 4;
	this.SOUTH = 5;
	this.SOUTHWEST = 6; 
	this.WEST = 7;
	this.NORTHWEST = 8;
	this.colorHex = colorStr;

	var self = this;
	// Lets get rid of one of these position variables.
	this.startpointx = this.curpointX;
	this.startpointy = this.curpointY;
	this.curposx = this.curpointX;
	this.curposy = this.curpointY;
	this.endpointx = this.curpointX;
	this.endpointy = this.curpointY;
	this.myinterval = {};

	this.init = function() {
	   	this.myinterval = setInterval( function() { self.animate(self.endpointx,self.endpointy);}, 10);
	}

	this.animate = function(endpointx, endpointy) {
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
	    this.drawShape(this.curposx, this.curposy, this.colorHex);
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

	this.drawLine = function(flagDirection){
		
		clearInterval(this.myinterval);

		// calculate the next point with direction and distance.
		var direction = Math.floor(Math.random() * 8) + 1;
		var distance = Math.floor(Math.random() * 10) + 1;


		// Test so the animation will "gravitate" towards the middle of the screen
		// select a random number and if 1/10 time then pull the animation in that direction.
		var xGravPull = Math.floor(Math.random() * 8) + 1 == 20;
		var yGravPull = Math.floor(Math.random() * 8) + 1 == 20;

		// console.log("Direction" + direction);
		// console.log("point" + this.endpointx);


		// Lets refacotor this and make it so its concentrating on the viewport.
		// Something is wrong with this function we are gravitating to the left always.
		if(xGravPull && direction > this.NORTH && direction < this.SOUTH && this.endpointx > $(document).width() / 2){
			direction = this.reverseDirection(direction);
		}
		// this is wrong wrong
		else if(xGravPull && direction > this.SOUTH && this.endpointx < $(document).width() / 2)
			direction = this.reverseDirection(direction);

		if(yGravPull && (direction < this.EAST || direction > this.WEST) && this.endpointy < $(document).height() / 2){
			direction = this.reverseDirection(direction);
		}
		else if(yGravPull && (direction > this.EAST && direction < this.WEST) && this.endpointy > $(document).height() / 2){
			direction = this.reverseDirection(direction);
		}

		// console.log(direction);

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
	// TODO refactor to get rid of some of these variables.
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
			// This is bugging out for some reason we are running the full programatic stack.
			this.drawLine();
		}
	}

	this.reverseDirection = function(direction){
		// console.log("Gravitating" + direction);
		REVERSE_DIRECTION_INT = 4;
		newDirection = (direction + REVERSE_DIRECTION_INT) % 8;
		if(newDirection == 0)
			newDirection = 8;

		return newDirection;
	}

}



// gets the starting point to the middle.
// make this into an object
