<script>
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    export let draw = (JXG, id) => {}
    export let width = "100%"
    export let heigth = "400px"

    const id = uuidv4()

    onMount(async () => {
        const JXG = await import('jsxgraph');

        draw(JXG, id)
    })

</script>

<div id={id} class="jxgbox py-3" style="width: {width}; height: {heigth}" />

