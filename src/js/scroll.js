import { archived } from "./archived"

let homeAppeared = false;

class Smooth {
	constructor() {
	}

	//? - =========================  SINGLE  ========================= -//
	//? - =========================  SINGLE  ========================= -//
	isSingle(scrolled) {
		const h = window.innerHeight
		const homeStick = document.querySelector('.home-page__text')

		// ___________________________________ TEXT HOME PAGE STICKED
		if ($(homeStick).length > 0) {
			// Here we want to fix the texbox
			// all the time the image is visible.
			// The technique is :
			// As soon as the image enters in view, we
			// fix the position of the textbox.
			const triggerStickHome = document.querySelector('.home-page__image')
			const realeaseHomeStick = document.querySelector('.js-release-text-home-page')
			const imageBoundingRect = triggerStickHome.getBoundingClientRect()
			const textBlockBoundingRect = homeStick.getBoundingClientRect()
			const realeaseHomeStickTop = realeaseHomeStick.getBoundingClientRect().top
			const imageTop = imageBoundingRect.top

			let top = imageTop - h
			let bottom = realeaseHomeStickTop
			// top<0 && bottom>0
			if (top < 0 && bottom > 0) {
				const scroll = Math.abs(top).toFixed(3) - textBlockBoundingRect.height
				homeStick.style.transform = `translate3d(0, ${scroll}px, 0)`
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
		if ($('.footer').length > 0) {
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
	}

	//? - =========================  SCROLL  ========================= -//
	//? - =========================  SCROLL  ========================= -//
	bindMethods() {
		['scroll', 'run', 'resize']
			.forEach((fn) => this[fn] = this[fn].bind(this))
	}

	setStyles() {
		this.dom.el.style.position = 'fixed'
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
