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
				$stateProvider.state("opus", {
					url: "/opus",
					templateUrl: "app/opus/opus.html",
					controller: "opusController"
				});
			}
		]);
	};

	return {initialize: initialize};
});