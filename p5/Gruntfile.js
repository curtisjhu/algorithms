module.exports = function(grunt) {

	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  clean: ['build'],
	  uglify: {
		dynamic_mapping: {
			files: [{
					expand: true,
					cwd: "src/",
					src: "*/*.js",
					dest: "build/",
					extDot: "first"
				}]
		}
	  },
	  htmlmin: {
		dist: {
		  options: {
			removeComments: true,
			collapseWhitespace: true
		  },
		  files: [{
			expand: true,
			cwd: "src/",
			src: ["*/index.html"],
			dest: "build/"
		  }]
		},
		dev: {
			files: [{
			  expand: true,
			  cwd: 'src/',
			  src: ['/*/index.html'],
			  dest: 'build/'
		  }]
		}
	  },
	  copy: {
		main: {
		  expand: true,
		  cwd: 'src/',
		  src: ['*/*.png', '*/*.jpg', '*/*.jpeg', 'p5.min.js'],
		  dest: 'build/',
		  filter: 'isFile',
		},
		template: {
			expand: true,
			cwd: 'template/',
			src: ['main.js', 'index.html'],
			dest: "src/template",
			filter: 'isFile'
		}
	  },
	});
  
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
  
	grunt.registerTask('clean', ['clean']);
	grunt.registerTask('default', ['uglify', 'htmlmin', 'copy']);
	grunt.registerTask('template', ['copy:template']);
  };