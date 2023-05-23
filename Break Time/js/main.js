// var canvas = document.getElementById('canvas');
// var input = document.getElementById('input');
// var inputData = document.getElementById('input').value;
// var ctx = canvas.getContext('2d');
// var array = [];
// var chars = '';
//
function Submit() {
    var canvas = document.getElementById('canvas');
    var input = document.getElementById('input');
    var inputData = document.getElementById('input').value;
    var ctx = canvas.getContext('2d');
    var array = [];
    var chars = '';
    console.log(inputData);
	var main = document.getElementById('page-main');
	var temp = document.createElement('canvas');
	var buffer = temp.getContext('2d');
	var fill = new ImageData(1, 1);
	//
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 0.6;
	//
	(function loop() {
		update();
		render();
		requestAnimationFrame(loop);
	})();
	//
	function update() {
		//
		array.forEach(function (point) {
			point.update();
		});
	}
	//
	function render() {
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//
		array.forEach(function (point) {
			point.render(ctx);
		});
	}
	//
	inputData.onkeyup = function(e) {
		array = [];
		chars = inputData.value.trim();
		for (var i = chars.length - 1; i >= 0; i--) {
			var char = chars[i];
			var pos = chars.length - i;
			textToImage(char, pos, chars.length);
		}
	};

	//
	function textToImage(key, pos, total) {
		buffer.clearRect(0, 0, 40, 40);
		buffer.font = '32px Arial';
		buffer.fillStyle = '#000';
		buffer.fillText(key, 8, 32);
		var text = buffer.getImageData(0, 0, 40, 40);
		// var width = buffer.measureText(key);
		dataToArray(text, pos, total);
	}
	//
	function dataToArray(text, pos, total) {
		var temp = { x: center.x - 32 - (pos * 92) + (total * 48), y: center.y }
		for (var i = 0; i < text.data.length; i += 4) {
			if (text.data[i + 3] > 0) {
				var x = (i >> 2) % text.width;
				var y = (i >> 2) / text.width;
				var point = new Point({ x: (x << 2) + temp.x, y: (y << 2) + temp.y });
				array.push(point);
				// break;
			}
		}
	}
	function positionFromRad(rad, length, base) {
		var result = { x: length * Math.cos(rad) + base.x, y: length * Math.sin(rad) + base.y };
		return result;
	}
	//
	function Point(base) {
		this.base = base;
		this.chance1 = Math.random() * 0.06 - 0.03;
		this.chance2 = Math.random() * 0.2 - 0.1;
		this.length1 = Math.random() * 20 + 40;
		this.length2 = Math.random() * 10 + 20;
		this.speed1 = Math.random() * 0.5 + 1;
		this.speed2 = Math.random() * 0.1 + 0.5;
		this.dist1 = Math.random() * 4 + 8;
		this.dist2 = Math.random() * 4 + 6;
		this.min1 = Math.random() * -this.dist1;
		this.min2 = Math.random() * -this.dist2;
		this.rad1 = Math.random() * Math.PI * 2 + Math.PI * 2;
		this.rad2 = Math.random() * Math.PI * 2 + Math.PI * 2;
		var temp = positionFromRad(this.rad1, this.length1, this.base);
		this.current = positionFromRad(this.rad2, this.length2, temp);
		//
		this.update = function(base) {
			this.length1 += this.dist1;
			this.length2 += this.dist2;
			this.dist1 -= this.dist1 < this.min1 ? 0 : this.speed1;
			this.dist2 -= this.dist2 < this.min2 ? 0 : this.speed2;
			this.length1 = this.length1 < 0 ? 2 : this.length1;
			this.length2 = this.length2 < -2 ? 2 : this.length2;
			this.rad1 += this.chance1;
			this.rad2 += this.chance2;
			var temp = positionFromRad(this.rad1, this.length1, this.base);
			this.current = positionFromRad(this.rad2, this.length2, temp);
		}
		//
		this.render = function(ctx) {
			ctx.putImageData(fill, this.current.x, this.current.y);
		}

		return this;
	}
};

