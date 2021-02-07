//* --------------- STYLE
const css = require("./sass/app.sass");

//* --------------- LIBS
import Barba from "barba";
import { TweenMax } from "gsap";
import scrollToPlugin from "gsap/scrollToPlugin";
import ScrollMagic from "scrollmagic";
import "ScrollMagicGSAP";
import Draggable from "gsap/Draggable";
import ThrowPropsPlugin from "gsap/ThrowPropsPlugin";

//* --------------- JS
const { mainJs } = require("./js/main.js");
const { overlayJs } = require("./js/overlay.js");
const { consoleTag } = require("./js/console.js");
//const { scroll.init() } = require('./js/scroll.js');
const { singleJs } = require("./js/single.js");
const { dragJs } = require("./js/drag.js");

//* --------------- JS
import { webglRender } from "./js/webgl_class";
import { scroll } from "./js/scroll";
import { home } from "./js/home";
import { about } from "./js/about";
import { cursor } from "./js/cursor";
import { gooeymenu } from "./js/gooeyMenu";
import { menufs } from "./js/menu";
import { lottiejs } from "./js/lottie";
import { archived } from "./js/archived";

cursor.init();
menufs.init(Barba);
gooeymenu.init();
history.scrollRestoration = "manual";

let firstEntry = true;
let lastElementClicked,
	nameFrom,
	nameTo,
	dataColor,
	$webGL = $("#webgl"),
	$ctnOverlay = $(".ctn-overlay"),
	$pathOverlay0 = $(".shape-overlays path").eq(0),
	$pathOverlay1 = $(".shape-overlays path").eq(1);

Barba.Dispatcher.on("linkClicked", function (el) {
	lastElementClicked = el;
	dataColor = $(el).data("color");
	nameFrom = $(el).data("from");
	nameTo = $(el).data("to");
});

// ------------------- INIT TRANSITION  .............
var ExpandTransition = Barba.BaseTransition.extend({
	start: function () {
		Promise.all([this.newContainerLoading, this.beforeLeave()]).then(
			this.beforeEnter.bind(this)
		);
	},

	beforeLeave: function () {
		var deferred = Barba.Utils.deferred();
		let prev = Barba.HistoryManager.prevStatus().namespace;
		scroll.destroy();
		$(".shape-overlays").find("path").removeAttr("d");
		TweenMax.set($ctnOverlay, { zIndex: "4" });

		//
		// SINGLE ROUTE
		// ===========================================================================
		if (nameTo === "single") {
			TweenMax.set($pathOverlay0, { fill: dataColor });
			TweenMax.set($pathOverlay1, { fill: "#ffffff" });
			TweenMax.set($webGL, { zIndex: "20" });
		}

		//
		// HOME ROUTE
		// ===========================================================================
		else if (nameTo === "home") {
			TweenMax.set($pathOverlay0, { fill: "#aaa" });
			TweenMax.set($pathOverlay1, { fill: "#000" });
			TweenMax.delayedCall(1.5, () => {
				TweenMax.set("body", { backgroundColor: "#000" });
			});
		}

		//
		// ABOUT ROUTE
		// ===========================================================================
		else if (nameTo === "about") {
			TweenMax.set($pathOverlay0, { fill: "#aaa" });
			TweenMax.set($pathOverlay1, { fill: "#000" });
			TweenMax.delayedCall(1.5, () => {
				TweenMax.set("body", { backgroundColor: "#000" });
			});
		}

		//
		// ARCHIVE ROUTE
		// ===========================================================================
		else if (nameTo === "archived") {
			TweenMax.set($pathOverlay0, { fill: "#000" });
			TweenMax.set($pathOverlay1, { fill: "#eee" });
			TweenMax.delayedCall(1.5, () => {
				TweenMax.set("body", { backgroundColor: "#eee" });
			});
		}

		//
		// REGULAR ROUTE
		// ===========================================================================
		else {
			//TweenMax.to('h1', 3,{ rotation: 360, ease: Power3.easeInOut, onComplete: () => { deferred.resolve(); }})
		}

		TweenMax.to("body", 0.1, {
			overflowY: "hidden",
			onComplete: () => {
				deferred.resolve();
			},
		});
		return deferred.promise;
	},

	beforeEnter: function () {
		overlayJs();
		//tlTransition.play(0)
		TweenMax.delayedCall(1.5, () => {
			this.done();

			TweenMax.set($ctnOverlay, { zIndex: "0" });
			$(".shape-overlays").find("path").removeAttr("d");
		});
	},
});

