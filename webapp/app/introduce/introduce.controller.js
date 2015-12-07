/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("introduceController", [
			"$scope",
			function ($scope) {
				$scope.baseInfo= {
					title: "基本资料",
					img: "img/lorin.jpg",
					content: [
						["姓名", "英文名", "性别", "职位"],
						["罗云", "Lorin", "男", "Web前端开发工程师"],
						["政治面貌", "出生地", "出生日期", "学位"],
						["团员", "四川洪雅", "1988.11.01", "学士"],
						["居住地", "外语等级", "身高", "体重"],
						["成都", "英语四级", "170cm", "60kg"],
						["毕业学校", "计算机等级", "工作年限", "专业"],
						["东北石油大学", "二级C", "2.5年", "电子科学与技术"]
					]
				};

				$scope.skill = {
					title: "特长",
					subTitle: "",
					content: [
						{name: "军棋", description: "从小学三年级开始就喜欢下军旗， 从最开始的两人军旗但现在的四国军棋。"},
						{name: "做饭", description: "从小学二年级开始做饭，一直都很喜欢做饭。"},
						{name: "学习", description: "从小就成绩不好，学习不认真，现在要弥补以前的过失。"},
						{name: "PS", description: "从高三开始喜欢上玩PS，刚开始是足球，后来是NBA，可惜现在找不到PS厅了"},
						{name: "跑步", description: "一直都喜欢跑步，锻炼身体从跑步做起。"},
						{name: "交友", description: "交友让你的生活圈变得更大，给你带来更多的乐趣。"}
					]
				}
			}
		]);
	};

	return {initialize: initialize};
});