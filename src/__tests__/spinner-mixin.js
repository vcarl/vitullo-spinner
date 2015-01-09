jest.dontMock('../spinner-mixin.js');

describe('addSpinners', function() {
	it('adds a single spinner from a string', function() {
		var Mixin = require('../spinner-mixin.js');

		Mixin.setState = jest.genMockFunction();
		Mixin.addSpinners('test');

		expect(Mixin.setState).toBeCalledWith({
			spinners: {
				test: true
			}
		});
	});

	it('adds multiple spinners from an array', function() {
		var Mixin = require('../spinner-mixin.js');

		Mixin.setState = jest.genMockFunction();
		Mixin.addSpinners(['one', 'two', 'three']);

		expect(Mixin.setState).toBeCalledWith({
			spinners: {
				one: true,
				two: true,
				three: true,
			}
		});
	});
});

describe('getSpinner', function() {
	it('gets the correct value', function() {
		var Mixin = require('../spinner-mixin.js');
		var testTrue, testFalse;

		Mixin.state = {
			spinners: {
				testTrue: true,
				testFalse: false
			}
		};
		testTrue = Mixin.getSpinner('testTrue');
		testFalse = Mixin.getSpinner('testFalse');

		expect(testTrue).toBe(true);
		expect(testFalse).toBe(false);
	});

	it('errors when it should', function() {
		var Mixin = require('../spinner-mixin.js');
		var testTrue, testFalse;

		Mixin.state = {
			spinners: {
			}
		};

		expect(
			function() {Mixin.getSpinner('test')}
		).toThrow(
			new Error("Can't get spinner \"test\", does not exist.")
		);
	});
});

describe('startSpinner', function() {
	it('sets the correct value', function() {
		var Mixin = require('../spinner-mixin.js');
		Mixin.setState = function(val) {
			this.state = val;
		}

		Mixin.state = {
			spinners: {
				test: true
			}
		};
		Mixin.startSpinner('test');

		expect(Mixin.state.spinners.test).toBe(false);
	});

	it('errors when it should', function() {
		var Mixin = require('../spinner-mixin.js');
		var testTrue, testFalse;

		Mixin.state = {
			spinners: {
			}
		};

		expect(
			function() {Mixin.startSpinner('test')}
		).toThrow(
			new Error("Can't start spinner \"test\", does not exist.")
		);
	});
});

describe('stopSpinner', function() {
	it('sets the correct value', function() {
		var Mixin = require('../spinner-mixin.js');
		Mixin.setState = function(val) {
			this.state = val;
		}

		Mixin.state = {
			spinners: {
				test: false
			}
		};
		Mixin.stopSpinner('test');

		expect(Mixin.state.spinners.test).toBe(true);
	});

	it('errors when it should', function() {
		var Mixin = require('../spinner-mixin.js');
		var testTrue, testFalse;

		Mixin.state = {
			spinners: {}
		};

		expect(
			function() {Mixin.stopSpinner('test')}
		).toThrow(
			new Error("Can't stop spinner \"test\", does not exist.")
		);
	});
});
