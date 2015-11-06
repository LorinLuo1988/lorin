/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("navClickSwitch", function ($timeout) {
			return {
				restrict: "AE",
				scope: {
					toggleClassName: '@toggleClassName'
				},
				require: "^?navClickSwitch", //^(默认在自身寻找navClickSwitch指令，加上^则可以遍历上游指令)?(没找到指令会抛出错误，加上?则表示该指令可有可无，不会抛出错误)
				controller: function ($scope) {
					this.name = "aaa";
				},
				controllerAs: "as", //controller的别名，scope.as就是controller(scope.as.name == "aaa")
				link: function (scope, element, attrs) {
					$timeout(function () {
						element.find("li").bind("click", function (event) {
							angular.element(document.querySelector("li." + scope.toggleClassName)).removeClass(scope.toggleClassName);
							angular.element(this).addClass(scope.toggleClassName);
						});
					}, 0);
				}
			};
		});
	};

	return {initialize: initialize};
});