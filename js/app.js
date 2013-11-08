App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});






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
	    row += "<td class='";
	    if (day == 1)      row += "day1";
	    else if (day <= 7) row += "week1";
	    else               row += "regular";
	    row += "'>";
	    if (day == 1) row += month_strings[month] + " ";
	    row += day;
	    row += "</td>"

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
