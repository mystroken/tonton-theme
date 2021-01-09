import { overlay } from './overlaySvg.js'
import { TimelineMax, TweenMax } from 'gsap'
import SplitText from 'gsap/SplitText.js'
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
			img_real: this.contentPage.querySelectorAll('.tt_real'),
		}

		this.opt = {
			animating: false
		}
		this.setters()
		this.intersect()
		this.switchMode()
	}

	setters() {
		this.titleHeader = this.contentPage.querySelectorAll('.header-about__title h1 ')
		new SplitText(this.titleHeader, { type: "lines", linesClass: 'wrap' })
		new SplitText($(this.titleHeader).find('.wrap'), { type: "lines", linesClass: 'wrapped' })
		TweenMax.set($(this.titleHeader).find('.wrapped'), { yPercent: 140 })
		TweenMax.staggerTo($(this.titleHeader).find('.wrapped'), 1.8, { yPercent: 0, ease: Power3.easeOut }, 0.25)
		TweenMax.delayedCall(1.5, () => {
			$('.shape-overlays').find('path').removeAttr("d");
			TweenMax.to('body', .1, { delay: 1, backgroundColor: `#fff` })
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
				$(that.about.img_real).css('opacity', '1')
				that.opt.animating = true
				$(that.about.footer).removeClass('dark-footer')
				$(that.about.t_switch).addClass('t-white')
				$(that.about.redact).addClass('redact-dark')
				$(that.about.icons).addClass('svg-path-white')
				$(that.about.code).add(that.about.mom).addClass('e-black')
				TweenMax.to('body', .1, { delay: .9, backgroundColor: `#000` })
				that.goSwitch("#000", '#fff')
			}
		});

		$(this.about.sun).click(function () {
			if (!that.opt.animating) {
				$(this).css('pointer-events', 'none')
				$(that.about.night).css('pointer-events', 'auto')
				$(that.about.img_real).css('opacity', '0')
				that.opt.animating = true
				$(that.about.footer).addClass('dark-footer')
				$(that.about.t_switch).removeClass('t-white')
				$(that.about.redact).removeClass('redact-dark')
				$(that.about.icons).removeClass('svg-path-white')
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
		this.getsplit = this.contentPage.querySelectorAll('.js-wrap p, .js-wrap h6 ')
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

		window.dispatchEvent(new Event('resize'));
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