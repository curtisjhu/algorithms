var budo = require('budo')
var babelify = require('babelify')

var script = process.argv[2];

if (!script) {
	throw new Error("Requires a script: pass in a script like this [npm run dev ./src/boids.js]")
}

budo(script, {
  live: true,
  stream: process.stdout, // log to stdout
  port: 8000,             // use this as the base port
  browserify: {
    transform: babelify   // use ES6
  }
}).on('connect', function(ev) {

})