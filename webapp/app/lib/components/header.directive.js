/**
 * Created by doyen on 2015/11/5.
 */
define([], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("header", [
				"$timeout",
				"$location",
				"$state",
				"$rootScope",
				function ($timeout, $location, $state, $rootScope) {
					return {
						restrict: "AE",
						templateUrl: "app/common/header.html",
						scope: {
							navList: "=",
							activeIndex: "=",
							popoverConfig: "="
						},
						replace: true,
						require: "^?navClickSwitch", //^(默认在自身寻找navClickSwitch指令，加上^则可以遍历上游指令)?(没找到指令会抛出错误，加上?则表示该指令可有可无，不会抛出错误)
						controller: ['$scope', function ($scope) {
							this.name = "aaa";
						}],
						controllerAs: "as", //controller的别名，scope.as就是controller(scope.as.name == "aaa")
						link: function (scope, element, attrs) {
							$timeout(function () {
								$(element).find("a").on("click", function (event) {
									$rootScope.clickState = $(event.currentTarget).attr("ui-sref");
								});
							}, 0);
						}
					};
				}]
		);
	};

	return {initialize: initialize};
});