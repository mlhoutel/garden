import { vec, RandomBetween } from "$utils/projects/utils.js"

let forest = [];

const Parameters = {
    DEBUG: true,

    PROB_NEXT: 0.95,
    PROB_BRANCH: 0.25,
    MAX_DEPTH: 20,

    MAX_BRANCH_SIZE: 30,
    MIN_BRANCH_SIZE: 5,

    MAX_BRANCH_LENGTH: 50,
    MIN_BRANCH_LENGTH: 10,

    MIN_NUM_LEAFS: 1,
    MAX_NUM_LEAFS: 3,

    LEAF_SIZE: 30,
    LEAF_LENGTH: 30,

    VAR_BRANCH_ANGLE: Math.PI / 6,
    VAR_LEAF_ANGLE: Math.PI / 2,

    COLOR_BRANCH: '#9C2C77',
    COLOR_LEAF: '#FD841F',
    COLOR_DEBUG: '#ff4040'
};

const Methods = {
    reset: {
        label: '&#8635;',
        function: () => {
            forest = [Tree(0)];
        }
    }
};

class Branch {
    /**
     * Instanciate a new branch object
     * @param {number} ang relative angle from the parent angle
     * @param {number} len length of the branch
     * @param {number} size width of the branch
     * @param {string} color hex color of the branch
     * @param {[Branch | Leaf]} childs sub elements
     */
    constructor(ang, len, size, color, childs) {
        this.ang = ang;
        this.len = len;
        this.size = size;
        this.color = color;

        this.cang = ang; // current angle
        this.vel = 0; // rotation velocity
        this.childs = childs; // child branchs

        // compute max child depth
        this.depth = Math.max(...this.childs.map((e) => 1 + e.depth), 1);
    }

    draw(p5, pos, ang) {
        // console.log(pos.x, pos.y)
        const nang = ang + this.cang;

        const rot = new vec(Math.cos(nang), Math.sin(nang));
        const end = pos.plus(rot.times(this.len));

        const pos_tan = new vec(Math.sin(ang), -Math.cos(ang));
        const pos_left = pos.plus(pos_tan.times(this.size / 2));
        const pos_right = pos.minus(pos_tan.times(this.size / 2));

        const end_tan = new vec(Math.sin(nang), -Math.cos(nang));
        const end_left = end.plus(end_tan.times(this.size / 2));
        const end_right = end.minus(end_tan.times(this.size / 2));

        p5.noStroke();
        p5.fill(this.color);
        p5.quad(
            pos_right.x,
            pos_right.y,
            pos_left.x,
            pos_left.y,
            end_left.x,
            end_left.y,
            end_right.x,
            end_right.y
        );

        if (Parameters.DEBUG) {
            p5.stroke(Parameters.COLOR_DEBUG);
            p5.line(pos.x, pos.y, end.x, end.y);
        }

        for (const child of this.childs) child.draw(p5, end, nang);
    }
}

class Leaf {
    /**
     * Instanciate a new leaf object
     * @param {number} ang relative angle from the parent angle
     * @param {number} len length of the leaf
     * @param {number} size width of the leaf
     * @param {string} color hex color of the leaf
     */
    constructor(ang, len, size, color) {
        this.ang = ang;
        this.len = len;
        this.size = size;
        this.color = color;

        this.cang = ang; // current angle
        this.vel = 0; // rotation velocity
        this.depth = 1; // max child depth
    }

    draw(p5, pos, ang) {
        const nang = ang + this.cang;

        const rot = new vec(Math.cos(nang), Math.sin(nang));
        const end = pos.plus(rot.times(this.len));

        const tan = new vec(Math.sin(nang), -Math.cos(nang));
        const mid = pos.plus(end.minus(pos).divide(2));
        const left = mid.plus(tan.times(this.size / 2));
        const right = mid.minus(tan.times(this.size / 2));

        p5.noStroke();
        p5.fill(this.color);
        p5.quad(pos.x, pos.y, left.x, left.y, end.x, end.y, right.x, right.y);

        if (Parameters.DEBUG) {
            p5.stroke(Parameters.COLOR_DEBUG);
            p5.line(pos.x, pos.y, end.x, end.y);
        }
    }
}

function Tree(depth) {
    const rand_rotation = RandomBetween(-Parameters.VAR_BRANCH_ANGLE, Parameters.VAR_BRANCH_ANGLE);

    const childs = [];

    const has_next = RandomBetween(0, 1) < Parameters.PROB_NEXT;

    if (depth < Parameters.MAX_DEPTH && has_next) {
        // We draw one or several branches

        let has_branch = RandomBetween(0, 1) < Parameters.PROB_BRANCH;
        while (has_branch) {
            has_branch = RandomBetween(0, 1) < Parameters.PROB_BRANCH;
            childs.push(Tree(depth + 1));
        }

        childs.push(Tree(depth + 1));
    } else {
        // We must draw all leaves
        const num_leafs = RandomBetween(Parameters.MIN_NUM_LEAFS, Parameters.MAX_NUM_LEAFS);

        for (let i = 0; i < num_leafs; i++) {
            const rand_leaf = RandomBetween(-Parameters.VAR_LEAF_ANGLE, Parameters.VAR_LEAF_ANGLE);
            childs.push(new Leaf(rand_leaf, Parameters.LEAF_LENGTH, Parameters.LEAF_SIZE, Parameters.COLOR_LEAF));
        }
    }

    const curr = new Branch(rand_rotation, 0, 0, Parameters.COLOR_BRANCH, childs);

    const branch_size =
        Parameters.MIN_BRANCH_SIZE +
        (Parameters.MAX_BRANCH_SIZE - Parameters.MIN_BRANCH_SIZE) * (1 - (Parameters.MAX_DEPTH - curr.depth) / Parameters.MAX_DEPTH);
    const branch_length =
        Parameters.MIN_BRANCH_LENGTH +
        (Parameters.MAX_BRANCH_LENGTH - Parameters.MIN_BRANCH_LENGTH) * (1 - (Parameters.MAX_DEPTH - curr.depth) / Parameters.MAX_DEPTH);

    curr.size = branch_size;
    curr.len = branch_length;

    return curr;
}

export { Branch, Leaf, Tree, Parameters, Methods, forest }