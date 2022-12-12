
module.exports = function (grunt) {
    const fs = require("fs");
    const path = require("path");

    const src = path.join(__dirname, "/src");
    const srcDirs = fs
        .readdirSync(src)
        .map((dir) => path.join(src, dir))
        .filter((dir) => fs.statSync(dir).isDirectory());
    const srcIndexFiles = srcDirs.map((dir) =>
        path.join(
            dir,
            fs.readdirSync(dir).find((file) => file.includes("index"))
        )
    );
    const distIndexFiles = srcIndexFiles.map((file) => {
        var result = file
            .replace(/regl\/src/g, "regl/dist");
        return result;
    });

	const distHTMLFiles = distIndexFiles.map((file => {
		var result = file
			.replace(/.js$/, ".html");
		return result;
	}))

	if (srcIndexFiles.length != distIndexFiles.length
			|| distIndexFiles.length != distHTMLFiles.length )
		throw new Error("Error with scanning filesystem files")

	var indexJSPairs = {};
	for (var i = 0; i < srcIndexFiles.length; i++)
		indexJSPairs[distIndexFiles[i]] = srcIndexFiles[i];

	var indexHTMLPairs = {};
	for (var i = 0; i < distHTMLFiles.length; i++)
		indexHTMLPairs[distHTMLFiles[i]] = "template/index.html";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
			dev: {
				options: {
					compress: true,
					mangle: true,
					sourceMap: true,
					beautify: true
				},
				files:indexJSPairs 
			},
			build: {
				options: {
					compress: true,
					sourceMap: false,
					beautify: false,
				},
				files:indexJSPairs 
			}
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: indexHTMLPairs,
            },
        },
		clean: ["dist"]
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.registerTask("default", ["uglify:dev", "htmlmin"]);
    grunt.registerTask("build", ["clean", "uglify:build", "htmlmin"]);
};
