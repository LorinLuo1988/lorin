/**
 * Created by doyen on 2015/11/5.
 */
define([
	"lib/components/header.directive",
	"lib/components/scroller.directive",
	"lib/components/modal.directive",
	"lib/components/scroller.common.directive",
	"lib/components/translate.directive",
	"lib/components/popover.directive"
], function () {
	var directives = Array.prototype.slice.apply(arguments, [0, arguments.length]);

	function initialize () {
		angular.forEach(directives, function (directive) {
			directive.initialize();
		});
	};

	return {initialize: initialize};
});