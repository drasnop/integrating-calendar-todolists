

$(function() {

	fill_calendar(50);  // 50 rows

	$('#wrapper').css('height',$(window).height()-50);

	// Carousel configuration
	/* WARNING: body must be overflow:hidden */
	var carousel = $('#wrapper');
	carousel.carouFredSel({
		circular: false,
		infinite: false,
		auto: false,
		width: 1366,
		height: $(window).height()-50,
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
	var calb = $('#calendar-buttons');
	var todob = $('#todolists-buttons');

	var nav_state = 1;

	function backToCalendarView(){
		c3.hide();
		//c1.fadeIn('slow');
		c1.show();
		$('#calendar').width(1022);
		setTimeout(function(){
			todob.fadeOut();
			calb.fadeIn();
		},100);
		nav_state--;
		lnav.html("Options");
		lnav.css('border-radius','5px');
		rnav.html("Todo lists");
		rnav.css('border-radius','5px 15px 15px 5px');
		carousel.trigger("configuration", ["items.visible", 2, false]);
	}

	c2.hide();
	c3.hide();

	lnav.click(function() {
		switch(nav_state) {
			case 0:
				carousel.trigger("next");
				nav_state++;
				calb.animate({
					'left':'292px'
				},400);
			break;

			case 1:
				carousel.trigger("prev");
				nav_state--;
				calb.animate({
					'left':'344px'
				},400);
				//carousel.trigger("configuration", ["items.visible", 3, false]);
			break;

			case 2:
				backToCalendarView();
			break;
		}
	});

	rnav.click(function() {
		switch(nav_state) {
			case 0:
				carousel.trigger("next");
				nav_state++;

			case 1:
				carousel.trigger("configuration", ["items.visible", 3, false]);
				setTimeout(function(){
					c1.hide();
					//c3.fadeIn('fast');
					c3.show();
				},600);
				$('#calendar').width(322);
				setTimeout(function(){
					calb.fadeOut();
					todob.fadeIn();
				},300);
				lnav.html("Calendar");
				lnav.css('border-radius','15px 5px 5px 15px');
				rnav.html("Calendar");
				rnav.css('border-radius','15px 5px 5px 15px');
				nav_state++;
			break;

			case 2:
				backToCalendarView();
			break;
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

	$('.mini-cal').datepicker({
		changeMonth: true,
		changeYear: true
	});

	// $("#lookatme").bind('inview', function(event, isInView, vX, vY) {
	// 	if(isInView) {
	// 		alert("Lookatme! " + vX + vY);
	// 	}
	// });

	$('#todo-lists-area-wrapper').bind('mousewheel', function(event, delta) {
		var newTop=parseInt($('#todo-lists-area').css('top')) + (delta > 0 ? 40 : -40);
		var height=$('#todo-lists-area').height();
		if(newTop > 3)
			newTop=3;

		/* It would be nice to prevent the user to scroll "too far" at the bottom; 
		however, this would require to know the total height of the todo-lists-are,
		which is complicated to get (it's not just .height()).
		if(newTop < -height-10)
			newTop=-height-10;*/
		$('#todo-lists-area').css('top', newTop);

		return false;
	});

	$('#main-list-wrapper').bind('mousewheel', function(event, delta) {
		var newTop=parseInt($('#main-list').css('top')) + (delta > 0 ? 40 : -40);
		if(newTop > 0)
			newTop=0;
		$('#main-list').css('top', newTop);

		return false;
	});

	$('#calendar-wrapper').scroll(function(){

		updateContextualList();

		return false;
	});

});

function updateContextualList(){
	$("#contextual-list-inner-wrapper").html("");

	var count=0;
	$('.cal-deadline').filter(function(){
		return isScrolledIntoView($(this));
	}).each(function(){
		count++;
		var $this=$(this);
		var importance=$this.data('importance');

		$("#contextual-list-inner-wrapper").append("<div id='insertHere'></div>");
		if(importance==2 && count >5){
			var current=count;
			
			while(current>5){
				
				switchElements($("#insertHere"),$("#insertHere").prev('.deadline'));

				current--;
			}			
		}
		$("#insertHere").after(generateDeadline($this.children('.description').html(),$this.data('date')+" "+$this.children('.time').html(),$this.data('color'),importance));
		$("#insertHere").remove();
	});

	var remainingItems=count-5;
	if(remainingItems>0)
		$("#remaining-items").html("+ "+remainingItems+" items");
	else
		$("#remaining-items").html("");
}

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop + 80));
}

function switchElements(first,second){
	if(second.data('importance')==2){
		switchElements(second,second.prev('.deadline'));	
		console.log('ii');					
	}
	first.insertBefore(second);
}
