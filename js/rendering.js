var wh=$(window).height();

var items=new Array(
	"call back Amy",
	"check emails",
	"laundry",
	"7pm restaurant",
	"Tomorrow pay phone bill",
	"Apply for Fair Pharmacare",
	"Kick-Ass 2",
	"call back Amy",
	"check emails",
	"laundry",
	"7pm restaurant",
	"Tomorrow pay phone bill",
	"Apply for Fair Pharmacare",
	"Kick-Ass 2");


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
				<div class='contenteditable' contenteditable>"+item+"</div>  \
				<img class='dateTimeIcon hiddenIcon opacityButton' src='img/calendar16.png' data-pinned='false' title='Set date/time'>  \
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

// this can be either an item or the newItem button
function insertItem(after,_this){
	var color=_this.parent('.todolist').attr('color');
	var type=_this.parent('.todolist').attr('type');
	var newItem;

	if(after){
		_this.after(generateEmptyItem(color,type));
		newItem=_this.next();
	}else{
		_this.before(generateEmptyItem(color,type));
		newItem=_this.prev()
	}
	newItem.children('.contenteditable').find('br').remove();  //has no effect!
	newItem.children('.contenteditable').focus();
	
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
	item.children('.contenteditable').keydown(function(event){
		// up
		if(event.which==38){
			$(this).parent('.item').prev().children('.contenteditable').focus();
		}
		// down
		if(event.which==40){
			$(this).parent('.item').next().children('.contenteditable').focus();
		}
	});
	item.children('.contenteditable').keypress(function(event){
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
			$(this).siblings('.contenteditable').css('text-decoration','line-through');
			
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
			$(this).siblings('.contenteditable').css('text-decoration','none');
			
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
}

function invisible(){
	$(this).css('visibility','hidden');
}


$(document).ready(function(){

	// Content generation
	for(var i=0; i<items.length; i++){
		$("#list1").append(generateItem(items[i],colors[i],"text1"));
		$("#list2").append(generateItem(items[i],colors[i],"text2"));
		$("#list3").append(generateItem(items[i],colors[i],"rect1"));
		//$("#list4").append(generateItem(items[i],colors[i],"rect2"));
	}
	$('.todolist').append("<div class='newItem'>Add item...</div>");
	$('.todolist').append("<img class='trashbin opacityButton' src='img/trashbin.png' title='Delete checked items'>");

	// Initialize todo lists
	//$(".todolist").css('height',wh-50-10);
	$(function() {
		$('.sortable').sortable({
			cancel: '.hiddenIcon,.newItem,.contenteditable,.trashbin',
			connectWith: '.sortable'});
	});
	$('.todolist').mouseenter(function(){
		$(this).children('.hoverable').css('visibility','visible');
	});
	$('.todolist').mouseleave(function(){
		$(this).find('.dialogueElement').css('visibility','hidden');
	});
	$('.todolist .trashbin').click(function(){
		// flodUp the checked items and remove them
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

	// Initialize items
	initializeItemsBehavior();
});


