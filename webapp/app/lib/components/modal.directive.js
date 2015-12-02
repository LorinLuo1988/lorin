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
						var preventStateChange = true;

						$(element).find("h4.modal-title").html(scope.modalOptions.title.text)
							.addClass(scope.modalOptions.title.className);

						for (var i in scope.modalOptions.body) {
							if (scope.modalOptions.body.hasOwnProperty(i)) {
								$(element).find("div.container-fluid").append(
									$("<div class='row'></div>").html(scope.modalOptions.body[i].text)
										.addClass(scope.modalOptions.body[i].className)
								);
							}
						}

						$(element).find(".modal-footer").append(
							$("<button data-dismiss='modal'></button>").html(scope.modalOptions.footer.cancelBtn.text)
								.addClass(scope.modalOptions.footer.cancelBtn.className)
						);

						$(element).find(".modal-footer").append(
							$("<button></button>").html(scope.modalOptions.footer.sureBtn.text)
								.addClass(scope.modalOptions.footer.sureBtn.className)
						);

						if (scope.modalOptions.type == "page-jump") {
							scope.$on("$stateChangeStart", function (event) {
								if (preventStateChange) {
									event.preventDefault();
									$("#lorin-modal").modal();
								}
							});

							$(element).find("button.modal-sure").on("click", function () {
								preventStateChange = false;
								$("#lorin-modal").modal("hide");
								$state.go($rootScope.clickState);
								preventStateChange = true;
							});
						}
					}
				}
			}
		]);
	}

	return {initialize: initialize};
});