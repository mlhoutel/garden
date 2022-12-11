function fileInput() {
	const dropRegion = document.getElementById('drop-region');

	const fileInput = document.createElement('input');

	fileInput.type = 'file';
	fileInput.accept = 'image/*';
	fileInput.multiple = true;
	dropRegion.addEventListener('click', function () {
		fileInput.click();
	});

	fileInput.addEventListener('change', function () {
		handleFiles(fileInput.files);
	});

	function preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	dropRegion.addEventListener('dragenter', preventDefault, false);
	dropRegion.addEventListener('dragleave', preventDefault, false);
	dropRegion.addEventListener('dragover', preventDefault, false);
	dropRegion.addEventListener('drop', preventDefault, false);

	function handleDrop(e) {
		var dt = e.dataTransfer,
			files = dt.files;

		if (files.length) {
			handleFiles(files);
		} else {
			const html = dt.getData('text/html');
			const match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
			const url = match && match[1];

			if (url) {
				uploadImageFromURL(url);
				return;
			}
		}

		function uploadImageFromURL(url) {
			var img = new Image();
			var c = document.createElement('canvas');
			var ctx = c.getContext('2d');

			img.onload = function () {
				c.width = this.naturalWidth; // update canvas size to match image
				c.height = this.naturalHeight;
				ctx.drawImage(this, 0, 0); // draw in image
				c.toBlob(function (blob) {
					// get content as PNG blob

					// call our main function
					handleFiles([blob]);
				}, 'image/png');
			};
			img.onerror = function () {
				alert('Error in uploading');
			};
			img.crossOrigin = ''; // if from different origin
			img.src = url;
		}
	}

	dropRegion.addEventListener('drop', handleDrop, false);

	function handleFiles(files) {
		for (var i = 0, len = files.length; i < len; i++) {
			if (validateImage(files[i])) previewAnduploadImage(files[i]);
		}
	}

	function validateImage(image) {
		var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
		if (!validTypes.includes(image.type)) {
			alert('Invalid File Type');
			return false;
		}
		return true;
	}

	function previewAnduploadImage(image) {
		var img = document.getElementById('img-val');
		var reader = new FileReader();
		reader.onload = function (e) {
			img.src = e.target.result;
		};
		reader.readAsDataURL(image);
	}
}

function handleASCII() {
	const field_chr = document.getElementById('img-chr');
	const field_pxw = document.getElementById('pxl-wid');
	const field_pxh = document.getElementById('pxl-hei');
	const image_val = document.getElementById('img-val');
	const image_ctx = document.getElementById('img-ctx');

	image_val.addEventListener('load', function () {
		generateImage(
			field_chr.value,
			parseInt(field_pxw.value),
			parseInt(field_pxh.value),
			image_val,
			image_ctx
		);
	});
	field_chr.addEventListener('input', function () {
		generateImage(
			field_chr.value,
			parseInt(field_pxw.value),
			parseInt(field_pxh.value),
			image_val,
			image_ctx
		);
	});
	field_pxw.addEventListener('input', function () {
		generateImage(
			field_chr.value,
			parseInt(field_pxw.value),
			parseInt(field_pxh.value),
			image_val,
			image_ctx
		);
	});
	field_pxh.addEventListener('input', function () {
		generateImage(
			field_chr.value,
			parseInt(field_pxw.value),
			parseInt(field_pxh.value),
			image_val,
			image_ctx
		);
	});
	generateImage(
		field_chr.value,
		parseInt(field_pxw.value),
		parseInt(field_pxh.value),
		image_val,
		image_ctx
	);
}

async function generateImage(chr = 10, pxw = null, pxh = null, val = null, ctx = null) {
	if (val == null || ctx == null) {
		throw '<An error occured during the processing of the image...>';
	}
	if (pxw == null || pxw < 1) {
		pxw = 1;
	}
	if (pxh == null || pxh < 1) {
		pxh = 1;
	}
	ctx.innerHTML = getAsciiImage(chr, val, pxw, pxh);
}

function getAsciiImage(chars = null, image = null, pixelw = null, pixelh = null) {
	if (chars == null || image == null) {
		throw '<An error occured during the processing of the image...>';
	}
	if (chars == '') {
		chars = ' ';
	}
	const canvas = document.createElement('canvas');
	canvas.width = image.naturalWidth;
	canvas.height = image.naturalHeight;

	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);

	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;
	let ascii = '';
	// Generate Greyscale image
	for (let i = 0; i < data.length; i += 4) {
		const grey = rgbToGrey(data[i], data[i + 1], data[i + 2]);
		data[i] = grey;
		data[i + 1] = grey;
		data[i + 2] = grey;
	}
	ctx.putImageData(imgData, 0, 0);

	// Generate Ascii image
	for (let y = Math.round(pixelh / 2); y < image.naturalHeight - pixelh; y += pixelh) {
		for (let x = Math.round(pixelw / 2); x < image.naturalWidth - pixelw; x += pixelw) {
			const grey = mergePixel(data, x, y, pixelw, pixelh, image.naturalWidth, image.naturalHeight);
			ascii += chars[Math.floor((grey / 255) * (chars.length - 1))];
		}
		ascii += '</br>';
	}

	return ascii;
}

function rgbToGrey(r, g, b) {
	return Math.floor((r + g + b) / 3);
}

function mergePixel(data, px, py, pw, ph, w, h) {
	let sum = 0;
	const pos_x = px - Math.floor(pw / 2);
	const pos_y = py - Math.floor(ph / 2);
	for (let y = 0; y < ph; y++) {
		for (let x = 0; x < pw; x++) {
			const apx = pos_x + x;
			const apy = pos_y + y;
			sum += data[(apx + apy * w) * 4];
		}
	}
	return sum / (pw * ph);
}

document.addEventListener('DOMContentLoaded', function () {
	fileInput();
	handleASCII();
});
