/**
 * Created by doyen on 2015/11/4.
 */
"use strict"

module.exports = function (grunt) {
	var pkg = grunt.file.readJSON("package.json");

	var config = {
		app: "webapp",
		dist: "dist"
	};

	require("time-grunt")(grunt); //各个task运行时间的汇总

	require("load-grunt-tasks")(grunt, {
		scope: "devDependencies",
		pattern: "*",
		config: "package.json"
	}); //加载所有的package.json文件中devDependencies所列出的所有grunt-contrib任务
	   // (跟使用grunt.loadNpmTasks()一个个加载一样)

	function replaceImgPathOfJSFile (originPath, modifyPath) {
		var patterns = [];
		var dotReg = /\./g;
		var i = 0;

		require('glob').sync('*', {cwd: originPath}).forEach(function(path) {
			patterns.push({
				match: new RegExp(path.replace(dotReg, "\\."), "g"),
				replacement: "bg1.fb10d17e.jpg"
			});
		});

		require('glob').sync('*', {cwd: modifyPath}).forEach(function(path) {
			patterns[i].replacement = path;
			i++;
		});

		return patterns;
	}


	grunt.initConfig({
		config: config,
		pkg: pkg,
		connect: {
			options: {
				protocol: 'http',
				port: 8002,
				livereload: 8013,
				open: true, //是否在server启动后自动打开页面
				keepalive: false, //是否一直保存server开启，若有watch任务执行，则server也会一直开启
				hostname: "localhost", //若是localhost则不能使用ip地址来访问，若是0.0.0.0则可以使用ip地址以及localhost来访问
				onCreateServer: function(server, connect, options) {

				}
			},
			dev: {
				options: {
					base: "<%= config.app %>/" //若是"/"则代表硬盘根目录; 指示到这个目录去找index.html文件并加载，若没有index.html，则显示该目录下所有的文件以及文件夹
				}
			},
			dist: {
				options: {
					base: "<%= config.dist %>/" //若是"/"则代表硬盘根目录; 指示到这个目录去找index.html文件并加载，若没有index.html，则显示该目录下所有的文件以及文件夹
				}
			}
		},
		watch: {
			html: {
				files: ["<%= config.app %>/**/*.html"],
				options: {
					livereload: "<%= connect.options.livereload %>"
				}
			},
			css: {
				files: ["<%= config.app %>/**/*.css"],
				options: {
					livereload: "<%= connect.options.livereload %>"
				}
			},
			js: {
				files: ["<%= config.app %>/**/*.js"],
				options: {
					livereload: "<%= connect.options.livereload %>" //会先执行tasks再执行livereload
				},
				tasks: ["jshint"] //文件变化时要执行的task
			}
		},
		copy: {
			all: { //compact format
				expand: true,
				cwd: "<%= config.app %>/", //src要找文件的文件夹
				src: "**",
				dest: "<%= config.dist %>/"
			},
			js: {   //files array format
				files: [
					{
						expand: true,
						cwd: "<%= config.app %>/", //src要找文件的文件夹
						src: "app/*.js",
						dest: "<%= config.dist %>/",
						ext: '.min.js', //更改复制后的文件后缀名
						extDot: "first", //从哪个地方开始修改目标文件后缀名,
						flatten: true   //是否平铺文件，既是否同时拷贝文件夹
						//rename: function (dest, src, c) {   //重命名
						//	return dest + "app/" + src;
						//}
					},
					{
						expand: true,
						cwd: "<%= config.app %>/",
						src: "app/*/*.js",
						dest: "<%= config.dist %>/"
					}
				]
			},
			css: { //files object format
				files: {
					"<%= config.dist %>/": "<%= config.app %>/**/*.css"
				}
			},
			static: {
				files: [
					{
						expand: true,
						cwd: "<%= config.app %>/", //src要找文件的文件夹
						src: ["**/*.html"],
						dest: "<%= config.dist %>/"
					},
					{
						expand: true,
						cwd: "<%= config.app %>/", //src要找文件的文件夹
						src: "style/fonts/*",
						dest: "<%= config.dist%>/"
					},
					{
						expand: true,
						cwd: "<%= config.app %>/", //src要找文件的文件夹
						src: "img/*",
						dest: "<%= config.dist%>/"
					}
				]
			}
		},
		clean: {
			js: { //compact format
				src: [
					"<%= config.dist %>/app/lib/**"
				]
				//filter: "isFile" //额外参数只支持compact format和files array format
			},
			css: {
				src: [
					"<%= config.dist %>/**/*.css",
					"!<%= config.dist %>/style/*"
				]
			},
			dist: {
				src: "<%= config.dist %>/**", //通配符，清除dist下面的所有文件和文件夹,
				//filter: function (filePath) {
				//	return !grunt.file.isDir(filePath); //true删除，false不删除
				//},
				dot: true, //同时会命中以'.'开头的文件，
				matchBase: true,
				expand: true //处理动态的src到dest的映射
			},
			tmp: {
				src: ".tmp/**",
				dot: true //同时会命中以'.'开头的文件，
			}
		},
		useminPrepare: {  //生成target里面处理文件的配置项所将要使用的task
			html: "<%= config.app %>/index.html",
			options: {
				dest: "<%= config.dist %>",
				root: "<%= config.app %>"
			}
		},
		usemin: {
			html: ["<%= config.dist %>/**/*.html"],
			css: ["<%= config.dist %>/style/*.css"],
			options: {
				assetsDirs: [
					"<%= config.dist %>",
					"<%= config.dist %>/img",
					"<%= config.dist %>/style",
					"<%= config.dist %>/style/fonts"
				]

			}
		},
		filerev: {
			dist: {
				src: [
					"<%= config.dist %>/style/*.css",
					"<%= config.dist %>/style/fonts/*",
					"<%= config.dist %>/img/*"
				]
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: '<%= config.app %>/app',
					dir: '<%= config.dist %>/app',
					mainConfigFile: "<%= config.app %>/app/require.config.js",
					modules: [{
						name: "app" //模块名,包含require([],function(){})的js文件,
					}],
					removeCombined: true,
					optimize: 'uglify'
				}
				//options: {
				//	baseUrl: '<%= config.app %>/app',
				//	mainConfigFile: "<%= config.app %>/app/require.config.js",
				//	name: "app", //模块名,包含require([],function(){})的js文件,
				//	out: "<%= config.dist %>/app/app.js",
				//	removeCombined: true,
				//	optimize: 'uglify'
				//}
			}
		},
		replace: {
			css: {
				options: {
					patterns: [
						{
							match: /(\.\.\/){2,}/g,
							replacement: "../"
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/style/vender.min.css"],
						dest: "<%= config.dist %>/style"
					}
				]
			},
			font: {
				options: {
					patterns: [
						{
							match: /\.\.\/fonts/g,
							replacement: "fonts"
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/style/vender.min.css"],
						dest: "<%= config.dist %>/style"
					}
				]
			},
			html: {
				options: {
					patterns: [
						{
							match: /<script src="app\/require\.config\.js"><\/script>/g,
							replacement: ""
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/index.html"],
						dest: "<%= config.dist %>"
					}
				]
			},
			js: {
				options: {
					//patterns: [
					//	{
					//		match: /lib\/requirejs\/require\.js/g,
					//		replacement: "app/require.js"
					//	}
					//]
					patterns: replaceImgPathOfJSFile("webapp/img/", "dist/img/")
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/app/app.js"],
						dest: "<%= config.dist %>/app"
					}
				]
			}
		},
		jshint: {
			all: [
				"<%= config.app %>/**/*.js",
				"!<%= config.app %>/lib/**/*.js",
				"<%= config.app %>/lib/components/**/*.js"
			]
		}
	});

	grunt.registerTask("serve", "create serve, --allow-remote change hostname", function (arg1, arg2, arg3) {
		//this 指示serve这个任务
		//arg1,arg2,arg3是运行grunt时:后面的参数,比如grunt serve:1:2则，arg1=1,arg2=2

		if (grunt.option("allow-remote")) { //allow-remote是--后面的参数，如grunt serve --allow-remote,
			grunt.config.set("connect.options.hostname", "0.0.0.0");
		}

		if (arg1 == "build") {
			return grunt.task.run([
				"clean:dist",
				"clean:tmp",
				"copy:static",
				"useminPrepare",
				"concat:generated", //generated target 是useminPrepare自动生成的
				"cssmin:generated",
				"replace:css",
				"replace:font",
				"filerev",
				"usemin",
				"requirejs",
				"clean:tmp",
				"clean:css",
				"replace:html",
				"replace:js",
				"connect:dist",
				"watch"
			]);
		}

		grunt.task.run(["connect:dev", "watch"]);
	});
};