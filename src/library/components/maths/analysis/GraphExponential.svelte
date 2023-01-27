<script>
    import JSXGraph from '$components/global/JSXGraph'

    const draw = (JXG, id) => {
        const brd = JXG.JSXGraph.initBoard(id, { boundingbox: [-10, 10, 10, -10], axis:true, pan: {enabled: false}, showCopyright:false, showNavigation:false })

        const exp = brd.create('functiongraph',[function(x){ return Math.exp(x); }],{strokecolor: 'red'});
        exp.setLabel('f(x)=exp(x)')
        exp.labelColor('red')
        
        const line = brd.create('functiongraph',[function(x){ return x; }],{strokecolor: 'grey', dash:1});
        line.setLabel('y=x')
        line.labelColor('grey')
        
        const log = brd.create('functiongraph',[function(x){ return Math.log(x); }],{strokecolor: 'blue'});
        log.setLabel('g(x)=ln(x)')
        log.labelColor('blue')
    }
</script>

<JSXGraph {draw} />