//?
// Base Home
//? ===========================================================================
let homeBase = Barba.BaseView.extend({
	namespace: "home",
	onEnter: function () {
		menufs.disactiveDarkMenu();
	},
	onEnterCompleted: function () {
		WebFont.load({
			custom: {
				families: ["pangramlight"],
				//urls: ['/css/app.css']
			},
			active: (e) => {
				webglRender.init();
			},
		});
		let contentPage = document.querySelector(".page-home");
		//TweenMax.set('body', { overflowY: 'auto' })
		window.scrollTo(0, 0);
		gooeymenu.activeGooey();
		if (firstEntry) {
			lottiejs.init(scroll.init());
		} else {
			TweenMax.set("body", { overflowY: "auto" });
			home.init(document.querySelector(".page-home"));
			home.entering();
			home.mainAnimations(ScrollMagic);
			scroll.init("home", false, contentPage);
		}
	},
	onLeave: function () {
		webglRender.destroy();
	},
});
homeBase.init();

//?
// Base Single
//? ===========================================================================
let singleBase = Barba.BaseView.extend({
	namespace: "single",

	onEnter: function () {
		gooeymenu.disactiveGooey();
		menufs.activeDarkMenu();
	},
	onEnterCompleted: function () {
		webglRender.init();
		window.scrollTo(0, 0);
		cursor.single($(".inner-pages__imgs__travel"));
		dragJs(Draggable, ThrowPropsPlugin);
		singleJs(ScrollMagic);
		TweenMax.set("body", { overflowY: "auto" });
		let contentPage = document.querySelector(".page-single");
		scroll.init("single", false, contentPage);
	},
	onLeave: function () {
		webglRender.destroy();
	},
});
singleBase.init();

//?
// Base about
//? ===========================================================================
let aboutBase = Barba.BaseView.extend({
	namespace: "about",

	onEnter: function () {
		//gooeymenu.disactiveGooey()
		//menufs.activeDarkMenu()
		menufs.disactiveDarkMenu();
		TweenMax.set($webGL, { autoAlpha: 0 });
	},
	onEnterCompleted: function () {
		window.scrollTo(0, 0);
		TweenMax.set("body", { overflowY: "auto" });
		about.init(document.querySelector(".barba-container"));
		let contentPage = document.querySelector(".page-about");
		scroll.init("about", false, contentPage);
	},
});
aboutBase.init();

//?
// Base archived
//? ===========================================================================
let archivedBase = Barba.BaseView.extend({
	namespace: "archived",

	onEnter: function () {
		TweenMax.set($webGL, { autoAlpha: 0 });
		gooeymenu.disactiveGooey();
	},
	onEnterCompleted: function () {
		window.scrollTo(0, 0);
		TweenMax.set("body", { overflowY: "auto" });
		let contentPage = document.querySelector(".page-archived");
		scroll.init("archived", false, contentPage);
	},
	onLeave: function () {
		TweenMax.to(".modal-zoom, #main-archived", 0.5, { autoAlpha: 0 });
		archived.destroy();
	},
});
archivedBase.init();

//?
// 404
//? ===========================================================================
let notFoundBase = Barba.BaseView.extend({
	namespace: "notFound",

	onEnter: function () {},
	onEnterCompleted: function () {
		TweenMax.set($pathOverlay0, { fill: "#999" });
		TweenMax.set($pathOverlay1, { fill: "#000" });
		TweenMax.staggerFrom(
			".main-404__hold > *",
			1.6,
			{ delay: 2.15, y: 80, autoAlpha: 0, ease: Power3.easeOut },
			0.1
		);
	},
});
notFoundBase.init();

Barba.Dispatcher.on(
	"initStateChange",
	function (currentStatus, oldStatus, container) {
		//TweenMax.set('body', { overflowY: 'hidden' })
		//window.scrollTo(0, 0);
		//? ------ GOOGLE ANALYTICS
		/*window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    var path = (window.location.href).replace(window.location.origin, '').toLowerCase();
    gtag('js', new Date());
    gtag('config', 'UA-80832390-1', {
        'anonymize_ip': true, // for GDPR
        'page_title': document.title,
        'page_path': path
    });*/
	}
);

Barba.Dispatcher.on(
	"newPageReady",
	function (currentStatus, oldStatus, container) {}
);

Barba.Prefetch.init();
Barba.Pjax.start();

Barba.Pjax.getTransition = function () {
	var transitionObj = ExpandTransition;
	return transitionObj;
};

if (!$(".barba-container").hasClass("page-home")) {
	$(".e-lottie").remove();
}
firstEntry = false;
$(".preloader-master").remove();

consoleTag();
