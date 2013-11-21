var wh=$(window).height();


var colors=new Array(
	[255,255,255],
	[255,255,255],
	[176,229,124],
	[255,255,255],
	[255,255,255],
	[255,174,174],
	[180,216,231],
	[255,255,255],
	[255,236,148],
	[255,255,255],
	[106,206,256],
	[255,255,255],
	[255,255,255],
	[180,216,231]);

function generateItem(item, color,type){
	return "<div class='item "+type+"' style='background-color: rgba("+color+", .85)' data-color=["+color+"] data-activated='false'> \
				<div class='checkbox' data-checked='false'>  \
					<div class='square hiddenIcon'></div><div class='checkmark'>✔</div>  \
				</div>	 \
				<div class='description contenteditable' contenteditable>"+item+"</div>  \
				<div class='setDateTime'>    \
					<div class='contenteditable dateTimeField' contenteditable></div>    \
					<img class='hiddenIcon opacityButton' src='img/calendar16.png' title='Set date/time'>  \
				</div>    \
				<img class='pin hiddenIcon opacityButton' src='img/pin16.png' data-pinned='false' data-dialogueExpanded='false' title='Pin item to main list'>    \
				<div class='dialogueElement dialogue'> \
					<div class='dialogueElement setImportance' title='Set importance level'>!</div>  \
					<div class='dialogueElement createSubtask' title='Create subtask'>+</div>  \
				</div>  \
			</div>";
}


function generateEmptyItem(color,type){
	return generateItem("",color,type);
}

function generateCalendarEvent(description,color){
	return "<div class='cal-item cal-event' style='background-color:rgba("+color+",.8)'>"+description+"	\
				<img class='setReminder hiddenIcon opacityButton' src='img/bell16b.png' title='Set reminder'>	\
			</div>";	
}

function generateCalendarDeadline(description,time,color,importance){
	if(importance==2)
		return "<div class='cal-item cal-deadline' style='font-weight:bold'>		\
					<div class='time'>"+time+"</div>   \
					<div class='description'>"+description+"</div>   \
					<div class='dot' style='background-color:rgba("+color+",1)'></div>	\
					<img class='setReminder hiddenIcon opacityButton' src='img/bell16b.png' title='Set reminder'>	\
				</div>";
	else
		return "<div class='cal-item cal-deadline'>		\
					<div class='time'>"+time+"</div>   \
					<div class='description'>"+description+"</div>   \
					<div class='dot' style='background-color:rgba("+color+",1)'></div>	\
					<img class='setReminder hiddenIcon opacityButton' src='img/bell16b.png' title='Set reminder'>	\
				</div>";
}

function generateDeadline(description,time,color,importance){
	if(importance==2)
		return "<div class='deadline'>   	\
					<div class='description' style='font-weight:bold'>"+description+"</div>   \
					<div class='dot' style='background-color:rgba("+color+",1)'></div>  \
					<div class='contenteditable dateTimeField' contenteditable>"+time+"</div>    \
				</div>";
	else
		return "<div class='deadline'>   	\
				<div class='description'>"+description+"</div>   \
				<div class='dot' style='background-color:rgba("+color+",1)'></div>  \
				<div class='contenteditable dateTimeField' contenteditable>"+time+"</div>    \
			</div>";
}
var white="255,255,255";
var green="176,229,124";
var lightblue="180,216,231";
var yellow="255,236,148";
var pink="255,174,174";

var googleDarkBlue="44,112,209";
var googleLightBlue="164,189,252";
var googleGreen="81,183,73";

