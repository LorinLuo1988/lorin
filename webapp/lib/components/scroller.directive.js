/**
 * Created by doyen on 2015/11/6.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("scroller", function ($interval) {
			return {
				priority: 1,
				scope: {
					dragGrid: "="
				},
				template: '<ul class="clearfix"><li ng-repeat="i in dragGrid" class="pull-left bg-success"> <img src="./img/bg1.jpg" alt=""/> <h4 ng-bind="i.title" class="text-muted"></h4> </li></ul>',
				link: function (scope, iElement, iAttrs) {
					var timer = $interval(function () {
						if ($(iElement).find("img").height() != 0) {
							$(iElement).lorinScroller();
							$interval.cancel(timer);
						}
					}, 10);
				}
			};
		});
	};

	return {initialize: initialize};
});