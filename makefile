all: vitullo-spinner.js demo.js
vitullo-spinner.js:
	./node_modules/.bin/jsx src/vitullo-spinner.jsx > build/vitullo-spinner.js
	uglify -s build/vitullo-spinner.js -o build/vitullo-spinner.min.js
demo.js:
	node_modules/.bin/browserify src/demo.jsx > build/demo.js