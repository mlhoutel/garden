<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
       let p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true, name:"Ω(ω)", color:'blue' })
       let p2 = board.create('point', [0.8, 1.2], { fixed:true, visible:true, name:"z1", color:'blue' })
       let p4 = board.create('point', [1.0, 0.0], { fixed:true, visible:false })
       let a2 = board.create('angle', [p2, p1, p4], {  visible:false })
       let ssimratio = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[-2.0,0.5,2.0]], {name:'k', snapWidth:0.05})
       let ssimrota = board.create('slider', [[-1.4,-1.4],[1.0,-1.4],[0.0,(2*Math.PI)/3,4*Math.PI]], {name:'θ', snapWidth:0.1})
       let p3 = board.create('point', [ 
       	function(){ 
       		return Math.cos(ssimrota.Value()-a2.Value()) * p1.Dist(p2) * ssimratio.Value()
       	}, 
       	function(){ 
       		return Math.sin(ssimrota.Value()-a2.Value()) * p1.Dist(p2) * ssimratio.Value()
       	}], 
       	{ fixed:true, visible:true, name:"z2", color:'red' })
       let l1 = board.create('segment', [p1, p2], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       let l2 = board.create('segment', [p1, p3], {strokeColor:'red', strokeOpacity:0.6, dash:0 })
      	let a1 = board.create('angle', [p2, p1, p3], {radius:0.2, name:'θ'})
    }
</script>

<JSXGraph {draw} width="400px" />