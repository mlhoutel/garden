<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
        let p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true })
        let p2 = board.create('point', [1.0, 0.0], { fixed:true, visible:false })
        let c1 = board.create('circle', [p1, p2], { dash:1, strokeColor:'grey', strokeOpacity:0.6 })
        let s1 = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[0,Math.PI/4,4*Math.PI]], {name:'t', snapWidth:0.01})

        let p4 = board.create('point', [
            () => Math.cos(s1.Value()),
            () => Math.sin(s1.Value())], 
       	{name:'z = e^{it}', tracer:true})

        let p5 = board.create('point', [
            () => Math.cos(s1.Value()) + Math.cos(s1.Value()+Math.PI/2),
            () => Math.sin(s1.Value()) + Math.sin(s1.Value()+Math.PI/2)],
       	{name:'d/dt'})

       let p6 = board.create('point', [function(){return Math.cos(s1.Value())}, 0.0], {name:'cos(t)', color:'grey'})
       let p7 = board.create('point', [0.0, function(){return Math.sin(s1.Value())}], {name:'sin(t)', color:'grey'})

       board.create('segment', [p1, p4])
       board.create('segment', [p4, p5], {strokeColor:'grey', strokeOpacity:0.2 })
       board.create('segment', [p4, p6], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       board.create('segment', [p4, p7], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       board.create('angle', [p2, p1, p4], {radius:0.2, name:'t'})
       board.create('angle', [p5, p4, p1], {radius:0.1})

       board.create('text', [1.1, 0.1, '0']);
       board.create('text', [1.1, -0.1, '2 Pi']);
       board.create('text', [0.0, 1.1, 'Pi/2']);
       board.create('text', [-1.1, 0.0, 'Pi']);
       board.create('text', [0.0, -1.1, '3 Pi/2']);
    }
</script>

<JSXGraph {draw} width="400px" />