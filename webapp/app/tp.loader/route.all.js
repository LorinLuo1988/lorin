/**
 * Created by doyen on 2015/11/4.
 */
define([
	"home/route",
	"hobby/route",
	"introduce/route",
	"education/route",
	"work/route",
	"skill/route",
	"opus/route"
], function () {
	var routes = Array.prototype.slice.apply(arguments, [0, arguments.length]);

	function initialize () {
		angular.forEach(routes, function (route) {
			route.initialize();
		});
	};

	return {initialize: initialize};
});