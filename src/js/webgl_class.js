import { TweenMax } from "gsap";

let myView = document.getElementById("webgl"),
	w = window.innerWidth,
	h = window.innerHeight,
	//sizeW = w / 3.2,
	//sizeH = h / 1.875,
	sizeW = (1660 / 1180) * (h / 2),
	sizeH = h / 2,
	tlWebGLTransition = new TimelineLite();

export default class WebglRender {
	constructor() {
		return;
	}

	init() {
		this.sizes = {
			heightCanvas: window.innerHeight,
		};
		if ($(".header-home").length > 0) {
			this.sizes = {
				heightCanvas: window.innerHeight,
				ctnTitle: document.querySelector(".links-folio"),
				ctnTitleWidth: document
					.querySelector(".links-folio")
					.getBoundingClientRect().width,
				ctnTitleHeight: document
					.querySelector(".links-folio")
					.getBoundingClientRect().height,
				gapInit: 0,
			};
			this.sizes.heightCanvas =
				this.sizes.ctnTitleHeight + this.sizes.gapInit * 2;
			this.titleSelector = ".title-folio";
		}

		if ($(".main-single").length > 0) {
			const nextHold = document.querySelector(".next__hold");
			this.sizes = {
				heightCanvas: window.innerHeight,
				ctnTitle: nextHold,
				ctnTitleWidth: nextHold.getBoundingClientRect().width,
				ctnTitleHeight: nextHold.getBoundingClientRect().height,
				gapInit: 0,
			};
			this.sizes.heightCanvas =
				this.sizes.ctnTitleHeight + this.sizes.gapInit * 2;
			this.titleSelector = ".next__title h1";
		}

		this.config = {
			timeFade: 0.6,
		};

		this.dom = {
			title: document.querySelectorAll(this.titleSelector),
			fontSize: parseInt($(this.titleSelector).css("fontSize")),
			titleQuery: $(this.titleSelector),
		};

		this.arrays = {
			pixiTitles: [],
			pixiTitlesMask: [],
			bgs: [],
			textures: [],
		};

		//? - =====================  PIXIJS  ========================= -//
		//? - =====================  PIXIJS  ========================= -//
		this.myView = document.getElementById("webgl")
		this.app = new PIXI.Application({
			width: w,
			height: h,
			antialias: true,
			transparent: true,
		});
		this.myView.appendChild(this.app.view);

		//? - =====================  BGS  ========================= -//
		//? - =====================  BGS  ========================= -//

		this.bgContainer = new PIXI.Container();
		this.bgContainerImages = new PIXI.Container();
		this.bgContainerMask = new PIXI.Container();
		this.bgContainerImages.width = w;
		this.bgContainerImages.height = this.sizes.ctnTitleHeight + this.sizes.gapInit * 4;
		this.bgContainerSingle = new PIXI.Container();
		this.bgContainerImages.width = w;
		this.bgContainerImages.height = h;

		this.fx = {
			shader: document.querySelector("#shaderFrag").textContent,
		};
		this.filter = new PIXI.Filter(null, this.fx.shader);

		//? - =====================  STYLES  ========================= -//
		//? - =====================  STYLES  ========================= -//
		if ($(".header-home").length > 0) {
			this.style = new PIXI.TextStyle({
				fontFamily: "pangramlight",
				fontSize: this.dom.fontSize,
				fill: ["#eee"],
			});
		}
		if ($(".main-single").length > 0) {
			this.style = new PIXI.TextStyle({
				fontFamily: "pangramlight",
				fontSize: this.dom.fontSize,
				fill: ["#000"],
			});
		}
		this.styleMask = new PIXI.TextStyle({
			fontFamily: "pangramlight",
			fontSize: this.dom.fontSize,
			fill: ["#000"],
		});
		this.styleSingle = new PIXI.TextStyle({
			fontFamily: "pangramlight",
			fontSize: this.dom.fontSize,
			fill: ["#000"],
		});

		//? - =====================  MASKING ========================= -//
		//? - =====================  MASKING ========================= -//
		this.mask = new PIXI.Graphics()
			.beginFill(0x0fffff, 1)
			.drawRect(0, this.sizes.gapInit, sizeW, sizeH);
		this.app.stage.addChild(
			this.bgContainer,
			this.bgContainerImages,
			this.bgContainerMask,
			this.mask,
			this.bgContainerSingle
		);
		this.bgContainerMask.mask = this.mask;
		this.thisTicker = null;
		this.createTitles(
			this.style,
			this.styleMask,
			this.bgContainer,
			this.bgContainerImages,
			this.bgContainerMask,
			this.arrays.pixiTitles,
			this.arrays.pixiTitlesMask,
			this.bgDyna
		);

		this.onClick();
		this.onTicker(document.querySelectorAll(this.titleSelector));
		this.onMouseMove($(this.titleSelector));
		this.onHover($(this.titleSelector));

		this.applyShader(this.filter);
		this.onResize(this.dom.title, this.arrays);
		this.singleApp();
	}

