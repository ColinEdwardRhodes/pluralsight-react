"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/ActionTypes');

var CourseActions = {

	//
	//  Action creator.
	//
	createCourse: function(course) { 
		var newCourse = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_COURSE,
			course: newCourse
		});
	},

	updateCourse: function(course) { 
		var updatedCourse = CourseApi.saveCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_COURSE,
			course: updatedCourse
		});
	},

	deleteCourse: function(course) { 
		CourseApi.deleteCourse(course);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_COURSE,
			course: course
		});
	}
};

module.exports = CourseActions;