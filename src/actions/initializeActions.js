"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');

var InitializeActions = { 
	initApp: function() { 

		console.log('Calling dispatcher');

		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors(),
				courses: CourseApi.getAllCourses()
			}
		});
	}

};

module.exports = InitializeActions;
