<script>
	import CanvasP5 from "$components/global/CanvasP5.svelte";
    import { vec } from "$utils/projects/utils.js"
    import { Parameters, Methods, forest } from "./main"

    const sketch = (p5) => {  

        const origin = new vec(window.innerWidth / 2, window.innerHeight);

        for (const tree of forest) {
            tree.draw(p5, origin, -Math.PI / 2);
        }
    }
</script>

<CanvasP5 draw={sketch} params={Parameters} methods={Methods} />
