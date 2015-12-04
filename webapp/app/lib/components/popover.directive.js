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
						scope.$watch("popoverContent", function (newValue, oldValue) {
							if (oldValue != newValue) {
								$(iElement).attr("data-content", newValue);
								$(iElement).next(".popover").find(".popover-content").html(newValue);
							}
						}, true);
					}
				}
			}
		]);
	};

	return {initialize: initialize};
});