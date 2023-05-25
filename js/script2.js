let inHours = document.getElementById("inTime");



//To Get Time on click

function GetTime() {
    console.log("Hiii...");

    //In Time:---
    let [inHrs, inMinutes] = inHours.value.split(":")
    console.log(inHours);
    console.log(inHrs);
    console.log(inMinutes);
    let inHrsInMinutes = parseInt(inHrs) * 60 //Hrs in minutes
    let inTotalMinutes = inHrsInMinutes + parseInt(inMinutes) //Total In-Minutes 
    console.log(inHrsInMinutes)
    console.log("inTotalMinutes : " + inTotalMinutes);

    /*--------------------------------------------Total Time To work in Minutes------------------------------------------------------*/

    let totalHrsToWorkInMinutes = (8 * 60)
    let totaMinutesToWork = 30
    let totalTimeToWork = totalHrsToWorkInMinutes + totaMinutesToWork
    console.log("totalTimeToWork : " + totalTimeToWork);

    /*--------------------------------------------------Break Time:------------------------------------------------*/

    let breakHrs = document.getElementById("breakHours").value;
    console.log(breakHrs)
    console.log(breakHrs * 6);
    let breakHoursInMinute = breakHrs * 60
    console.log("breakHoursInMinute : " + breakHoursInMinute);
    let breakMinutes = document.getElementById("breakMinutes").value;
    console.log(breakMinutes);
    let totalBreakTimeInMinutes = parseInt(breakHoursInMinute) + parseInt(breakMinutes)
    console.log("totalBreakHoursInMinutes : " + totalBreakTimeInMinutes);

    /*-------------------------------------------Out Time In-Minutes-------------------------------------------------------*/

    console.log("OutTime : " + (totalBreakTimeInMinutes + inTotalMinutes));
    let outExpectedHrs = parseInt(totalBreakTimeInMinutes) + parseInt(inTotalMinutes) + parseInt(totalTimeToWork);
    console.log("outExpectedHrs " + outExpectedHrs);
    let outHrs = outExpectedHrs / 60;
    let outMinutes = outExpectedHrs % 60;

    if (outHrs > 24) {
        outHrsMain = parseInt(outHrs - 24);
    }
    else {
        outHrsMain = outHrs;
    }
    console.log("outHrsMain " + outHrsMain);
    console.log("outMinutes : " + parseInt(outMinutes));

    // Output.innerHTML = outHrsMain + ":" + outMinutes


    //Output JS

    array = [];
    var outHrsString = parseInt(outHrsMain).toString();
    var outMinutesString = parseInt(outMinutes).toString();
    chars = outHrsString + ":" + outMinutesString;
    console.log(chars);
    // char = value.trim --> value ko trim krne kai lyea
    for (var i = chars.length - 1; i >= 0; i--) {
        var char = chars[i];
        var pos = chars.length - i;
        textToImage(char, pos, chars.length);
    }
    document.getElementById('post').style.display = 'none';
    document.getElementById('showTime').style.display = 'block';
}

document.getElementById('post').style.display = 'block'
//Label Animation

// $('input').each(function () {
//     var labelText = $(this).attr('data-placeholder'), // Get input placeholder value
//         labelFor = $(this).attr('name'); // Get input name value
// });

// $('input').focus(function () {
//     var inputName = $(this).attr('name');
//     $('label[for="' + inputName + '"]').addClass('active');
// });

// $('input').blur(function () {
//     if ($(this).val() != '') {
//         $('label.active').addClass('hidden').removeClass('active');
//     } else {
//         $('label.active').removeClass('hidden active');
//     }
// });

