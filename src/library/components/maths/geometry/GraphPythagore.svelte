<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        let board = JXG.JSXGraph.initBoard(id, {boundingbox: [-10, 20, 20, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false});
    	let p1 = board.create('point',[4, 0], {name:'', size:4, fixed:false, snapSizeY: 100, snapToGrid: true});
        let p2 = board.create('point',[0, 0], {name:'', size:4, fixed:true, color: 'blue'});
        let p3 = board.create('point',[0, 3], {name:'', size:4, fixed:false, snapSizeX: 100, snapToGrid: true});
        let a = board.create('angle',[p1, p2, p3], { radius:0.5 });

        // a.setAngle(function() {return Math.PI / 2; });
        let triangle = board.create('polygon',[p1,p2,p3], {fillOpacity:0.05});
        let p1_12 = board.create('point',[p1, board.create('transform', [-Math.PI/2, p2], {type:'rotate'})], {name:'', size:0});
        let p2_12 = board.create('point',[p2, board.create('transform', [Math.PI/2, p1], {type:'rotate'})], {name:'', size:0});
        
        let square_12 = board.create('polygon',[p1, p2, p1_12, p2_12], {fillOpacity:0.5, name:'B^2', withLabel: true, fillColor: 'blue'});
        let p1_13 = board.create('point',[p1, board.create('transform', [Math.PI/2, p3], {type:'rotate'})], {name:'', size:0});
        let p2_13 = board.create('point',[p3, board.create('transform', [-Math.PI/2, p1], {type:'rotate'})], {name:'', size:0});
        
        let square_13 = board.create('polygon',[p1, p3, p1_13, p2_13], {fillOpacity:0.5, name:'C^2', withLabel: true, fillColor: 'blue'});
        let p1_23 = board.create('point',[p2, board.create('transform', [-Math.PI/2, p3], {type:'rotate'})], {name:'', size:0});
        let p2_23 = board.create('point',[p3, board.create('transform', [Math.PI/2, p2], {type:'rotate'})], {name:'', size:0});
        
        let square_23 = board.create('polygon',[p2, p3, p1_23, p2_23], {fillOpacity:0.5, name:'A^2', withLabel: true, fillColor: 'blue'});
        
        board.update()
        board.on('update', function(e, i){
            square_12.name='B^2='+Math.round(square_12.Area())
            square_13.name='C^2='+Math.round(square_13.Area())
            square_23.name='A^2='+Math.round(square_23.Area())
        });
        board.update()
    }
</script>

<JSXGraph {draw} width="400px" />