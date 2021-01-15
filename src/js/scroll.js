import { archived } from "./archived"

class Smooth {
	constructor() {
	}

	//? - =========================  FOOTER PARALLAX  ========================= -//
	//? - =========================  FOOTER PARALLAX  ========================= -//
	isSingle(scrolled) {
		let h = window.innerHeight
		//? - =========================  SINGLE  ========================= -//
		//? - =========================  SINGLE  ========================= -//
		let $homeStick, $realeaseHomeStick, $triggerStickHome
		$homeStick = $('.home-page__text.e-fixed')[0]
		$triggerStickHome = $('.home-page__image')[0]
		$realeaseHomeStick = document.querySelector('.js-release-text-home-page')

		// ___________________________________ TEXT HOME PAGE STICKED
		if ($($triggerStickHome).length > 0) {
			let distanceSectionPin = $triggerStickHome.getBoundingClientRect().top
			let distanceSectionRelease = $realeaseHomeStick.getBoundingClientRect().top
			if (distanceSectionPin < 0 && distanceSectionRelease > h) {
				TweenMax.set($homeStick, { position: 'fixed', top: scrolled, ease: Linear.easeNone })
			}
		}
	}

	//? - =========================  SINGLE PARALLAX  ========================= -//
	//? - =========================  SINGLE PARALLAX  ========================= -//
	singleParallax(scrolled) {
		const $parallaxBackground = document.querySelector('.parallax__bg')
		if ($($parallaxBackground).length > 0) {
			$parallaxBackground.style.transform = `translate3d(0, ${scrolled}px, 0)`
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
			if (scrolled > sizeDocument - (h * 2)) {
				let percentageFromTop = ((sizeDocument - h) - scrolled) / h
				//console.log(percentageFromTop)
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
