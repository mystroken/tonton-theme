import { webglRender } from './webgl_class'

class Home {
	constructor() {
		return
	}

	init(contentPage) {
		this.contentPage = contentPage
		let $webGL = $('#webgl')
		TweenMax.to($webGL, 1, { autoAlpha: 1 })

		/*let dynaTitle = this.contentPage.querySelectorAll('.title-folio')
		let $dynaTitle = $('.title-folio')
		$dynaTitle.click(function () {
		    let indexThis = $('.title-folio').index(this)
		    webglRender.onClick($(this), indexThis)
		});
  
		//instance WEBGL
		webglRender.onTicker(dynaTitle)
		webglRender.onMouseMove($dynaTitle)
		webglRender.onHover($dynaTitle)*/
	}

	scrollTo() {
		let $btnNavHome = $('.btn-scroll-to')
		$btnNavHome.click(function () {
			let letscroll = $(this).data('scroll-to')

			TweenMax.to(window, 1.6, { scrollTo: { y: `.scroll-${letscroll}` }, ease: Power3.easeInOut })
		});
	}

	firstEntrance(contentPage) {
		this.contentPage = contentPage
		let $webGL = $('#webgl')
		TweenMax.to($webGL, 1, { autoAlpha: 1 })

		/*webglRender.init(this.contentPage)
		let dynaTitle = this.contentPage.querySelectorAll('.title-folio')
		let $dynaTitle = $('.title-folio')
		$dynaTitle.click(function () {
		    let indexThis = $('.title-folio').index(this)
		    webglRender.onClick($(this), indexThis)
		});
  
		//instance WEBGL
		webglRender.onTicker(dynaTitle)
		webglRender.onMouseMove($dynaTitle)
		webglRender.onHover($dynaTitle)*/

		let $pathOverlay0 = $('.shape-overlays path').eq(0),
			$pathOverlay1 = $('.shape-overlays path').eq(1)
		TweenMax.set($pathOverlay0, { fill: "#aaa" })
		TweenMax.set($pathOverlay1, { fill: "#000" })
		//TweenMax.staggerFromTo('.page-home header .wrapped', 1.8, { yPercent: 100 }, { delay: 1.75, yPercent: 0, ease: Power3.easeOut }, 0.15)
		//TweenMax.fromTo('.page-home header .line', 1.8, { scaleX: 0 }, { delay: 1.75, scaleX: 1, transformOrigin: 'left', ease: Power3.easeOut })
	}

	//? - =========================  SWITCH COLORS  ========================= -//
	//? - =========================  SWITCH COLORS  ========================= -//
	// DEACTIVED TO GOOEYMENU SWITCH COLORS
	/*switchColors() {
	    let $btnSwitchDark = $('.switch-dark'),
		   $btnSwitchLight = $('.switch-light'),
		   $tSwitch = $('.t-switch'),
		   $eSwitch = $('.e-switch'),
		   $tSwitchGray = $('.t-switch-gray'),
		   $eSwitchGray = $('.e-switch-gray'),
		   timeSwitch = .8
 
 
	    let tlSwitchModeColor = new TimelineMax({ paused: true })
		   .to($tSwitch, timeSwitch, { color: '#000', ease: Power3.easeInOut }, 0)
		   .to($eSwitch, timeSwitch, { backgroundColor: '#000', ease: Power3.easeInOut }, 0)
		   .to($eSwitch, timeSwitch, { backgroundColor: '#000', ease: Power3.easeInOut }, 0)
		   .to('body, .awards', timeSwitch, { backgroundColor: '#fff', ease: Power3.easeInOut }, 0)
		   .to('.svg-logo path', timeSwitch, { fill: '#000', ease: Power3.easeInOut }, 0)
		   .to('footer .t-switch', timeSwitch, { color: '#fff', ease: Power3.easeInOut }, 0)
		   .to('footer ', timeSwitch, { backgroundColor: '#000', ease: Power3.easeInOut }, 0)
		   .to('footer .footer__fader, .gap-black', timeSwitch, { backgroundColor: '#fff', ease: Power3.easeInOut }, 0)
 
	    $btnSwitchLight.click(function () {
		   
		   $('.shape-overlays__path').removeAttr("d");
		   console.log($('.shape-overlays__path'));
		   tlSwitchModeColor.play()
		   webglRender.switchToBlack()
	    });
	    $btnSwitchDark.click(function () {
		   tlSwitchModeColor.reverse()
		   webglRender.switchToWhite()
	    });
	}*/

