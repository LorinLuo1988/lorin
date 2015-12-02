/**
 * Created by doyen on 2015/11/6.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("scrollerCommon", [
			"$timeout",
			function ($timeout) {
				return {
					priority: 9999,
					restrict: "AE",
					scope: {
					},
					compile: function (tElement, tAttr) {
						$(tElement).lorinScroller();

						return function (scope, iElement, iAttrs) {
							$("#hobby").css({
								height: document.documentElement.clientHeight - $("#header").height() - 15
							});

							$(window).on("resize", function () {
								$("#hobby").css({
									height: document.documentElement.clientHeight - $("#header").height() - 15
								});

								$("#hobby").lorinScroller("update");
							});

							$timeout(function () {
								$("#hobby").lorinScroller("update", {
									backgroundColor: "rgba(82, 154, 117, 0.46)"
								});
							}, 0);
						}
					}
				};
			}
		]);
	};

	return {initialize: initialize};
});