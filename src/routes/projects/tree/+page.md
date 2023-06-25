---
title: Tree
short: Tree generator
topic: simulation tree
---

<script>
    import Canvas from '$components/projects/Canvas.svelte'
    import { vec } from "$utils/projects.js"
    import { Drawable, Tree } from "./tree"

    const tree = new Tree()

    // insert colors for automatic input generation
    tree.color_branch = '#9C2C77'
    tree.color_leaf = '#FD841F'
    tree.color_debug = '#ff4040'
    
    function reset() {
        const origin = new vec(window.innerWidth / 2, window.innerHeight);
        tree.generate(origin, -Math.PI / 2)
    }

    const setup = (p5) => {
        p5.createCanvas(window.innerWidth, window.innerHeight);

        reset()
    }

    const draw = (p5) => { 
        p5.background(220);

        p5.noStroke();
        for (const drawable of tree.buffer) {
            p5.fill(drawable.terminal ? tree.color_leaf : tree.color_branch);
            p5.quad(drawable.a.x,
                    drawable.a.y,
                    drawable.b.x,
                    drawable.b.y,
                    drawable.c.x,
                    drawable.c.y,
                    drawable.d.x,
                    drawable.d.y);
        }
    }


    let values = tree

    let actions = {
        reset: {
            label: 'refresh',
            function: () => { reset() }
        }
    }
</script>

<div class="relative">
    <Canvas {setup} {draw} bind:values bind:actions />
</div>
