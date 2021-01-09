
class Cursor {
	constructor() {
	}
	init() {
		this.mouse = { x: 0, y: 0 }; //Cursor position
		this.pos = { x: 0, y: 0 }; //Cursor position
		this.ratio = 0.2; //delay follow cursor
		this.ball = $('#cursor')

		TweenLite.set(this.ball, { xPercent: -50, yPercent: -50 });
		TweenLite.set(this.ball.find('.border'), { scale: .5 });

		this.moveBall()
	}

	moveBall() {
		let that = this
		function mouseMove(e) {
			that.mouse.x = e.clientX;
			that.mouse.y = e.clientY;
		}

		document.addEventListener("mousemove", mouseMove);

		TweenMax.ticker.addEventListener("tick", onTick);

		function onTick() {
			that.pos.x += (that.mouse.x - that.pos.x) * that.ratio;
			that.pos.y += (that.mouse.y - that.pos.y) * that.ratio;
			TweenLite.set(that.ball, { x: that.pos.x, y: that.pos.y });
		}
	}

	single($drag) {
		let that = this
		$drag.hover(
			function () {
				TweenMax.to(that.ball.find('.border'), 1, { scale: 1, borderColor: '#000', ease: Power3.easeOut })
				TweenMax.to([that.ball.find('.arrows__each'), that.ball.find('.drag')], .3, { opacity: 1, ease: Power3.easeOut })
			}, function () {
				TweenMax.to(that.ball.find('.border'), 1, { scale: .5, borderColor: '#777', ease: Power3.easeOut })
				TweenMax.to([that.ball.find('.arrows__each'), that.ball.find('.drag')], .3, { opacity: 0, ease: Power3.easeOut })
			}
		);
	}
}

export const cursor = new Cursor()