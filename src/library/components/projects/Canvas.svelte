<script>
    import P5 from 'p5-svelte';
    import Values from './Values.svelte'
    import Actions from './Actions.svelte'

    export let setup = (p5) => {}
    export let draw = (p5) => {}
    
    let fps = 0

    const sketch = (p5) => {
        p5.setup = () => {
            p5.frameRate(60)
            setup(p5)
        },
        p5.draw = () => {
            fps = p5.frameRate()
            draw(p5)
        }
    }

    export let values = {}
    export let actions = {}
</script>


<div class="relative font-mono">
    <div class="absolute top-1 left-1">
        <Values bind:values />
    </div>
    <div class="absolute top-3 right-14">
        <span class="text-dark text-xl font-bold">{(1/fps * 1000).toFixed(2)} ms</span>
    </div>
    <div class="absolute top-1 right-1">
        <Actions bind:actions />
    </div>

    <P5 {sketch} />
</div>

