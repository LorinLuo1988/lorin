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
					{title: "主页"},
					{title: "个人简介"},
					{title: "教育经历"},
					{title: "工作经历"},
					{title: "技能"},
					{title: "作品"},
					{title: "兴趣爱好"}
				];

				//$timeout(function () {
				//	$("#home .lorin-scroll").lorinScroller({});
				//}, 50);
			}
		]);
	};

	return {initialize: initialize};
});
