<script>
    import "$styles/canvasP5.css"

    import { onMount } from 'svelte';

    export let draw = (p5) => {};
    export let params = {}
    export let methods = {}

    onMount(async () => {
		const library = await import("p5");
		const { default: p5 } = library;
        
        const { inputs, update, labels, fps } = await import("$utils/projects/layout.js")

        let holders = {}

        new p5((p5) => {
            p5.setup = () => {
                const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('p5-sketch-holder');
                
                holders = inputs(p5, params, methods, methods?.reset?.function);

                if (methods?.reset?.function) methods.reset.function(); // reset state
            }
            
            p5.draw = () => {
                p5.background(255);

                draw(p5) // injected update function

                update(p5, params, holders);
                labels(p5, params);
                fps(p5);
            }
            
        })
    })
</script>

<div class="relative">
    <div id="p5-sketch-holder" />
</div>