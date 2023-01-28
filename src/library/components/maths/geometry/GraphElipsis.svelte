<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
    	var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 10, 10, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
        // Create an Ellipse by three points
        var ellipse_A = board.create('point', [-1,4]);
        var ellipse_B = board.create('point', [-1,-4]);
        var ellipse_C = board.create('point', [1,1]);
        var ellipse_el = board.create('ellipse',[ellipse_A,ellipse_B,ellipse_C]);
    }
</script>

<JSXGraph {draw} />