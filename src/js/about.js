import { overlay } from './overlaySvg.js'
import { TimelineMax, TweenMax } from 'gsap'
import SplitText from 'gsap/SplitText.js'
import ScrollMagic from 'scrollmagic'
class About {
	constructor() {
		return
	}

	init(contentPage) {
		this.contentPage = contentPage
		this.about = {
			footer: this.contentPage.querySelector('footer'),
			code: this.contentPage.querySelector('.code'),
			mom: this.contentPage.querySelector('.mom'),
			redact: this.contentPage.querySelectorAll('.redact'),
			night: this.contentPage.querySelector('.night'),
			sun: this.contentPage.querySelector('.sun'),
			t_switch: this.contentPage.querySelectorAll('.t-switch-a'),
			icons: this.contentPage.querySelectorAll('svg'),
			img_emoji: this.contentPage.querySelectorAll('.tt_emoji'),
			img_real: this.contentPage.querySelectorAll('.tt_real')
		}
		this.logomain = document.querySelector('.logo-main ')
		this.menu = {
			main: document.querySelector('.menu-fs '),
			trg: document.querySelector('.trg-menu'),
			bg: document.querySelector('.bg-menu'),
		}

		this.opt = {
			animating: false
		}
		this.setters()
		this.intersect()
		this.switchMode()
		this.animations()

		var that = this;
		$(this.about.img_real).hover(
			function () {
				console.log('hovering...', that.about.img_emoji);
				$(that.about.img_emoji).css('opacity', '1')
				$(that.about.img_real).css('opacity', '0')
			},
			function () {
				$(that.about.img_emoji).css('opacity', '0')
				$(that.about.img_real).css('opacity', '1')
			}
		)
	}

