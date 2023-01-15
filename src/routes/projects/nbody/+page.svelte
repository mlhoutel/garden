<script>
	import CanvasP5 from "$components/global/CanvasP5.svelte";
    import { Parameters, Methods, system } from "./main"

    const sketch = (p5) => {  
        system.Step();
        system.Draw(p5);
    }
</script>

<CanvasP5 draw={sketch} params={Parameters} methods={Methods} />
