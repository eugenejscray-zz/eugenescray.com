document.getElementById('bg').height = $(document).height();
document.getElementById('bg').width = $(document).width();

// gets the starting point to the middle.
var curpointX = Math.floor($(document).width() / 2);
var curpointY = Math.floor($(document).height() / 2);

var NORTH = 1;
var NORTHEAST = 2;
var EAST = 3;
var SOUTHEAST = 4;
var SOUTH = 5;
var SOUTHWEST = 6; 
var WEST = 7;
var NORTHWEST = 8;

// Lets make this into an object.
// We will then be calling the object withing a line drawer to animate this in the background.

var startpointx = curpointX;
var startpointy = curpointY;
var curposx = curpointX;
var curposy = curpointY;
var endpointx = curpointX;
var endpointy = curpointY;
var myinterval;


function init() {
   	myinterval = setInterval(' animate('+endpointx+', '+endpointy+') ', 1);

}

function animate(endpointx, endpointy) {
	startpointy = curposy;
	startpointx = curposx;
	
	if (curposx == endpointx && curposy == endpointy){
		drawLine();
		return false;
	}
	else if(endpointx != curposx && endpointy != curposy){
		// this will screw up if we have half pixel somewhere. ( will always be diagnol)
		curposy += (endpointy > curposy ? 1 : -1);			
		curposx += (endpointx > curposx ? 1 : -1);
	}
	else if(endpointx != curposx){
		curposx += (endpointx > curposx ? 1 : -1);
	}
	else if(endpointy != curposy){
		curposy += (endpointy > curposy ? 1 : -1);
	}
	else{
		console.log("We have a problem");
	}

    drawShape(curposx, curposy, "#000");
}

function drawShape(tendpointx, tendpointy, clor){
     var canvas = document.getElementById('bg');
     var ctx = canvas.getContext('2d');

    ctx.strokeStyle = clor;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    // We are redrawing the whole path. We should only be drawing one portion.
    ctx.moveTo(startpointx ,startpointy );
    ctx.lineTo(tendpointx,tendpointy);
    ctx.stroke();
} 

function drawLine(){
	clearInterval(myinterval);
	// TODO refactor so this check is done before we add this to the end points. (We want the animation to bounce around the screen.)
	
	// calculate the next point.
	// if inside go. If outside switch direction and start over (recursive)
	var direction = Math.floor(Math.random() * 8) + 1;
	// animate north test	
	// randomize the distance to give it more flavor.

	var newPointY, newPointX;

	var distance = Math.floor(Math.random() * 10) + 1;
	switch(direction){
		case NORTH:
			newPointX = endpointx;
			newPointY = endpointy - distance;
			setAnimationVariables(newPointX, newPointY);
			break; 
		case NORTHEAST: 
			newPointX = endpointx + distance;
			newPointY = endpointy - distance;
			setAnimationVariables(newPointX, newPointY);
			break;
		case EAST:
			newPointX = endpointx + distance;
			newPointY = endpointy;
			setAnimationVariables(newPointX, newPointY);
			break; 
		case SOUTHEAST: 
			newPointX = endpointx + distance;
			newPointY = endpointy + distance;
			setAnimationVariables(newPointX, newPointY);
			break;
		case SOUTH:
			newPointX = endpointx;
			newPointY = endpointy + distance;
			setAnimationVariables(newPointX, newPointY);
			break;
		case SOUTHWEST:
			newPointX =  endpointx - distance;
			newPointY = endpointy + distance;
			setAnimationVariables(newPointX, newPointY);				
			break;
		case WEST:
			newPointX = endpointx - distance;
			newPointY = endpointy;
			setAnimationVariables(newPointX, newPointY);
			break;
		case NORTHWEST:
			newPointX = endpointx - distance;
			newPointY = endpointy - distance;
			setAnimationVariables(newPointX, newPointY);
			break;
		default:
			console.log("We have a problem");
	}
	init();
}

// Helper function to set variables for animation. 
// TODO refactor to get rid of some of these variables. (at least one)
function setAnimationVariables(newPointX, newPointY){
	// we can check this inside of here. 
	// check the newpoints. Verify its inside the canvas.
	if(newPointY > 0 && newPointX > 0 && newPointY < $(document).height() && newPointX < $(document).width()){
		endpointx = newPointX;
		endpointy = newPointY;
		curpointX = endpointx;
		curpointY = endpointy;
		startpointx = endpointx;
		startpointy = endpointy;
	}
	else {
		drawLine();
	}
}

// Run-time
init();


