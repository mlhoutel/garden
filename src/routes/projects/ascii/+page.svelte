<script>
    let files;
    let gradient = "▓▓▒▒░░  ";
    let xscale = 10;
    let yscale = 25;

    let base64;
    let preview;

    let ascii = ("□ ■ ".repeat(30) + "\n" + "■ □ ".repeat(30) + "\n" ).repeat(10)

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
            const apy = pos_y + y;

            for (let x = 0; x < pw; x++) {
                const apx = pos_x + x;
                sum += data[apx + apy * w];
            }
        }

        return sum / (pw * ph);
    }

    function copyClipboard() {
        navigator.clipboard.writeText(ascii);
    }

</script>

<article>
    <div class="p-3 inline-flex">
        <div class="flex flex-col px-2">
            <label for="image" class="text-sm">image:</label>
            <label for="image" class="underline cursor-pointer">Click to select a file</label>
            <input bind:files type="file" accept=".jpg, .jpeg, .png" on:change={updateImage} id="image" class="hidden">
        </div>

        <div class="flex flex-col px-2">
            <label for="gradient" class="text-sm">gradient:</label>
            <input bind:value={gradient} on:change={generateImage} type="text" id="gradient" class="bg-transparent w-28">
        </div>

        <div class="flex flex-col px-2">
            <label for="scaling" class="text-sm">scale: </label>
            <div class="inline-flex">
                <input bind:value={xscale} on:change={generateImage} type="number" min="1" max="100" id="scaling" class="bg-transparent">
                <input bind:value={yscale} on:change={generateImage} type="number" min="1" max="100" class="bg-transparent">
            </div>
        </div>

    </div>
    
    <div class="min-h-[200px] flex justify-center items-center">
        {#if base64}
            <img class="max-h-[200px]" bind:this={preview} src={base64} on:load={generateImage} alt="">
        {:else}
            <p class="text-sm text-center italic ">no input image...</p>
        {/if}
    </div>

    <div class="font-mono overflow-auto mt-1 mb-10 p-3 rounded bg-dark text-white max-h-[600px] flex justify-center items-center relative">
        <button class="absolute top-2 right-2 py-1 px-2 rounded bg-dark outline outline-1 text-sm underline" on:click={copyClipboard}>copy</button>
        <pre><code>{ascii}</code></pre>
    </div>
</article>

