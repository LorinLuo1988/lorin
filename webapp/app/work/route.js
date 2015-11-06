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
				$stateProvider.state("work", {
					url: "/work",
					templateUrl: "app/work/work.html",
					controller: "workController"
				});
			}
		]);
	};

	return {initialize: initialize};
});