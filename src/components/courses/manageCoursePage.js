"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass(
{
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) { 
			if (component.state.dirty && !confirm('Leave without saving data?')) {
				transition.abort(); 
			}
		}
	},

	getInitialState: function() { 

		return {
			course: { 
				id: '', 
				title: '', 
				category: '', 
				length: '',
				author: AuthorStore.getAllAuthorNames()[0]
			},
			errors: {},
			authors: AuthorStore.getAllAuthorNames(),
			dirty: false
		};
	},

	componentWillMount: function() { 
		var courseId = this.props.params.id;
		if (courseId){  
			this.setState({ 
				course: CourseStore.getCourseById(courseId)
			});
		}
	},


	setCourseState: function(event) { 

		var field = event.target.name;
		var value = event.target.value;

		this.state.course[field] = value;

		return this.setState({ course: this.state.course, dirty: true });
	},

	courseFormIsValid: function() { 
		
		var formIsValid = true;
		this.state.errors = {};

		//if (this.state.course.firstName.length < 3) { 
		//	this.state.errors.firstName = "First name must be at least three characters";
		//	formIsValid = false;
		//}

		this.setState({ errors: this.state.errors });

		return formIsValid;
	},

	saveCourse: function(event) { 
		event.preventDefault(); // avoid default browser behaviour

		if (!this.courseFormIsValid()) { 
			return; 
		}

		if (this.state.course.id) { 
			CourseActions.updateCourse(this.state.course);
			toastr.success('Course updated.');
		} else {
			CourseActions.createCourse(this.state.course);
			toastr.success('Course saved.');
		}
		this.setState({dirty: false});

		this.transitionTo("courses");

	},

	render: function() { 
		return (
			<CourseForm 
				course={this.state.course}
				onChange={this.setCourseState}
				onSave={this.saveCourse}
				errors={this.state.errors}
				authors={this.state.authors}
			/>
		);
	}
});

module.exports = ManageCoursePage;