	animations() {
		let controller = new ScrollMagic.Controller();

		$('.animate-single').each(function () {
			let tlAnimaText = new TimelineMax()
				.staggerFrom($(this), 1.85, { opacity: 0, y: 60, ease: Power3.easeOut }, 0.15);

			let scene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: .7
			})
				.reverse(false)
				.setTween(tlAnimaText)
				.addTo(controller);
		})

		const tlHeadshot = new TimelineMax()
			.from('.headshot img', 1.85, { opacity: 0, x: '120%', y: 150, ease: Power3.easeOut }, 0.15);
		new ScrollMagic.Scene({
			triggerElement: '.headshot img',
			triggerHook: .7
		})
			.reverse(false)
			.setTween(tlHeadshot)
			.addTo(controller);

		new SplitText('.animate-years', { type: "chars", charsClass: "charChild" });
		const tlYears = new TimelineMax()
			.staggerFrom('.animate-years .charChild', 1.85, { opacity: 0, y: 150, ease: Power3.easeOut }, 0.30);
		new ScrollMagic.Scene({
			triggerElement: '.animate-years',
			triggerHook: .7
		})
			.reverse(false)
			.setTween(tlYears)
			.addTo(controller);

		const tlEmoji = new TimelineMax()
			.from('.animate-years img', 1.5, { y: 390, ease: Power3.easeIn });
		new ScrollMagic.Scene({
			triggerElement: '.animate-years',
			triggerHook: .7
		})
			.reverse(false)
			.setTween(tlEmoji)
			.addTo(controller);

		$('.animate').each(function () {
			new SplitText($(this), { type: "lines", linesClass: "lineChild" });
			new SplitText($(this), { type: "lines", linesClass: "lineParent" });
			let tlAnimaText = new TimelineMax()
				.staggerFrom($(this).find('.lineChild'), 1.85, { opacity: 0, y: 60, ease: Power3.easeOut }, 0.15);

			let scene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: .7
			})
				.reverse(false)
				.setTween(tlAnimaText)
				.addTo(controller);
		})
	}

	setters() {
		this.titleHeader = this.contentPage.querySelectorAll('.header-about__title h1 ')
		new SplitText(this.titleHeader, { type: "lines", linesClass: 'wrap' })
		new SplitText($(this.titleHeader).find('.wrap'), { type: "lines", linesClass: 'wrapped' })
		TweenMax.set($(this.titleHeader).find('.wrapped'), { yPercent: 140 })
		TweenMax.staggerTo($(this.titleHeader).find('.wrapped'), 1.8, { yPercent: 0, ease: Power3.easeOut }, 0.25)
		TweenMax.delayedCall(1.5, () => {
			$('.shape-overlays').find('path').removeAttr("d");
			TweenMax.to('body', .1, { delay: 1, backgroundColor: `#000` })
		})

		$(this.about.footer).addClass('dark-footer')
	}

	goSwitch(switchColor) {
		let that = this
		$('.shape-overlays').find('path').removeAttr("d")
		let $pathOverlay0 = $('.shape-overlays path').eq(0),
			$pathOverlay1 = $('.shape-overlays path').eq(1)
		let swiftColor

		swiftColor = switchColor

		TweenMax.set([$pathOverlay0, $pathOverlay1], { fill: swiftColor })
		overlay.toggle()


		TweenMax.delayedCall(1, () => {
			$('.shape-overlays').find('path').removeAttr("d");
			that.opt.animating = false
		})

	}

	//? - =========================  SWITCH MODE  ========================= -//
	//? - =========================  SWITCH MODE  ========================= -//
	switchMode() {
		let that = this
		$(this.about.night).click(function () {
			if (!that.opt.animating) {
				$(this).css('pointer-events', 'none')
				$(that.about.sun).css('pointer-events', 'auto')
				that.opt.animating = true
				$(that.about.footer).removeClass('dark-footer')
				$(that.about.t_switch).addClass('t-white')
				$('.page__close').removeClass('bd-black')
				$(that.about.redact).addClass('redact-dark')
				$(that.about.icons).addClass('svg-path-white')
				$([that.menu.main, that.menu.bg, that.menu.trg, that.logomain]).removeClass(`menu-dark`)
				$(that.about.code).add(that.about.mom).addClass('e-black')
				TweenMax.to('body', .1, { delay: .9, backgroundColor: `#000` })
				that.goSwitch("#000", '#fff')
			}
		});

		$(this.about.sun).click(function () {
			if (!that.opt.animating) {
				$(this).css('pointer-events', 'none')
				$(that.about.night).css('pointer-events', 'auto')
				that.opt.animating = true
				$(that.about.footer).addClass('dark-footer')
				$(that.about.t_switch).removeClass('t-white')
				$('.page__close').addClass('bd-black')
				$(that.about.redact).removeClass('redact-dark')
				$(that.about.icons).removeClass('svg-path-white')
				$([that.menu.main, that.menu.bg, that.menu.trg, that.logomain]).addClass(`menu-dark`)
				$(that.about.code).add(that.about.mom).removeClass('e-black')
				TweenMax.to('body', .1, { delay: .9, backgroundColor: `#fff` })
				that.goSwitch("#fff")
			}
		});
	}

	//? - =========================  THIS INTERSECT  ========================= -//
	//? - =========================  THIS INTERSECT  ========================= -//
	intersect() {
		const options = {
			rootMargin: '-30%'
		}

		// wrapped
		/* this.getsplit = this.contentPage.querySelectorAll('.js-wrap p, .js-wrap h6, .js-wrap h2 ')
		new SplitText(this.getsplit, { type: "lines", linesClass: 'wrap' })
		new SplitText($(this.getsplit).find('.wrap'), { type: "lines", linesClass: 'wrapped' })
		TweenMax.set($(this.getsplit).find('.wrapped'), { yPercent: 140 })


		// each  wrapped
		let observerReveal = new IntersectionObserver((entries, observerReveal) => {
			entries.forEach((el) => {
				if (!el.isIntersecting) { return; }
				TweenMax.staggerTo($(el.target).find('.wrapped'), 1.8, { yPercent: 0, ease: Power3.easeOut }, 0.25)
				observerReveal.unobserve(el.target)
			})
		}, options)
		this.getsplit.forEach((el) => { observerReveal.observe(el) })

		let tlCode = new TimelineMax({ paused: true }).staggerFrom(`.code h1, .code__items__line`, 1.8, { y: 100, opacity: 0, ease: Power3.easeOut }, 0.25)
		let observerCode = new IntersectionObserver((entries, observerCode) => {
			entries.forEach((el) => {
				if (!el.isIntersecting) { return; }
				tlCode.play()
				observerCode.unobserve(el.target)
			})
		}, options)
		this.contentPage.querySelectorAll('.code').forEach((el) => { observerCode.observe(el) })

		window.dispatchEvent(new Event('resize')); */
		this.onHovers()
	}

	onHovers() {
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
				//TweenMax.to($borderCursor, .5, { scale: .5, ease: Power3.easeOut })
			});
	}

}

export const about = new About()