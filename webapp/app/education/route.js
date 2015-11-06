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
				$stateProvider.state("education", {
					url: "/education",
					templateUrl: "app/education/education.html",
					controller: "educationController"
				});
			}
		]);
	};

	return {initialize: initialize};
});