/*BackGroung Animation Start*/
jQuery.noConflict();
(function ($) {
    $(function () {
        $(function () {
            let width, height, div, ctx, points, target, animateHeader = true;
            // Main
            initHeader();
            initAnimation();
            addListeners();
            function initHeader() {
                width = window.innerWidth;
                height = window.innerHeight;
                target = {
                    x: width / 2,   
                    y: height / 3
                };
                spiderCanvas = document.getElementById('spiders');
                spiderCanvas.width = width;
                spiderCanvas.height = height;
                ctx = spiderCanvas.getContext('2d');
                // create points
                points = [];
                for (var x = 0; x < width; x = x + width / 20) {
                    for (var y = 0; y < height; y = y + height / 20) {
                        var px = x + Math.random() * width / 20;
                        var py = y + Math.random() * height / 20;
                        var p = {
                            x: px,
                            originX: px,
                            y: py,
                            originY: py
                        };
                        points.push(p);
                    }
                }
                // for each point find the 5 closest points
                for (var i = 0; i < points.length; i++) {
                    var closest = [];
                    var p1 = points[i];
                    for (var j = 0; j < points.length; j++) {
                        var p2 = points[j]
                        if (!(p1 == p2)) {
                            var placed = false;
                            for (var k = 0; k < 5; k++) {
                                if (!placed) {
                                    if (closest[k] == undefined) {
                                        closest[k] = p2;
                                        placed = true;
                                    }
                                }
                            }

                            for (var k = 0; k < 5; k++) {
                                if (!placed) {
                                    if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                        closest[k] = p2;
                                        placed = true;
                                    }
                                }
                            }
                        }
                    }
                    p1.closest = closest;
                }

                // assign a circle to each point
                for (var i in points) {
                    var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,.3)');
                    points[i].circle = c;
                }
            }

            // Event handling
            function addListeners() {
                if (!('ontouchstart' in window)) {
                    window.addEventListener('mousemove', mouseMove);
                }
                window.addEventListener('scroll', scrollCheck);
                window.addEventListener('resize', resize);
            }

            function mouseMove(e) {
                var posx = posy = 0;
                if (e.pageX || e.pageY) {
                    posx = e.pageX;
                    posy = e.pageY;
                } else if (e.clientX || e.clientY) {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }
                target.x = posx;
                target.y = posy;
            }

            function scrollCheck() {
                if (document.body.scrollTop > height) animateHeader = false;
                else animateHeader = true;
            }

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                // spiderCanvas.width = width;
                // spiderCanvas.height = height;
            }

            // animation
            function initAnimation() {
                animate();
                for (var i in points) {
                    shiftPoint(points[i]);
                }
            }

            function animate() {
                if (animateHeader) {
                    ctx.clearRect(0, 0, width, height);
                    for (var i in points) {
                        // detect points in range
                        if (Math.abs(getDistance(target, points[i])) < 4000) {
                            points[i].active = 0.3;
                            points[i].circle.active = 0.6;
                        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                            points[i].active = 0.1;
                            points[i].circle.active = 0.3;
                        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                            points[i].active = 0.02;
                            points[i].circle.active = 0.1;
                        } else {
                            points[i].active = 0;
                            points[i].circle.active = 0;
                        }

                        drawLines(points[i]);
                        points[i].circle.draw();
                    }
                }
                requestAnimationFrame(animate);
            }

            function shiftPoint(p) {
                TweenLite.to(p, 1 + 1 * Math.random(), {
                    x: p.originX - 50 + Math.random() * 100,
                    y: p.originY - 50 + Math.random() * 100,
                    onComplete: function () {
                        shiftPoint(p);
                    }
                });
            }

            // spiderCanvas manipulation
            function drawLines(p) {
                if (!p.active) return;
                for (var i in p.closest) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.closest[i].x, p.closest[i].y);
                    ctx.strokeStyle = 'rgba(255,255,255,' + p.active + ')';
                    ctx.stroke();
                }
            }

            function Circle(pos, rad, color) {
                var _this = this;

                // constructor
                (function () {
                    _this.pos = pos || null;
                    _this.radius = rad || null;
                    _this.color = color || null;
                })();

                this.draw = function () {
                    if (!_this.active) return;
                    ctx.beginPath();
                    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(255,255,255,' + _this.active + ')';
                    ctx.fill();
                };
            }

            // Util
            function getDistance(p1, p2) {
                return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
            }

        });
    });
})(jQuery);

/*BackGroung Animation End*/


