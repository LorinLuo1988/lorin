/**
 * Created by doyen on 2015/11/23.
 */
define([], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("modal", [
			"$state",
			"$rootScope",
			function ($state, $rootScope) {
				return {
					restrict: "AE",
					templateUrl: "app/common/modal.html",
					scope: {
						modalOptions: "="
					},
					replace: true,
					link: function (scope, element, attrs) {
						scope.modal = {modal: $("#lorin-modal")};

						if (scope.modalOptions.type == "page-jump") {
							scope.$on("$stateChangeStart", function (event) {
								if (scope.modalOptions.preventStateChange) {
									event.preventDefault();
									$("#lorin-modal").modal();
								}
							});
						}

						$('#lorin-modal').on('hidden.bs.modal', function (e) {
							$rootScope.resetModalOptions();

							if (scope.modalOptions.type == "picture-slider") {
								$("#slider").slider('destroy');
							}
						});


						$('#lorin-modal').on('shown.bs.modal', function (e) {
							if (scope.modalOptions.type == "picture-slider") {
								$("#slider").css({
									height: document.documentElement.clientHeight / 2
								});

								$("#slider").slider({
									frameTime: 20,
									animateTime: 1000,
									intervalTime: 2000,
									indicatorsType: "round",
									carouselType: "single",
									imgArr: scope.modalOptions.body
								});
							}
						});

						$(window).on("resize", function () {
							$("#slider").css({
								height: document.documentElement.clientHeight / 2
							});
						});
					}
				}
			}
		]);
	}

	return {initialize: initialize};
});