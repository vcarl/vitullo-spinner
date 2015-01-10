/** @jsx React.DOM */

var React = require('React');

var Spinner = module.exports = React.createClass({
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
					message = <span>{ this.props.message }</span>;
				}
				return (
					<div className="scrim" style={{height: this.props.height}}>
						{message}
						<div data-spinner={this.props.name} className="spinner">
							<div />
						</div>
					</div>
				);
			}
			return null;
		} else {
			this.stopTick();
			return this.props.children;
		}
	}

});
