(function() {
	'use strict';

	var React = require('react');

	var Spinner = require('./vitullo-spinner.jsx');

	var Demo = React.createClass({
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
				<div className="container" style={{"marginTop": "150px"}}>

					{/* 
					 * 
					 * Spinner rendering
					 * 
					 */}

					<div className="row" style={{"minHeight": "150px"}}>
						<div className="col-md-4">
							<Spinner 
								message="A message pops up after a 5s (default, 0s here) delay. The spinner icon waits 1s (default, 0s here) before appearing." 
								spinnerTimeout="0" 
								messageTimeout="0" 
								loaded={this.getSpinner('toggle')}>
								<div className="spinner-child text-center">
									<h1>Toggle Spinner</h1>
									<p>
										Press start below!
									</p>
								</div>
							</Spinner>
						</div>
						<div className="col-md-4">
							<Spinner loaded={this.getSpinner('timed')}>
								<div className="spinner-child">
									<h1>setTimeout spinner</h1>
								</div>
							</Spinner>
						</div>
						<div className="col-md-4">
							<Spinner 
								spinnerTimeout={this.state.confTimeout} 
								messageTimeout={this.state.confMsgTimeout}
								message={this.state.confMessage}
								loaded={this.getSpinner('configurable')}
							>
								<div className="spinner-child">
									<h1>Configure spinner</h1>
								</div>
							</Spinner>
						</div>
					</div>

					{/* 
					 * 
					 * Controls code, not interesting 
					 * 
					 */}

					<div className="row">
						<div className="col-md-4">
							<button className="btn btn-block btn-primary" onClick={this.toggle}>
								{
									this.getSpinner('toggle') ? 'Start' : 'Stop'
								}
							</button>
						</div>
						<div className="col-md-4">
							<button className="btn btn-block btn-danger" onClick={this.timed}>Start</button>
							<div className="form-group">
								<label>Spinner Duration</label>
								<input 
									type="number" 
									value={this.state.timeout}
									className="form-control"
									onChange={
										function(event) {
											this.setState({timeout: event.target.value});
										}.bind(this)}
								/>
							</div>
						</div>
						<div className="col-md-4">
							<button className="btn btn-block btn-info" onClick={this.configurable}>Toggle</button>
							<div className="row">
								<div className="form-group col-md-6">
									<label>Spinner timeout</label>
									<input 
										type="number" 
										value={this.state.confTimeout} 
										className="form-control"
										onChange={
											function(event) {
												this.setState({confTimeout: event.target.value});
											}.bind(this)}
									/>
								</div>
								<div className="form-group col-md-6">
									<label>Message timeout</label>
									<input 
										type="number" 
										value={this.state.confMsgTimeout} 
										className="form-control"
										onChange={
											function(event) {
												this.setState({confMsgTimeout: event.target.value});
											}.bind(this)}
									/>
								</div>
							</div>
							<div>
								<label>Message</label>
								<input 
									type="text" 
									value={this.state.confMessage} 
									className="form-control"
									onChange={
										function(event) {
											this.setState({confMessage: event.target.value});
										}.bind(this)}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});


	React.render(
		<Demo/>,
		document.getElementById('demo')
	);
})();
