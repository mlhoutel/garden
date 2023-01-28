<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 20, 20, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false});
    	var pA = board.create('point', [5, 10], {name:'A'});

    	// Create a parallel
        var pB = board.create('point', [0, 0], {name:'B'});
        var pC = board.create('point', [10, 0], {name:'C'});
        var line_BC = board.create('line', [pB, pC], { strokecolor:'red' });
        var line_BA = board.create('line', [pB, pA]);
        var line_CA = board.create('line', [pC, pA]);
        var pParallel = board.create('point', [5, 3], { visible:false , name:' '});
        var line_DE = board.create('parallel', [line_BC, pParallel], { strokecolor:'red' });
        var pD = board.create('intersection', [line_DE, line_BA, 0], { name:'D', fillColor: 'blue'});
        var pE = board.create('intersection', [line_DE, line_CA, 0], { name:'E', fillColor: 'blue'});
    }
</script>

<JSXGraph {draw} />