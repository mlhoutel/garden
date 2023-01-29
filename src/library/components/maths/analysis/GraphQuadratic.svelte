<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox: [-10, 10, 10, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false })

        const quadratic_a = brd.create('slider',[[-9,-3], [7,-3], [-10,1,10]], { name: 'a', snapWidth: 0.01 })
        const quadratic_b = brd.create('slider',[[-9,-5], [7,-5], [-10,0,10]], { name: 'b', snapWidth: 0.01 })
        const quadratic_c = brd.create('slider',[[-9,-7], [7,-7], [-10,0,10]], { name: 'c', snapWidth: 0.01 })

        brd.create('functiongraph', [
            (x) => {
                const a = quadratic_a.Value()
                const b = quadratic_b.Value()
                const c = quadratic_c.Value()

                return a * x * x + b * x + c
            } 
        ]);
    }
</script>

<JSXGraph {draw} />