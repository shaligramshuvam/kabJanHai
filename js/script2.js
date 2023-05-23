let inHours = document.getElementById("inTime");

function GetTime() {
    console.log("Hiii...");

    //In Time:---
    let [inHrs, inMinutes] = inHours.value.split(":")
    console.log(inHours);
    // console.log(sliceHours);
    console.log(inHrs);
    let inHrsInMinutes = parseInt(inHrs) * 60
    let inTotalMinutes = inHrsInMinutes + parseInt(inMinutes)
    console.log(inHrsInMinutes)
    console.log(inMinutes);
    console.log("inTotalMinutes : " + inTotalMinutes);
    console.log(inHours, typeof inHours)

    /*--------------------------------------------------------------------------------------------------*/

    //Total Time To work
    let totalHrsToWorkInMinutes = (8 * 60)
    let totaMinutesToWork = 30
    let totalTimeToWork = totalHrsToWorkInMinutes + totaMinutesToWork
    console.log("totalTimeToWork : " + totalTimeToWork);

    /*--------------------------------------------------------------------------------------------------*/
    //Break Time:

    let breakHrs = document.getElementById("breakHours").value;
    console.log(breakHrs)
    console.log(breakHrs * 6);
    let breakHoursInMinute = breakHrs * 60
    console.log("breakHoursInMinute : " + breakHoursInMinute);
    let breakMinutes = document.getElementById("breakMinutes").value;
    console.log(breakMinutes);
    let totalBreakHoursInMinutes = parseInt(breakHoursInMinute) + parseInt(breakMinutes)
    console.log("totalBreakHoursInMinutes : " + totalBreakHoursInMinutes);
    // let breakHours = totalBreakHoursInMinutes / 60;
    // let breakMinute = totalBreakHoursInMinutes % 60;
    // console.log(breakHours);
    // console.log(breakMinute);

    /*--------------------------------------------------------------------------------------------------*/

    console.log("OutTime : " + totalBreakHoursInMinutes + inTotalMinutes);

    let outExpectedHrs = totalBreakHoursInMinutes + inTotalMinutes + totalTimeToWork
    let outHrs = outExpectedHrs / 60;
    let outMinutes = outExpectedHrs % 60;

    console.log("outHrs : " + parseInt(outHrs));
    console.log("outMinutes : " + (outMinutes));

    //     console.log("outHrs : " + (outHrs + 8));
    //     console.log("outMinutes : " + (outMinutes+30));

    return outHrs, outMinutes;

}


//Label Animation

$('input').each(function () {
    var labelText = $(this).attr('data-placeholder'), // Get input placeholder value
        labelFor = $(this).attr('name'); // Get input name value

    // Wrap the input in a div and label
    // $(this)
    //     .wrap('<div class="input-wrap"></div>')
    //     .before('<label for="' + labelFor + '">' + labelText + '</label>');
});

$('input').focus(function () {
    var inputName = $(this).attr('name');
    $('label[for="' + inputName + '"]').addClass('active');
});

$('input').blur(function () {
    if ($(this).val() != '') {
        $('label.active').addClass('hidden').removeClass('active');
    } else {
        $('label.active').removeClass('hidden active');
    }
});

/*BackGroung Animation Start*/


jQuery.noConflict();
(function ($) {
    $(function () {
        $(function () {
            var width, height, div, ctx, points, target, animateHeader = true;
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
                canvas = document.getElementById('spiders');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');
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
                canvas.width = width;
                canvas.height = height;
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

            // Canvas manipulation
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


//New clock JS


document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "none";

var btn = document.getElementById("inTime");

btn.onclick = function () {
    // document.getElementById("MainContainer").style.display = "none";
    document.getElementById("timepicker-popup-wrapper-modal_XPQS").style.display = "block";
    document.getElementById("breakTimeDiv").style.display = "none";
}



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

//Button Js


//OutputCss
