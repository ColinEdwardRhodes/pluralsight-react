"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var _courses = [];

var courseStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(cb) {
		this.on('change', cb);
	},
	removeChangeListener: function(cb) { 
		this.removeListener('change', cb);
	},
	emitChange: function() { 
		this.emit('change');
	},
	getAllCourses: function() { 
		return _courses;
	},
	getCourseById: function(id) { 
		return _.find(_courses, {id: id});
	}
});

Dispatcher.register(function(action) { 

	switch (action.actionType) { 
		case ActionTypes.DELETE_COURSE:
			_.remove(_courses, { id: action.course});
			courseStore.emitChange();
			break;
		case ActionTypes.CREATE_COURSE:
			_courses.push(action.course);
			courseStore.emitChange();
			break;
		case ActionTypes.UPDATE_COURSE:
			var existingcourse = _.find(_courses, { id: action.course.id});
			var existingcourseIndex = _.indexOf(_courses, existingcourse);
			_courses.splice(existingcourseIndex, 1, action.course);
			courseStore.emitChange();
			break;
		case ActionTypes.INITIALIZE:
			_courses = action.initialData.courses;
			courseStore.emitChange();
			break;
		default:
			break;
		}

});

module.exports = courseStore;