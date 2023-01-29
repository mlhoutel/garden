<script>
    import JSXGraph from '$components/global/JSXGraph.svelte'

    const drawCos = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox: [-1, Math.PI, Math.PI, -1], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false })
        
        const cos = brd.create('functiongraph',[function(x){ return Math.cos(x); }, 0, Math.PI],{strokecolor: 'red'});
        cos.setLabel('cos')
        cos.labelColor('red')

        const cos_line = brd.create('functiongraph',[function(x){ return x; }, -1, Math.PI],{strokecolor: 'grey', dash:1});
        cos_line.setLabel('y=x')
        cos_line.labelColor('grey')

        const arccos = brd.create('functiongraph',[function(x){ return Math.acos(x); }, -1, Math.PI],{strokecolor: 'blue'});
        arccos.setLabel('arccos')
        arccos.labelColor('blue')
    }

    const drawSin = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox: [-Math.PI/2, Math.PI/2, Math.PI/2, -Math.PI/2], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false })
        
        let sin = brd.create('functiongraph',[function(x){ return Math.sin(x); }, -Math.PI/2, Math.PI/2],{strokecolor: 'red'});
        sin.setLabel('sin')
        sin.labelColor('red')

        let sin_line = brd.create('functiongraph',[function(x){ return x; }, -Math.PI/2, Math.PI/2],{strokecolor: 'grey', dash:1});
        sin_line.setLabel('y=x')
        sin_line.labelColor('grey')

        let arcsin = brd.create('functiongraph',[function(x){ return Math.asin(x); }, -Math.PI/2, Math.PI/2],{strokecolor: 'blue'});
        arcsin.setLabel('arcsin')
        arcsin.labelColor('blue')
    }

    const drawTan = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox: [-3, 3, 3, -3], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false })
        
        const tan = brd.create('functiongraph',[function(x){ return Math.tan(x); }, -Math.PI/2, Math.PI/2],{strokecolor: 'red'});
        tan.setLabel('tan')
        tan.labelColor('red')
        
        const cos_line = brd.create('functiongraph',[function(x){ return x; }, -3, 3],{strokecolor: 'grey', dash:1});
        cos_line.setLabel('y=x')
        cos_line.labelColor('grey')
        
        const arctan = brd.create('functiongraph',[function(x){ return Math.atan(x); }, -3, 3],{strokecolor: 'blue'});
        arctan.setLabel('arctan')
        arctan.labelColor('blue')
    }
</script>


<div class="flex flex-col lg:flex-row">
  <div><JSXGraph width="350px" height="200px" draw={drawCos} /></div>
  <div><JSXGraph width="350px" height="200px" draw={drawSin} /></div>
  <div><JSXGraph width="350px" height="200px" draw={drawTan} /></div>
</div> 