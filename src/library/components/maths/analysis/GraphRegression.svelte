<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const draw = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox:[-2, 100, 220, -70], grid: false ,axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false, showFullscreen:true })
        brd.suspendUpdate();

		let pointlist = [];
		let degree = brd.create('slider', [[10,90], [100,90], [1,1,30]], { name: 'degree', snapWidth: 1 });     
		let number = brd.create('slider', [[10,80], [100,80], [3,10,30]], { name: 'number', snapWidth: 1 }); 

		for (let i = 0; i < number.Value(); i++) { pointlist.push(brd.create('point', [200*Math.random() , 30*Math.random()+20 ], { style: 4, color: 'black', name:" "})); }
		
        brd.unsuspendUpdate();
		
        let regression = JXG.Math.Numerics.regressionPolynomial(degree, pointlist); 
		let reg = brd.create('functiongraph',[regression],{strokeColor:'red'});
		
		brd.create('text',[20,-40, function(){ return "r(x) = " + regression.getTerm();} ],{strokeColor:'black',fontSize:'14px'});

		number.on('drag', function() { numberPoints(); });

		function numberPoints() {
			brd.suspendUpdate();

			if (!(number.Value() == 2 && degree.Value() >= 1)) {
				for (let i = 0; i < pointlist.length; i++){ brd.removeObject(pointlist[i]) }

				pointlist = [];

				for (let i = 0; i < number.Value(); i++) { pointlist.push(brd.create('point', [200*Math.random() , 30*Math.random()+20 ], { style:4, color:"black", name:" "})); }

				regression = JXG.Math.Numerics.regressionPolynomial(degree, pointlist);
				brd.removeObject(reg)
				reg = brd.create('functiongraph',[regression], { strokeColor: 'red' });
			}
            
			brd.unsuspendUpdate();
		}
    }
</script>

<JSXGraph {draw} />