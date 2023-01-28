<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-1.5, 1.5, 1.5, -1.5], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
    	var p1 = board.create('point', [0.0, 0.0], { fixed:true, visible:true })
       var p2 = board.create('point', [1.0, 0.0], { fixed:true, visible:false })
       var c1 = board.create('circle', [p1, p2], { dash:1, strokeColor:'grey', strokeOpacity:0.6 })
       var s1 = board.create('slider', [[-1.4,-1.2],[1.0,-1.2],[0,Math.PI/4,4*Math.PI]], {name:'t', snapWidth:0.01})
       var p4 = board.create('point', [
       	function(){return Math.cos(s1.Value())},
       	function(){return Math.sin(s1.Value())}], 
       	{name:'z = e^{it}', tracer:true})
       var p5 = board.create('point', [
       	function(){return Math.cos(s1.Value()) + Math.cos(s1.Value()+Math.PI/2)},
       	function(){return Math.sin(s1.Value()) + Math.sin(s1.Value()+Math.PI/2)}],
       	{name:'d/dt'})
       var p6 = board.create('point', [function(){return Math.cos(s1.Value())}, 0.0], {name:'cos(t)', color:'grey'})
       var p7 = board.create('point', [0.0, function(){return Math.sin(s1.Value())}], {name:'sin(t)', color:'grey'})
       var l1 = board.create('segment', [p1, p4])
       var l2 = board.create('segment', [p4, p5], {strokeColor:'grey', strokeOpacity:0.2 })
       var l3 = board.create('segment', [p4, p6], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       var l4 = board.create('segment', [p4, p7], {strokeColor:'grey', strokeOpacity:0.6, dash:1 })
       var a1 = board.create('angle', [p2, p1, p4], {radius:0.2, name:'t'})
       var a2 = board.create('angle', [p5, p4, p1], {radius:0.1})
       t0 = board.create('text', [1.1, 0.1, '0']);
       t1 = board.create('text', [1.1, -0.1, '2 Pi']);
       t2 = board.create('text', [0.0, 1.1, 'Pi/2']);
       t3 = board.create('text', [-1.1, 0.0, 'Pi']);
       t4 = board.create('text', [0.0, -1.1, '3 Pi/2']);
    }
</script>

<JSXGraph {draw} />