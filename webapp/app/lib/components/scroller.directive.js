/**
 * Created by doyen on 2015/11/6.
 */
define([

], function () {
	function initialize () {
		var module = angular.module("Directives");

		module.directive("scroller", [
			"$interval",
			"$timeout",
			function ($interval, $timeout) {
				return {
					priority: 1,
					scope: {
						dragGrid: "="
					},
					templateUrl: "app/common/scroller.html",
					link: function (scope, iElement, iAttrs) {
						function drag (container) {
							if ($(".draggableDiv")) {
								$(".draggableDiv").remove();
							}
							var ul = container.find("ul");
							var li =  container.find("li");
							var originLi = null;
							var exchangeable = false;
							var draggable = false;
							var dragDiv = $("<div class='draggableDiv'><img draggable='false' src='' alt=''/><a></a></div>").css({
								width: li.width()
							});
							var moveDiv = null;
							var scrollable = $(".lorin-content").length ? true : false;

							ul.append(dragDiv);

							li.off("mousedown", ":not(a)", mousedownFun);
							$(document).off("mousemove", mousemoveFun);
							$(document).off("mouseup", mouseupFun);

							li.on("mousedown", ":not(a)", mousedownFun);
							$(document).on("mousemove", mousemoveFun);
							$(document).on("mouseup", mouseupFun);

							function mousemoveFun (event) {
								if (!draggable) {
									return false;
								}
								var left = event.clientX - parseInt($("body").css("paddingLeft")) - dragDiv.width() / 2;
								var top = event.clientY - parseInt($("#header").css("height")) - dragDiv.height() / 2;

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
							}

							function mouseupFun (event) {
								if (!exchangeable) {
									li.find("div.mask").hide();
									dragDiv.hide();
									return false;
								}

								var swapLi = null;
								var left = event.clientX - parseInt($("body").css("paddingLeft")) - dragDiv.width() / 2;
								var top = event.clientY - parseInt($("#header").css("height")) - dragDiv.height() / 2;

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
									moveDiv = swapLi.clone();
									moveDiv.css({
										position: "absolute",
										zIndex: 10,
										top: swapLi.position().top,
										left: swapLi.position().left
									});
									ul.append(moveDiv);
									moveDiv.animate({
										top: originLi.position().top,
										left: originLi.position().left
									}, 300, "linear", function () {
										var originImg = originLi.find("img").attr("ng-src");
										var originA = originLi.find("a");
										var swapImg = swapLi.find("img").attr("ng-src");
										var swapA = swapLi.find("a");

										originLi.find("img").attr("ng-src", swapImg);
										originLi.find("img").attr("src", swapImg);
										originLi.find("a").remove().end().append(swapA);
										swapLi.find("img").attr("ng-src", originImg);
										swapLi.find("img").attr("src", originImg);
										swapLi.find("a").remove().end().append(originA);
										moveDiv.remove();
										li.find("div.mask").hide();
										dragDiv.hide();
										draggable = false;
										exchangeable = false;
									});
								}
							}

							function mousedownFun (event) {
								originLi = $(event.delegateTarget);
								dragDiv.find("img").attr("src", originLi.find("img").attr("src"));
								dragDiv.find("a").html(originLi.find("a").html());
								originLi.find("div.mask").show();
								dragDiv.css({
									left: originLi.position().left,
									top: originLi.position().top
								}).show();

								draggable = true;
							}
						};

						$(window).on("resize", function () {
							drag($(iElement));
						});

						var timer = $interval(function () {
							var i = 0;

							$(iElement).find("img").each(function () {
								if ($(this).height() == 0) {
									return false;
								}

								i++;
							});

							if ($(iElement).find("img").length == i) {
								$(iElement).lorinScroller();

								if (!$(iElement).find(".lorin-bar").length) {
									$(iElement).css("marginTop", "5px");
								}

								$(iElement).find("li").hover(
									function () {
										$(this).find("a").animate({
											bottom: "0px"
										}, 200, "linear");
									},
									function () {
										$(this).find("a").animate({
											bottom: "-30px"
										}, 200, "linear");
									}
								);

								drag($(iElement));
								$interval.cancel(timer);
							}
						}, 10);
					}
				};
			}]
		);
	};

	return {initialize: initialize};
});