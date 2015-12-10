/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("opusController", [
			"$scope",
			"$timeout",
			function ($scope, $timeout) {
				$scope.opusData = [
					{
						imgUrl: "img/slider.jpg",
						name: "slider",
						description: "slider.js是基于jquery开发的图片轮播插件，兼容IE6+",
						link: "https://github.com/lorin19881101/slider"
					},
					{
						imgUrl: "img/scroller.jpg",
						name: "scroller",
						description: "scroller.js是基于jquery开发的滚动条插件，兼容IE6+",
						link: "https://github.com/lorin19881101/scroller"
					},
					{
						imgUrl: "img/iSing.jpg",
						name: "iSing官网",
						description: "iSing公司的官方网站",
						link: "https://github.com/lorin19881101/ising"
					}
				];
			}
		]);
	};

	return {initialize: initialize};
});