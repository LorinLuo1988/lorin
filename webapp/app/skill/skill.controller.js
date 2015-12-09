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
							"1. 熟悉html5语义化",
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
							"1. 准确判断选择器的权重",
							"2. 对float、position等重要属性有深入的理解",
							"3. 熟悉元素盒模型和行盒模型以及可视化格式模型",
							"4. 对普通流、浮动和定位有深刻的认识",
							"5. 对css的布局有深刻的认识",
							"6. 属性css3的新选择器",
							"7. 属性css3新的属性(动画等...)",
							"8. 熟悉css的弹性盒模型(box/flex), box是flex的升级版本",
							"9. 属性css hack，能够解决常见的浏览器兼容性问题",
							"10. 熟练使用bootstrap等css框架"
						]
					},
					{
						name: "JS",
						englishName: "Js",
						function: "行为",
						title: "用户界面交互，前后端交互",
						list: [
							"1. 熟悉ECMAScript语法",
							"2. 熟悉浏览器对象模型(BOM)",
							"3. 熟悉文档对象模型(DOM), 并处理兼容性问题",
							"4. 能够熟练使用jquery进行项目开发",
							"5. 能够独立编写js或者jquery插件",
							"7. 熟悉underscore、lodash等工具库",
							"8. 熟悉highcharts、d3等svg库",
							"8. 能够熟练使用requirejs进行模块化开发，熟悉ejs",
							"9. 能够熟练使用MVC框架angularjs进行项目开发，能够熟练编写自定义指令实现复用；熟悉backbone、react"
						]
					},
					{
						name: "工具",
						englishName: "Tool",
						function: "辅助",
						title: "提高开发效率",
						list: [
							"1. 能够熟练使用grunt进行前端项目的打包(css合并，js压缩合并等)",
							"2. 熟练使用webstorm等进行编码开发",
							"3. 熟练使用浏览器调试工具进行调试(偏向于用chrome的Developer Tools)",
							"4. 能够使用photoshop进行简单的切图操作"
						]
					}
				];
			}
		]);
	};

	return {initialize: initialize};
});