/**
 * Created by doyen on 2015/11/6.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("scroller", [
			"$interval",
			"$timeout",
			function ($interval, $timeout) {
				return {
					priority: 1,
					scope: {
						dragGrid: "="
					},
					templateUrl: "app/common/scroller.html",
					link: function (scope, iElement, iAttrs) {
						var timer = $interval(function () {
							var i = 0;

							$(iElement).find("img").each(function () {
								if ($(this).height() == 0) {
									return false;
								}

								i++;
							});

							if ($(iElement).find("img").length == i) {
								$(iElement).lorinScroller();
								$interval.cancel(timer);
							}
						}, 10);
					}
				};
			}]
		);
	};

	return {initialize: initialize};
});