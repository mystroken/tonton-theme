
const mainJs = function (ScrollMagic) {
	let controller = new ScrollMagic.Controller();

	new TimelineMax()
		.staggerFrom('.page-home header .wrapped', 1.8, { yPercent: 100, ease: Power3.easeOut }, 0.15)
		.from('.page-home header .line', 1.8, { scaleX: 0, transformOrigin: 'left', ease: Power3.easeOut }, 1.2)

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

module.exports = {
	mainJs
}