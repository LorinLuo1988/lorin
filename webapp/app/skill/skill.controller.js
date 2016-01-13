/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("skillController", [
			"$scope",
			function ($scope) {
				$scope.skillData = [
					{
						name: "HTML",
						englishName: "Html",
						function: "结构",
						title: "定义网页结构",
						list: [
							"1. 对html5语义化有一定的认识",
							"2. 熟悉html5 api，比如本地存储，canvas等",
							"3. 熟练使用div+css布局",
							"4. 能够运用handlebars等前端模板引擎进行项目开发"
						]
					},
					{
						name: "CSS",
						englishName: "Css",
						function: "表现",
						title: "定义网页的样式",
						list: [
							"1. 准确判断选择器的权重(id、class、attribute、伪类、伪元素、内联、!important)",
							"2. 能够熟练运用float、position等重要属性进行布局",
							"3. 对元素盒模型和可视化格式模型有比较深入的认识",
							"4. 属性css3的新选择器",
							"5. 属性css3新的属性(transition、animate、transform等)",
							"6. 熟悉css3的弹性盒模型(box/flex), box是flex的升级版本",
							"7. 熟悉css hack，能够解决常见的浏览器兼容性问题",
							"8. 熟练使用bootstrap等css框架",
							"9. 能够使用css预编译工具Less和Sass进行开发"
						]
					},
					{
						name: "JS",
						englishName: "Js",
						function: "行为",
						title: "用户界面交互，前后端交互",
						list: [
							"1. 熟悉ECMAScript核心语法",
							"2. 熟悉浏览器对象模型(BOM)",
							"3. 熟悉文档对象模型(DOM), 并处理兼容性问题",
							"4. 能够熟练使用jquery进行项目开发",
							"5. 能够独立编写js或者jquery插件",
							"7. 熟悉underscore、lodash等工具库",
							"8. 熟悉highcharts、d3等svg库",
							"8. 能够熟练使用requirejs或者ejs进行模块化开发",
							"9. 能够熟练使用MVC框架angular和backbone进行项目开发，对angular自定义指令编写有深入的理解",
							"10. 能够熟练使用webpack+react+flux进行项目开发",
							"11. 对js的原型链、作用域链、闭包有深刻的认识，熟练使用原型继承进行面向对象开发"
						]
					},
					{
						name: "工具",
						englishName: "Tool",
						function: "辅助",
						title: "提高开发效率",
						list: [
							"1. 能够熟练使用grunt以及grunt插件进行前端项目的打包(css合并，js压缩合并等)",
							"2. 能够熟练使用webpack以及webpack的loader进行前端项目的模块化开发以及打包",
							"3. 熟练使用git和svn等版本管理工具进行团队协作开发",
							"4. 熟练使用webstorm等进行编码开发",
							"5. 熟练使用浏览器调试工具进行调试(偏向于用chrome的Developer Tools)",
							"6. 能够使用photoshop进行简单的切图操作"
						]
					}
				];

				$scope.blog = {
					name: "blog",
					link: "http://my.oschina.net/u/1992917/blog"
				};

				$scope.github = {
					name: "github",
					link: "https://github.com/lorin19881101?tab=repositories"
				};

				$scope.websiteIntroduce = {
					title: "本站简介",
					link: "https://github.com/lorin19881101/lorin",
					introduce: "本站采用angularjs来搭建前端框架，requirejs来进行模块化开发，并加入了自己写的scroller和slider两个插件，采用了bootstrap的一些样式和js插件,使用了jquery库和pace.js插件，大量编写自定义directive来简化模板和实现复用。"
				};
			}
		]);
	};

	return {initialize: initialize};
});