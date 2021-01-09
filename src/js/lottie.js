
let imagesLoaded = require('imagesloaded');
let $ = require('jquery');
import { TimelineMax, TweenMax } from 'gsap'
import ScrollMagic from 'scrollmagic'
import lottie from 'lottie-web'
import dataJson from './data.json'
import { home } from './home';
import { scroll } from './scroll';

class Lottie {
	constructor() {
		return;
	}

	init(scroll) {
		// vars
		this.lottie = {
			main: document.querySelector('.e-lottie'),
			ctn: document.querySelector('.lottie-ctn'),
			expand: document.querySelector('.e-lottie__circ-expand'),
			fader: document.querySelector('.e-lottie__fader'),
		}

		this.mobileScale = 100

		if (window.innerWidth < 1025) { this.mobileScale = 150 }

		// instance
		this.lottieAnima = lottie.loadAnimation({
			container: this.lottie.ctn,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData: dataJson
		});

		TweenMax.set('.logo-main, .trg-menu, .bg-menu, .gooey__hold, #cursor', { scale: 0 })

		// animaHeader
		this.tlAfterLottie = new TimelineMax({ paused: true, delay: .9 })
			.staggerFromTo('.page-home header .wrapped', 2, { yPercent: this.mobileScale }, { yPercent: 0, ease: Expo.easeOut }, 0.15)
			.fromTo('.page-home header .line', 2, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', ease: Expo.easeOut }, 0)
			.fromTo('.logo-main, .trg-menu, .bg-menu, .gooey__hold, #cursor', 2, { scale: 0 }, { scale: 1, ease: Expo.easeOut }, 0)
		this.onAnima()
	}

	//? - =========================  ANIMA  ========================= -//
	//? - =========================  ANIMA  ========================= -//
	onAnima() {
		let that = this

		this.lottieAnima.addEventListener('complete', lottieComnpleted)
		function lottieComnpleted() {
			TweenMax.to(that.lottie.expand, .5, { opacity: 1 })
			that.tlAfterLottie.play()
			TweenMax.to(that.lottie.expand, .45, {
				delay: .6, scale: 16, opacity: 1, ease: 'power4.in', onComplete: () => {
					that.lottieDone()
				}
			})
		}

		//? - =========================  PRELOAD  ========================= -//
		//? - =========================  PRELOAD  ========================= -//
		imagesLoaded.makeJQueryPlugin($);
		let i = 0, $imgClass = $('.img-load'), imgLoad = imagesLoaded('.img-load')

		//* -------------- Preloader 
		$imgClass.imagesLoaded()
			.always(function (instance) {
				TweenMax.set(that.lottie.ctn, { opacity: 1 })
				that.lottieAnima.play()
			})
	}

	//? - =========================  LOTTIE DONE  ========================= -//
	//? - =========================  LOTTIE DONE  ========================= -//
	lottieDone() {
		$(this.lottie.main).remove()
		//home.init(document.querySelector('.page-home'))
		home.firstEntrance(document.querySelector('.page-home'))
		home.mainAnimations(ScrollMagic)
		//scroll.init()
		TweenMax.set('body', { overflowY: 'auto' })
	}
}
export const lottiejs = new Lottie()