	//? - =========================  CREATE EL  ========================= -//
	//? - =========================  CREATE EL  ========================= -//
	singleApp() {
		let basicText = new PIXI.Text("Enjine", this.styleSingle);
		basicText.position.x = 110;
		basicText.position.y = 245;
		//this.bgContainerSingle.addChild(basicText)
	}

	createTitles(
		style,
		styleMask,
		bgContainer,
		bgContainerImages,
		bgContainerMask,
		pixiTitles,
		pixiTitlesMask,
		bgs
	) {
		let heightEachTitle = $(".links-folio__each").height();
		let $jsImg = document.querySelectorAll(".js-img"),
			that = this;

		// ___________________________________ LOOP
		this.dom.title.forEach(function (item, index) {
			let posX = item.getBoundingClientRect().left;
			let changeText = item.textContent;
			let basicText = new PIXI.Text(changeText, style);
			basicText.position.x = posX - 1;
			basicText.position.y = 0;
			bgContainer.addChild(basicText);
			pixiTitles.push(basicText);

			// MASKED
			let basicTextMask = new PIXI.Text(changeText, styleMask);
			basicTextMask.position.x = posX;
			basicTextMask.position.y = 0;
			bgContainerMask.addChild(basicTextMask);
			pixiTitlesMask.push(basicTextMask);
			basicTextMask.alpha = 0;

			// BGS
			let srcImg = $jsImg[index].src;
			let thisTexture = PIXI.Texture.fromImage(srcImg);
			that.arrays.textures.push(thisTexture);
		});

		this.bgDyna = PIXI.Sprite.from(that.arrays.textures[0]);
		this.bgDyna.width = sizeW;
		this.bgDyna.height = sizeH;
		this.bgDyna.position.x = 0;
		this.bgDyna.position.y = 0;

		this.bgContainerImages.addChild(this.bgDyna);
		this.bgDyna.alpha = 0;
		return;
	}

	//? - =====================  SWITCH COLORS  ========================= -//
	//? - =====================  SWITCH COLORS  ========================= -//
	switchToBlack() {
		for (var i = 0; i < this.arrays.pixiTitles.length; i++) {
			this.arrays.pixiTitles[i].style.fill = ["#000000"];
			this.arrays.pixiTitlesMask[i].style.fill = ["#ffffff"];
		}
	}
	switchToWhite() {
		for (var i = 0; i < this.arrays.pixiTitles.length; i++) {
			this.arrays.pixiTitles[i].style.fill = ["#ffffff"];
			this.arrays.pixiTitlesMask[i].style.fill = ["#000000"];
		}
	}

	//? - =====================  MOUSEMOVE  ========================= -//
	//? - =====================  MOUSEMOVE  ========================= -//
	onMouseMove($dynaTitle) {
		let pos = { x: 0, y: 0 }; //Cursor position
		let follow = [this.mask, this.bgContainerImages];
		let $title = $(this.titleSelector);
		let that = this;
		$dynaTitle.mousemove(function (e) {
			parallaxCursor(e, this, 1);
		});
		function parallaxCursor(e, parent, movement) {
			let rect = parent.getBoundingClientRect();
			let relX = e.clientX - rect.left;
			let relY = e.clientY - rect.top;
			let gap = that.sizes.ctnTitle.getBoundingClientRect().top;
			let MasterPosY = pos.y - gap;
			pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
			pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
			TweenMax.to(follow, 0.3, { x: pos.x - sizeW / 2, y: pos.y - sizeH / 2 });
		}
	}

