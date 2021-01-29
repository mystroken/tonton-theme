
const singleJs = function (ScrollMagic) {
	let controller = new ScrollMagic.Controller()

	let $webGL = $('#webgl')

	//TweenMax.to($webGL, .5, { delay: .5, autoAlpha: 0 })
	TweenMax.to($webGL, 1, { autoAlpha: 1 })
	TweenMax.staggerFromTo('.js-text-single', 1.85, { opacity: 0, y: 80, }, { delay: .5, opacity: 1, y: 0, ease: Power3.easeOut }, 0.3)
	TweenMax.from('.all-projects', 1.85, { opacity: 0, delay: 1.5 })

	//? - =========================  COLORS DYNAMIC  ========================= -//
	//? - =========================  COLORS DYNAMIC  ========================= -//
	if ($('.colors').length > 0) {
		let $eachColor = $('.each-color')
		if ($(window).width() > 1024) {
			TweenMax.set($eachColor.find('.texts'), { autoAlpha: 0 })
			TweenMax.set($eachColor.eq(0).find('.texts'), { autoAlpha: 1 })
			TweenMax.set($eachColor.eq(0), { minWidth: '235px' })
		}
		let widthEachColor = $eachColor.eq(1).width()
		$eachColor.mouseenter(function () {
			TweenMax.to($eachColor, .6, { ease: Power3.easeInOut, minWidth: widthEachColor, width: widthEachColor })
			TweenMax.to($eachColor.find('.texts'), .6, { autoAlpha: 0, ease: Power3.easeInOut })
			TweenMax.to(this, .6, { minWidth: '235px', width: '235px', ease: Power3.easeInOut })
			TweenMax.to($(this).find('.texts'), .6, { autoAlpha: 1, ease: Power3.easeInOut })
		});

		//? - =========================  ANIMA COLORS  ========================= -//
		//? - =========================  ANIMA COLORS  ========================= -//
		let tlColor = new TimelineMax()
			.staggerFrom('.each-color', 1.8, { scaleY: 0, transformOrigin: 'top left', ease: Power3.easeInOut }, .05)
			.from('.each-color .texts', .3, { autoAlpha: 0 }, '-=.1')

		let sceneColors = new ScrollMagic.Scene({
			triggerElement: '.colors',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlColor)
			.addTo(controller);
	}

	//? - =========================  ANIMA ON SCR0LL  ========================= -//
	//? - =========================  ANIMA ON SCR0LL  ========================= -//
	if ($('.anima-text').length > 0) {
		let $animaText = $('.anima-text')

		$animaText.each(function () {
			new SplitText($(this).find('.js-text'), { type: "lines", linesClass: "lineChild" });
			new SplitText($(this).find('.js-text'), { type: "lines", linesClass: "lineParent" });
			let tlAnimaText = new TimelineMax()
				.staggerFrom($(this).find('.lineChild'), 1.85, { opacity: 0, y: 60, ease: Power3.easeOut }, 0.15);
			;

			let scene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: .7
			})
				.reverse(false)
				.setTween(tlAnimaText)
				.addTo(controller);
		});
	}

	//? - =========================  ANIMA ROLE  ========================= -//
	//? - =========================  ANIMA ROLE  ========================= -//

	if ($('.anima-role').length > 0) {
		new SplitText($('.anima-role').find('.js-text'), { type: "lines", linesClass: "lineChild" });
		new SplitText($('.anima-role').find('.js-text'), { type: "lines", linesClass: "lineParent" });
		let tlAnimaRole = new TimelineMax()
			.staggerFrom($('.anima-role').find('.lineChild'), 1.85, { opacity: 0, y: 60, ease: Power3.easeOut }, 0.06)
			.from('.anima-role .role__brand h1 ', 1.8, { scale: 1.08, opacity: 0, ease: Power3.easeOut }, .5)
		let sceneAnimaRole = new ScrollMagic.Scene({
			triggerElement: '.anima-role',
			triggerHook: .7
		})
			.reverse(false)
			.setTween(tlAnimaRole)
			.addTo(controller);
	}

	//? - =========================  DRAGGALE ========================= -//
	//? - =========================  DRAGGALE ========================= -//
	if ($('.inner-pages').length > 0 && window.innerWidth > 1024) {
		let tlInners = new TimelineMax()
			.staggerFrom('.each-inner-page', 1.8, { xPercent: 40, opacity: 0, ease: Power3.easeOut }, .2)

		let sceneInnerss = new ScrollMagic.Scene({
			triggerElement: '.inner-pages',
			triggerHook: .75
		})
			.reverse(false)
			.setTween(tlInners)
			.addTo(controller);
	}

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
		}
	);

	$('footer').addClass('is-single')
} //singleJs

module.exports = {
	singleJs
}