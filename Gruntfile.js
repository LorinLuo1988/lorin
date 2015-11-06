/**
 * Created by doyen on 2015/11/4.
 */
module.exports = function (grunt) {
	var pkg = grunt.file.readJSON("package.json");

	grunt.initConfig({
		connect: {
			server: {
				options: {
					protocol: 'http',
					base: "webapp",
					port: 8005,
					hostname: "localhost",
					livereload: 8013,
					onCreateServer: function(server, connect, options) {
						console.log("create server success");
					}
				}
			}
		},
		watch: {
			html: {
				files: ['webapp/index.html', "webapp/app/**/*.html"],
				options: {
					livereload: "<%= connect.server.options.livereload %>"
				}
			},
			css: {
				files: ["webapp/app/**/*.css", "webapp/style/*.css"],
				options: {
					livereload: "<%= connect.server.options.livereload %>"
				}
			},
			js: {
				files: ["webapp/app/**/*.js", "webapp/lib/components/*.js"],
				options: {
					livereload: "<%= connect.server.options.livereload %>"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default", ["connect", "watch"]);
};