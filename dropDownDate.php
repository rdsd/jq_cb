<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<select class="month" id="end_month" name="dobMonth" onchange="changeDaysOnMonth(this.id, 'end_day')">
    <option value="1" selected>January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
</select>
<select class="day" id="end_day" name="dobDay">
    <option value="1" selected>1</option>
    <option value="2">2</option>
</select>
<select class="year" name="dobYear">
    <?php
    for ($i = 1915; $i <= 2050; $i++) {
        ?>
        <option value='<?php echo $i; ?>'> <?php echo $i; ?> </option>;
        <?php
    }
    ?>
</select>

<script>
    
    //Dynamic dropdown month, day and year - added 10/27/2015
    function changeDaysOnMonthAndOrYear(){
        var thisIdString = $(this).attr("id");
        var dateLabel = "";
        if(thisIdString.indexOf("month") > -1 ){
            dateLabel = thisIdString.replace("month", "");
        }
        else if (thisIdString.indexOf("year") > -1){
            dateLabel = thisIdString.replace("year", "");
        }
        var monthIdString = dateLabel + "month";
        var dayIdString = dateLabel + "day";    
        var yearIdString = dateLabel + "year";
        
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var month = $('#' + monthIdString).val() - 1;
        var year = +$('#' + yearIdString).val();
     
        var dayOptionsLength = $('#' + dayIdString + ' option').length;
    
        // check for leap year if Feb
        if (month == 1 && new Date(year, month, 29).getMonth() == 1){
            days[1]++;
        }
    
        //check for each month and update days options accordingly
        var numberOfDaysOfSelectedMonth = days[month];
        if(numberOfDaysOfSelectedMonth < dayOptionsLength){//remove days
            var lessNoOfDays = -(dayOptionsLength - numberOfDaysOfSelectedMonth);
            $('#' + dayIdString + '> option').slice(lessNoOfDays).remove();
        }
        else{//add days
            var moreNoOfDays = numberOfDaysOfSelectedMonth - dayOptionsLength;
            if(moreNoOfDays > 0){
                for (var i = dayOptionsLength +1; i <= numberOfDaysOfSelectedMonth; i++) {
                    $('<option>').attr('value', i).text(i).appendTo('#' + dayIdString);
                }
            }
        }   
    }
    
    $(document).ready(function(){
    
        $('.month').change(changeDaysOnMonthAndOrYear); // On month change
        $('.year').change(changeDaysOnMonthAndOrYear); // On year change (for leap years)
    });
</script>
