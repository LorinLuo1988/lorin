/**
 * Created by doyen on 2015/11/4.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("homeController", [
			"$scope",
			"$timeout",
			function ($scope, $timeout) {
				$scope.dragGrid = [
					{title: "主页", imgUrl: "img/bg1.jpg"},
					{title: "个人简介", imgUrl: "img/bg2.jpg"},
					{title: "教育经历", imgUrl: "img/bg3.jpg"},
					{title: "工作经历", imgUrl: "img/bg4.jpg"},
					{title: "技能", imgUrl: "img/bg5.jpg"},
					{title: "作品", imgUrl: "img/bg6.jpg"},
					{title: "兴趣爱好", imgUrl: "img/bg7.jpg"}
				];
			}
		]);
	};

	return {initialize: initialize};
});
