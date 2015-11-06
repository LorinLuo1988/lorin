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
				$stateProvider.state("introduce", {
					url: "/introduce",
					templateUrl: "app/introduce/introduce.html",
					controller: "introduceController"
				});
			}
		]);
	};

	return {initialize: initialize};
});