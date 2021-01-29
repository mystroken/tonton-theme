import { archived } from "./archived"

let homeAppeared = false;

class Smooth {
	constructor() {
	}

	//? - =========================  FOOTER PARALLAX  ========================= -//
	//? - =========================  FOOTER PARALLAX  ========================= -//
	isSingle(scrolled) {
		//console.log(scrolled)
		let h = window.innerHeight
		//? - =========================  SINGLE  ========================= -//
		//? - =========================  SINGLE  ========================= -//
		let $homeStick, $realeaseHomeStick, $triggerStickHome
		$homeStick = $('.home-page__text.e-fixed')[0]
		$triggerStickHome = $('.home-page__image')[0]
		$realeaseHomeStick = document.querySelector('.js-release-text-home-page')
		const homeVisible = $('.home-page__text.e-fixed .lineChild').css('opacity') === '1';

		// ___________________________________ TEXT HOME PAGE STICKED
		if ($($triggerStickHome).length > 0) {
			const imageTop = $triggerStickHome.getBoundingClientRect().top - 66;
			let distanceSectionPin = $triggerStickHome.getBoundingClientRect().top - h;
			let distanceSectionRelease = $realeaseHomeStick.getBoundingClientRect().top
			const textBlockTop = $homeStick.getBoundingClientRect().top;
			//console.log($triggerStickHome.getBoundingClientRect().top, $realeaseHomeStick.getBoundingClientRect().top);
			if (distanceSectionPin < 0 && distanceSectionRelease > h) {
				// scroll + window height - padding top - height - padding bottom
				let scrollOffset = parseInt(scrolled) + h - 125 - $('.home-page__text.e-fixed').height() - 86;
				TweenMax.set($homeStick, { position: 'fixed', top: scrollOffset, ease: Linear.easeNone })
				//h - $('.home-page__image').height() - 86
			}
		}
	}

	//? - =========================  SINGLE PARALLAX  ========================= -//
	//? - =========================  SINGLE PARALLAX  ========================= -//
	singleParallax(scrolled) {
		const h = window.innerHeight
		const $parallaxContainer = document.querySelectorAll('.parallax')

		if ($($parallaxContainer).length > 0) {
			$parallaxContainer.forEach(container => {
				const paddingTop = 325;
				const { top, height, bottom } = container.getBoundingClientRect()
				/* const bgScaleMin = 2
				const bgScaleMaxToAdd = -1 */
				const bgScaleMin = 1.3
				const bgScaleMaxToAdd = -.3

				// When positive,
				// The section is below the screen.
				// When Negative,
				// The section is in view
				// Until
				// -height
				// console.log((top + paddingTop)-h)
				const computedTop = (top + paddingTop) - h
				const inView = (computedTop < 0 && bottom > 0)
				const scrollableMax = (height + h) - paddingTop
				const currentScrolled = -1 * computedTop
				const scale = (inView) ? Number(bgScaleMin + (bgScaleMaxToAdd * Number(currentScrolled / scrollableMax).toFixed(3))).toFixed(3) : bgScaleMin
				const opacity = (inView) ? 1 : 0

				const $parallaxBackground = container.querySelector('.parallax__bg')
				if ($($parallaxBackground).length > 0) {
					$parallaxBackground.style.transform = `translate3d(0, ${scrolled}px, 0) scale(${scale})`
					$parallaxBackground.style.opacity = opacity
				}
			})
		}
	}

	//? - =========================  FOOTER PARALLAX  ========================= -//
	//? - =========================  FOOTER PARALLAX  ========================= -//
	footerParallax(scrolled) {
		let h = window.innerHeight
		let hPercent = (h / 100)
		let margTop = hPercent * 20
		let $faderFooter = document.querySelector('.footer__fader')
		let $footer = document.querySelector('.footer')
		let distanceFooter = $footer.getBoundingClientRect().top
		let heightFooter = distanceFooter + h
		let totalFaderFooter = heightFooter - distanceFooter

		let sizeDocument = $('[data-scroll-content]').height()
		if ($(window).width() > 1024) {
			if (scrolled - 100 > sizeDocument - (h * 2)) {
				let percentageFromTop = ((sizeDocument - h) - scrolled) / h
				// console.log(percentageFromTop)
				TweenMax.set($footer, { y: - (h * percentageFromTop) })
				TweenMax.set($footer, { yPercent: (30 * percentageFromTop) })
			}
		}

		window.innerWidth < 1024 ? scrolled = window.scrollY : null
		if (scrolled < 10) {
			$('html').addClass('is-top')
		} else {
			$('html').removeClass('is-top')
		}
	}

