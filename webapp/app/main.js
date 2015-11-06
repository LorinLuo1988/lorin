/**
 * Created by doyen on 2015/11/4.
 */
require.config({
	paths: {
		startup: "app",
		pace: "../lib/pace-0.5.6/pace.min",
		angular: "../lib/angular/angular.min",
		ngRoute: "../lib/angular/angular-ui-router",
		appRoute: "tp.loader/route.all",
		appDirective: "tp.loader/directive.all",
		appController: "tp.loader/controller.all",
		bootstrap: "../lib/bootstrap-3.3.5-dist/js/bootstrap",
		jquery: "../lib/jquery/jquery-1.11.1.min",
		scroller: "../lib/scroller/scroller"
	},
	shim: {
		angular: {
			exports: "angular"
		},
		ngRoute: {
			exports: "ngRoute",
			deps: ["angular"]
		},
		bootstrap: {
			deps: ["jquery"]
		},
		scroller: {
			deps: ["jquery"]
		}
	}
});

require(["angular", "bootstrap", "scroller"], function () {
	require(["startup"], function (app) {
		app.initialize();
	});
});
