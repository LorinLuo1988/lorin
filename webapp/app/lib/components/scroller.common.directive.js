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
					priority: 1,
					restrict: "AE",
					scope: {
						containerId: "@"
					},
					compile: function (tElement, tAttr) {
						$(tElement).lorinScroller({
							backgroundColor: "#fff"
						});

						return function (scope, iElement, iAttrs) {
							$(scope.containerId).css({
								height: document.documentElement.clientHeight - $("#header").height() - 15
							});

							$(window).on("resize", function () {
								$(scope.containerId).css({
									height: document.documentElement.clientHeight - $("#header").height() - 15
								});

								$(scope.containerId).lorinScroller("update");
							});

							$timeout(function () {
								$(scope.containerId).lorinScroller("update", {
									backgroundColor: "#fbfbfb"
								});

								if (scope.containerId == "#education" || scope.containerId == "#skill") {
									$(".collapse:not(:first)").removeClass("in");

									$(scope.containerId).lorinScroller("update", {
										backgroundColor: "#fbfbfb"
									});

									$('#accordion').on('shown.bs.collapse', function () {
										$(scope.containerId).lorinScroller("update");
									});

									$('#accordion').on('hidden.bs.collapse', function () {
										$(scope.containerId).lorinScroller("update");
									})
								}
							}, 50);
						}
					}
				};
			}
		]);
	};

	return {initialize: initialize};
});