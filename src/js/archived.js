import { Expo, TweenMax } from "gsap"

class Archived {
	constructor() {
		return
	}

	//
	// INIT
	// ===========================================================================
	init(contentPage) {
		this.contentPage = contentPage
		this.h = window.innerHeight
		this.dom = {
			main: document.querySelector("#main-archived"),
			view: document.querySelector("#view-archived"),
			imgs: document.querySelectorAll('.js-img'),
			each: $('.gallery__img'),
			titles: this.contentPage.querySelectorAll('h1'),
			gallery: this.contentPage.querySelector('.gallery'),
			travel: this.contentPage.querySelector('.gallery__travel'),
			imgsGallery: this.contentPage.querySelectorAll('.gallery__each img'),
			plx: this.contentPage.querySelectorAll('[data-plx="on"]')
		}

		TweenMax.to(this.dom.main, 1, { autoAlpha: 1 })
		this.bgs = []
		this.filters = []
		this.visibles = []
		this.render()
		this.renderWords()
		this.renderTextures()
	}
	//
	// render PIXI
	// ===========================================================================
	render() {
		this.app = new PIXI.Application({
			width: this.dom.main.clientWidth,
			height: this.dom.main.clientHeight - $('#main-archived .page-title').outerHeight(),
			antialias: true,
			transparent: true,
			view: this.dom.view
		});


		this.screen = this.app.screen;
		this.bgSize = new PIXI.Rectangle(0, 0, 1920, 1080);
		this.bgContainer = new PIXI.Container();
		this.ctnText = new PIXI.Container();
		this.bgContainerZ = new PIXI.Container();
		this.resized = true;
		this.updatePosition = true;

		this.app.stage.interactive = true;
		this.app.stage.filterArea = this.screen;
		this.app.stage.addChild(this.bgContainer, this.ctnText, this.bgContainerZ);
	}

	renderWords() {
		this.zoom()
	}

	//
	// each TEXTURE
	// ===========================================================================
	renderTextures() {
		let that = this
		this.dom.imgs.forEach(function (item) {
			let bgCreate = PIXI.Sprite.from(item.src);

			bgCreate.width = (window.innerWidth * 0.65) / 2.5
			bgCreate.height = (window.innerWidth * 0.49) / 2.5
			bgCreate.position.x = item.getBoundingClientRect().left
			bgCreate.position.y = item.getBoundingClientRect().top
			console.log(bgCreate.position);
			if (bgCreate.position.y < 100) {
				bgCreate.position.y = 100;
			}
			if (bgCreate.position.y + bgCreate.height > that.dom.view.height - 50) {
				bgCreate.position.y = that.dom.view.height - bgCreate.height - 50;
			}
			that.bgs.push(bgCreate)
			if (item.dataset.front == 2) {
				that.bgContainerZ.addChild(bgCreate);
			}
			else {
				that.bgContainer.addChild(bgCreate);
			}
		});

		var shaderFrag = document.querySelector("#shaderFrag").textContent;
		this.bgContainer.filterArea = this.screen;
		this.bgContainerZ.filterArea = this.screen;
		this.filter = new PIXI.Filter(null, shaderFrag);
		this.filter.uniforms.frequency = 8;
		this.filter.uniforms.amplitude = 0.0007;
		this.filter.uniforms.amplitudeY = 0.09;
		this.filter.uniforms.amplitudeX = 0;
		this.filter.uniforms.speed = 1.0;
		this.filter.uniforms.time = 0.0;
		this.filter.padding = 50;

		this.bgContainer.filters = [this.filter];
		this.bgContainerZ.filters = [this.filter];
	}

	onScroll(scrolled, velo, diff) {
		let that = this
		TweenMax.set(this.dom.gallery, { y: scrolled })
		TweenMax.set(this.dom.travel, { xPercent: -`${85 * (scrolled / (window.innerHeight * 12))} ` })


		this.dom.plx.forEach(function (el) {
			let plxVisible = el.getBoundingClientRect().left
			if (plxVisible < window.innerWidth && plxVisible > 0) {
				TweenMax.set(el, { x: `-=${diff / (window.innerWidth * 0.11)}` })
			}
		})

		this.dom.imgs.forEach(function (item, index) {
			let itemPosition = item.getBoundingClientRect().left
			if (itemPosition < (window.innerWidth * 1.5) && itemPosition > - (window.innerWidth * 1.5)) {
				that.bgs[index].position.x = itemPosition;
			}
		})
	}

	zoom() {
		this.modal = {
			general: $('.modal-zoom'),
			fader: $('.modal-zoom__fader'),
			img: $('.modal-zoom__img'),
			bg: $('.modal-zoom__bg'),
			close: $('.modal-zoom__close')
		}

		TweenMax.set(this.modal.general, { autoAlpha: 0 })
		let that = this
		this.dom.each.click(function () {
			console.log(that.modal.img)
			let srcThis = $(this).find('img').attr('src')
			let hrefThis = $(this).find('img').attr('data-dribbble-link')
			let nameThis = $(this).find('img').attr('data-name')
			that.modal.img.find('img').attr('src', srcThis)
			that.modal.img.find('a').attr('href', hrefThis)
			that.modal.img.find('span.name').text(nameThis)
			TweenMax.set(that.modal.general, { autoAlpha: 1 })
			TweenMax.fromTo(that.modal.fader, 1.8, { autoAlpha: 0 }, { autoAlpha: .7, ease: Expo.easeInOut })
			TweenMax.fromTo(that.modal.bg, 1.8, { scale: 0 }, { scale: 1, transformOrigin: 'center center', ease: Expo.easeInOut })
			TweenMax.fromTo(that.modal.img, 1.8, { autoAlpha: 0, yPercent: 10 }, { delay: 1, autoAlpha: 1, yPercent: 0, ease: Expo.easeOut })
			TweenMax.fromTo(that.modal.close, 1.8, { autoAlpha: 0 }, { delay: 1, autoAlpha: 1, ease: Expo.easeInOut })
		})

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

		let $borderCursor = $('#cursor .border'),
			$scaleCursor = $('.scale')

		$scaleCursor.hover(
			function () {
				TweenMax.to($borderCursor, .5, { scale: 1, ease: Power3.easeOut })
			}, function () {
				TweenMax.to($borderCursor, .5, { scale: .5, ease: Power3.easeOut })
			});

		this.modal.close.add(this.modal.bg).click(function () {
			TweenMax.to(that.modal.general, .5, { autoAlpha: 0 })
		})
	}

	destroy() {
		console.log(this.app.renderer)
		this.app.renderer.destroy(true);
		this.app.renderer = null;
		//this.app.destroy(true);
	}
}
export const archived = new Archived()