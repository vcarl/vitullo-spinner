# A simple to use loading spinner for React.


Require needed code
```javascript
    var Spinner = require('./path/to/vitullo-spinner.jsx');
    var SpinnerMixin = require('./path/to/spinner-mixin.js');
```
Run setup in React component
```javascript
		componentWillMount: function() {
			this.addSpinners(['more', 'than', 'one', 'spinner']);
		}
		// or
		componentWillMount: function() {
			this.addSpinners('spinner');
		}
```
Render the spinner with children
```javascript
<Spinner loaded={this.getSpinner('spinner')}>
	<h1>Content!</h1>
</Spinner>
```
Start and stop the spinner as needed
```javascript
this.startSpinner('spinner');
$.ajax('example.com')
  .always(function() {
    this.stopSpinner('spinner');
  });
```
<hr/>
##Mixin Functions
###```addSpinners(names)```
Add one or more spinners to the current component. A string name or an array of string names should be given.  
e.g.

  `this.addSpinners("network")`

  `this.addSpinners(["login", "content", "processing"])`

###```getSpinner(name)```
Fetch the current state of a spinner, typically only used as the `loaded` prop.
e.g.

  `this.getSpinner("login")`

###```startSpinner(name)```
Change the state of a spinner to false (i.e. not loaded). 
e.g.

  `this.startSpinner("content")`
  
###```stopSpinner(name)```
Change the state of a spinner to true (i.e. done loading). 
e.g.

  `this.stopSpinner("content")`

