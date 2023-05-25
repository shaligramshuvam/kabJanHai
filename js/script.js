
function GetTime() {

    //In Hours
    var inTime = document.getElementById('inTime').value;
    let [hours, mins] = inTime.split(":");
    let inHours = hours-12;
    let inMinutes = mins;
    let expectedOutHours = parseInt(inHours) + 8;
    let expectedOutMinutes = parseInt(inMinutes) + 30;
    // console.log("expectedOutHours "+ expectedOutHours);
    // console.log("expectedOutMinutes "+ expectedOutMinutes);
    if (expectedOutHours > 24) {
        var expectedRealOutHours = expectedOutHours - 24;
    }
    else {
        expectedRealOutHours = expectedOutHours;
    }
    if (expectedOutMinutes > 60) {
        var expectedRealOutMinutes = expectedOutMinutes - 60
        expectedRealOutHours = expectedOutHours - 23;
    }
    else {
        expectedRealOutMinutes = expectedOutMinutes;
    }
    console.log("expectedRealOutHours " + Math.abs(expectedRealOutHours));
    console.log("expectedRealOutMinutes " + expectedRealOutMinutes);

    // console.log("In " + inHours);
    // console.log("In " + inMinutes);

    //Current Hours
    var nowTime = new Date;
    let nowHours = nowTime.getHours();
    let nowMinutes = nowTime.getMinutes();
    // console.log("now " + nowHours);
    // console.log("now " + nowMinutes);

    //Break Time
    let breakHours = document.getElementById('breakHours').value;
    let breakMinutes = document.getElementById('breakMinutes').value;
    console.log(typeof (parseInt(breakHours)));
    // console.log(breakMinutes);

    if (parseInt(breakHours) != null) {
        console.log(parseInt(breakHours));
        if (parseInt(breakHours) > 12) {
            var originalBreakHours = parseInt(breakHours) - 12;
        }
        else {
            originalBreakHours = parseInt(breakHours);
        }
    }
    else {
        console.log("Fill the Field");
    }

    if (parseInt(breakMinutes) != null) {
        console.log(parseInt(breakMinutes));

        if (parseInt(breakMinutes) > 60) {
            forHours = (parseInt(breakMinutes) / 60)
            forMinute = (parseInt(breakMinutes) % 60)
            // console.log(forHours);
            // console.log(forMinute);
            originalBreakMinute = forMinute;
            originalRealBreakHours = originalBreakHours + parseInt(forHours);
        }
        else {
            originalRealBreakHours = originalBreakHours;
            originalBreakMinute = parseInt(breakMinutes);
        }
    }
    else {

        alert("Don't keep this empty...");
    }

    console.log("originalRealBreakHours " + originalRealBreakHours);
    console.log("originalBreakMinute " + originalBreakMinute);

    //Logic
    
    var originalOuHours = Math.abs(expectedRealOutHours) + originalRealBreakHours;
    var originalOutMinutes = expectedRealOutMinutes + originalBreakMinute;

    console.log(originalOuHours);
    console.log(originalOutMinutes);

    if(originalOuHours > 24){
        outHours = originalOuHours - 12;
    }
    else
    {
        outHours = originalOuHours
    }

    if(originalOutMinutes > 60){
        forOutHours = (parseInt(originalOutMinutes)/60);
        forOutMinutes = (parseInt(originalOutMinutes)%60);

        outMinute = forOutMinutes;
        outMainHours = (outHours + parseInt(forOutHours))   ;
    }
    else
    {
        outMinute = originalOutMinutes;
        outMainHours = outHours;
    }

    console.log(outMainHours);
    console.log(outMinute);

   document.getElementById('toGetOutTime').innerHTML = "Your Out Time is: "+ outMainHours + ":" + outMinute;

}
