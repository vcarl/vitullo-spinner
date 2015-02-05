# A simple to use loading spinner for React.


## Require needed code
```javascript
var Spinner = require('vitullo-spinner');
```
## Run setup in React component
```javascript
var Spinner = require('vitullo-spinner');
var Example = React.createClass({
	mixins: [
		Spinner.Mixin
	],
	componentWillMount: function() {
		this.addSpinners(['more', 'than', 'one', 'spinner']);
		// or
		// this.addSpinners('spinner');
	}
});
```
## Render the spinner with children
```javascript
var Spinner = require('vitullo-spinner');
var Example = React.createClass({
	mixins: [
		Spinner.Mixin
	],
	componentWillMount: function() {
		this.addSpinners(['more', 'than', 'one', 'spinner']);
		// or
		// this.addSpinners('spinner');
	}
	render: function() {
		<Spinner loaded={this.getSpinner('than')}>
			<h1>Content!</h1>
		</Spinner>
	}
});
```
## Start and stop the spinner as needed
```javascript
var Spinner = require('vitullo-spinner');
var Example = React.createClass({
	mixins: [
		Spinner.Mixin
	],
	componentWillMount: function() {
		this.addSpinners(['more', 'than', 'one', 'spinner']);
		// or
		// this.addSpinners('spinner');
	}
	componentDidMount: function() {
		this.startSpinner('than');

		$.ajax('example.com')
		 	.always(function() { this.stopSpinner('than'); });
  	}
	render: function() {
		<Spinner loaded={this.getSpinner('than')}>
			<h1>Content!</h1>
		</Spinner>
	}
});
```
<hr/>

## Optional Props

```javascript
	// Set timeout before the spinner shows up, in s.
	// The default is 1s, to prevent the spinner from briefly flashing
	// every time something is loaded.
	spinWait: React.PropTypes.number,
	// Set timeout before the message appears, in s.
	msgWait: React.PropTypes.number,
	// Set what message appears.
	message: React.PropTypes.string,
	// The height of the spinner container. The actually spinner is 1/3rd as tall
	// to give some padding.
	height: React.PropTypes.number,
	// The length of time between ticks, in ms. By default this is set to 500,
	// a lower number will tick more frequently (and allow more granular 
	// spinWait/msgWait) values. A large number will mutate state less frequently.
	tickLen: React.PropTypes.number
```


## Mixin Functions
### ```addSpinners(names)```
Add one or more spinners to the current component. A string name or an array of string names should be given.  
e.g.

```javascript
  this.addSpinners("network")
  this.addSpinners(["login", "content", "processing"])
```

### ```getSpinner(name)```
Fetch the current state of a spinner, typically only used as the `loaded` prop.
e.g.

```javascript
  <Spinner loaded={this.getSpinner('than')}>
```

### ```startSpinner(name)```
Change the state of a spinner to false (i.e. not loaded). 
e.g.

```javascript
  this.startSpinner("content")
```
  
### ```stopSpinner(name)```
Change the state of a spinner to true (i.e. done loading). 
e.g.

```javascript
  this.stopSpinner("content")
```