function initializeCalendar() {
    $('#d20130901').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130903').append(generateCalendarDeadline("Stage 1","9am",lightblue,2));
    $('#d20130903').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130903').append(generateCalendarDeadline("S1 Hardcopy","5pm",lightblue,1));
    $('#d20130908').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130910').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130915').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130917').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130922').append(generateCalendarDeadline("Stage 2","9am",lightblue,2));
    $('#d20130922').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130922').append(generateCalendarDeadline("S2 Hardcopy","5pm",lightblue,1));
    $('#d20130924').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130928').append(generateCalendarEvent("9:30am Seminar",googleGreen));
    $('#d20130928').append(generateCalendarEvent("1:30pm Seminar",googleGreen));
    $('#d20130929').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20130931').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131005').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131007').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131012').append(generateCalendarDeadline("Stage 3","9am",lightblue,2));
    $('#d20131012').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131012').append(generateCalendarDeadline("S3 Hardcopy","5pm",lightblue,1));
    $('#d20131014').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131018').append(generateCalendarDeadline("RA meeting","3pm",lightblue,1));
    $('#d20131019').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131021').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131025').append(generateCalendarEvent("9:30am Seminar",googleGreen));
    $('#d20131025').append(generateCalendarEvent("1:30pm Seminar",googleGreen));
    //$('#d20131026').append(generateCalendarDeadline("9am Stage 4",lightblue,1));
    $('#d20131026').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    //$('#d20131026').append(generateCalendarDeadline("5pm Stage 4 Hardcopy",lightblue,1));
    $('#d20131028').append(generateCalendarEvent("9:30am Lecture",googleLightBlue));
    $('#d20131029').append(generateCalendarDeadline("Presentation","5pm",lightblue,1));



    $('#d20130902').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130904').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130909').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130911').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130911').append(generateCalendarDeadline("Biology essay","11pm",lightblue,2));
    $('#d20130914').append(generateCalendarDeadline("Midterm prep","5pm",lightblue,1));
    $('#d20130914').append(generateCalendarDeadline("Concert","10pm",pink,1));
    $('#d20130916').append(generateCalendarDeadline("S1 Resubmit","9am",lightblue,1));
    $('#d20130916').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130918').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130923').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130925').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20130930').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131001').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131006').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131008').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131013').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131015').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131020').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131022').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131027').append(generateCalendarEvent("1pm Lab",googleGreen));
    $('#d20131029').append(generateCalendarEvent("1pm Lab",googleGreen));

    $('#contextual-list-inner-wrapper').append(generateDeadline("Stage1","Th 10/3 9am",lightblue,2));
    $('#contextual-list-inner-wrapper').append(generateDeadline("S1 Hardcopy","Th 10/3 5pm",lightblue,1));
    $('#contextual-list-inner-wrapper').append(generateDeadline("Biology essay","M 10/11 11pm",lightblue,2));
    $('#contextual-list-inner-wrapper').append(generateDeadline("Midterm prep","M 10/14 5pm",lightblue,1));
    $('#contextual-list-inner-wrapper').append(generateDeadline("Stage2","Th 10/14 9am",lightblue,2));
    $('#contextual-list-inner-wrapper').append(generateDeadline("Concert","M 10/14 10pm",pink,1));
    $('#contextual-list-inner-wrapper').append(generateDeadline("S1 Resubmit","W 10/16 9am",lightblue,1));
    $('#contextual-list-inner-wrapper').append(generateDeadline("S2 Hardcopy","Th 10/14 5pm",lightblue,1));
}

// this can be either an item or the newItem button
function insertItem(after,_this){
	var color=_this.parent('.todolist').data('color');
	var type=_this.parent('.todolist').attr('type');
	var newItem;

	if(after){
		_this.after(generateEmptyItem(color,type));
		newItem=_this.next();
	}else{
		_this.before(generateEmptyItem(color,type));
		newItem=_this.prev()
	}
	newItem.children('.description').find('br').remove();  //has no effect!
	newItem.children('.description').focus();
	
	newItem.data('activated',false);
	initializeItemsBehavior();
}

function countNumberOfItemsChecked(_todolist){
	return _todolist.children('.item').children('.checkbox').filter(function(){
		return $(this).data('checked') == true;
	}).size();
}

function initializeItemsBehavior(){

	var item=$('.item').filter(function() { 
  		return $(this).data("activated") == false; 
	});
	item.data('activated',true);

	// toggle items icons
	item.mouseenter(function(){
		$(this).find('.hiddenIcon').css('visibility','visible');
	});
	item.mouseleave(function(){
		$(this).find('.hiddenIcon').css('visibility','hidden');
	});

	// keyboard events
	item.children('.description').keydown(function(event){
		// up
		if(event.which==38){
			$(this).parent('.item').prev().children('.description').focus();
		}
		// down
		if(event.which==40){
			$(this).parent('.item').next().children('.description').focus();
		}
	});
	item.children('.description').keypress(function(event){
			if(event.which==13){
				insertItem(true,$(this).parent('.item'));   // Don't put "item" here!!
			}
	});

	// cross items out
	item.children('.checkbox').click(function(){
		var color=$(this).parent('.item').data('color');
		var darkerColor=changeColor(color,-60);

		if(!$(this).data('checked'))
		{
			$(this).data('checked',true);

			// item, text and checkbox appearance
			$(this).parent('.item').css('color','rgb('+colorToString(darkerColor)+')');
			$(this).siblings('.description').css('text-decoration','line-through');
			
			$(this).children('.square').css('display','none');
			$(this).children('.checkmark').css('display','block');
			$(this).children('.checkmark').css('visibility','visible');
			
			// trashbin
			var count=countNumberOfItemsChecked($(this).parents('.todolist'));
			$(this).parents('.todolist').children('.trashbin').css('visibility','visible').attr('title','Delete '+count+' items');
		}
		else{
			$(this).data('checked',false);

			// item, text and checkbox appearance
			$(this).parent('.item').css('color','#191919');
			$(this).siblings('.description').css('text-decoration','none');
			
			$(this).children('.square').css('display','inline-block');
			$(this).children('.checkmark').css('visibility','visible');
			$(this).children('.checkmark').css('display','none');
			
			// trashbin
			if(countNumberOfItemsChecked($(this).parents('.todolist')) == 0){
				$(this).parents('.todolist').children('.trashbin').css('visibility','hidden');
			}
		}
	});

	// pin items
	item.children('.pin').click(function(){
		if(!$(this).data('pinned'))
		{
			$(this).data('pinned',true);

			$(this).attr('src','img/pinned16.png');
			$(this).attr('title',"Unpin item from main list");
			$(this).removeClass('hiddenIcon');
		}
		else
		{
			$(this).data('pinned',false);

			$(this).attr('src','img/pin16.png');
			$(this).attr('title',"Pin item to main list");
			$(this).addClass('hiddenIcon');
		}
	});

	// toggle dialogue
	item.children('.pin').mouseenter(function(){
		if(!$(this).data('dialogueExpanded')){
			$(this).data('dialogueExpanded',true);

			$(this).parent('.item').find('.dialogueElement').visible();
			$(this).parent('.item').find('.opacityButton').css('z-index',10);
		}
	});
	item.children('.dialogue').mouseleave(function(event){
		if(!$(event.relatedTarget).hasClass('pin') || ($(event.relatedTarget).hasClass('pin') && !$(event.relatedTarget).data('dialogueExpanded')) ){
			$(this).siblings('.pin').data('dialogueExpanded',false);
			
			$(this).parent('.item').find('.opacityButton').css('z-index',0);
			$(this).parent('.item').find('.dialogueElement').invisible();
		}
	});


	// Set time/date
	var field;
	item.children('.setDateTime').click(function(){
		field=$(this);
		$(this).children('.hiddenIcon').hide();
		$(this).children('.contenteditable').show();
		$(this).children('.contenteditable').focus();
	});
}

