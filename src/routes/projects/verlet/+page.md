---
title: Verlet
short: Verlet simulation
topic: simulation verlet
---

<script>

    import Canvas from '$components/projects/Canvas.svelte'
    import { vec, RandomInt } from "$utils/projects.js"
    import { System, RopeSquare, Grid, Square } from "./verlet"

    const system = new System(new vec(0,0));

    let paused = false

    function reset() {
        system.size = new vec(window.innerWidth, window.innerHeight)
        system.bodies = [];
        system.constraints = [];

        system.addStruct(Grid(new vec(100, 100), 20, 30));

        const start_rope = 600
        const space_rope = 200
        const number_rope = Math.floor((window.innerWidth - start_rope) / space_rope)

        for (let i = 1; i < number_rope; i++) {
            
            system.addStruct(RopeSquare(new vec(start_rope + i * space_rope, 0), i * 5, 10));
        }

        const start_squares = 600
        const space_squares = 70
        const number_square = Math.floor((window.innerWidth - start_squares) / space_squares)

        for (let i = 0; i < number_square; i++) {
            system.addStruct(
                Square(
                    new vec(start_squares + i * space_squares, RandomInt(500)),
                    new vec(40, 40)
                )
            );
        }
    }

    
    const setup = (p5) => {
        p5.createCanvas(window.innerWidth, window.innerHeight);

        reset()
    }

    const draw = (p5) => { 
        p5.background(220);

        if (!paused) system.step()

        for (const body of system.bodies) {
            p5.fill('#000000');
            p5.stroke('#000000');
            p5.circle(body.cpos.x, body.cpos.y, body.size);
        }

        for (const constrain of system.constraints) {
            p5.fill('#000000');
            p5.stroke('#000000');
            p5.line(constrain.a.cpos.x, constrain.a.cpos.y, constrain.b.cpos.x, constrain.b.cpos.y);
        }
    }

    
    let values = system

    let actions = {
        reset: {
            label: 'refresh',
            function: () => { reset() }
        },
        pause: {
            label: paused ? 'play' : 'pause',
            function: () => { paused = !paused }
        }
    }
    
</script>

<div class="relative">
    <Canvas {setup} {draw} bind:values bind:actions />
</div>
