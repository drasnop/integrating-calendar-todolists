////////////////////////////// CUSTOM EMBER //////////////////////////////

// Based on:
// https://github.com/KasperTidemann/ember-contenteditable-view/blob/master/ember-contenteditable-view.js
Ember.ItemView = Em.View.extend({
    tagName: 'div',
    attributeBindings: ['contenteditable'],
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
App = Ember.Application.create();

App.Store = DS.Store.extend({
    adapter:  DS.FixtureAdapter.create()
});

App.TodoList = DS.Model.extend({
    column: DS.attr('number'),
    title:  DS.attr('string'),
    color:  DS.attr('string')
});

App.TodoList.FIXTURES = [
    { id: 1, column: 1, title: 'Default', color: white },
    { id: 2, column: 1, title: 'List A1', color: lightblue },
    { id: 3, column: 2, title: 'List B0', color: green },
    { id: 4, column: 2, title: 'List B1', color: yellow },
    { id: 5, column: 2, title: 'List B2', color: pink }
];

App.ApplicationController = Ember.Controller.extend({
    items: items,

//    listColumn1: function() {
//	return this.get('store').filterProperty('column', 1);
//	console.log(this.get('store').filter('todo-lsit', { column: "1" }, function(list) { return list.get('column') === 1 }));
//	return this.get('store').filter('todo-list', { column: 1 }, function(list) { return list.get('column') === 1 });//.then(function(lists) {
//	    console.log('encontrada');
//	});
//    }.property()
});



// JSON fixtures

todoLists = [{
    id:    1,
    posx:  1,
    posy:  1,
    title: "Default",
    color: "#FFFFFF",
}, {
    id:    2,
    posx:  130,
    posy:  1,
    title: "Movies I'd like to see",
    color: "#FFFFFF",
}];


/* An item is like this:
{
    id:         1,      // identifier
    parentId:   null,   // id of the item for which this is a subtask
    listId:     1,      // reference to the "parent" list
    order:      3,      // the order of the item in the list
    importance: 1,      // 0, 1 or 2 from less to more important
    priority:   0.0     // Computed priority
    pinned:     false,  // pinned or not
    checked:    false,  // checked or not
    startDate:  null,   // when event starts (left undefined for deadlines and tasks)
    endDate:    null,   // when event ends (left undefined for tasks)
    reminders:  null,   // list of dates
    description:null    // string
}
*/
/*
items = [{
    id:        1,
    pinned:    false,
    checked:   false,
    startDate: null,
    endDate:   null,
    listId:    1
}];
*/