	//? - =====================  BIND HOVER  ========================= -//
	//? - =====================  BIND HOVER  ========================= -//
	onHover($title) {
		let that = this;
		$title.hover(
			function () {
				let indexThis = $title.index(this);

				TweenMax.to([that.bgContainerMask, that.bgDyna], 0.6, { alpha: 1 });
				TweenMax.set(that.arrays.pixiTitlesMask[indexThis], { alpha: 1 });
				that.bgDyna.texture = that.arrays.textures[indexThis];
			},
			function () {
				let indexThis = $title.index(this);
				TweenMax.to([that.bgContainerMask, that.bgDyna], 0.6, { alpha: 0 });
				TweenMax.set(that.arrays.pixiTitlesMask[indexThis], { alpha: 0 });
			}
		);
	}

	//? - =====================  ON CLICK ========================= -//
	//? - =====================  ON CLICK ========================= -//
	onClick() {
		let that = this;
		let $title = $(this.titleSelector);
		$title.click(function () {
			let indexThis = $title.index(this);
			//webglRender.onClick($(this), indexThis)
			let target = that.arrays.pixiTitles[indexThis];
			let thatParams = {
				x: target.x,
			};
			that.offTicker();
			TweenMax.set($title, { pointerEvents: "none" });
			TweenMax.fromTo(
				that.arrays.pixiTitles,
				that.config.timeFade,
				{ alpha: 1 },
				{ alpha: 0 }
			);
			TweenMax.fromTo(
				[
					that.arrays.bgContainerImages,
					that.arrays.bgContainerMask,
					that.arrays.mask,
				],
				that.config.timeFade / 1.2,
				{ alpha: 1 },
				{ alpha: 0 }
			);
			TweenMax.fromTo(target, that.config.timeFade, { alpha: 0 }, { alpha: 1 });
			TweenMax.to(that.filter.uniforms, 1, {
				frequency: 20,
				amplitudeY: 0.3,
				ease: Power2.easeIn,
			});
			TweenMax.to(that.filter.uniforms, 1, {
				delay: 1,
				frequency: 0,
				amplitudeY: 0,
				ease: Power2.easeOut,
			});
			TweenMax.fromTo(
				target,
				2,
				{ x: thatParams.x },
				{ x: 110, y: window.innerHeight * 0.3, ease: Power3.easeInOut }
			);
			that.arrays.pixiTitles[0].style.fill = ["#000000"];
			target.filters = [that.filter];
			TweenMax.delayedCall(3, () => {
				that.killAnimations(indexThis, thatParams);
				that.switchToWhite();
			});
		});
	}

	//? - =====================  BIND KILL / RESET   ========================= -//
	//? - =====================  BIND KILL / RESET   ========================= -//
	killAnimations(clicked, thisParams) {
		this.arrays.pixiTitles[clicked].filters = null;
		this.bgContainerImages.filters = [this.filter];
		TweenMax.set(this.filter.uniforms, { frequency: 18, amplitudeY: 0.03 });
		TweenMax.set(this.arrays.pixiTitles[clicked], { x: thisParams.x });
		TweenMax.set(this.dom.title, { pointerEvents: "auto" });
		TweenMax.set(this.arrays.pixiTitles, { alpha: 1 });
		this.arrays.pixiTitles[clicked].style.fill = ["#fff"];
	}

	offTicker() {
		TweenMax.ticker.removeEventListener("tick", this.thisTicker);
	}

	addTicker() {
		TweenMax.ticker.addEventListener("tick", this.thisTicker);
	}

	onReverse() {
		tlWebGLTransition.pause(0);
		this.arrays.pixiTitles[0].style.fill = ["#fff"];
		this.bgContainerImages.filters = [this.filter];
		TweenMax.set("#webgl", { zIndex: 0 });
	}