	entering() {
		//-_____________________________ Options
		TweenMax.staggerFromTo('.page-home header .wrapped', 1.8, { yPercent: 100 }, { yPercent: 0, ease: Power3.easeOut })
		TweenMax.fromTo('.page-home header .line', 1.8, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: Power3.easeOut })
	}

	mainAnimations(ScrollMagic) {
		this.scrollTo()
		let controller = new ScrollMagic.Controller();
		//? - =========================  ANIMATION ON SCROLL  ========================= -//
		//? - =========================  ANIMATION ON SCROLL  ========================= -//

		//-_____________________________ Options
		let tlHomeMenu = new TimelineMax()
			.staggerFrom('.page-home .options .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.25)
			.from('.page-home .options .separator', 1.8, { scaleX: 0, transformOrigin: 'left', ease: Power3.easeOut }, 1)
		let sceneHomeMenu = new ScrollMagic.Scene({
			triggerElement: '.options',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlHomeMenu)
			.addTo(controller);

		//-_____________________________ About
		let tlHomeAbout = new TimelineMax()
			.staggerFrom('.about .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.25)

		let sceneAbout = new ScrollMagic.Scene({
			triggerElement: '.start-about',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlHomeAbout)
			.addTo(controller);

		//-_____________________________ About P
		let tlHomeAboutP = new TimelineMax()
			.staggerFrom('.about .hold-p p', 1.8, { yPercent: 100, lineHeight: '50px', opacity: 0, ease: Power3.easeOut }, 0.25)

		let sceneAboutP = new ScrollMagic.Scene({
			triggerElement: '.hold-p',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlHomeAboutP)
			.addTo(controller);

		//-_____________________________ Works
		let tlHomeWorks = new TimelineMax()
			.staggerFrom('.works .title-home .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.25)

		let sceneWorks = new ScrollMagic.Scene({
			triggerElement: '.start-works',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlHomeWorks)
			.addTo(controller);

		//-_____________________________ Folios
		let tlHomeFolio = new TimelineMax()
			.staggerFrom('.links-folio__each .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.25)

		let sceneFolio = new ScrollMagic.Scene({
			triggerElement: '.links-folio',
			triggerHook: .5
		})
			.reverse(false)
			.setTween(tlHomeFolio)
			.addTo(controller);

		//-_____________________________ Awardss
		let tlHomeAwards = new TimelineMax()
			.staggerFrom('.awards .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.25)

		let sceneAwards = new ScrollMagic.Scene({
			triggerElement: '.start-awards',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlHomeAwards)
			.addTo(controller);

		//? - =========================  HOVERS  ========================= -//
		//? - =========================  HOVERS  ========================= -//
		let $hoverLine = $('.hover-line')
		let $lineLink = $('.line-link')
		TweenMax.set($lineLink, { scaleX: 0 })
		$hoverLine.hover(
			function () {
				TweenMax.to($(this).find('.line'), .5, { scaleX: 0, transformOrigin: 'right', ease: Power3.easeIn })
				TweenMax.to($(this).find('.line'), .5, { delay: .5, scaleX: 1, transformOrigin: 'left', ease: Power3.easeOut })
				TweenMax.to($(this).find('.line-link'), .6, { scaleX: 1, transformOrigin: 'left', ease: Power3.easeOut })
			}, function () {
				TweenMax.to($(this).find('.line-link'), .6, { scaleX: 0, transformOrigin: 'right', ease: Power3.easeOut })
				TweenMax.to($borderCursor, .5, { scale: .5, ease: Power3.easeOut })
			});

		//? - =========================  CURSOR SCALE  ========================= -//
		//? - =========================  CURSOR SCALE  ========================= -//
		let $borderCursor = $('#cursor .border'),
			$scaleCursor = $('.scale')

		$scaleCursor.hover(
			function () {
				TweenMax.to($borderCursor, .5, { scale: 1, ease: Power3.easeOut })
			}, function () {
				TweenMax.to($borderCursor, .5, { scale: .5, ease: Power3.easeOut })
			});

		//? - =========================  GIF HOVER  ========================= -//
		//? - =========================  GIF HOVER  ========================= -//
		let $btnWelcome = $('.header-home__welcome'),
			$gifWelcome = $('.header-home__gif')

		$btnWelcome.hover(
			function () {
				TweenMax.to($gifWelcome, .8, { opacity: 1 })
			}, function () {
				TweenMax.to($gifWelcome, .8, { opacity: 0 })
			});

		$('.year-js').text((new Date()).getFullYear())
	}
}

export const home = new Home()