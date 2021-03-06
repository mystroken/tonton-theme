const overlayJs = function () {
	const easeSvg = { exponentialInOut: (t) => { return t == 0.0 || t == 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0) : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0; }, sineOut: (t) => { const HALF_PI = 1.5707963267948966; return Math.sin(t * HALF_PI); }, }

	class ShapeOverlays {
		constructor(elm) {
			this.elm = elm;
			this.path = elm.querySelectorAll('path');
			this.numPoints = 3;
			this.duration = 1300;
			this.delayPointsArray = [];
			this.delayPointsMax = 0;
			this.delayPerPath = 120;
			this.timeStart = Date.now();
			this.isOpened = false;
			this.isAnimating = false;
		}

		toggle() {
			this.isAnimating = true;
			for (var i = 0; i < this.numPoints; i++) {
				this.delayPointsArray[i] = 0;
			}
			if (this.isOpened === false) {
				this.open();
			} else {
				this.close();
			}
		}

		open() {
			this.isOpened = true;
			this.elm.classList.add('is-opened');
			this.timeStart = Date.now();
			this.renderLoop();
		}

		close() {
			this.isOpened = true;
			this.elm.classList.remove('is-opened');
			this.timeStart = Date.now();
			this.renderLoop();
		}

		updatePath(time) {
			const points = [];
			for (var i = 0; i < this.numPoints; i++) {
				const thisEase = (i % 2 === 1) ? easeSvg.sineOut : easeSvg.exponentialInOut;
				points[i] = (1 - thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1))) * 100
			}

			let str = '';
			str += (this.isOpened) ? `M 0 0 H ${points[0]}` : `M ${points[0]} 0`;
			for (var i = 0; i < this.numPoints - 1; i++) {
				const p = (i + 1) / (this.numPoints - 1) * 100;
				const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
				str += `C ${points[i]} ${cp} ${points[i + 1]} ${cp} ${points[i + 1]} ${p} `;
			}
			str += (this.isOpened) ? `H 100 V 0` : `H 0 V 0`;
			return str;
		}

		render() {
			if (this.isOpened) {
				for (var i = 0; i < this.path.length; i++) {
					this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
				}
			} else {
				for (var i = 0; i < this.path.length; i++) {
					this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
				}
			}
		}

		renderLoop() {
			this.render();
			if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
				requestAnimationFrame(() => {
					this.renderLoop();
				});
			}
			else {
				this.isAnimating = false;
			}
		}
	}

	const elmHamburger = document.querySelector('body');
	const gNavItems = document.querySelectorAll('.global-menu__item');
	const elmOverlay = document.querySelector('.shape-overlays');
	const overlay = new ShapeOverlays(elmOverlay);

	if (overlay.isAnimating) {
		return false;
	}

	overlay.toggle();
	if (overlay.isOpened === true) {
		elmHamburger.classList.add('is-opened-navi');
		for (var i = 0; i < gNavItems.length; i++) {
			gNavItems[i].classList.add('is-opened');
		}
	} else {
		elmHamburger.classList.remove('is-opened-navi');
		for (var i = 0; i < gNavItems.length; i++) {
			gNavItems[i].classList.remove('is-opened');
		}
	}
}

module.exports = {
	overlayJs
}