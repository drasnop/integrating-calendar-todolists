////////////////////////////// CUSTOM EMBER //////////////////////////////

// Based on:
// http://mavilein.github.io/javascript/2013/08/01/Ember-JS-After-Render-Event/
Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
    // implement this hook in your own subclasses and run your jQuery logic there
  }
});

// Based on:
// https://github.com/KasperTidemann/ember-contenteditable-view/blob/master/ember-contenteditable-view.js
Ember.ItemView = Em.View.extend({
    tagName: 'div',
    attributeBindings: ['contenteditable', 'style'],
    classNames: ['description', 'contenteditable'],

    // Variables:
    editable: false,
    isUserTyping: false,
    plaintext: false,

    // Properties:
    contenteditable: (function() {
        var editable = this.get('editable');

        return editable ? 'true' : undefined;
    }).property('editable'),

    style: function() {
	if (this.content.get('checked'))
	    return "text-decoration: line-through";
	else
	    return "text-decoration: none";
    }.property('content.checked'),

    // Observers:
    valueObserver: (function() {
        if (!this.get('isUserTyping') && this.get('value')) {
            return this.setContent();
        }
    }).observes('value'),

    // Events:
    didInsertElement: function() {
        return this.setContent();
    },

    focusOut: function() {
        return this.set('isUserTyping', false);
    },

    keyDown: function(event) {
	var o = this;
        if (!event.metaKey) {
            this.set('isUserTyping', true);
        }
        if (this.get('plaintext')) {
            window.setTimeout( function() { o.set('value', o.$().text()); }, 1);
	    return this;
        } else {
            window.setTimeout( function() { o.set('value', o.$().html()); }, 1);
	    return this;
        }
    },

    keyUp: function(event) {
	return this;
    },

    setContent: function() {
        return this.$().html(this.get('value'));
    }
});




////////////////////////// FIXTURES ///////////////////////////
var white="255,255,255";
var green="176,229,124";
var lightblue="180,216,231";
var yellow="255,236,148";
var pink="255,174,174";

/// Legacy items, these should go eventually
var items=[{
	text: "call back Amy"
},{
	text: "check emails"
},{
	text: "laundry"
},{
	text: "7pm restaurant"
},{
	text: "Tomorrow pay phone bill"
},{
	text: "Apply for Fair Pharmacare"
},{
	text: "Kick-Ass 2"
},{
	text: "call back Amy"
},{
	text: "check emails"
},{
	text: "laundry"
},{
	text: "7pm restaurant"
},{
	text: "Tomorrow pay phone bill"
},{
	text: "Apply for Fair Pharmacare"
},{
	text: "Kick-Ass 2"
}];



