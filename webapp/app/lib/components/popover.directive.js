/**
 * Created by doyen on 2015/12/2.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("popover", [
			"$timeout",
			"$interval",
			function ($timeout, $interval) {
				return {
					priority: 1,
					restrict: "AE",
					scope: {
						popoverContent: "=popover"
					},
					link: function (scope, iElement, iAttrs) {
						$(iElement).popover({
							html: true,
							content: scope.popoverContent,
							trigger: "hover"
						});
					}
				}
			}
		]);
	};

	return {initialize: initialize};
});