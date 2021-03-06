"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass(
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
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() { 
		var authorId = this.props.params.id;
		if (authorId){  
			this.setState({ author: AuthorStore.getAuthorById(authorId)});
		}
	},


	setAuthorState: function(event) { 

		var field = event.target.name;
		var value = event.target.value;

		this.state.author[field] = value;

		return this.setState({ author: this.state.author, dirty: true });
	},

	authorFormIsValid: function() { 
		
		var formIsValid = true;
		this.state.errors = {};

		if (this.state.author.firstName.length < 3) { 
			this.state.errors.firstName = "First name must be at least three characters";
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });

		return formIsValid;
	},

	saveAuthor: function(event) { 
		event.preventDefault(); // avoid default browser behaviour

		if (!this.authorFormIsValid()) { 
			return; 
		}

		if (this.state.author.id) { 
			AuthorActions.updateAuthor(this.state.author);
			toastr.success('Author updated.');
	} else {
			AuthorActions.createAuthor(this.state.author);
			toastr.success('Author saved.');
		}
		this.setState({dirty: false});

		this.transitionTo("authors");

	},

	render: function() { 
		return (
			<AuthorForm 
				author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors}
			/>
		);
	}
});

module.exports = ManageAuthorPage;
