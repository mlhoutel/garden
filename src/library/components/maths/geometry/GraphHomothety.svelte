<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
       let p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true, name:"Ω(ω)", color:'blue' })
       let p2 = board.create('point', [0.8, 1.2], { fixed:true, visible:true, name:"z1", color:'blue' })
       let sratio = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[-2.0,1.2,2.0]], {name:'k', snapWidth:0.05})
       let p3 = board.create('point', [ function(){ return p2.X()*sratio.Value() }, function(){ return p2.Y()*sratio.Value()}], { fixed:true, visible:true, name:"z2", color:'red' })
       let l1 = board.create('segment', [p1, p2], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       let l2 = board.create('segment', [p1, p3], {strokeColor:'red', strokeOpacity:0.6, dash:0 })
    }
</script>

<JSXGraph {draw} width="400px" />