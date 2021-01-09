import { TweenMax } from "gsap";

class GlobalRAF {
	constructor() {
		this.reuse = {
			ease: 0.065,
			current: 0,
			last: 0
		}

		console.log('please nao rode')
		//this.init()
		//this.tick(this.reuse)

		return;
	}

	tick(reuse) {
		let newData = reuse
		console.log(newData.ease + newData);
	}

	opacity() {
		TweenMax.fromTo('.wrapped', 1, { rotation: 0 }, { rotation: 360, transformOrigin: 'center center' })
	}

	init() {
		console.log('init');

	}
}

GlobalRAF.events = {
	TICK: GlobalRAF.prototype.tick,
	OPACITY: GlobalRAF.prototype.opacity
}

//export default new GlobalRAF()
export const Events = GlobalRAF.events
export const newSet = new GlobalRAF()