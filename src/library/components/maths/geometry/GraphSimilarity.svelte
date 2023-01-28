<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
       var p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true, name:"Ω(ω)", color:'blue' })
       var p2 = board.create('point', [0.8, 1.2], { fixed:true, visible:true, name:"z1", color:'blue' })
       var p4 = board.create('point', [1.0, 0.0], { fixed:true, visible:false })
       var a2 = board.create('angle', [p2, p1, p4], {  visible:false })
       var ssimratio = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[-2.0,0.5,2.0]], {name:'k', snapWidth:0.05})
       var ssimrota = board.create('slider', [[-1.4,-1.4],[1.0,-1.4],[0.0,(2*Math.PI)/3,4*Math.PI]], {name:'θ', snapWidth:0.1})
       var p3 = board.create('point', [ 
       	function(){ 
       		return Math.cos(ssimrota.Value()-a2.Value()) * p1.Dist(p2) * ssimratio.Value()
       	}, 
       	function(){ 
       		return Math.sin(ssimrota.Value()-a2.Value()) * p1.Dist(p2) * ssimratio.Value()
       	}], 
       	{ fixed:true, visible:true, name:"z2", color:'red' })
       var l1 = board.create('segment', [p1, p2], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       var l2 = board.create('segment', [p1, p3], {strokeColor:'red', strokeOpacity:0.6, dash:0 })
      	var a1 = board.create('angle', [p2, p1, p3], {radius:0.2, name:'θ'})
    }
</script>

<JSXGraph {draw} />