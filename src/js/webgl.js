const webglJs = function () {
	if ($('.page-home').length > 0) {
		let myView = document.getElementById('webgl'),
			w = window.innerWidth,
			h = window.innerHeight,
			$ctnTitle = document.querySelector('.links-folio'),
			ctnTitleWidth = $ctnTitle.getBoundingClientRect().width,
			ctnTitleHeight = $ctnTitle.getBoundingClientRect().height,
			sizeW = w / 4.5,
			sizeH = h / 2

		//Original: https://codepen.io/victorwork/pen/dJVrad?editors=0110

		// ___________________________________ GET CUSTOM FONT
		// ___________________________________ GET CUSTOM FONT
		WebFontConfig = {
			custom: {
				families: ["pangramlight"],
			},
			active: function () {
			}
		};
		// ___________________________________ START PIXIJS
		// ___________________________________ START PIXIJS
		const app = new PIXI.Application({
			width: w,
			height: ctnTitleHeight + (h / 3),
			antialias: true,
			transparent: true
		});
		myView.appendChild(app.view);
		const bgContainer = new PIXI.Container();
		const bgContainerImages = new PIXI.Container();
		const bgContainerMask = new PIXI.Container();
		bgContainerImages.width = w
		bgContainerImages.height = h

		// ___________________________________ GET TEXT
		// ___________________________________ GET TEXT
		let $titles = document.querySelectorAll('.title-folio'),
			fontSize = $(".title-folio").css("fontSize")
		fontSize = parseInt(fontSize)
		//console.log(fontSize)

		// ___________________________________ STYLES TEXT
		var style = new PIXI.TextStyle({
			fontFamily: 'pangramlight',
			fontSize: fontSize,
			fill: ['#fff'],
		});

		var styleMask = new PIXI.TextStyle({
			fontFamily: 'pangramlight',
			fontSize: fontSize,
			fill: ['#000'],
		});

		// ___________________________________ CREATE
		let pixiTitles = [], pixiTitlesMask = [], bgs = [],
			heightEachTitle = $('.links-folio__each').height(),
			$jsImg = document.querySelectorAll('.js-img')

		$titles.forEach(function (item, index) {
			posX = item.getBoundingClientRect().left
			//posY = item.getBoundingClientRect().top
			let changeText = item.textContent
			let basicText = new PIXI.Text(changeText, style);
			basicText.position.x = posX
			basicText.position.y = index * heightEachTitle
			bgContainer.addChild(basicText);
			pixiTitles.push(basicText)

			// MASKED
			let basicTextMask = new PIXI.Text(changeText, styleMask);
			basicTextMask.position.x = posX
			basicTextMask.position.y = index * heightEachTitle
			bgContainerMask.addChild(basicTextMask);
			pixiTitlesMask.push(basicTextMask)
			basicTextMask.alpha = 0

			// BGS
			let srcImg = $jsImg[index].src
			let bgCreate = PIXI.Sprite.from(srcImg);
			bgCreate.width = sizeW
			bgCreate.height = sizeH
			bgCreate.position.x = 0
			bgCreate.position.y = 0

			bgContainerImages.addChild(bgCreate);
			bgs.push(bgCreate)
			bgCreate.alpha = 0

			return
		});

		// ___________________________________ CREATING MASK
		// ___________________________________ CREATING MASK
		const mask = new PIXI.Graphics()
			.beginFill(0x0fffff, 1)
			.drawRect(0, 0, sizeW, sizeH)

		app.stage.addChild(bgContainer, bgContainerImages, bgContainerMask, mask)
		bgContainerMask.mask = mask;

		// ___________________________________ SHADER
		// ___________________________________ SHADER
		var shaderFrag = document.querySelector("#shaderFrag").textContent;
		bgContainerImages.filterArea = screen;

		var filter = new PIXI.Filter(null, shaderFrag);
		filter.uniforms.frequency = 18;
		filter.uniforms.amplitude = 0;
		filter.uniforms.amplitudeY = 0.05;
		filter.uniforms.amplitudeX = 0;
		filter.uniforms.speed = 8.0;
		filter.uniforms.time = 20;
		filter.padding = 100;

		bgContainerImages.filters = [filter];
		bgContainerMask.alpha = 0

		// ___________________________________ MOUSE FOLLOW
		// ___________________________________ MOUSE FOLLOW
		let mouse = { x: 0, y: 0 }; //Cursor position
		let pos = { x: 0, y: 0 }; //Cursor position
		let active = false;
		let follow = [mask, bgContainerImages]

		let $title = $('.title-folio')
		$title.mousemove(function (e) {
			parallaxCursor(e, this, 1);
			//updatePosition()
		});

		$title.hover(function () {
			let indexThis = $title.index(this)
			TweenMax.to([bgContainerMask, bgs[indexThis]], .6, { alpha: 1 })
			TweenMax.set(pixiTitlesMask[indexThis], { alpha: 1 })
			//console.log('working')
		}, function () {
			let indexThis = $title.index(this)
			TweenMax.to([bgContainerMask, bgs[indexThis]], .6, { alpha: 0 })
			TweenMax.set(pixiTitlesMask[indexThis], { alpha: 0 })
		})

		let timeFade = .6
		$title.click(function () {
			TweenMax.set($title, { pointerEvents: 'none' })
			let indexThis = $title.index(this)
			TweenMax.to(pixiTitles, timeFade, { alpha: 0 })
			TweenMax.to([bgContainerImages, bgContainerMask, mask], timeFade / 1.2, { alpha: 0 })
			TweenMax.to(pixiTitles[indexThis], timeFade, { alpha: 1 })
			//goSvg()
			//TweenMax.delayedCall(timeFade / 1.2, () => {
			TweenMax.to(pixiTitles[indexThis], 2, { x: 0, y: h / 3, ease: Power3.easeInOut })
			pixiTitles[indexThis].style.fill = ['#000'];
			//size
			//TweenMax.to(pixiTitles[indexThis].style, 2, { fontSize: fontSize + 200, ease: Power3.easeInOut })
			pixiTitles[indexThis].filters = [filter];
			TweenMax.fromTo(filter.uniforms, 1, { amplitudeY: 0, frequency: 0 }, { frequency: 20, amplitudeY: 0.3, ease: Power2.easeIn })
			TweenMax.fromTo(filter.uniforms, 1, { amplitudeY: 0.3, frequency: 20 }, {
				delay: 1, frequency: 0, amplitudeY: 0, ease: Power2.easeOut, onComplete: () => {
					TweenMax.to(pixiTitles[indexThis].style, timeFade * 2, { fontSize: fontSize + 200, ease: Power3.easeInOut })
				}
			})
			//})
		})

		// ___________________________________ CURSOR MOVE
		// ___________________________________ CURSOR MOVE
		/*let ratio = 0.1; //delay follow 
	     
		//document.body.style.cursor = 'none';
		function clamp(num, min, max) {
		    return num <= min ? min : num >= max ? max : num;
		}
	     
		let ease = 0.1
		let threshold = 20
		let maxBlur = 2
		let lastX
		let lastY
	     
		//TweenMax.ticker.fps(60);
		function updatePosition() {
		    if (!active) {
			   lastX =  pos.x
			   lastY =  pos.y
			   
			   pos.x += (mouse.x - pos.x) * ratio;
			   pos.y += (mouse.y - pos.y) * ratio;
			   
			   const deltaX = pos.x - lastX
			   const deltaY = pos.y - lastY
			   
			   const theta = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
			   
			   const vX = clamp(Math.abs(deltaX) / threshold, 0, 1)
			   const vY = clamp(Math.abs(deltaY) / threshold, 0, 1)
			   const velocity = (vX + vY) * 0.5
			   
			   console.log(velocity)
			   
			   //TweenMax.set(filter.uniforms, { amplitudeY:  0.02 * (velocity), ease:Power2.easeIn} )
			   //TweenMax.set(bgContainerMask,  {alpha: 1 * velocity})
		    }
		}*/

		// ___________________________________ RESIZE
		// ___________________________________ RESIZE
		$(window).resize(function () {
			$titles.forEach(function (item, index) {
				posX = item.getBoundingClientRect().left
				posY = item.getBoundingClientRect().top
				pixiTitles[index].position.x = posX
				pixiTitles[index].position.y = posY
				pixiTitlesMask[index].position.x = posX
				pixiTitlesMask[index].position.y = posY

				sizeW = w / 2.25
				sizeH = h / 2.25
				bgs[index].width = sizeW
				bgs[index].height = sizeH
				mask.width = sizeW
				mask.height = sizeH
			});
			app.renderer.resize(window.innerWidth, ctnTitleHeight + (h / 3));
		})
	} //close if home
}

module.exports = {
	webglJs
}