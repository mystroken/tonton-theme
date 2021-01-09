const scrollJs = function () {
	let h = window.innerHeight
	let hPercent = (h / 100)
	let margTop = hPercent * 20

	//* --------------------------------------- MOVE PIXI
	//* --------------------------------------- MOVE PIXI
	let $webGL = document.querySelector('#webgl'), $linksFolio, initialDistanceLinksFolio

	if ($('.header-home').length > 0) {
		$linksFolio = document.querySelector('.links-folio')
		initialDistanceLinksFolio = $linksFolio.getBoundingClientRect().top
		//TweenMax.set($webGL, { y: h })
	}

	//? - =========================  FOOTER  ========================= -//
	//? - =========================  FOOTER  ========================= -//
	/*
	let $faderFooter = document.querySelector('.footer__fader')
	let $footer = document.querySelector('.footer')
	let distanceFooter = $footer.getBoundingClientRect().top
	let heightFooter = distanceFooter + h
	let totalFaderFooter = heightFooter - distanceFooter*/

	//? - =========================  SINGLE  ========================= -//
	//? - =========================  SINGLE  ========================= -//
	let $homeStick, $realeaseHomeStick, $triggerStickHome
	if ($('.header-single').length > 0) {
		$homeStick = $('.home-page__text.e-fixed')[0]
		$triggerStickHome = $('.home-page__image')[0]
		$realeaseHomeStick = document.querySelector('.js-release-text-home-page')
	}

	//? - =========================  scrollAnima  ========================= -//
	//? - =========================  scrollAnima  ========================= -//
	function scrollAnima(scrolled) {
		//* --------------------------------------- HOME
		if ($('.header-home').length > 0) {
			let dynaDistanceLinksFolio = document.querySelector('.links-folio').getBoundingClientRect().top
			//TweenMax.set($webGL, { y: scrolled})
			if (dynaDistanceLinksFolio < h) {
				//TweenMax.set($webGL, { y: - ((scrolled) - initialDistanceLinksFolio) })
			}
		}

		//* --------------------------------------- SINGLE
		if ($('.header-single').length > 0) {
			//let scrollWebgl = document.querySelector('.header-single').getBoundingClientRect().top
			// ___________________________________ MOVE WEBGL
			//TweenMax.set($webGL, { y: - (scrollWebgl * -1)})

			// ___________________________________ TEXT HOME PAGE STICKED
			if ($($triggerStickHome).length > 0) {
				let distanceSectionPin = $triggerStickHome.getBoundingClientRect().top
				let distanceSectionRelease = $realeaseHomeStick.getBoundingClientRect().top
				if (distanceSectionPin < 0 && distanceSectionRelease > h) {
					TweenMax.set($homeStick, { position: 'fixed', top: scrolled, ease: Linear.easeNone })
				}
			}
		} //Close Responsive

		let sizeDocument = $('[data-scroll-content]').height()
		if ($(window).width() > 1024) {
			if (scrolled > sizeDocument - (h * 2)) {
				let percentageFromTop = ((sizeDocument - h) - scrolled) / h
				//console.log(percentageFromTop)
				TweenMax.set($footer, { y: - (h * percentageFromTop) })
				TweenMax.set($footer, { yPercent: (30 * percentageFromTop) })
			}
		}

		if (scrolled < 10) {
			$('html').addClass('is-top')
		} else {
			$('html').removeClass('is-top')
		}
	}// CLOSE ANIMA SCROLL

	//? - =========================  SMOOTH SCROLL  ========================= -//
	//? - =========================  SMOOTH SCROLL  ========================= -//
	const math = {
		lerp: (a, b, n) => {
			return (1 - n) * a + n * b
		},
		norm: (value, min, max) => {
			return (value - min) / (max - min)
		}
	}

	const config = {
		height: window.innerHeight,
		width: window.innerWidth
	}

	class Smooth {
		constructor() {
			this.bindMethods()

			this.data = {
				ease: 0.065,
				current: 0,
				last: 0
			}

			this.dom = {
				el: document.querySelector('[data-scroll]'),
				content: document.querySelector('[data-scroll-content]')
			}

			this.rAF = null

			this.init()
		}

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
			this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)
			this.data.last = Math.floor(this.data.last * 100) / 100

			const diff = this.data.current - this.data.last
			const acc = diff / config.width
			const velo = + acc

			this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0)`

			scrollAnima(this.data.last)
			this.requestAnimationFrame()
		}

		on(requestAnimationFrame = true) {
			this.setStyles()
			this.setHeight()
			this.addEvents()

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
			document.body.style.height = ''

			this.data = null

			this.removeEvents()
			this.cancelAnimationFrame()
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

		init() {
			this.on()
		}
	}
	const smooth = new Smooth()
} //close scroll

module.exports = {
	scrollJs
}