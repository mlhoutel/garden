<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        var board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 20, 20, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false});
    	var p1 = board.create('point',[4, 0], {name:'', size:4, fixed:false, snapSizeY: 100, snapToGrid: true});
        var p2 = board.create('point',[0, 0], {name:'', size:4, fixed:true, color: 'blue'});
        var p3 = board.create('point',[0, 3], {name:'', size:4, fixed:false, snapSizeX: 100, snapToGrid: true});
        a = board.create('angle',[p1, p2, p3], {radius:0.5});

        // a.setAngle(function() {return Math.PI / 2; });
        var triangle = board.create('polygon',[p1,p2,p3], {fillOpacity:0.05});
        var p1_12 = board.create('point',[p1, board.create('transform', [-Math.PI/2, p2], {type:'rotate'})], {name:'', size:0});
        var p2_12 = board.create('point',[p2, board.create('transform', [Math.PI/2, p1], {type:'rotate'})], {name:'', size:0});
        
        var square_12 = board.create('polygon',[p1, p2, p1_12, p2_12], {fillOpacity:0.5, name:'B^2', withLabel: true, fillColor: 'blue'});
        var p1_13 = board.create('point',[p1, board.create('transform', [Math.PI/2, p3], {type:'rotate'})], {name:'', size:0});
        var p2_13 = board.create('point',[p3, board.create('transform', [-Math.PI/2, p1], {type:'rotate'})], {name:'', size:0});
        
        var square_13 = board.create('polygon',[p1, p3, p1_13, p2_13], {fillOpacity:0.5, name:'C^2', withLabel: true, fillColor: 'green'});
        var p1_23 = board.create('point',[p2, board.create('transform', [-Math.PI/2, p3], {type:'rotate'})], {name:'', size:0});
        var p2_23 = board.create('point',[p3, board.create('transform', [Math.PI/2, p2], {type:'rotate'})], {name:'', size:0});
        
        var square_23 = board.create('polygon',[p2, p3, p1_23, p2_23], {fillOpacity:0.5, name:'A^2', withLabel: true, fillColor: 'yellow'});
        
        board.update()
        board.on('update', function(e, i){
            square_12.name='B^2='+Math.round(square_12.Area())
            square_13.name='C^2='+Math.round(square_13.Area())
            square_23.name='A^2='+Math.round(square_23.Area())
        });
        board.update()
    }
</script>

<JSXGraph {draw} />