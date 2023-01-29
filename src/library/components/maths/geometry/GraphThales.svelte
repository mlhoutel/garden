<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 20, 20, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false});
    	let pA = board.create('point', [5, 10], {name:'A'});

    	// Create a parallel
        let pB = board.create('point', [0, 0], {name:'B'});
        let pC = board.create('point', [10, 0], {name:'C'});
        let line_BC = board.create('line', [pB, pC], { strokecolor:'red' });
        let line_BA = board.create('line', [pB, pA]);
        let line_CA = board.create('line', [pC, pA]);
        let pParallel = board.create('point', [5, 3], { visible:false , name:' '});
        let line_DE = board.create('parallel', [line_BC, pParallel], { strokecolor:'red' });
        let pD = board.create('intersection', [line_DE, line_BA, 0], { name:'D', fillColor: 'blue'});
        let pE = board.create('intersection', [line_DE, line_CA, 0], { name:'E', fillColor: 'blue'});
    }
</script>

<JSXGraph {draw} width="400px" />