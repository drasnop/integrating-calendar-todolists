      $(function() {

	  fill_calendar(50);  // 50 rows

	  // Carousel configuration
	  var carousel = $('#wrapper');
	  carousel.carouFredSel({
	      circular: false,
	      infinite: false,
	      auto: false,
	      width: 1366,
	      height: 'auto',
	      items: {
		  visible: 2,
		  start: 1
	      },
	      scroll: {
		  items: 1
	      }
	  });

	  // Navigation
	  var cc = $('#calendar-contents');
	  var c1 = $('#c1');
	  var c2 = $('#c2');
	  var c3 = $('#c3');
	  var lnav = $('#left-button');
	  var rnav = $('#right-button');

	  var nav_state = 1;

	  c2.hide();
	  c3.hide();

	  lnav.click(function() {
	      if (nav_state == 0) {
		  carousel.trigger("next");
		  nav_state++;
	      } else if (nav_state == 1) {
		  carousel.trigger("prev");
		  nav_state--;
	      } else { // nav_state == 2
		  c3.fadeOut('fast', function() {
		      $('#calendar').width(1022);
		      c1.fadeIn();
		  });
		  nav_state--;
		  lnav.html("Options");
		  rnav.html("Task lists");
		  carousel.trigger("configuration", ["items.visible", 2, false]);
	      }
	  });

	  rnav.click(function() {
	      if (nav_state == 0) {
		  carousel.trigger("next");
		  nav_state++;
	      } else if (nav_state == 1) {
		  carousel.trigger("configuration", ["items.visible", 3, false]);
		  c1.fadeOut('fast', function() {
		      $('#calendar').width(322);
		      c3.fadeIn();
		  });
		  lnav.html("Calendar");
		  rnav.html("Calendar");
		  nav_state++;
	      } else {  // nav_state == 2
		  c3.fadeOut('fast', function() {
		      c1.fadeIn();
		  });
		  $('#calendar').width(1022);
		  nav_state--;
		  lnav.html("Options");
		  rnav.html("Task lists");
		  carousel.trigger("configuration", ["items.visible", 2, false]);
	      }
	  });

	  // TODO lists using gridster
	  $(".gridster ul").gridster({
	      widget_margins: [5, 5],
	      widget_base_dimensions: [150, 150],
	      draggable: {
		  handle: 'header'
	      }
	  });

	  $("#contextual-list ul").sortable();
	  $("#main-todos ul").sortable({
	      handle: 'span'
	  });

	  $('#agenda-calendar div').datepicker({
	      changeMonth: true,
	      changeYear: true
	  });
      });