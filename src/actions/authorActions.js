"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/ActionTypes');

var AuthorActions = {

	//
	//  Action creator.
	//
	createAuthor: function(author) { 
		var newAuthor = AuthorApi.saveAuthor(author);

		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		});
	},

	updateAuthor: function(author) { 
		var updatedAuthor = AuthorApi.saveAuthor(author);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor
		});
	},

	deleteAuthor: function(author) { 
		AuthorApi.deleteAuthor(author);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			author: author
		});
	}
};

module.exports = AuthorActions;