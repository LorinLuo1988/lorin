/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("workController", [
			"$scope",
			function ($scope) {
				$scope.workData = [
					{
						company: "重庆富士康",
						name: "Primary",
						date: "2013.07-2014.05",
						job: "web前端开发工程师",
						list: [
							"由于刚毕业，所以刚出来以学习为主",
							"主要做一些维护方面的简单工作",
							"自己学习巩固前端知识",
							"通过差不多一年的学习工作，基本掌握了前端开发的技能"
						]
					},
					{
						company: "新蛋科技成都分公司",
						name: "Junior",
						date: "2014.06-2015.03",
						job: "web前端开发工程师",
						list: [
							"在这边的工作时间，主要跟着同事一起开发了一个网络虚拟机的项目",
							"期间对js、css都做了深入的学习"
						]
					},
					{
						company: "naver 成都分公司",
						name: "Senior",
						date: "2015.03至今",
						job: "web前端开发工程师",
						list: [
							"负责项目组前端开发和维护工作",
							"对software、tools和nxblocker进行维护和二次开发",
							"和同事一起用angularjs开发了topology",
							"期间对js框架、css框架以及模块化开发等都做了进一步的学习研究"
						]
					}
				];
			}
		]);
	};

	return {initialize: initialize};
});