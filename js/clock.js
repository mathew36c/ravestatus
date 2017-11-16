//GLOBAL VARIABLES    
    var hours = minutes = seconds = milliseconds = 0;
    var prev_hours = prev_minutes = prev_seconds = prev_milliseconds = undefined;
    var timeUpdate;
    
    

$(function() {
    
     // Change status on click
    $("#change").button().click(function(){
        
        var dt = new Date();
        var h =  dt.getHours(), m = dt.getMinutes();
        var _time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
        var selected_status = $('input[name=status]:checked').val(); 
        var duration = $('#time').text();
        var hms = duration;   // your input string
        var a = hms.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        var fseconds;
            
        //Time Converter
        if((parseInt(seconds) < 60)) {
            fseconds = (seconds + " sec");
        } else if ((parseInt(seconds) > 60 && (parseInt(seconds) <= 3600))) {
            fseconds = (seconds / 60);
            fseconds = Math.round(fseconds) + " mins";
        } else if ((parseInt(seconds) > 3600)) {
            var hr = (seconds / 3600);
            var mn = (seconds / 60);
            var mm = mn - (hr * 60);
            var fhr = Math.floor(hr);
            var fmn = Math.round(mm);
            fseconds = (fhr + ":" + fmn);
        }
        

        if(parseInt(seconds) <= 0) {
            $("#statusButton").html(selected_status);
        } else {
            //Start Time
            var somedate = new Date();
            var myEndDateTime = somedate;  //somedate is a valid js date  
            var subtracted = (seconds / 60);
            subtracted = Math.floor(subtracted);
            var durationInMinutes = subtracted; 
            var MS_PER_MINUTE = 60000;
            var myStartDate = new Date(myEndDateTime - durationInMinutes * MS_PER_MINUTE);
            var h =  myStartDate.getHours(), m = myStartDate.getMinutes();
            var stime = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
            var day = somedate.getDate();
            var month = somedate.getMonth() + 1;
            var year = somedate.getFullYear();
            var fstime = month + "-" + day + "-" + year;
            var histButton = $('#statusButton').html();
          
            //Add New Row
            $('#historyTable').prepend($('<tr>')
            .append($('<td>').prepend(histButton))
            .append($('<td>').prepend(fstime))
            .append($('<td>').prepend(stime))
            .append($('<td>').prepend(_time))
            .append($('<td>').prepend(fseconds))
            )
            
            $("#statusButton").html(selected_status);
            
        }
        
        
        $('#exampleModal').modal('hide')
        

        //Restarts the time
        if(timeUpdate) clearInterval(timeUpdate);
        setStopwatch(0,0,0,0);
        updateTime(0,0,0,0);

    });


    // Update time in stopwatch periodically - every 25ms
    function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds){
        var startTime = new Date();    // fetch current time
        
        timeUpdate = setInterval(function () {
            var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in milliseconds
            
            // calculate hours                
            hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;
            
            // calculate minutes
            minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
            if (minutes > 60) minutes %= 60;
            
            // calculate seconds
            seconds = parseInt(timeElapsed / 1000) + prev_seconds;
            if (seconds > 60) seconds %= 60;
            
            // set the stopwatch
            setStopwatch(hours, minutes, seconds, milliseconds);
            
        }, 25); // update time in stopwatch after every 25ms
        
    }
    
    // Set the time in stopwatch
    function setStopwatch(hours, minutes, seconds, milliseconds){
        $("#hours").html(prependZero(hours, 1));
        $("#minutes").html(prependZero(minutes, 2));
        $("#seconds").html(prependZero(seconds, 2));
    }
    
    // Prepend zeros to the digits in stopwatch
    function prependZero(time, length) {
        time = new String(time);    // stringify time
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }
});


