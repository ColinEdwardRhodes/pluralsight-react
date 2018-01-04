"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render: function() { 
		return (
			<div>
				<h1>Page not found!</h1>
				<p>Whoops.  This page was not found!</p>
				<p><Link to="app">Back to home</Link></p>
			</div>
		);
	}
});

module.exports = NotFoundPage;