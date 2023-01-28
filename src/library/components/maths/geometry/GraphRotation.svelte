<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
    	var p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true, name:"Ω(ω)", color:'blue' })
        var p2 = board.create('point', [1.0, 0.0], { fixed:true, visible:true, name:"z1", color:'blue' })
        var srotation1 = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[0.0,(2*Math.PI)/3,4*Math.PI]], {name:'θ', snapWidth:0.1})
        var p3 = board.create('point', [
        function(){return Math.cos(srotation1.Value())},
        function(){return Math.sin(srotation1.Value())}], { fixed:true, visible:true, name:"z2", color:'red' })
        var l1 = board.create('segment', [p1, p2], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
        var l2 = board.create('segment', [p1, p3], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
        var a1 = board.create('angle', [p2, p1, p3], {radius:0.2, name:'θ'})
    }
</script>

<JSXGraph {draw} />