	//? - =========================  SCROLL  ========================= -//
	//? - =========================  SCROLL  ========================= -//
	bindMethods() {
		['scroll', 'run', 'resize']
			.forEach((fn) => this[fn] = this[fn].bind(this))
	}

	setStyles() {
		this.dom.el.style.position = 'fixed';
		this.dom.el.style.top = 0;
		this.dom.el.style.left = 0;
		this.dom.el.style.height = '100%'
		this.dom.el.style.width = '100%'
		this.dom.el.style.overflow = 'hidden'
	}

	setHeight() {
		document.body.style.height = `${this.dom.content.offsetHeight}px`
	}

	resize() {
		this.setHeight()
		this.scroll()
		this.footerParallax(this.data.last.toFixed(0))
	}

	scroll() {
		this.data.current = window.scrollY
	}

	run() {
		this.data.last = this.math.lerp(this.data.last, this.data.current, this.data.ease)
		this.data.last = Math.floor(this.data.last * 100) / 100

		const diff = this.data.current - this.data.last
		const acc = diff / this.config.width
		const velo = + acc

		this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0)`

		//! - =========================  conditions  ========================= -//
		if (this.isPage === 'single' && window.innerWidth > 1024) {
			this.isSingle(this.data.last.toFixed(0))
			this.singleParallax(this.data.last.toFixed(0))
		}

		if (this.isPage === 'archived' && window.innerWidth > 1024) {
			if (!this.once) {
				archived.init(this.contentPage)
				this.once = true
			}
			if (window.innerWidth > 1024) {
				archived.onScroll(this.data.last, velo, diff)
			}
		}
		else {
			this.footerParallax(this.data.last.toFixed(0))
		}

		this.requestAnimationFrame()
	}

	on(requestAnimationFrame = true) {
		if (window.innerWidth > 1024) {
			this.setStyles()
			this.setHeight()
			this.addEvents()
		}
		requestAnimationFrame && this.requestAnimationFrame()
	}

	off(cancelAnimationFrame = true) {
		cancelAnimationFrame && this.cancelAnimationFrame()
		this.removeEvents()
	}

	requestAnimationFrame() {
		this.rAF = requestAnimationFrame(this.run)
	}

	cancelAnimationFrame() {
		cancelAnimationFrame(this.rAF)
	}

	destroy() {
		this.off()
		document.body.style.height = ''
		this.data = null
	}

	resize() {
		this.setHeight()
	}

	addEvents() {
		window.addEventListener('resize', this.resize, { passive: true })
		window.addEventListener('scroll', this.scroll, { passive: true })
	}

	removeEvents() {
		window.removeEventListener('resize', this.resize, { passive: true })
		window.removeEventListener('scroll', this.scroll, { passive: true })
	}

	init(isPage, once, contentPage) {
		this.contentPage = contentPage
		this.isPage = isPage
		this.once = once

		this.isPage = isPage
		this.math = {
			lerp: (a, b, n) => {
				return (1 - n) * a + n * b
			},
			norm: (value, min, max) => {
				return (value - min) / (max - min)
			}
		}

		this.config = {
			height: window.innerHeight,
			width: window.innerWidth
		}

		this.bindMethods()
		this.data = {
			// ease: 0.045,
			ease: 0.08,
			current: 0,
			last: 0
		}

		this.dom = {
			el: document.querySelector('[data-scroll]'),
			content: document.querySelector('[data-scroll-content]')
		}

		this.rAF = null
		this.on()
	}
}

export const scroll = new Smooth()
