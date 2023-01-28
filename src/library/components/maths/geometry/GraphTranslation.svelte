<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
       var p1 = board.create('point', [0.3, -0.5], { fixed:true, visible:true, name:"z1", color:'blue' })
       var svectorx = board.create('slider', [[-1.4,-1.2],[0.8,-1.2],[-1.4,0.3,1.4]], {name:'ux', snapWidth:0.05})
       var svectory = board.create('slider', [[-1.4,-1.4],[0.8,-1.4],[-1.4,-0.2,1.4]], {name:'uy', snapWidth:0.05})
       var p2 = board.create('point', [
       	function(){return p1.X() + svectorx.Value()},
       	function(){return p1.Y() + svectory.Value()}], { fixed:true, visible:true, name:"z2", color:'red' })
       var l1 = board.create('segment', [p1, p2], {strokeColor:'red', strokeOpacity:0.6, name:'u' })
    }
</script>

<JSXGraph {draw} />