////////////////////////////// CUSTOM EMBER //////////////////////////////

// Based on:
// https://github.com/KasperTidemann/ember-contenteditable-view/blob/master/ember-contenteditable-view.js
Ember.ItemView = Em.View.extend({
    tagName: 'div',
    attributeBindings: ['contenteditable'],
    classNames: ['una'],

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
var myColors = [
    "#FFFFFF",
    "#F0E8CD", "#DBD5B9", "#C0BA99",
    "#FEEBC9", "#FDCAA2", "#FCA985",
    "#FFFFB0", "#FFFA81", "#FFED51",
    "#E0F3B0", "#BFE476", "#85CA5D",
    "#CFECCF", "#B5E1AE", "#91D290",
    "#B3E2DD", "#86CFBE", "#48B5A3",
    "#CCECEF", "#9ACEDF", "#6FB7D6",
    "#BFD5E8", "#94A8D0", "#7589BF",
    "#DDD4E8", "#C1B3D7", "#A589C1",
    "#FDDEEE", "#FBB6D1", "#F98CB6"
],



////////////////////////////// EMBER APP //////////////////////////////
App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
    color: myColors[1],

    actions: {
	change: function() {
	    this.set('color', myColors[7]);
	}
    }
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

items = [{
    id:        1,
    pinned:    false,
    checked:   false,
    startDate: null,
    endDate:   null,
    listId:    1
}];