function invisible(){
	$(this).css('visibility','hidden');
}





$(document).ready(function(){

	$("#main-list").data('color',white);

	$('.todolist').append("<div class='newItem'>Add item...</div>");
	$('.todolist').append("<img class='trashbin opacityButton' src='img/trashbin.png' title='Delete checked items'>");

	$('.sortable').sortable({
		//cancel: '.listName,.hiddenIcon,.newItem,.description,.setDateTime,.trashbin',
		items: '.item',
		helper: "clone",
		appendTo: 'body',
		connectWith: '.sortable'});
	var CLheight=150;
	var CLIWheight=121;
	$('#contextual-list').resizable({
		containment:'#tasks-summary',
		handles:'s',
		alsoResize: '#contextual-list-inner-wrapper',
		minHeight:CLheight,
		maxHeight:CLheight*3,
		stop: function(){
			$('#contextual-list').animate({
				'height':CLheight+'px'
			},400);
			$('#contextual-list-inner-wrapper').animate({
				'height':CLIWheight+'px'
			},400);
		}
	});

	$('.todolist').mouseenter(function(){
		$(this).children('.hoverable').css('visibility','visible');
	});
	$('.todolist').mouseleave(function(){
		$(this).find('.dialogueElement').css('visibility','hidden');
	});
	$('.todolist .trashbin').click(function(){
		// foldUp the checked items and remove them
		$(this).siblings('.item').filter(function() { 
  			return $(this).children('.checkbox').data("checked") == true; 
		}).css('height',$(this).height()).css('min-height',0).slideUp(400, function(){
			$(this).remove();
		});
	});

	// Initialize newItems at the bottom
	$('.newItem').click(function(){
		insertItem(false,$(this));
	});

	$('#search-box').click(function(){
		$(this).html("");
	});

	// Initialize items
	initializeItemsBehavior();

    // dummy values for the calendar
    initializeCalendar();

    // Initialize show-hide-calendar-events behavior
    $('#show-hide-calendar-events input').change(function(){
    	if($(this).prop('checked'))
    		$('#c1 .cal-event').visible();
    	else
    		$('#c1 .cal-event').invisible();
    })

    // toggle setReminder icons in calendar
    $('.cal-item').mouseenter(function(){
    	$(this).find('.hiddenIcon').css('visibility','visible');
    });
    $('.cal-item').mouseleave(function(){
    	$(this).find('.hiddenIcon').css('visibility','hidden');
    });

    // Set reminders in calendar
    $('.cal-item .setReminder').mousedown(function(){
	    // This is necessary before we start dragging
    	$(this).removeClass('hiddenIcon');
    	$(this).removeClass('opacityButton');
    });
    $('.cal-item .setReminder').draggable({
    	helper: 'clone'
    });

    // Contextual-list mockup
    $(".cal-deadline").on('appear', function(event, $all_appeared_elements) {
    	console.log("appear");
    	$(this).css('background-color','red');    	
    });

    $(".cal-deadline").on('disappear', function(event, $all_appeared_elements) {
    	console.log("disappear");
    	$(this).css('background-color','black');    	
    });
});