	//? - =====================  BIND RESIZE ========================= -//
	//? - =====================  BIND RESIZE ========================= -//
	onResize($titles, $arrays) {
		let that = this;

		$(window).resize(function () {
			w = window.innerWidth;
			h = window.innerHeight;
			sizeW = w / 3.2;
			sizeH = h / 1.875;
			that.destroy();
			that.init();
			/*if ($('.page-home').length > 0) {
				that.bgDyna.width = sizeW
				that.bgDyna.height = sizeH

				$titles.forEach(function (item, index) {
					let posX = item.getBoundingClientRect().left
					let posY = item.getBoundingClientRect().top
					$arrays.pixiTitles[index].position.x = posX
					$arrays.pixiTitles[index].position.y = posY
					$arrays.pixiTitlesMask[index].position.x = posX
					$arrays.pixiTitlesMask[index].position.y = posY


					sizeW = w / 2.25
					sizeH = h / 2.25
					$bgDyna[index].width = sizeW
					$bgDyna[index].height = sizeH
					that.bgDyna.width = sizeW
					that.bgDyna.height = sizeH
					that.mask.width = sizeW
					that.mask.height = sizeH
				});
				that.app.renderer.resize(window.innerWidth, that.sizes.ctnTitleHeight + (h / 3));
			}*/
		});
	}

	//? - =========================  APPLY FILTER  ========================= -//
	//? - =========================  APPLY FILTER  ========================= -//
	applyShader(filter) {
		filter.uniforms.frequency = 18;
		filter.uniforms.amplitude = 0;
		filter.uniforms.amplitudeY = 0.015;
		filter.uniforms.amplitudeX = 0;
		filter.uniforms.speed = 8.0;
		filter.uniforms.time = 20;
		filter.padding = 100;
		this.bgContainerImages.filterArea = this.app.screen;
		this.app.stage.filterArea = this.app.screen;
		this.bgContainerImages.filters = [filter];

		return filter;
	}

	onTicker(dynaTitle) {
		let that = this;
		this.thisTicker = function myTicker(event) {
			dynaTitle.forEach(function (item, index) {
				let posY = item.getBoundingClientRect().top;
				that.arrays.pixiTitles[index].position.y = posY;
				that.arrays.pixiTitlesMask[index].position.y = posY;
			});
		};

		this.addTicker();
		return this.thisTicker;
	}

	destroy() {
		this.offTicker()
		this.app.renderer.destroy(true)
	}
}

//? - =====================  BIND CLICK  ========================= -//
//? - =====================  BIND CLICK  ========================= -//
/*onClick($title, $arrays, clicked, scrolledWebGL) {
	tlWebGLTransition
	   .to(this.arrays.pixiTitles, this.config.timeFade, { alpha: 0 }, 0)
	   .to([this.arrays.bgContainerImages, this.arrays.bgContainerMask, this.arrays.mask], this.config.timeFade / 1.2, { alpha: 0 }, 0)
	   .to(this.arrays.pixiTitles[clicked], this.config.timeFade, { alpha: 1 }, 0)
	   .to(this.arrays.pixiTitles[clicked], 2, { x: 110, y: (scrolledWebGL + 250), ease: Power3.easeInOut }, 0)
	   .to(this.filter.uniforms, 1, { frequency: 20, amplitudeY: 0.3, ease: Power2.easeIn }, 0)
	   .to(this.filter.uniforms, 1, { frequency: 0, amplitudeY: 0, ease: Power2.easeOut }, 1)
	   .to(this.arrays.pixiTitles[clicked].style, this.config.timeFade * 2, { delay: 1, fontSize: 355, ease: Power3.easeInOut }, 2)
	this.arrays.pixiTitles[clicked].style.fill = ['#000000'];
	this.arrays.pixiTitles[clicked].filters = [this.filter];
	//size
	//TweenMax.to(this.arrays.pixiTitles[clicked].style, 2, { fontSize: fontSize + 200, ease: Power3.easeInOut })
	//goSvg()
	//TweenMax.delayedCall(this.config.timeFade / 1.2, () => {
	//TweenMax.to(this.arrays.pixiTitles[clicked], 2, { x: ((w / 100) * 10.2), y: (((h / 100) * 44) - this.sizes.gap), ease: Power3.easeInOut })
	//})
}*/
