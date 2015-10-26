window.Card = {};

Card.values = {
		number: 0,
		shape: "diamond",
		color: "red"
};

Card.init = function(){
	var self = this;
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	var x = document.getElementById("submit");
	//console.log("angad");
	x.addEventListener("click",function(){
		self.values.number = document.getElementById("number").value;
		self.values.shape = document.getElementById("shape").value;
		self.values.color = document.getElementById("color").value;
		// self.clearCanvas(self.ctx);
		self.render(self.ctx);
	});
}

//clear screen
Card.clearCanvas = function(ctx){
	ctx.clearRect(0,0,this.width,this.height);
}

//draw cards
Card.render = function(ctx){
	var x = this.width;
	var y = this.height;

	//card structure
	ctx.fillStyle = "#eeeeee";
	ctx.fillRect(20,20,x-40,y-50);

	ctx.globalCompositeOperation="source-over";

	//card number 
	ctx.fillStyle = this.values.color;
	ctx.font = "70px monopause";
	ctx.fillText(this.values.number,35,90);

	ctx.fillStyle = this.values.color;
	ctx.font = "70px monopause";
	ctx.fillText(this.values.number,x-95,y-60);

	//card shape
	var suitY = y / 2 - 50;

	if(this.values.shape.toLowerCase() == "spade"){
    	this.drawSpade(ctx, x * 0.2, suitY, 75, 100);
	}
	if(this.values.shape.toLowerCase() == "heart"){
		this.drawHeart(ctx, x * 0.4, suitY, 75, 100);
	}
	if(this.values.shape.toLowerCase() == "club"){
    	this.drawClub(ctx, x * 0.6, suitY, 75, 100);
	}
	if(this.values.shape.toLowerCase() == "diamond"){
    	this.drawDiamond(ctx, x * 0.8, suitY, 75, 100);
	}
}	

//draw Spade
Card.drawSpade = function(ctx, x, y, width, height) {
	ctx.save();
    var bottomWidth = width * 0.7;
    var topHeight = height * 0.7;
    var bottomHeight = height * 0.3;

    ctx.beginPath();
    ctx.translate(145,-10);
    ctx.moveTo(x, y);

    // top left of spade
    ctx.bezierCurveTo(x, y + topHeight / 2, // control point 1
    x - width / 2, y + topHeight / 2, // control point 2
    x - width / 2, y + topHeight // end point
    );

    // bottom left of spade
    ctx.bezierCurveTo(x - width / 2, y + topHeight * 1.3, // control point 1
    x, y + topHeight * 1.3, // control point 2
    x, y + topHeight // end point
    );

    // bottom right of spade
    ctx.bezierCurveTo(x, y + topHeight * 1.3, // control point 1
    x + width / 2, y + topHeight * 1.3, // control point 2
    x + width / 2, y + topHeight // end point
    );

    // top right of spade
    ctx.bezierCurveTo(x + width / 2, y + topHeight / 2, // control point 1
    x, y + topHeight / 2, // control point 2
    x, y // end point
    );

    ctx.closePath();
    ctx.fill();

    // bottom of spade
    ctx.beginPath();
    ctx.moveTo(x, y + topHeight);
    ctx.quadraticCurveTo(x, y + topHeight + bottomHeight, // control point
    x - bottomWidth / 2, y + topHeight + bottomHeight // end point
    );
    ctx.lineTo(x + bottomWidth / 2, y + topHeight + bottomHeight);
    ctx.quadraticCurveTo(x, y + topHeight + bottomHeight, // control point
    x, y + topHeight // end point
    );
    ctx.closePath();
    ctx.fillStyle = this.values.color;
    ctx.fill();
    ctx.restore();
}

//draw heart
Card.drawHeart = function(ctx, x, y, width, height) {
   	ctx.save();
    ctx.beginPath();
    var topCurveHeight = height * 0.3;
    ctx.translate(50,-10);
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);

    // bottom left curve
    ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2, x, y + height);

    // bottom right curve
    ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);

    // top right curve
    ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);

    ctx.closePath();
    ctx.fillStyle = this.values.color;
    ctx.fill();
    ctx.restore();
}

//draw Club
Card.drawClub = function (ctx, x, y, width, height) {
	ctx.save();
    var circleRadius = width * 0.3;
    var bottomWidth = width * 0.5;
    var bottomHeight = height * 0.35;
    ctx.fillStyle = this.values.color;

    // top circle
    ctx.beginPath();
    ctx.translate(-45,-10);
    ctx.arc(x, y + circleRadius + (height * 0.05), circleRadius, 0, 2 * Math.PI, false);
    ctx.fill();

    // bottom right circle
    ctx.beginPath();
    ctx.arc(x + circleRadius, y + (height * 0.6), circleRadius, 0, 2 * Math.PI, false);
    ctx.fill();

    // bottom left circle
    ctx.beginPath();
    ctx.arc(x - circleRadius, y + (height * 0.6), circleRadius, 0, 2 * Math.PI, false);
    ctx.fill();

    // center filler circle
    ctx.beginPath();
    ctx.arc(x, y + (height * 0.5), circleRadius / 2, 0, 2 * Math.PI, false);
    ctx.fill();

    // bottom of club
    ctx.moveTo(x, y + (height * 0.6));
    ctx.quadraticCurveTo(x, y + height, x - bottomWidth / 2, y + height);
    ctx.lineTo(x + bottomWidth / 2, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + (height * 0.6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

//draw Diamond
Card.drawDiamond = function (ctx, x, y, width, height) {
	ctx.save();
	ctx.beginPath();
    ctx.translate(-150,-10);

	ctx.moveTo(x, y);

	// top left edge
	ctx.lineTo(x - width / 2, y + height / 2);

	// bottom left edge
	ctx.lineTo(x, y + height);

	// bottom right edge
	ctx.lineTo(x + width / 2, y + height / 2);

	// closing the path automatically creates
	// the top right edge
	ctx.closePath();

	ctx.fillStyle = this.values.color;
	ctx.fill();
	ctx.restore();
}








