(function() {
	// SpinnerMixin is a mixin for React components. It allows you to add an 
	// abitrary number of spinners that will display instead of the DOM while 
	// waiting on an async task (network, etc).
	var SpinnerMixin = {
		// addSpinner adds one or more spinners to the component. A single string
		// or an array of strings can be passed. They're accessible by the string 
		// name given.
		addSpinners: function(name) {
			if (typeof name === "string") {
				var state = {};
				state[name] = true;
				this.setState({ spinners: state });
			} else if (Array.isArray(name)) {
				var state = {};
				name.forEach(function(val) {
					state[val] = true;
				});
				this.setState({ spinners: state });
			}
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
				throw new Error("Spinner \"" + spinner + "\" does not exist.");
			}
			var state = this.state.spinners;
			state[spinner] = true;
			this.setState({ spinners: state });
		}
	};

	module.exports = SpinnerMixin;
})()