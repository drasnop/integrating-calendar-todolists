///////////////////////////  helper functions //////////////////////////

function format_date(year, month, day) {
    return "" + year + ("0"+month).slice(-2) + ("0"+day).slice(-2);
};


function fill_calendar(rows) {
    var month_strings = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var month_lengths = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // Start, arbitrarily, on Sunday September 29, 2013
    var day = 29;
    var month = 8;  // September is 9 - 1 so we index from 0
    var year = 2013;
    var cal_table = $("#calendar-wrapper table");
    var row;

    while (rows > 0) {
	row = "<tr>";
	for (var i = 0; i < 7; i++) {
	    row += "<td id='d" + format_date(year,month,day) + "' class='";

	    if(i==0)	       row += "noLeftBorder weekend ";
	    if(i==6)	       row += "noRightBorder weekend ";
	    if (day == 1)      row += "day1";
	    else if (day <= 7) row += "week1";
	    else               row += "regular";
	    row += "'> <div class='day'>";
	    if (day == 1) row += month_strings[month] + " ";
	    row += day;
	    row += "</div> </td>"

	    day += 1;
	    if (day > month_lengths[month]) {
		day = 1;
		month += 1;
		if (month > 11) {
		    month = 0;
		    year += 1;
		}
	    }
	}
	row += "</tr>"
	cal_table.append(row);
	rows--;
    }
}


/*
 * Make RGB-Colors lighter / darker
 * @param array RGB Colors
 * @param number Amount
 */
function changeColor(color,amount){
	res=new Array();
	for(var i=0;i<3;i++){
		res[i]=Math.max(0,Math.min(255,color[i]+amount));
	}
	return res;
}

function colorToString(array){
	return array[0]+','+array[1]+','+array[2];
}

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));
