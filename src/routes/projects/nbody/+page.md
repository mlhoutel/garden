---
short: Nbody simple simulation with euler integration
topic: simulation euler
---

<script>
	import { Pause, Play, Refresh } from '@steeze-ui/heroicons';

    import Canvas from '$components/projects/Canvas.svelte'

    import { Body, System } from "./nbody"
    import { Random } from "$utils/projects.js"

    let paused = false
    let particles_number = 200

    const system = new System()

    system.reset = function() {
        system.bodies = []
        system.trails = []

        for (let i = 0; i < particles_number; i++) {
            system.add(
                new Body(
                    Random(window.innerWidth),
                    Random(window.innerHeight),
                    [0, 0, 0]
                )
            );
        }
    }

    system.draw = function(p5) {
        p5.strokeWeight(3);

        for (let i = 0; i < system.trails.length; i++) {
            const body = system.bodies[i]
            const trail = system.trails[i]
            
            p5.stroke(body.color);

            for (let j = 0; j < trail.length - 1; j++) {
                p5.line(
                    trail[j].x,
                    trail[j].y,
                    trail[j + 1].x,
                    trail[j + 1].y
                );
            }
        }
    }


    const setup = (p5) => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
        system.reset()
    };
  
    const draw = (p5) => {
        p5.background(220);
        if (!paused) system.step();
        system.draw(p5)
    };

    let values = system

    let actions = {
        reset: {
            label: Refresh,
            function: () => { system.reset() }
        },
        pause: {
            label: paused ? Play : Pause,
            function: () => { paused = !paused }
        }
    }
</script>

<div class="relative">
    <Canvas {setup} {draw} bind:values bind:actions />
</div>

