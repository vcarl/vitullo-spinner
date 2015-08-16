module.exports = (function() {
	'use strict';
	var React = require('react');

	// Spinner is the actual React component. The only required prop is `loaded`,
	// which indicates if the 
	var Spinner = React.createClass({
		interval: null,
		propTypes: {
			loaded: React.PropTypes.bool.isRequired,
			spinWait: React.PropTypes.number,
			msgWait: React.PropTypes.number,
			message: React.PropTypes.string,
			height: React.PropTypes.number,
			tickLen: React.PropTypes.number,
			spinner: React.PropTypes.node
		},
		getDefaultProps: function() {
			return {
				spinWait: 1,
				msgWait: 5,
				tickLen: 500,
				message: "Loading...",
				height: 100,
				spinner: <div className="vs-indicator" />
			};
		},
		getInitialState: function() {
			return {
				elapsed: 0
			};
		},
		componentWillUnmount: function() {
			this.stopTick();
		},
		componentDidUpdate: function(prevProps, prevState) {
			if (prevProps.loaded === true && this.props.loaded === false) {
				this.startTick();
			} else if (prevProps.loaded === false && this.props.loaded === true) {
				this.stopTick();
			}
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
		render: function() {
			var message = "";
			if (this.props.loaded === false) {
				if ((this.state.elapsed) >= this.props.msgWait) {
					message = <span>{ this.props.message }</span>;
				}
				if ((this.state.elapsed) >= this.props.spinWait) {
					return (
						<div
							className="vs-scrim"
							style={{height: this.props.height}}
						>
							<div className="vs-message">{message}</div>
							<div
								data-spinner={this.props.name}
								className="vs-indicator-wrapper"
							>
								{this.props.spinner}
							</div>
						</div>
					);
				}
			} 
			return this.props.children;
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
