/**
 * Created by doyen on 2015/11/4.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Routes");

		module.config([
			'$stateProvider',
			'$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {
				$stateProvider.state("home", {
					url: "/home",
					templateUrl: "app/home/home.html",
					controller: "homeController"
				});

				$urlRouterProvider.otherwise('home');
			}
		]);

	};

	return {initialize: initialize};
});