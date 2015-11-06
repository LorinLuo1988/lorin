/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Routes");

		module.config([
			"$stateProvider",
			"$urlRouterProvider",
			function ($stateProvider, $urlRouterProvider) {
				$stateProvider.state("hobby", {
					url: "/hobby",
					templateUrl: "app/hobby/hobby.html",
					controller: "hobbyController"
				});
			}
		]);
	};

	return {initialize: initialize};
});