/**
 * Created by doyen on 2015/12/2.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("translate", [
			"$timeout",
			"$interval",
			function ($timeout, $interval) {
				return {
					priority: 1,
					restrict: "AE",
					scope: {
						translateStop: "="
					},
					link: function (scope, iElement, iAttrs) {
						var width, height;

						$(iElement).css({
							visibility: "hidden"
						});

						$timeout(function () {
							width = $(iElement).width() + 1;
							height = $(iElement).height();

							$(iElement).css({
								width: width,
								height: height,
								position: "relative",
								overflow: "hidden"
							});

							$(iElement).children().css({
								position: "absolute",
								top: 0,
								left: width,
								whiteSpace: "pre"
							});

							$(iElement).css({
								visibility: "visible"
							});

							$(iElement).hover(
								function () {
									if (!$("#audio")[0].paused) {
										scope.translateStop = true;
									}
								},
								function () {
									if (!$("#audio")[0].paused) {
										scope.translateStop = false;
									}
								}
							);

							var timer = $interval(function () {
								if (!scope.translateStop) {
									$(iElement).children().css({
										left: parseInt($(iElement).children().css("left")) - 1
									});

									if (parseInt($(iElement).children().css("left")) <= -width) {
										$(iElement).children().css({
											left: width
										});
									}
								}
							}, 20);
						}, 0);

						scope.$on("translateRefresh", function () {
							$timeout(function () {
								width = $(iElement).children().width() + 1;
								height = $(iElement).children().height();

								$(iElement).css({
									width: width,
									height: height
								});
							}, 0);
						});
					}
				}
			}
		]);
	};

	return {initialize: initialize};
});