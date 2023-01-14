let holders = {};
let forest = [];

const V = {
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

  COLOR_BRANCH: "#9C2C77",
  COLOR_LEAF: "#FD841F",
  COLOR_DEBUG: "#ff4040",
};

const A = {
  reset: {
    label: "&#8635;",
    function: () => {
      for (const [key, input] of Object.entries(holders.inputs)) {
        if (typeof V[key] == "boolean") {
          V[key] = input.checked();
        } else {
          V[key] = input.value();
        }
      }

      forest = [Tree(0)];
      console.log({ forest });
    },
  },
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

  draw(pos, ang) {
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

    noStroke();
    fill(this.color);
    quad(
      pos_right.x,
      pos_right.y,
      pos_left.x,
      pos_left.y,
      end_left.x,
      end_left.y,
      end_right.x,
      end_right.y
    );

    if (V.DEBUG) {
      stroke(V.COLOR_DEBUG);
      line(pos.x, pos.y, end.x, end.y);
    }

    for (const child of this.childs) child.draw(end, nang);
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

  draw(pos, ang) {
    const nang = ang + this.cang;

    const rot = new vec(Math.cos(nang), Math.sin(nang));
    const end = pos.plus(rot.times(this.len));

    const tan = new vec(Math.sin(nang), -Math.cos(nang));
    const mid = pos.plus(end.minus(pos).divide(2));
    const left = mid.plus(tan.times(this.size / 2));
    const right = mid.minus(tan.times(this.size / 2));

    noStroke();
    fill(this.color);
    quad(pos.x, pos.y, left.x, left.y, end.x, end.y, right.x, right.y);

    if (V.DEBUG) {
      stroke(V.COLOR_DEBUG);
      line(pos.x, pos.y, end.x, end.y);
    }
  }
}

function Tree(depth) {
  const rand_rotation = RandomBetween(-V.VAR_BRANCH_ANGLE, V.VAR_BRANCH_ANGLE);

  const childs = [];

  const has_next = RandomBetween(0, 1) < V.PROB_NEXT;

  if (depth < V.MAX_DEPTH && has_next) {
    // We draw one or several branches

    let has_branch = RandomBetween(0, 1) < V.PROB_BRANCH;
    while (has_branch) {
      has_branch = RandomBetween(0, 1) < V.PROB_BRANCH;
      childs.push(Tree(depth + 1));
    }

    childs.push(Tree(depth + 1));
  } else {
    // We must draw all leaves
    const num_leafs = RandomBetween(V.MIN_NUM_LEAFS, V.MAX_NUM_LEAFS);

    for (let i = 0; i < num_leafs; i++) {
      const rand_leaf = RandomBetween(-V.VAR_LEAF_ANGLE, V.VAR_LEAF_ANGLE);
      childs.push(
        new Leaf(rand_leaf, V.LEAF_LENGTH, V.LEAF_SIZE, V.COLOR_LEAF)
      );
    }
  }

  const curr = new Branch(rand_rotation, 0, 0, V.COLOR_BRANCH, childs);

  const branch_size =
    V.MIN_BRANCH_SIZE +
    (V.MAX_BRANCH_SIZE - V.MIN_BRANCH_SIZE) *
      (1 - (V.MAX_DEPTH - curr.depth) / V.MAX_DEPTH);
  const branch_length =
    V.MIN_BRANCH_LENGTH +
    (V.MAX_BRANCH_LENGTH - V.MIN_BRANCH_LENGTH) *
      (1 - (V.MAX_DEPTH - curr.depth) / V.MAX_DEPTH);

  curr.size = branch_size;
  curr.len = branch_length;

  return curr;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  holders = inputs(V, A, A.reset.function); // draw inputs
  A.reset.function(); // draw tree
}

function draw() {
  background(255);

  const origin = new vec(window.innerWidth / 2, window.innerHeight);

  for (const tree of forest) {
    tree.draw(origin, -Math.PI / 2, 0);
  }

  inputsUpdate(V, holders);
  labels(V); // draw labels
  fps();
}