/*Clock JS*/
function timepicker() {
    function createCircleOfDivs(num, radius, offsetX, offsetY, className, add, teilbar) {
        var x, y;
        for (var n = 0; n < num; n++) {
            x = radius * Math.cos(n / num * 2 * Math.PI);
            y = radius * Math.sin(n / num * 2 * Math.PI);
            var div = document.createElement("div");
            div.className = className;
            if (teilbar == 1) {
                if (n + 3 > 12) {
                    div.textContent = n + 3 - 12 + add;
                } else {
                    div.textContent = n + 3 + add;
                }
            } else {

                if (n % teilbar == 0) {
                    if (n + 15 >= 60) {
                        div.setAttribute("data-value", n + 15 - 60);
                        div.textContent = n + 15 - 60 + add;
                    } else {
                        div.setAttribute("data-value", n + 15);
                        div.textContent = n + 15 + add;
                    }
                } else {
                    if (n + 15 >= 60) {
                        div.setAttribute("data-value", n + 15 - 60);
                        div.textContent = "⋅";
                    } else {
                        div.setAttribute("data-value", n + 15);
                        div.textContent = "\u00B7";
                    }
                }
            }

            div.style.left = (x + offsetX) + "px";
            div.style.top = (y + offsetY) + "px";
            $(".timepicker .circle")[0].appendChild(div);
        }
    }
    var currentTime = new Date();
    function selectHours() {
        $(".timepicker .circle").html("");
        createCircleOfDivs(12, 101, 105, 105, "hour", 0, 1);
        //   createCircleOfDivs(12, 64, 110, 110, "hour2",12,1);
        $(".timepicker .circle").append('<div class="mid"></div>');
        $(".timepicker .top .active").removeClass("active");
        $(".timepicker .top .h").addClass("active");
        $(".hour").on("mouseup", function () {
            $(".timepicker .top .h").text(($(this).text().length > 1) ? $(this).text() : "0" + $(this).text());
            selectMinutes();
        });

    }
    function selectMinutes() {
        $(".timepicker .circle").html("");
        $(".timepicker .top .active").removeClass("active");
        $(".timepicker .top .m").addClass("active");
        createCircleOfDivs(60, 101, 115, 115, "min", 0, 5);
        $(".timepicker .circle .min").on("mouseup", function () {
            $(".timepicker .top .m").text(($(this).attr("data-value").length > 1) ? $(this).attr("data-value") : "0" + $(this).attr("data-value"));
        });
    }
    selectHours();
    $(".timepicker .top .h").text(currentTime.getHours());
    $(".timepicker .top .m").text(currentTime.getMinutes());

    $(".timepicker .top span").click(function () {
        if (!$(this).hasClass("active")) {
            if ($(this).hasClass("h")) {
                selectHours();
            } else {
                selectMinutes();
            }
        }
    });
    $(".timepicker .action.ok").click(function () {
        var selectedTime = $(".timepicker .top .h").text() + ":" + $(".timepicker .top .m").text();
        // alert(selectedTime);
        document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "none";
        document.getElementById("breakTimeDiv").style.display = "block";

        inHours.value = selectedTime
        console.log(inHours.value)
    });
    $(".timepicker .action.cancel").click(function () {
        document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "none";

    });

}
timepicker();

// window.onload() = () => {
//     
// }
//New clock JS
var btn = document.getElementById("inTime");
console.log(btn)
document.querySelector('#inTime').addEventListener('click', () => {
    console.log('hi')
})

btn.onclick = function () {
    document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "block";
    document.getElementById("breakTimeDiv").style.display = "none";
    console.log('hi')
}
document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "none";



//Break Time
function setFocus(on) {
    var element = document.activeElement;
    if (on) {
        setTimeout(function () {
            element.parentNode.classList.add("focus");
        });
    } else {
        let box = document.querySelector(".input-box");
        box.classList.remove("focus");
        $("input").each(function () {
            var $input = $(this);
            var $parent = $input.closest(".input-box");
            if ($input.val()) $parent.addClass("focus");
            else $parent.removeClass("focus");
        });
    }
}


var showTimeCanvas = document.getElementById('showTime');
console.log(showTimeCanvas)
var input = document.getElementById('input');
let ctx = showTimeCanvas.getContext('2d');
var array = [];
var chars = '';
//
// window.onload = function () {
	var main = document.getElementById('page-main');
	var temp = document.createElement('canvas');
    showTimeCanvas.style.display = 'none';

	var buffer = temp.getContext('2d');
	var fill = new ImageData(1, 1);
	//
	showTimeCanvas.width = window.innerWidth;
	showTimeCanvas.height = window.innerHeight;
	var center = { x: showTimeCanvas.width * 0.5, y: showTimeCanvas.height * 0.5 };
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, showTimeCanvas.width, showTimeCanvas.height);
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
		ctx.fillRect(0, 0, showTimeCanvas.width, showTimeCanvas.height);

		//
		array.forEach(function (point) {
			point.render(ctx);
		});
	}

	function handleSubmit(){
		array = [];
		chars = input.value.trim();
		// char = value.trim --> value ko trim krne kai lyea
		for (var i = chars.length - 1; i >= 0; i--) {
			var char = chars[i];
			var pos = chars.length - i;
			textToImage(char, pos, chars.length);
		}
	}
	
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
// };








