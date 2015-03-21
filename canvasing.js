var data = [ 16, 68, 20, 30, 54 ];

//get a reference to the canvas
var canvas = document.getElementById('canvas');

//get a reference to the drawing context
var c = canvas.getContext('2d');

//draw
c.fillStyle = "black";
c.fillRect(0,0,500,500);

//draw data
c.fillStyle = "red";
for(var i=0; i<data.length; i++) {
    var dp = data[i];
    c.fillRect(25 + i*100, 500-dp*5 - 30 , 50, dp*5);
}
