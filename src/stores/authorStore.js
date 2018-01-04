"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on('change', cb);
	},
	removeChangeListener: function(cb) { 
		this.removeListener('change', cb);
	},
	emitChange: function() { 
		this.emit('change');
	},
	getAllAuthors: function() { 
		return _authors; 
	},
	getAllAuthorNames: function() { 
		return _.map(_authors, function(a) { 
			return a.firstName + " " + a.lastName; 
		});
	},
	getAuthorById: function(id) { 
		return _.find(_authors, {id: id});
	},
	getFirstAuthor: function() {
		return _.first(_authors).firstName;
	}
});

Dispatcher.register(function(action) { 

	switch (action.actionType) { 
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, { id: action.author});
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR:
			var existingAuthor = _.find(_authors, { id: action.author.id});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
			_authors.splice(existingAuthorIndex, 1, action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		default:
			break;
		}

});

module.exports = AuthorStore;