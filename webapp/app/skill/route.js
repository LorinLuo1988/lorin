/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Routes");

		module.config([
			'$stateProvider',
			'$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {
				$stateProvider.state("skill", {
					url: "/skill",
					templateUrl: "app/skill/skill.html",
					controller: "skillController"
				});
			}
		]);
	};

	return {initialize: initialize};
});