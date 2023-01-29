<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
    	let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 10, 10, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
        // Create an Ellipse by three points
        let ellipse_A = board.create('point', [-1,4]);
        let ellipse_B = board.create('point', [-1,-4]);
        let ellipse_C = board.create('point', [1,1]);
        let ellipse_el = board.create('ellipse',[ellipse_A,ellipse_B,ellipse_C]);
    }
</script>

<JSXGraph {draw} width="400px" />