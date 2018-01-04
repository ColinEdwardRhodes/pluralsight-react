"use strict";

var React = require('react');

var Input = React.createClass({ 

	propTypes: { 
		options: React.PropTypes.array.isRequired,
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string
	},

	render: function() { 

		var createOption = function(option) { 
			return (
				<option key={option} value={option}>{option}</option>
			);
		};
		
		return ( 
			<div className="form-group">
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<div className="field">
					<select
						name={this.props.name}
						className="form-control"
						ref={this.props.name}
						value={this.props.value}
						onChange={this.props.onChange}>
						{this.props.options.map(createOption, this)}
					</select>
				</div>
			</div>
		);
	}
});

module.exports = Input;