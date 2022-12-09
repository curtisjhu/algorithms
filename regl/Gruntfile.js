module.exports = function(grunt) {
	const fs = require('fs');
	const path = require('path');

	const src = path.join(__dirname, '/src')
	const srcDirs = fs.readdirSync(src).filter(dir => fs.statSynce(dir).isDirectory())
	const srcIndexFiles = srcDirs.map(dir => fs.readdirSync(dir).find(file => path.parse(file) == "index"));
	const destIndexFiles = srcIndexFiles.map(file => {
		var ext = path.extname(file);
		file.toString().replace(ext, ".min"+ext);
		return file;
	})
	
	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  uglify: {
		build: {
		  src: srcIndexFiles,
		  dest: destIndexFiles
		}
	  },
	  htmlmin: {
		dist: {
		  options: {
			removeComments: true,
			collapseWhitespace: true
		  },
		  files: {
			'dist/index.html': 'template/index.html',
		  }
		}
	  }
	});
  
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.registerTask('default', ['uglify', 'htmlmin']);
  
  };