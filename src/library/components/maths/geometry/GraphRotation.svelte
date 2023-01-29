<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
    	let p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true, name:"Ω(ω)", color:'blue' })
        let p2 = board.create('point', [1.0, 0.0], { fixed:true, visible:true, name:"z1", color:'blue' })
        let srotation1 = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[0.0,(2*Math.PI)/3,4*Math.PI]], {name:'θ', snapWidth:0.1})
        let p3 = board.create('point', [
        function(){return Math.cos(srotation1.Value())},
        function(){return Math.sin(srotation1.Value())}], { fixed:true, visible:true, name:"z2", color:'red' })
        let l1 = board.create('segment', [p1, p2], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
        let l2 = board.create('segment', [p1, p3], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
        let a1 = board.create('angle', [p2, p1, p3], {radius:0.2, name:'θ'})
    }
</script>

<JSXGraph {draw} width="400px" />