/** @jsx React.DOM */

module.exports = (function() {
	'use strict';
	var React = require('react');

	// Spinner is the actual React component. The only required prop is `loaded`,
	// which indicates if the 
	var Spinner = React.createClass({displayName: "Spinner",
		interval: null,
		propTypes: {
			spinnerTimeout: React.PropTypes.number,
			messageTimeout: React.PropTypes.number,
			message: React.PropTypes.string,
			height: React.PropTypes.string
		},
		tickLen: 500,
		getInitialState: function() {
			return {
				elapsed: 0
			};
		},
		getDefaultProps: function() {
			return {
				spinnerTimeout: 1,
				messageTimeout: 5,
				message: "This is taking longer than usual. Maybe check your connection?",
				height: '100px'
			};
		},
		tick: function() {
			this.setState({elapsed: this.state.elapsed + 1});
		},
		stopTick: function() {
			clearInterval(this.interval);
			this.interval = null;
		},
		startTick: function() {
			if (this.interval === null) {
				this.setState({ elapsed: 0 });
				this.interval = setInterval(this.tick, this.tickLen);
			}
		},
		componentWillUpdate: function(nextProps, nextState) {
			if (this.props.loaded === false || nextProps.loaded === false) {
				this.startTick();
			}
		},
		componentWillUnmount: function() {
			this.stopTick();
		},
		render: function() {
			var message = "";
			if (this.props.loaded === false) {
				if ((this.state.elapsed * (this.tickLen/1000)) >= this.props.spinnerTimeout) {
					if ((this.state.elapsed * (this.tickLen/1000)) >= this.props.messageTimeout) {
						message = React.createElement("span", null,  this.props.message);
					}
					return (
						React.createElement("div", {className: "scrim", style: {height: this.props.height}}, 
							message, 
							React.createElement("div", {"data-spinner": this.props.name, className: "spinner"}, 
								React.createElement("div", null)
							)
						)
					);
				}
				return null;
			} else {
				this.stopTick();
				return this.props.children;
			}
		}
	});

	// Spinner.Mixin is the mixin part of the component. It allows you to add an 
	// abitrary number of spinners that will display instead of the DOM while 
	// waiting on an async task (network, etc). 
	Spinner.Mixin = {
		// addSpinner adds one or more spinners to the component. A single string
		// or an array of strings can be passed. They're accessible by the string 
		// name given.
		addSpinners: function(name) {
			var state;
			state = {};
			if (typeof name === "string") {
				state[name] = true;
			} else if (Array.isArray(name)) {
				name.forEach(function(val) {
					state[val] = true;
				});
			}
			this.setState({ spinners: state });
		},
		// getSpinner takes a string spinner name and fetches its value.
		getSpinner: function(spinner) {
			if (typeof this.state.spinners[spinner] === 'undefined') {
				throw new Error("Can't get spinner \"" + spinner + "\", does not exist.");
			}
			return this.state.spinners[spinner];
		},
		startSpinner: function(spinner) {
			if (typeof this.state.spinners[spinner] === 'undefined') {
				throw new Error("Can't start spinner \"" + spinner + "\", does not exist.");
			}
			var state = this.state.spinners;
			state[spinner] = false;
			this.setState({ spinners: state });
		},
		stopSpinner: function(spinner) {
			if (typeof this.state.spinners[spinner] === 'undefined') {
				throw new Error("Can't stop spinner \"" + spinner + "\", does not exist.");
			}
			var state = this.state.spinners;
			state[spinner] = true;
			this.setState({ spinners: state });
		}
	};

	return Spinner;
})();
