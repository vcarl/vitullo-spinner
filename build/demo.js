(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function() {
	'use strict';

	var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

	var Spinner = require('./vitullo-spinner.jsx');

	var Demo = React.createClass({displayName: "Demo",
		mixins: [
			// Load the spinner mixin.
			// http://facebook.github.io/react/docs/reusable-components.html#mixins
			Spinner.Mixin
		],
		// All of these are for the inputs below. 
		// All state interaction is via the mixin.
		getInitialState: function() {
			return {
				interval: undefined,
				timeout: 6,
				confTimeout: 0,
				confMessage: "Everything can be set",
				confMsgTimeout: 0
			};
		},
		componentWillMount: function() {
			// Add two spinners, 
			this.addSpinners(['toggle', 'timed', 'configurable']);
		},
		// or:
		// componentWillMount: function() {
		// 	// Add single spinners, 
		// 	this.addSpinners('single');
		// },
		// I use componentWillMount so the spinners will be available in componentDidMount.
		// 
		// The next functions are for individual control of the spinners created.
		toggle: function() {
			// If the spinner is true (loaded, not spinning), start spinning.
			if (this.getSpinner('toggle')) {
				this.startSpinner('toggle');
			// If it's false (not loaded, spinning), stop spinning.
			} else {
				this.stopSpinner('toggle');
			}
		},
		configurable: function() {
			if (this.getSpinner('configurable')) {
				this.startSpinner('configurable');
			} else {
				this.stopSpinner('configurable');
			}
		},
		timed: function() {
			var timeout;
			if (this.state.interval) {
				clearTimeout(this.state.interval);
				this.setState({ interval: undefined });
			}
			this.startSpinner('timed');
			timeout = setTimeout(
				function() {
					this.stopSpinner('timed');
				}.bind(this),
				this.state.timeout * 1000
				)
			this.setState({ interval: timeout });
		},
		// 
		// End spinner controller functions.
		// 
		render: function() {
			return (
				React.createElement("div", {className: "container", style: {"marginTop": "150px"}}, 

					/* 
					 * 
					 * Spinner rendering
					 * 
					 */

					React.createElement("div", {className: "row", style: {"minHeight": "150px"}}, 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement(Spinner, {
								message: "A message pops up after a 5s (default, 0s here) delay. The spinner icon waits 1s (default, 0s here) before appearing.", 
								spinWait: 0, 
								msgWait: 0, 
								loaded: this.getSpinner('toggle')}, 
								React.createElement("div", {className: "spinner-child text-center"}, 
									React.createElement("h1", null, "Toggle Spinner"), 
									React.createElement("p", null, 
										"Press start below!"
									)
								)
							)
						), 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement(Spinner, {loaded: this.getSpinner('timed')}, 
								React.createElement("div", {className: "spinner-child"}, 
									React.createElement("h1", null, "setTimeout spinner")
								)
							)
						), 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement(Spinner, {
								spinWait: this.state.confTimeout, 
								msgWait: this.state.confMsgTimeout, 
								message: this.state.confMessage, 
								loaded: this.getSpinner('configurable')
							}, 
								React.createElement("div", {className: "spinner-child"}, 
									React.createElement("h1", null, "Configure spinner")
								)
							)
						)
					), 

					/* 
					 * 
					 * Controls code, not interesting 
					 * 
					 */

					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement("button", {className: "btn btn-block btn-primary", onClick: this.toggle}, 
								
									this.getSpinner('toggle') ? 'Start' : 'Stop'
								
							)
						), 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement("button", {className: "btn btn-block btn-danger", onClick: this.timed}, "Start"), 
							React.createElement("div", {className: "form-group"}, 
								React.createElement("label", null, "Spinner Duration"), 
								React.createElement("input", {
									type: "number", 
									value: this.state.timeout, 
									className: "form-control", 
									onChange: 
										function(event) {
											this.setState({timeout: event.target.value});
										}.bind(this)}
								)
							)
						), 
						React.createElement("div", {className: "col-md-4"}, 
							React.createElement("button", {className: "btn btn-block btn-info", onClick: this.configurable}, "Toggle"), 
							React.createElement("div", {className: "row"}, 
								React.createElement("div", {className: "form-group col-md-6"}, 
									React.createElement("label", null, "Spinner timeout"), 
									React.createElement("input", {
										type: "number", 
										value: this.state.confTimeout, 
										className: "form-control", 
										onChange: 
											function(event) {
												this.setState({confTimeout: event.target.value});
											}.bind(this)}
									)
								), 
								React.createElement("div", {className: "form-group col-md-6"}, 
									React.createElement("label", null, "Message timeout"), 
									React.createElement("input", {
										type: "number", 
										value: this.state.confMsgTimeout, 
										className: "form-control", 
										onChange: 
											function(event) {
												this.setState({confMsgTimeout: event.target.value});
											}.bind(this)}
									)
								)
							), 
							React.createElement("div", null, 
								React.createElement("label", null, "Message"), 
								React.createElement("input", {
									type: "text", 
									value: this.state.confMessage, 
									className: "form-control", 
									onChange: 
										function(event) {
											this.setState({confMessage: event.target.value});
										}.bind(this)}
								)
							)
						)
					)
				)
			);
		}
	});


	React.render(
		React.createElement(Demo, null),
		document.getElementById('demo')
	);
})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./vitullo-spinner.jsx":2}],2:[function(require,module,exports){
(function (global){
module.exports = (function() {
	'use strict';
	var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

	// Spinner is the actual React component. The only required prop is `loaded`,
	// which indicates if the 
	var Spinner = React.createClass({displayName: "Spinner",
		interval: null,
		propTypes: {
			loaded: React.PropTypes.bool.isRequired,
			spinWait: React.PropTypes.number,
			msgWait: React.PropTypes.number,
			message: React.PropTypes.string,
			height: React.PropTypes.number,
			tickLen: React.PropTypes.number
		},
		getInitialState: function() {
			return {
				elapsed: 0
			};
		},
		getDefaultProps: function() {
			return {
				spinWait: 1,
				msgWait: 5,
				tickLen: 500,
				message: "This is taking longer than usual. Maybe check your connection?",
				height: 100
			};
		},
		tick: function() {
			this.setState({elapsed: this.state.elapsed + (this.props.tickLen / 1000)});
		},
		stopTick: function() {
			this.setState({elapsed: 0});
			clearInterval(this.interval);
			this.interval = null;
		},
		startTick: function() {
			if (this.interval === null) {
				this.setState({ elapsed: 0 });
				this.interval = setInterval(this.tick, this.props.tickLen);
			}
		},
		shouldComponentUpdate: function(nextProps, nextState) {
			if (this.props.loaded === true && nextProps.loaded === false) {
				this.startTick();
			} else if (this.props.loaded === false && nextProps.loaded === true) {
				this.stopTick();
			}
			if (this.props.loaded !== nextProps.loaded) {
				return true;
			}
			if (
				this.state.elapsed <= this.props.spinWait &&
				nextState.elapsed >= nextProps.spinWait
			) {
				return true;
			}
			if (
				this.state.elapsed <= this.props.msgWait &&
				nextState.elapsed >= nextProps.msgWait
			) {
				return true;
			}
			return false;
		},
		componentWillUnmount: function() {
			this.stopTick();
		},
		render: function() {
			var message = "";
			var ret = null;
			var spinnerStyle = {
				height: (this.props.height / 3),
				width: (this.props.height / 3),
				marginLeft: (this.props.height / -6),
				marginTop: (this.props.height / -6),
			};
			if (this.props.loaded === false) {
				if ((this.state.elapsed) >= this.props.msgWait) {
					message = React.createElement("span", null,  this.props.message);
				}
				if ((this.state.elapsed) >= this.props.spinWait) {
					ret = (
						React.createElement("div", {className: "scrim", style: {height: this.props.height}}, 
							message, 
							React.createElement("div", {"data-spinner": this.props.name, style: spinnerStyle, className: "spinner"}, 
								React.createElement("div", null)
							)
						)
					);
				}
				return ret;
			} else {
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
