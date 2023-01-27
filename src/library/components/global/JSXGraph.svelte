<script>
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    export let draw = (JXG, id) => {}

    const id = uuidv4()

    onMount(async () => {
        const JXG = await import('jsxgraph');

        draw(JXG, id)
    })

</script>

<div id={id} class="jxgbox" style="width:800px; height:400px" />

