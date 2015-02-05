module.exports = (function() {
	'use strict';
	var React = require('react');

	// Spinner is the actual React component. The only required prop is `loaded`,
	// which indicates if the 
	var Spinner = React.createClass({
		interval: null,
		propTypes: {
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
			clearInterval(this.interval);
			this.interval = null;
		},
		startTick: function() {
			if (this.interval === null) {
				this.setState({ elapsed: 0 });
				this.interval = setInterval(this.tick, this.props.tickLen);
			}
		},
		componentWillUpdate: function(nextProps, nextState) {
			if (this.props.loaded === false || nextProps.loaded === false) {
				this.startTick();
			} else if (this.props.loaded === false && nextProps.loaded === true) {
				this.stopTick();
			}
			}
		},
		componentWillUnmount: function() {
			this.stopTick();
		},
		render: function() {
			var message = "";
			var spinnerStyle = {
				height: (this.props.height / 3),
				width: (this.props.height / 3),
				marginLeft: (this.props.height / -6),
				marginTop: (this.props.height / -6),
			};
			if (this.props.loaded === false) {
					return (
				if ((this.state.elapsed) >= this.props.msgWait) {
					message = <span>{ this.props.message }</span>;
				}
				if ((this.state.elapsed) >= this.props.spinWait) {
						<div className="scrim" style={{height: this.props.height}}>
							{message}
							<div data-spinner={this.props.name} style={spinnerStyle} className="spinner">
								<div />
							</div>
						</div>
					);
				}
				return null;
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
