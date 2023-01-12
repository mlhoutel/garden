<script>
    export let nodes = []
    export let edges = []

    
    const OUTER_PADDING = 20

    const computeViewBox = () => {
        const bounds = { x1: 999999, y1: 9999999, x2: 0, y2: 0 }

        for (const node of nodes) {
            if (node.pos.x > bounds.x2) bounds.x2 = node.pos.x
            if (node.pos.y > bounds.y2) bounds.y2 = node.pos.y
            if (node.pos.x < bounds.x1) bounds.x1 = node.pos.x
            if (node.pos.y < bounds.y1) bounds.y1 = node.pos.y
        }

        bounds.x1 = Math.round(bounds.x1 - OUTER_PADDING)
        bounds.y1 = Math.round(bounds.y1 - OUTER_PADDING)
        bounds.x2 = Math.round(bounds.x2 - bounds.x1 + OUTER_PADDING)
        bounds.y2 = Math.round(bounds.y2 - bounds.y1 + OUTER_PADDING)

        console.log(bounds)
        return bounds
    }

    $: view_box = computeViewBox()
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="500" viewBox="{view_box.x1} {view_box.y1} {view_box.x2} {view_box.y2}">

    {#each edges as edge}
        <line class="stroke-slate-700" x1="{edge.nodeA.pos.x}" y1="{edge.nodeA.pos.y}" x2="{edge.nodeB.pos.x}" y2="{edge.nodeB.pos.y}" />
    {/each}

    {#each nodes as node}
        <circle class="fill-orange" r="{5 + node.count * 2 }" cx="{node.pos.x}" cy="{node.pos.y}" />
    {/each}

    {#each nodes as node}
        <text x="{node.pos.x + node.count * 2 + 10}" y="{node.pos.y + node.count * 2 + 10}"> {node.label} </text>
    {/each}
    
</svg>