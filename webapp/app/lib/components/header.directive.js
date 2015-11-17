/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("header", [
			"$timeout",
			"$location",
			function ($timeout, $location) {
				return {
					restrict: "AE",
					templateUrl: "app/common/header.html",
					scope: {
						toggleClassName: '@toggleClassName'
					},
					replace: true,
					require: "^?navClickSwitch", //^(默认在自身寻找navClickSwitch指令，加上^则可以遍历上游指令)?(没找到指令会抛出错误，加上?则表示该指令可有可无，不会抛出错误)
					controller: ['$scope', function ($scope) {
						this.name = "aaa";
					}],
					controllerAs: "as", //controller的别名，scope.as就是controller(scope.as.name == "aaa")
					link: function (scope, element, attrs) {
						scope.navList =[
							{title: "主页", iconClassName: "glyphicon glyphicon-home", state: "home", active: true},
							{title: "个人简介", iconClassName: "glyphicon glyphicon-user", state: "introduce", active: false},
							{title: "教育经历", iconClassName: "glyphicon glyphicon-education", state: "education", active: false},
							{title: "工作经历", iconClassName: "glyphicon glyphicon-folder-open", state: "work", active: false},
							{title: "技能", iconClassName: "glyphicon glyphicon-pencil", state: "skill", active: false},
							{title: "作品", iconClassName: "glyphicon glyphicon-picture", state: "opus", active: false},
							{title: "兴趣爱好", iconClassName: "glyphicon glyphicon-headphones", state: "hobby", active: false}
						];
						scope.activeIndex = 0;

						scope.$on("$stateChangeSuccess", function () {
							switch ($location.path().slice(1)) {
								case "home": scope.activeIndex = 0; break;
								case "introduce": scope.activeIndex = 1; break;
								case "education": scope.activeIndex = 2; break;
								case "work": scope.activeIndex = 3; break;
								case "skill": scope.activeIndex = 4; break;
								case "opus": scope.activeIndex = 5; break;
								case "hobby": scope.activeIndex = 6; break;
							}
						});

						$timeout(function () {
							element.find("li").bind("click", function (event) {
								angular.element(document.querySelector("li." + scope.toggleClassName)).removeClass(scope.toggleClassName);
								angular.element(this).addClass(scope.toggleClassName);
							});
						}, 0);
					}
				};
			}]
		);
	};

	return {initialize: initialize};
});