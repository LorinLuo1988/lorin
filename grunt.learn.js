/**
 * Created by doyen on 2015/11/9.
 */
/*----------特殊符号---------*/
/*
* app/index.html, app/js/index
* *匹配任何字符，除了/(比如app/**可以匹配app下面所以文件以及文件夹，不能匹配文件夹下面的东西)
* **匹配任何字符，包括/，所以用在目录路径里面(比如app/**可以匹配app下面所以文件以及深匹配文件夹)
* ?匹配单个字符，除了/
* {}逗号分割的“或”操作(逗号后面不要有空格,{a,b}.js可以匹配a.js或者b.js)
* ! 排除某个匹配
* */

/*-----------npm-----------*/
/*---1. npm init: npm初始化package.json文件(文件在项目根目录下)---*/
/*---2. npm install [moduleName]: 安装模块(模块会被放入在项目根自动创建的node_module文件夹下面)
*       npm uninstall [moduleName]: 卸载模块
*       npm install: 安装package.json文件中devDependencies和dependencies所列出的所有模块
* 		npm install [moduleName] --save: 安装模块并将模块的依赖名加入package.json文件中的dependencies
*		npm install [moduleName] --save-dev: 安装模块并将模块的依赖名加入package.json文件中的devDependencies
* ---*/

/*-----------grunt install-----------*/
/*---1. npm install grunt-cli -g: 安装客户端grunt到全局---*/
/*---2. npm install grunt --save-dev---: 安装grunt模块到项目*/

/*-----------grunt config-----------*/
/*---1. grunt.initConfig(obj): grunt初始化配置，配置grunt的各个任务(task)以及任务下的target---
* 	 除了grunt的各个任务配置项以外的各个配置都可以在任务配置中通过<%= a.b.c %>的方式读取
* 	 2. 每个task都包含自己的target和option， 每个task下面除了option以外的任何配置都是target，
* 	    task包含的option对每个target都有用，而每个target也可以包含自己的option配置项
* ---*/

/*-----------grunt.loadNpmTasks-----------*/
 /*---1. grunt.loadNpmTasks: 加载initConfig中所配置的各个grunt任务---*/

/*-----------grunt.registerTask-----------*/
/*---1. grunt.registerTask: 注册grunt组合任务，组合task可以被再次组合
* 	 2.	grunt.registerTask(taskName, []); ----任务数组
* 	 3.	grunt.registerTask(taskName, description, function(argList){}); ---函数形式，函数里面通过grunt.task.run()来运行任务
* 		,argList是运行grunt时的额外参数，比如grunt taskName:1:2，则arg1=1,arg2=2
* ---*/


/*-----------grunt plugin-----------*/
/* 1.load-grunt-tasks: 加载所有的package.json文件中dependencies和devDependencies所列出的任务
*	example: require("load-grunt-tasks")(grunt, {
*		scope: "devDependencies", //scope---选着加载的作用域
*		pattern: "grunt-contrib-*", //pattern---对加载任务的过滤
*		config: "package.json" //config---选着依赖文件
*	});
*/

/* 2.time-grunt: 各个task运行时间的汇总
 *	example: require("time-grunt")(grunt);
 */

/* 3.grunt-contrib-copy: 文件和文件夹拷贝
 *	三种files format
 *  a. compact format: 各个target只有一对src和dest
 *  example: grunt.initConfig({
 *  	copy: {
 *  		html1: {
 *  			src: ["index.html]",   //src可以是数组
 *  		    dest: "dist/"          //dest只能是字符串
 *  		},
 *  	   	html2: {
 *  			src: "header.html",   //src也可以是字符串
 *  		    dest: "dist/header.html"
 *  		},
 *	  	}
 *  })
 *  b. files array format：每个target都是src和dest的files数组
 *  example: grunt.initConfig({
 *  	copy: {
 *  		html: {
 *  			files: [
 *  				{
 *  		   			src: "index.html",
 *  		    		dest: "dist/index.html"
 *  		   	 	},
 *  		    	{
 *  		    		src: "header.html",
 *  		    		dest: "dist/header.html"
 *  		    	}
 *  			]
 *  		}
 *	  	}
 *  })
 *  c. files object format：每个target包含dest到src键值对的映射
 *  example: grunt.initConfig({
 *  	copy: {
 *  		html: {
 *				files: {
 *  				"dist/header.html": "header.html",   //key(dest)-value(src)形式
 *  				"dist/index.html": ["index.html"]      //value可以使一个数组
 *				}
 *  		}
 *	  	}
 *  })
 */

/* 3.grunt-contrib-clean: 文件和文件夹清除(额外参数只支持files compact format和files array format)
 *  example: grunt.initConfig({
 *  	clean: {
 *  		html: {   //只有src没有dest
 *				src: ["dist/index.html", "dist/header.html"] , //字符串或者数组
 *				filter: function (filePath)	{
 *					return !grunt.file.isDir(filePath); //true删除，false不删除
 *				}
 *  		}
 *  		all: {
 *  			src: "dist/(**)/*  //通配符删除dist下面的所有文件和文件夹,
 *  			dot: true, //同时会命中以'.'开头的文件，
 *				matchBase: true,
 *				expand: true //处理动态的src到dest的映射
 *  		},
 *  	 	both: {
 *  	 		src: "dist/{index, main}.html", //删除dist下的index.html和main.html
 *  	 		filter: "isFile" //额外参数
 *  	 	}
 *	  	}
 *  })
 */