////////////////////////////// EMBER APP //////////////////////////////
App = Ember.Application.create({
    ready: function() {
	// Cache fixtures in the store
	App.__container__.lookup('store:main').find('todo-list');
	App.__container__.lookup('store:main').find('item');
    }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.TodoList = DS.Model.extend({
    column: DS.attr('number'),
    title:  DS.attr('string'),
    color:  DS.attr('string'),
    items:  DS.hasMany('item'),

    style: function() {
	return "background-color: rgba(" + this.get('color') + ", 0.35)";
    }.property('color')
});

App.TodoList.FIXTURES = [
    { id: 1, column: 1, title: 'Default', color: white,     items: [1,2,3,4,5,6,7]},
    { id: 2, column: 1, title: 'List A1', color: lightblue, items: [8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
    { id: 3, column: 2, title: 'List B0', color: green,     items: [22,23,24,25,26,27,28,29,30,31,32,33,34,35]},
    { id: 4, column: 2, title: 'List B1', color: yellow,    items: [36,37,38,39,40,41,42]},
    { id: 5, column: 2, title: 'List B2', color: pink,      items: [43,44,45,46,47,48,49]}
];


App.Item = DS.Model.extend({
    parentId:    DS.attr('number'),         // id of the item for which this is a subtask
    list:        DS.belongsTo('todo-list'), // reference to the "parent" list
    order:       DS.attr('number'),         // the order of the item in the list
    importance:  DS.attr('number'),         // 0, 1 or 2 from less to more important
    priority:    DS.attr('number'),         // Computed priority
    pinned:      DS.attr('boolean'),        // pinned or not
    checked:     DS.attr('boolean'),        // checked or not
    startDate:   DS.attr('date'),           // when event starts (left undefined for deadlines and tasks)
    endDate:     DS.attr('date'),           // when event ends (left undefined for tasks)
    reminders:   DS.attr(),	            // list of dates
    description: DS.attr('string'),         // string

    style: function() {
	var listColor = this.get('list.color');
	var darkerColor = changeColor(listColor.split(',').map(Number),-60);
	var res = "background-color: rgba(" + listColor + ", 0.85); ";
	if (this.get('checked')) {
	    return res + "color: rgb(" + colorToString(darkerColor) + ")";
	} else {
	    return res + "color: #191919";
	}
    }.property('list.color', 'checked')
});

App.Item.FIXTURES = [
    // A0
    { id: 1,  parentId: null, list: 1, order: 1,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 2,  parentId: null, list: 1, order: 2,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 3,  parentId: null, list: 1, order: 3,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 4,  parentId: null, list: 1, order: 4,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 5,  parentId: null, list: 1, order: 5,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 6,  parentId: null, list: 1, order: 6,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 7,  parentId: null, list: 1, order: 7,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },

    // A1
    { id: 8,  parentId: null, list: 2, order: 1,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 9,  parentId: null, list: 2, order: 2,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 10, parentId: null, list: 2, order: 3,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 11, parentId: null, list: 2, order: 4,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 12, parentId: null, list: 2, order: 5,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 13, parentId: null, list: 2, order: 6,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 14, parentId: null, list: 2, order: 7,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },
    { id: 15, parentId: null, list: 2, order: 8,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 16, parentId: null, list: 2, order: 9,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 17, parentId: null, list: 2, order: 10, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 18, parentId: null, list: 2, order: 11, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 19, parentId: null, list: 2, order: 12, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 20, parentId: null, list: 2, order: 13, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 21, parentId: null, list: 2, order: 14, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },

    // B0
    { id: 22, parentId: null, list: 3, order: 1,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 23, parentId: null, list: 3, order: 2,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 24, parentId: null, list: 3, order: 3,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 25, parentId: null, list: 3, order: 4,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 26, parentId: null, list: 3, order: 5,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 27, parentId: null, list: 3, order: 6,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 28, parentId: null, list: 3, order: 7,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },
    { id: 29, parentId: null, list: 3, order: 8,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 30, parentId: null, list: 3, order: 9,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 31, parentId: null, list: 3, order: 10, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 32, parentId: null, list: 3, order: 11, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 33, parentId: null, list: 3, order: 12, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 34, parentId: null, list: 3, order: 13, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 35, parentId: null, list: 3, order: 14, importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },

    // B1
    { id: 36, parentId: null, list: 4, order: 1,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 37, parentId: null, list: 4, order: 2,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 38, parentId: null, list: 4, order: 3,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 39, parentId: null, list: 4, order: 4,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 40, parentId: null, list: 4, order: 5,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 41, parentId: null, list: 4, order: 6,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 42, parentId: null, list: 4, order: 7,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" },

    // B2
    { id: 43, parentId: null, list: 5, order: 1,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "call back Amy" },
    { id: 44, parentId: null, list: 5, order: 2,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "check emails" },
    { id: 45, parentId: null, list: 5, order: 3,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "laundry" },
    { id: 46, parentId: null, list: 5, order: 4,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "7pm restaurant" },
    { id: 47, parentId: null, list: 5, order: 5,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Tomorrow pay phone bill" },
    { id: 48, parentId: null, list: 5, order: 6,  importance: 1, priority: 0, pinned: false, checked: false, startDate: null, endDate: null, reminders: [], description: "Apply for Fair Pharmacare" },
    { id: 49, parentId: null, list: 5, order: 7,  importance: 1, priority: 0, pinned: true, checked: false, startDate: null, endDate: null, reminders: [], description: "Kick-Ass 2" }
];

App.ApplicationController = Ember.Controller.extend({
    items: [],

    listColumn1: function() {
	return this.store.filter('todo-list', function(itm, index, enumerable) {
	    return itm.get('column') === 1;
	});
    }.property(),

    listColumn2: function() {
	return this.store.filter('todo-list', function(itm, index, enumerable) {
	    return itm.get('column') === 2;
	});
    }.property(),

    pinnedItems: function() {
	alert(this.get('items'));
	return this.items.filterProperty('pinned');
    }.property('items.@each.pinned', 'items.[]'),

    init: function() {
	this._super();
	this.store.find('item').then(function(v) {
	    v.forEach(function(i) {
		items.push(i);
	    });
	});
    },

    actions: {
	pinSwitch: function(item) {
	    item.set('pinned', !item.get('pinned'));
	},

	checkSwitch: function(item) {
	    item.set('checked', !item.get('checked'));
	},
    }
});


App.RenderTodoListView = Ember.View.extend({
    templateName: "todo-list",
    attributeBindings: ['type', 'style', 'data-color'],
    type: 'text2',

    style: function() {
	return this.content.get('style');
    }.property('content.style'),

    'data-color': function() {
	return this.content.get('color');
    }.property('content.color'),

    trashbinStyle: function() {
	var numItems = this.content.get('items').filterBy('checked').get('length');	var res;
	if (numItems > 0) {
	    return 'visibility: visible';
	} else {
	    return 'visibility: hidden';
	}
    }.property('content.items.@each.checked'),

    trashbinTitle: function() {
	var numItems = this.content.get('items').filterBy('checked').get('length');
	return "Delete " + numItems + " items";
    }.property('content.items.@each.checked'),

    afterRenderEvent: function() {
	var list = this.$();
	var todoList = this.content;

	list.sortable({
        items: '.item',
	   // cancel: '.listName,.hiddenIcon,.newItem,.description,.setDateTime,.trashbin',
	    connectWith: '.sortable'});

	list.mouseenter(function(){
	    $(this).children('.hoverable').css('visibility','visible');
	});
	list.mouseleave(function(){
	    $(this).find('.dialogueElement').css('visibility','hidden');
	});

	// Trashbin logic
	list.children('.trashbin').click(function(){  //TODO: fix this, it only works the first time something is deleted.
	    // foldUp the checked items and remove them
	    $(this).siblings('.item').filter(function() { 
		// Problem: on subsequent invocations, all items return 'false', even if their state is 'checked'. ???
  		return $(this).data("checked") === "checked"; 
	    }).css('height',$(this).height()).css('min-height',0).slideUp(400, function(){
		todoList.get('items').filterProperty('checked').forEach(function(i) {
		    i.deleteRecord();
		});
	    });
	});

	// Initialize newItems at the bottom
	list.children('.newItem').click(function() {
	    insertItem(false,$(this));
	});
    }
});

App.RenderItemView = Ember.View.extend({
    templateName: "item",
    attributeBindings: ['style', 'data-activated', 'data-color', 'data-checked'],

    style: function() {
	return this.content.get('style');
    }.property('content.style'),

    'data-activated': false,

    'data-color': function() {
	return this.content.get('list.color');
    }.property('content.list.color'),

    'data-checked': function() {
	if (this.content.get('checked')) {
	    return "checked";
	} else {
	    return "false";
	}
    }.property('content.checked'),

    pinTitle: function() {
	if (this.content.get('pinned')) {
	    return "Unpin item from main list";
	} else {
	    return "Pin item to main list";
	}
    }.property('content.pinned'),

    pinClass: function() {
	if (!this.content.get('pinned'))
	    return "hiddenIcon";
    }.property('content.pinned'),

    pinSrc: function() {
	if (this.content.get('pinned'))
	    return "img/pinned16.png";
	else
	    return "img/pin16.png";
    }.property('content.pinned'),

    squareStyle: function() {
	if (this.content.get('checked'))
	    return "display: none";
	else
	    return "display: inline-block";
    }.property('content.checked'),

    checkmarkStyle: function() {
	if (this.content.get('checked'))
	    return "display: block; visibility: visible"
	else
	    return "visibility: visible; display: none"
    }.property('content.checked'),

    afterRenderEvent: function () {
	var item = this.$();
	item.data('activated', true);

	// toggle items icons
	item.mouseenter(function(){
	    $(this).find('.hiddenIcon').css('visibility','visible');
	});

	item.mouseleave(function(){
	    $(this).find('.hiddenIcon').css('visibility','hidden');
	});

	// TODO: fix this, it breaks with new items, either at the middle or end of the list
	// keyboard events
	item.children('.description').keydown(function(event){
	    // up
	    if(event.which==38){
		$(this).parent('.item').prevAll('.item').first().find('.description').focus();
	    }
	    // down
	    if(event.which==40){
		$(this).parent('.item').nextAll('.item').first().find('.description').focus();
	    }
	});
	item.children('.description').keypress(function(event){
	    if(event.which==13){
		insertItem(true,$(this).parent('.item'));   // Don't put "item" here!!
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
	    $(this).children('.dateTimeField').show();
	    $(this).children('.dateTimeField').focus();
	});
    }
});
