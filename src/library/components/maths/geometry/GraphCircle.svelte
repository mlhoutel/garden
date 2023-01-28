<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
    	var board = JXG.JSXGraph.initBoard(id, {boundingbox: [0, 10, 10, 0], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
    	var p1 = board.create('point', [4.0, 4.0])
        var p2 = board.create('point', [2.0, 2.0])
    }
</script>

<JSXGraph {draw} />