import { vec, RandomBetween } from "$utils/projects.js"

class Branch {
    /**
     * Instanciate a new branch object
     * @param {number} ang relative angle from the parent angle
     * @param {number} len length of the branch
     * @param {number} size width of the branch
     * @param {[Branch | Leaf]} childs sub elements
     */
    constructor(ang, len, size, childs) {
        this.ang = ang;
        this.len = len;
        this.size = size;

        this.childs = childs; // child branchs

        // compute max child depth
        this.depth = Math.max(...this.childs.map((e) => 1 + e.depth), 1);
    }

    generate(buffer, pos, ang) {
        const nang = ang + this.ang;

        const rot = new vec(Math.cos(nang), Math.sin(nang));
        const end = pos.plus(rot.times(this.len));

        const pos_tan = new vec(Math.sin(ang), -Math.cos(ang));
        const pos_left = pos.plus(pos_tan.times(this.size / 2));
        const pos_right = pos.minus(pos_tan.times(this.size / 2));

        const end_tan = new vec(Math.sin(nang), -Math.cos(nang));
        const end_left = end.plus(end_tan.times(this.size / 2));
        const end_right = end.minus(end_tan.times(this.size / 2));
        
        buffer.push(new Drawable(false, pos_right, pos_left, end_left, end_right))

        for (const child of this.childs) child.generate(buffer, end, nang);
    }
}

class Leaf {
    /**
     * Instanciate a new leaf object
     * @param {number} ang relative angle from the parent angle
     * @param {number} len length of the leaf
     * @param {number} size width of the leaf
     */
    constructor(ang, len, size) {
        this.ang = ang;
        this.len = len;
        this.size = size;

        this.ang = ang; // current angle
        this.depth = 1; // max child depth
    }

    generate(buffer, pos, ang) {
        const nang = ang + this.ang;

        const rot = new vec(Math.cos(nang), Math.sin(nang));
        const end = pos.plus(rot.times(this.len));

        const tan = new vec(Math.sin(nang), -Math.cos(nang));
        const mid = pos.plus(end.minus(pos).divide(2));
        const left = mid.plus(tan.times(this.size / 2));
        const right = mid.minus(tan.times(this.size / 2));

        buffer.push(new Drawable(true, pos, left, end, right))
    }
}

/**
 * Serialize datas for drawing in a Quad object
 */
class Drawable {
    /**
     * Instanciate a new Drawable object
     * @param {boolean} terminal
     * @param {vec} a 
     * @param {vec} b 
     * @param {vec} c 
     * @param {vec} d 
     */
    constructor(terminal, a, b, c, d) {
        this.terminal = terminal
        this.a = a
        this.b = b
        this.c = c
        this.d = d
    }
}

/**
 * Recursively generate layers and branch and store them in a Tree structure.
 * @param {number} depth current depth (start a 0)
 * @returns {Branch} the root of the tree
 */

function Prepare(depth, params) {
    const rand_rotation = RandomBetween(-params.branch_angle, params.branch_angle);

    const childs = [];

    const has_next = RandomBetween(0, 1) < params.prob_next;

    if (depth < params.max_depth && has_next) {

        // We draw one or several branches
        let has_branch = RandomBetween(0, 1) < params.prob_branch;

        while (has_branch) {
            has_branch = RandomBetween(0, 1) < params.prob_branch;
            childs.push(Prepare(depth + 1, params));
        }

        childs.push(Prepare(depth + 1, params));
    } else {

        // We must draw all leaves
        const num_leafs = RandomBetween(params.min_leafs_number, params.max_leafs_number);

        for (let i = 0; i < num_leafs; i++) {
            const rand_leaf = RandomBetween(-params.leaf_angle, params.leaf_angle);
            childs.push(new Leaf(rand_leaf, params.leaf_length, params.leaf_size));
        }
    }

    const curr = new Branch(rand_rotation, 0, 0, childs);

    const branch_size =
        params.min_branch_size +
        (params.max_branch_size - params.min_branch_size) * 
        (1 - (params.max_depth - curr.depth) / params.max_depth);

    const branch_length =
        params.min_branch_length +
        (params.max_branch_length - params.min_branch_length) *
        (1 - (params.max_depth - curr.depth) / params.max_depth);

    curr.size = branch_size;
    curr.len = branch_length;

    return curr;
}

class Tree {
    constructor() {
        this.buffer = []  // store drawable objects

        this.prob_next = 0.95
        this.prob_branch = 0.25
        this.max_depth = 20
        this.max_branch_size = 30
        this.min_branch_size = 5
        this.max_branch_length = 50
        this.min_branch_length = 10
        this.min_leafs_number = 1
        this.max_leafs_number = 3
        this.leaf_size = 30
        this.leaf_length = 30
        this.branch_angle = Math.PI / 6
        this.leaf_angle = Math.PI / 2
    }

    generate(pos, ang) {
        this.buffer = []  

        const struct = Prepare(0, {
            prob_next: this.prob_next, 
            prob_branch: this.prob_branch, 
            max_depth: this.max_depth,
            max_branch_size: this.max_branch_size,
            min_branch_size: this.min_branch_size,
            max_branch_length: this.max_branch_length,
            min_branch_length: this.min_branch_length,
            min_leafs_number: this.min_leafs_number,
            max_leafs_number: this.max_leafs_number,
            leaf_size: this.leaf_size,
            leaf_length: this.leaf_length,
            branch_angle: this.branch_angle,
            leaf_angle: this.leaf_angle
        })
        
        struct.generate(this.buffer, pos, ang)
    }
}

export { Drawable, Tree }