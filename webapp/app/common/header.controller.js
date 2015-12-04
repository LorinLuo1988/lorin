/**
 * Created by doyen on 2015/11/23.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("headerController", [
			"$rootScope",
			"$scope",
			"$state",
			"$timeout",
			function ($rootScope, $scope, $state, $timeout) {
				$scope.activeIndex = 0;

				$scope.navList = [
					{title: "主页", iconClassName: "glyphicon glyphicon-home", state: "home", active: true},
					{
						title: "个人简介",
						iconClassName: "glyphicon glyphicon-user",
						state: "introduce",
						active: false
					},
					{
						title: "教育经历",
						iconClassName: "glyphicon glyphicon-education",
						state: "education",
						active: false
					},
					{
						title: "工作经历",
						iconClassName: "glyphicon glyphicon-folder-open",
						state: "work",
						active: false
					},
					{
						title: "技能",
						iconClassName: "glyphicon glyphicon-pencil",
						state: "skill",
						active: false
					},
					{
						title: "作品",
						iconClassName: "glyphicon glyphicon-picture",
						state: "opus",
						active: false
					},
					{
						title: "兴趣爱好",
						iconClassName: "glyphicon glyphicon-headphones",
						state: "hobby",
						active: false
					}
				];

				$rootScope.modalOptions = {
					title: {
						text: "警告!",
						className: "text-danger"
					},
					body: [
						{
							text: "确定切换页面吗.",
							className: "text-info"
						}
					],
					footer: {
						cancelBtn: {
							text: "取消",
							className: "btn-warning btn-sm modal-cancel",
							callBack: function (data) {
								data.modal.modal("hide");
							}
						},
						sureBtn: {
							text: "确定",
							className: "btn-success btn-sm modal-sure",
							callBack: function (data) {
								$rootScope.modalOptions.preventStateChange = false;
								data.modal.modal("hide");
								$state.go($rootScope.clickState);
								$rootScope.modalOptions.preventStateChange = true;
							}
						}
					},
					type: "page-jump",
					preventStateChange: true,
					modalSizeClassName: "modal-sm"
				};

				$scope.popoverConfig = {
					popoverContent: "关闭页面切换跳转提示",
					popoverClassName: "glyphicon glyphicon-eye-open",
					togglePopoverClassName: function () {
						if ($scope.popoverConfig.popoverClassName == "glyphicon glyphicon-eye-close") {
							$scope.popoverConfig.popoverClassName = "glyphicon glyphicon-eye-open";
							$scope.popoverConfig.popoverContent = "关闭页面切换跳转提示";
							$rootScope.modalOptions.preventStateChange = true;
						} else {
							$scope.popoverConfig.popoverClassName = "glyphicon glyphicon-eye-close";
							$scope.popoverConfig.popoverContent = "开启页面切换跳转提示";
							$rootScope.modalOptions.preventStateChange = false;
						}
					}
				};

				$rootScope.resetModalOptions = function () {
					$rootScope.modalOptions = {
						title: {
							text: "警告!",
							className: "text-danger"
						},
						body: [
							{
								text: "确定切换页面吗.",
								className: "text-info"
							}
						],
						footer: {
							cancelBtn: {
								text: "取消",
								className: "btn-warning btn-sm modal-cancel",
								callBack: function (data) {
									data.modal.modal("hide");
								}
							},
							sureBtn: {
								text: "确定",
								className: "btn-success btn-sm modal-sure",
								callBack: function (data) {
									$rootScope.modalOptions.preventStateChange = false;
									data.modal.modal("hide");
									$state.go($rootScope.clickState);
									$rootScope.modalOptions.preventStateChange = true;
								}
							}
						},
						type: "page-jump",
						preventStateChange: $scope.popoverConfig.popoverClassName == "glyphicon glyphicon-eye-close" ? false : true,
						modalSizeClassName: "modal-sm"
					};
				};

				$scope.$on("$stateChangeSuccess", function () {
					$rootScope.clickState = $state.current.name;

					switch ($state.current.name) {
						case "home":
							$scope.activeIndex = 0; break;
						case "introduce":
							$scope.activeIndex = 1; break;
						case "education":
							$scope.activeIndex = 2; break;
						case "work":
							$scope.activeIndex = 3; break;
						case "skill":
							$scope.activeIndex = 4; break;
						case "opus":
							$scope.activeIndex = 5; break;
						case "hobby":
							$scope.activeIndex = 6; break;
					}
				});
			}
		]);
	};

	return {initialize: initialize};
});