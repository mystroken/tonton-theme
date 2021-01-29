
const dragJs = function () {
	if ($('.box').length > 0) {

		let winScreen = $(window).innerWidth();
		let $box = $('.box')
		let $nPhotos = $box.length;
		let $totalPhotos = $box.length;
		let sizePhoto = $(".each-inner-page").outerWidth(true);
		const leftOffset = winScreen * .1; //10vw margin left
		let sizeHolder = $nPhotos * sizePhoto + leftOffset;
		let $holder = $(".holder")[0];
		TweenMax.set($holder, { width: sizeHolder });
		let $target = 0;
		let changeNumb = 1;
		$('.static').text(`0${$totalPhotos}`);

		console.log(sizePhoto)

		//
		// RESIZE
		// -------------------------------------------
		$(window).resize(function () {
			let $nPhotos = $box.length;
			let sizePhoto = $(".each-inner-page").outerWidth(true);
			let sizeHolder = $nPhotos * sizePhoto;
			TweenMax.set($holder, { width: sizeHolder + (window.innerWidth * 0.15) });
		});

		function setProgress() {
			$target = Math.round($holder._gsTransform.x / sizePhoto);
			console.log($holder._gsTransform.x, sizePhoto);
			changeNumb = (Math.round(($holder._gsTransform.x - leftOffset) / sizePhoto) * -1) + 1

			TweenLite.set(progressBars, {
				scaleX: ($holder._gsTransform.x / (sizeHolder - winScreen) * - 1)
			});
			$('.actv').text(`0${changeNumb}`);
		}

		//
		// set DRAGGABLE
		// -------------------------------------------
		let $dir = "";
		Draggable.create($holder, {
			type: "x",
			//edgeResistance: 0.8,
			dragResistance: 0,
			bounds: ".ctn",
			throwProps: true,
			onDrag: setProgress,
			onThrowUpdate: setProgress,
			snap: {
				/*x: function (endValue) {
					return Math.round(endValue / sizePhoto) * sizePhoto;
				}*/
			}
		});

		//
		// INDICATOR
		// -------------------------------------------
		let progressBars = $(".indic-dyna");
		TweenMax.set(".indic-dyna", { scaleX: 0, transformOrigin: "left" });
	} //close conditional has draggable
} //close drag

module.exports = {
	dragJs
}