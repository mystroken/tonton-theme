
import { overlay } from './overlaySvg.js'
import { webglRender } from './webgl_class'
import { Power3 } from 'gsap'
import { menufs } from './menu.js'
class GooeyMenu {
	constructor() {
		return
	}

	//
	// INIT
	// ===========================================================================
	init() {
		TweenMax.set('body', { backgroundColor: '#000' })
		//var welcomeMessage  = 'Hello ' + (username || 'guest');
		this.gooey = {
			main: document.querySelector('.gooey'),
			general: $('.gooey__hold'),
			svg: $('#gooey'),
			sun: $('#sun > path'),
			moon: $('#moon'),
		}
		this.options = {
			animating: false,
			mode: 'dark',
			dark: '#000000',
			dark: '#ffffff'
		}

		this.onHover()
		this.onClick()
	}

	onHover() {
		TweenMax.set(this.gooey.svg, { scaleX: .12, transformOrigin: 'right' })
		TweenMax.set(this.gooey.moon, { opacity: .0 })

		let that = this
		let hoverSwift
		this.gooey.general.hover(function () {
			TweenMax.to(that.gooey.svg, .6, { scaleX: 1, ease: Power3.easeInOut })
			that.options.mode == 'dark' ? hoverSwift = '#000000' : hoverSwift = '#fff'
			TweenMax.to([that.gooey.sun, that.gooey.moon], 1, { fill: hoverSwift, ease: Power3.easeInOut })
		}, function () {
			TweenMax.to(that.gooey.svg, .6, { scaleX: .12, ease: Power3.easeInOut })
			that.options.mode == 'dark' ? hoverSwift = '#ffffff' : hoverSwift = '#000000'
			TweenMax.to([that.gooey.sun, that.gooey.moon], .6, { fill: hoverSwift, ease: Power3.easeInOut })

		});
	}

	onClick() {
		let $pathOverlay0 = $('.shape-overlays path').eq(0),
			$pathOverlay1 = $('.shape-overlays path').eq(1)
		let that = this
		let swiftColor, swiftBg

		this.gooey.general.click(function () {
			if (!that.options.animating) {
				that.options.animating = true
				TweenMax.set(that.gooey.general, { pointerEvents: 'none' })
				TweenMax.to(that.gooey.general, .4, { autoAlpha: 0 })
				that.options.mode == 'dark' ? that.options.mode = 'light' : that.options.mode = 'dark'
				if (that.options.mode == 'dark') {
					swiftColor = '#000000'
					swiftBg = '#ffffff'
					that.switchColors('light', swiftBg, swiftColor)
					menufs.disactiveDarkMenu()
				}
				else {
					swiftColor = '#ffffff'
					swiftBg = '#000000'
					that.switchColors('dark', swiftBg, swiftColor)
					menufs.activeDarkMenu()
				}
				TweenMax.set([$pathOverlay0, $pathOverlay1], { fill: swiftColor })
				overlay.toggle()

				TweenMax.delayedCall(1, () => {
					that.options.mode == 'light' ? that.options.mode = 'light' : that.options.mode = 'dark'
					that.options.mode == 'light' ? TweenMax.set(that.gooey.moon, { opacity: 1 }) && TweenMax.set(that.gooey.sun, { opacity: 0 }) : TweenMax.set(that.gooey.moon, { opacity: 0 }) && TweenMax.set(that.gooey.sun, { opacity: 1 })

					TweenMax.set('body', { backgroundColor: swiftColor })
					TweenMax.to(that.gooey.svg, .5, { fill: swiftBg })
					TweenMax.to(that.gooey.sun, .5, { fill: swiftBg })

					$('.shape-overlays').find('path').removeAttr("d")
					that.options.animating = false
					TweenMax.to(that.gooey.general, .5, { pointerEvents: 'auto', autoAlpha: 1 })
				})
			}

		})
	}

	switchColors(mode, swiftColor, swiftBg) {
		let $btnSwitchDark = $('.switch-dark'),
			$btnSwitchLight = $('.switch-light'),
			$tSwitch = $('.t-switch'),
			$eSwitch = $('.e-switch'),
			$tSwitchGray = $('.t-switch-gray'),
			$eSwitchGray = $('.e-switch-gray'),
			timeSwitch = .8,
			videoSource = $('.about video').attr('src'),
			$video = $('.about video');

		TweenMax.to($tSwitch, timeSwitch, { color: swiftColor, ease: Power3.easeInOut })
		//TweenMax.to($eSwitch, timeSwitch, { backgroundColor: swiftColor, ease: Power3.easeInOut })
		TweenMax.to('.awards', timeSwitch, { backgroundColor: swiftBg, ease: Power3.easeInOut })
		//TweenMax.to('.svg-logo path', timeSwitch, { fill: swiftColor, ease: Power3.easeInOut })
		TweenMax.to('footer .t-switch', timeSwitch, { color: swiftBg, ease: Power3.easeInOut })
		TweenMax.to('footer ', timeSwitch, { backgroundColor: swiftColor, ease: Power3.easeInOut })
		TweenMax.to('footer .footer__fader, .gap-black', timeSwitch, { backgroundColor: swiftBg, ease: Power3.easeInOut })

		const videoWasPlaying = ($video.length === 1) ? !$video[0].paused : null;

		if (mode == 'light') {
			$('.barba-container').hasClass('page-home') ? webglRender.switchToWhite() : null
		}
		else {
			$('.barba-container').hasClass('page-home') ? webglRender.switchToBlack() : null
		}

		const replaceVideo = () => {
			const options = { delay: -.2, x: 0, opacity: 1, ease: Power3.easeOut };
			if (mode == 'light') {
				$video.attr('src', videoSource.replace('emoji-head-white', 'emoji-head'));
				options.transform = 'scale(.9)';
			} else {
				$video.attr('src', videoSource.replace('emoji-head', 'emoji-head-white'));
				options.transform = 'scale(1.3)';
			}
			if (videoWasPlaying) {
				$video[0].play();
			}
			TweenMax.to('.about video', 2.2, options)
		}

		if ($video.length === 1) {
			TweenMax.to('.about video', timeSwitch, { x: -350, opacity: 0, ease: Power3.easeOut, onComplete: replaceVideo })
		}
	}

	activeGooey() {
		TweenMax.to(this.gooey.main, .6, { autoAlpha: 1 })
	}

	disactiveGooey() {
		TweenMax.to(this.gooey.main, .6, { autoAlpha: 0 })
	}
}
export const gooeymenu = new GooeyMenu()