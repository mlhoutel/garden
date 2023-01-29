<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
    	let board = JXG.JSXGraph.initBoard(id, {boundingbox: [0, 10, 10, 0], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false})
    	let p1 = board.create('point', [4.0, 4.0])
        let p2 = board.create('point', [2.0, 2.0])
        board.create('circle', [p1, p2])
    }
</script>

<JSXGraph {draw} width="400px" />