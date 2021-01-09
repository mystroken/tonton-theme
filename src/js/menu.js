
import { Expo, Power3, TweenMax } from 'gsap'

class Menu {
	constructor() {
		return;
	}

	// ----------------- 	INIT
	init(Barba) {
		this.barba = Barba
		this.logomain = document.querySelector('.logo-main ')
		this.menu = {
			main: document.querySelector('.menu-fs '),
			trg: document.querySelector('.trg-menu'),
			bg: document.querySelector('.bg-menu'),
			bgwhite: document.querySelector('.bg-menu__white'),
			eachlink: document.querySelectorAll('.menu-fs .wrapped'),
			open: document.querySelectorAll('.trg-menu__open'),
			close: document.querySelectorAll('.trg-menu__close'),
			inter_link: document.querySelectorAll('.link-menu'),
		}

		this.opt = {
			open: false,
			animating: false
		}
		TweenMax.set([this.menu.main, this.menu.close], { autoAlpha: 0 })
		TweenMax.set(this.menu.eachlink, { yPercent: 100 })
		TweenMax.set('.modal-zoom, #main-archived', { autoAlpha: 0 })

		$('.menu-fs__social-right__each-r:last-child a').addClass('t-black')

		this.onClick()
		this.onHover()
	}


	closeMenu() {
		let that = this
		that.opt.open = false
		that.opt.animating = true

		$('html').removeClass('is-menuOpen')
		TweenMax.staggerTo($(that.menu.close), .35, { autoAlpha: 0, ease: Power3.easeIn }, .1)
		TweenMax.fromTo(that.menu.eachlink, .6, { yPercent: 0 }, { yPercent: -100, ease: Expo.easeIn })
		TweenMax.fromTo(that.menu.bgwhite, 1, { scale: 66 }, {
			delay: .7, scale: 1, ease: Expo.easeOut, onComplete: () => {
				TweenMax.set(that.menu.main, { autoAlpha: 0 })
				that.opt.animating = false
				TweenMax.staggerTo($(that.menu.open).find('.line'), .35, { autoAlpha: 1, scaleX: 1, transformOrigin: 'left', ease: Power3.easeIn }, .1)
				TweenMax.set('body', { overflowY: 'auto' })
			}
		})
	}

	// ----------------- 	ONCLICK
	onClick() {
		let that = this
		$(this.menu.trg).click(function () {
			if (!that.opt.open && !that.opt.animating) {
				that.opt.open = true
				that.opt.animating = true
				TweenMax.set('body', { overflow: 'hidden' })
				TweenMax.staggerTo($(that.menu.open).find('.line'), .35, { autoAlpha: 0, scaleX: 0, transformOrigin: 'right', ease: Power3.easeIn }, .1)
				TweenMax.set(that.menu.main, { autoAlpha: 1 })
				TweenMax.fromTo(that.menu.bgwhite, 1, { scale: 1 }, { scale: 66, ease: Expo.easeIn })
				TweenMax.to(that.menu.close, 1, { delay: 1.5, autoAlpha: 1 })
				TweenMax.staggerFromTo(that.menu.eachlink, 1.8, { yPercent: 100 }, {
					delay: .9, yPercent: 0, ease: Expo.easeOut, onComplete: () => {
						that.opt.animating = false
					}
				}, .08)
				$('html').addClass('is-menuOpen')
			}
		})
		// click menu

		$(this.menu.inter_link).click(function () {
			let thisLinks = $(this).attr('href')
			//that.barba.Pjax.goTo(thisLinks)
			that.closeMenu()
		})

		$(that.menu.close).click(function () {
			that.closeMenu()
		})

		$(this.logomain).click(function () {
			if ($('html').hasClass('is-menuOpen')) {
				that.closeMenu()
			}
		})
	}

	//? - =========================  ANIMATRG  ========================= -//
	//? - =========================  ANIMATRG  ========================= -//
	animaTrg() {
		let that = this
		if (!that.opt.ishovering) {
			that.opt.ishovering = true
			TweenMax.staggerTo($(that.menu.open).find('.line'), .35, { scaleX: 0, transformOrigin: 'right', ease: Power3.easeIn }, .1)
			TweenMax.staggerTo($(that.menu.open).find('.line'), .5, {
				delay: .35, scaleX: 1, transformOrigin: 'left', ease: Power3.easeOut, onComplete() {
					that.opt.ishovering = false;
				}
			}, .1)
		}
	}

	//? - =========================  hover  ========================= -//
	//? - =========================  hover  ========================= -//
	onHover() {
		let that = this

		$(this.menu.trg).mouseenter(function () {
			that.animaTrg()
		})

		$(this.menu.close).mouseenter(function () {
			if (!that.opt.ishovering) {
				that.opt.ishovering = true
				TweenMax.staggerTo($(that.menu.close).find('.line'), .35, { scaleX: 0, transformOrigin: 'center center', ease: Power3.easeIn }, .1)
				TweenMax.staggerTo($(that.menu.close).find('.line'), .5, {
					delay: .35, scaleX: 1, transformOrigin: 'center center', ease: Power3.easeOut, onComplete() {
						that.opt.ishovering = false;
					}
				}, .1)
			}
		})
	}

	activeDarkMenu() {
		$([this.menu.main, this.menu.bg, this.menu.trg, this.logomain]).addClass(`menu-dark`)
	}

	disactiveDarkMenu() {
		$([this.menu.main, this.menu.bg, this.menu.trg, this.logomain]).removeClass(`menu-dark`)
	}
}

export const menufs = new Menu()
