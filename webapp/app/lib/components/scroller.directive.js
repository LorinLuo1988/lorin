/**
 * Created by doyen on 2015/11/6.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("scroller", [
			"$interval",
			function ($interval) {
				return {
					priority: 9999,
					restrict: "AE",
					scope: {
						dragGrid: "=",
						clickState: "&"
					},
					templateUrl: "app/common/scroller.html",
					compile: function (tElement, tAttr) {
						$(tElement).lorinScroller({
							backgroundColor: "#fbfbfb"
						});

						return function (scope, iElement, iAttrs) {
							$("#home").css({
								height: document.documentElement.clientHeight - $("#header").height() - 15
							});

							$("#hobby").css({
								height: document.documentElement.clientHeight - $("#header").height() - 15
							});

							var container = $(iElement), ul, li, originLi, exchangeable, draggable,
								dragDiv, moveLi, scrollable, mousedownX, mousedownY,
								startTime, overTime, timer, browserName;

							browserName = (function () {
								var userAgent = navigator.userAgent;
								var browserName = "";

								if (userAgent.indexOf("Chrome") != -1) {
									browserName = "Chrome";
								} else if (userAgent.indexOf("Firefox") != -1) {
									browserName = "Firefox";
								} else if (userAgent.indexOf("MSIE") != -1 || userAgent.indexOf("rv:11.0") != -1) {
									browserName = "IE";
								}
								return browserName;
							})();

							function mousemoveFun (event) {
								if (!draggable) {
									return false;
								}

								var left = event.clientX - parseInt($("body").css("paddingLeft")) - mousedownX;
								var top = event.clientY - parseInt($("#header").css("height"))- mousedownY;

								if (scrollable) {
									left -= parseInt($(".lorin-content").css("left"));
									top -= parseInt($(".lorin-content").css("top"));
								}

								if (left < 0) {
									left = 0;
								} else if (left > parseInt(container.css("width")) - (scrollable ? 2 * parseInt($(".lorin-scroll-container").css("paddingLeft")) : 0) - container.find("li").width()) {
									left = parseInt(container.css("width")) - (scrollable ? 2 * parseInt($(".lorin-scroll-container").css("paddingLeft")) : 0) - container.find("li").width();
								}

								if (top < 0) {
									top = 0;
								} else if (top > (scrollable ? parseInt($(".lorin-content").css("height")) : container.find("ul").height()) - container.find("li").height()) {
									top = (scrollable ? parseInt($(".lorin-content").css("height")) : container.find("ul").height()) - container.find("li").height();
								}

								li.each(function (index, dom) {
									if (Math.abs($(dom).position().left - left) <= 20 && Math.abs($(dom).position().top - top) <= 20) {
										dragDiv.css({
											boxShadow: "-1px 1px 5px 1px gold, 1px -1px 5px 1px gold"
										});
										exchangeable = true;
										return false;
									} else {
										exchangeable = false;
										dragDiv.css({
											boxShadow: ""
										});
									}
								});

								dragDiv.css({
									left: left,
									top: top
								});
							};

							function mouseupFun (event) {
								overTime = new Date(event.timeStamp);

								document.ondragstart=function() {
									return true;
								};

								if (overTime - startTime < 200) {
									dragDiv.css({
										top: originLi.position().top,
										left: originLi.position().left
									});
									li.find("div.mask").hide();
									dragDiv.hide();
									return false;
								}

								if (!exchangeable) {
									if (originLi) {
										dragDiv.animate({
											top: originLi.position().top,
											left: originLi.position().left
										}, 150, "linear", function () {
											li.find("div.mask").hide();
											dragDiv.hide();
										});
									}
									return false;
								}

								var swapLi = null;
								var left = event.clientX - parseInt($("body").css("paddingLeft")) - mousedownX;
								var top = event.clientY - parseInt($("#header").css("height")) - mousedownY;

								if (scrollable) {
									left -= parseInt($(".lorin-content").css("left"));
									top -= parseInt($(".lorin-content").css("top"));
								}

								if (left < 0) {
									left = 0;
								} else if (left > parseInt(container.css("width")) - (scrollable ? 2 * parseInt($(".lorin-scroll-container").css("paddingLeft")) : 0) - container.find("li").width()) {
									left = parseInt(container.css("width")) - (scrollable ? 2 * parseInt($(".lorin-scroll-container").css("paddingLeft")) : 0) - container.find("li").width();
								}

								if (top < 0) {
									top = 0;
								} else if (top > (scrollable ? parseInt($(".lorin-content").css("height")) : container.find("ul").height()) - container.find("li").height()) {
									top = (scrollable ? parseInt($(".lorin-content").css("height")) : container.find("ul").height()) - container.find("li").height();
								}

								li.each(function (index, dom) {
									if (Math.abs($(dom).position().left - left) <= 20 && Math.abs($(dom).position().top - top) <= 20) {
										swapLi = $(dom);
										return false;
									}
								});

								if (swapLi) {
									moveLi = swapLi.clone();
									moveLi.css({
										position: "absolute",
										zIndex: 10,
										top: swapLi.position().top,
										left: swapLi.position().left
									});
									moveLi.find("a").css("top", 0);
									ul.append(moveLi);
									draggable = false;
									exchangeable = false;

									if (swapLi[0] == originLi[0]) {
										li.find("div.mask").hide();
										dragDiv.hide();
										moveLi.remove();
										return false;
									}

									moveLi.animate({
										top: originLi.position().top,
										left: originLi.position().left
									}, 300, "linear", function () {
										moveLi.remove();
										li.find("div.mask").hide();
										dragDiv.hide();
										scope.$emit("changeDragGrid", {originIndex: originLi.index(), swapIndex: swapLi.index()});
									});
								}
							};

							function mousedownFun (event) {
								if (browserName == "Firefox") {
									$("html").css("-moz-user-select", "none");
									document.ondragstart=function() {
										return false;
									};
								} else {
									$(document).on("selectstart", function () {
										return false;
									});
								}

								startTime = new Date(event.timeStamp);
								mousedownX = event.offsetX;
								mousedownY = event.offsetY;
								originLi = $(event.delegateTarget);
								dragDiv.find("img").attr("src", originLi.find("img").attr("src"));
								dragDiv.find("a").html(originLi.find("a").html());
								originLi.find("div.mask").show();
								dragDiv.css({
									left: originLi.position().left,
									top: originLi.position().top,
									width: li.width()
								}).show();

								draggable = true;
							};

							function drag () {
								if ($(".draggableDiv")) {
									$(".draggableDiv").remove();
								}

								$(iElement).lorinScroller("update");

								$(iElement).find("li").hover(
									function () {
										$(this).find("a").animate({
											top: "0px"
										}, 200, "linear");
									},
									function (event) {
										$(this).find("a").animate({
											top: "-30px"
										}, 200, "linear");
									}
								);

								ul = container.find("ul");
								li =  container.find("li");
								originLi = null;
								exchangeable = false;
								draggable = false;
								dragDiv = $("<div class='draggableDiv'><img draggable='false' src='' alt=''/><a></a></div>");
								moveLi = null;
								scrollable = $(".lorin-content").length ? true : false;

								ul.append(dragDiv);

								li.off("mousedown", ":not(a)", mousedownFun);
								$(document).off("mousemove", mousemoveFun);
								$(document).off("mouseup", mouseupFun);

								li.on("mousedown", ":not(a)", mousedownFun);
								$(document).on("mousemove", mousemoveFun);
								$(document).on("mouseup", mouseupFun);
							};

							$(window).on("resize", function () {
								$("#home").css({
									height: document.documentElement.clientHeight - $("#header").height() - 15
								});

								$(".homeScroller").lorinScroller("update");
							});

							timer = $interval(function () {
								var i = 0;

								$(iElement).find("img").each(function () {
									if ($(this).height() == 0) {
										return false;
									}

									i++;
								});

								if ($(iElement).find("img").length == i) {
									$interval.cancel(timer);
									drag();
								}
							}, 20);
						}
					}
				};
			}
		]);
	};

	return {initialize: initialize};
});