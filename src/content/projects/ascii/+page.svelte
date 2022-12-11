<script>
    import "$styles/projects.css"

    let files;
    let gradient = "@%#*+=- ";
    let xscale = 20;
    let yscale = 15;

    let base64;
    let preview;

    let ascii = "";

    function updateImage(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => { base64 = e.target.result };
    }
    
    function getImagePixels(image) {
        const canvas = document.createElement("canvas")
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
    
        const ctx = canvas.getContext("2d")
        ctx.drawImage(image, 0, 0)
    
        return ctx.getImageData(0, 0, canvas.width, canvas.height).data
    }

    async function generateImage() {
        const width = preview.naturalWidth
        const height = preview.naturalHeight
        const image = getImagePixels(preview)
        const greyscale = new Uint8Array(image.length / 4)

        // Generate Greyscale image
        for (let i = 0; i < image.length; i += 4) {
            const grey = rgbToGrey(image[i], image[i + 1], image[i + 2]);
            greyscale[i / 4] = grey;
        }

        // Generate Ascii image
        let ascii_buffer = ""

        for (let y = Math.round(yscale / 2); y < height - yscale; y += yscale) {
            for (let x = Math.round(xscale / 2); x < width - xscale; x += xscale) {
                const merged = mergePixel(greyscale, x, y, xscale, yscale, width, height);
                ascii_buffer += gradient[Math.floor((merged / 255) * (gradient.length - 1))];
            }
            ascii_buffer += '\n';
        }

        // Update ascii
        ascii = ascii_buffer
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

</script>

<div class="p-3">
    <input bind:files type="file" accept=".jpg, .jpeg, .png" on:change={updateImage}>
    <input bind:value={gradient} on:change={generateImage} type="text">
    <input bind:value={xscale} on:change={generateImage} type="number" min="1" max="100">
    <input bind:value={yscale} on:change={generateImage} type="number" min="1" max="100">
</div>

<div class="flex">
    <div style="max-width: 300px; min-width: 300px">
        <img bind:this={preview} src={base64} on:load={generateImage} alt="">
    </div>
    <div style="font-family: monospace; overflow: auto">
        <pre><code>{ascii}</code></pre>
    </div>
</div>
