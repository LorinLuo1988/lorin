/**
 * Created by doyen on 2015/11/4.
 */
require([
	"pace",
	"appRoute",
	"appController",
	"appDirective",
	"ngRoute",
	"scroller",
	"slider",
	"bootstrap"
], function (pace, appRoute, appController, appDirective) {
	pace.start({
		document: true,
		ajax: {
			trackMethods: ['GET', 'POST', 'PUT', 'DELETE']
		}
	});

	var controllersModule = angular.module("Controllers", []);
	var filtersModule = angular.module("Filters", []);
	var directivesModule = angular.module("Directives", []);
	var servicesModule = angular.module("Services", []);
	var routeModule = angular.module("Routes", ["ui.router"]);
	var app = angular.module("app", [
		"Controllers",
		"Filters",
		"Directives",
		"Services",
		"Routes"
	]);

	appDirective.initialize();
	appController.initialize();
	appRoute.initialize();

	app.config([
		"$locationProvider",
		function ($locationProvider) {
			//$locationProvider.html5Mode(true);
		}
	]).run([
		"$rootScope",
		"$timeout",
		function ($rootScope, $timeout) {

		}
	]);

	angular.bootstrap(angular.element(document), ['app']);
});