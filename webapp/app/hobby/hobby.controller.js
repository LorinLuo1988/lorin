/**
 * Created by doyen on 2015/11/5.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Controllers");

		module.controller("hobbyController", [
			"$scope",
			"$timeout",
			function ($scope, $timeout) {
				$scope.music = {
					title: "音乐",
					subTitle: "音乐带给我无尽的美感",
					singer: [
						{name: "刘德华", popoverContent: "四大天王之首，歌曲和电影都非常出色"},
						{name: "张学友", popoverContent: "四大天王唱功最好的歌手，无数首经典歌曲"},
						{name: "汪峰", popoverContent: "中国现代摇滚的代表人物，唱功了得，写歌填词样样精通"}
					],
					dataList: [
						[
							{name: "冰雨", playIconShow: false},
							{name: "一路上有你", playIconShow: false},
							{name: "存在", playIconShow: false}
						],
						[
							{name: "当我遇上你", playIconShow: false},
							{name: "一千个伤心的理由", playIconShow: false},
							{name: "怒放的生命", playIconShow: false}
						],
						[
							{name: "练习", playIconShow: false},
							{name: "情网", playIconShow: false},
							{name: "硬币", playIconShow: false}
						]
					],
					play: true,
					translateStop: false
				};

				$scope.movie = {
					title: "电影电视剧",
					subTitle: "电影为我打发无聊的时间",
					dataList: [
						"射雕英雄传",
						"神雕侠侣",
						"天龙八部",
						"倚天屠龙记",
						"悲伤恋歌"
					]
				};

				$scope.sport = {
					title: "体育",
					subTitle: "体育带给我无限的激情",
					dataList: [
						"对中国足球失望透顶，已经不看中超国足十多年了",
						"最喜欢的NBA球队是热火和火箭",
						"最喜欢的NBA球星是德维恩.韦德",
						"最喜欢的足球明星是卡卡",
						"最讨厌的NBA球星是科比"
					]
				};

				$scope.food = {
					title: "美食",
					subTitle: "美食让我回味无穷",
					dataList: [
						"最拿手的菜是凉拌鸡肉",
						"最喜欢吃大洪雅的汤锅羊肉",
						"重庆火锅",
						"洪雅麻辣烫",
						"洪雅的鱼火锅"
					]
				};

				$scope.entertainment = {
					title: "休闲娱乐",
					subTitle: "休闲娱乐让我修身养性",
					dataList: [
						"喜欢打打小麻将",
						"喜欢煮饭",
						"重庆火锅",
						"喜欢和朋友一起吃饭"
					]
				};

				$scope.currentSong = {
					mp3: "music/冰雨.mp3",
					wma: "music/冰雨.wma",
					singer: "刘德华",
					name: "冰雨"
				};

				$scope.togglePlayIcon = function (firstIndex, secondIndex, type) {
					if (type == "show") {
						$scope.music.dataList[firstIndex][secondIndex].playIconShow = true;
					} else if (type == "hide") {
						$scope.music.dataList[firstIndex][secondIndex].playIconShow = false;
					}

					if (!$scope.$$phase) {
						$scope.$apply();
					}
				};

				$scope.switchSong = function (firstIndex, secondIndex) {
					$scope.currentSong = {
						mp3: "music/" + $scope.music.dataList[firstIndex][secondIndex].name + ".mp3",
						wma: "music/"+ $scope.music.dataList[firstIndex][secondIndex].name +".wma",
						singer: $scope.music.singer[secondIndex].name,
						name: $scope.music.dataList[firstIndex][secondIndex].name
					};

					$scope.music.play = true;
					$scope.music.translateStop = false;

					$timeout(function () {
						$("#audio")[0].load();
						$("#audio")[0].play();
					}, 0);

					if (!$scope.$$phase) {
						$scope.$apply();
					}

					$scope.$broadcast("translateRefresh");
				};

				$scope.togglePlayMusic = function () {
					if (!$("#audio")[0].paused) {
						$scope.music.play = false;
						$scope.music.translateStop = true;
						$("#audio")[0].pause();
					} else if ($("#audio")[0].paused) {
						$scope.music.play = true;
						$scope.music.translateStop = false;
						$("#audio")[0].play();
					}
				};

				$timeout(function () {
					$("#audio")[0].play();
				}, 1500);
			}
		]);
	};

	return {initialize: initialize};
});