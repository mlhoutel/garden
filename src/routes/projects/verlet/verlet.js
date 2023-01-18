import { vec, RandomInt } from "$utils/projects.js"

const CORPSE_SIZE = 10
const CONSTRAINT_DAMPING = 0.5
const GRAVITY = 0.1

class Body {
  constructor(pos, size) {
    this.cpos = pos;
    this.lpos = pos;
    this.static = false;
    this.size = size;
  }

  step() {
    if (this.static) {
      this.cpos = this.lpos;
      return;
    }

    const vel = this.cpos.minus(this.lpos);
    this.lpos = this.cpos;
    this.cpos = this.cpos.plus(vel);
  }

  bounds(size) {
    const half = this.size / 2;
    if (this.cpos.y < half) {
      this.cpos.y = half + Math.abs(this.cpos.y);
    } else if (this.cpos.y > size.y - half) {
      this.cpos.y = 2 * (size.y - half) - this.cpos.y;
    }

    if (this.cpos.x < half) {
      this.cpos.x = half + Math.abs(this.cpos.x);
    } else if (this.cpos.x > size.x - half) {
      this.cpos.y = 2 * (size.x - half) - this.cpos.x;
    }
  }

  gravity() {
    this.cpos.y += GRAVITY;
  }
}

class Constraint {
  constructor(a, b) {
    this.a = a;
    this.b = b;

    this.size = this.a.cpos.minus(this.b.cpos).length();
  }

  step() {
    const csize = this.a.cpos.minus(this.b.cpos).length();
    const diff = csize - this.size;
    const norm = this.a.cpos.minus(this.b.cpos).divide(csize);

    this.a.cpos = this.a.cpos.minus(
      norm.times(0.5 * diff * CONSTRAINT_DAMPING)
    );
    this.b.cpos = this.b.cpos.plus(
      norm.times(0.5 * diff * CONSTRAINT_DAMPING)
    );
  }

}

class System {
  constructor(size) {
    this.bodies = [];
    this.constraints = [];
    this.size = size
  }

  step() {
    for (let body of this.bodies) {
      body.gravity();
      body.bounds(this.size);
      body.step();
    }

    for (let constraint of this.constraints) {
      constraint.step();
    }
  }

  addBody(body) {
    this.bodies.push(body);
  }

  addConstraint(constraint) {
    this.constraints.push(constraint);
  }

  addStruct(struct) {
    for (let body of struct.bodies) {
      this.addBody(body);
    }

    for (let constraint of struct.constraints) {
      this.addConstraint(constraint);
    }
  }
}

/**
 * Return a square struct
 * @param {*} pos
 * @param {*} size
 * @param {*} color
 * @returns
 */
function Square(pos, size) {
  const half = size.divide(2);
  const ihalf = new vec(-half.y, half.x);

  const s = {
    bodies: [
      new Body(pos.minus(half), CORPSE_SIZE),
      new Body(pos.minus(ihalf), CORPSE_SIZE),
      new Body(pos.plus(half), CORPSE_SIZE),
      new Body(pos.plus(ihalf), CORPSE_SIZE),
    ],
    constraints: [],
  };

  for (let i = 0; i < s.bodies.length - 1; i++) {
    for (let j = i + 1; j < s.bodies.length; j++) {
      s.constraints.push(new Constraint(s.bodies[i], s.bodies[j]));
    }
  }
  return s;
}

/**
 * Add a body to the shape and link it
 * @param {*} shape
 * @param {*} pos
 */
function Rope(shape, body) {
  shape.constraints.push(
    new Constraint(body, shape.bodies[shape.bodies.length - 1])
  );

  shape.bodies.push(body);

  return shape;
}

function RopeSquare(pos, nrope, lrope) {
  const s = new Square(pos, new vec(40, 40), [0, 0, 0]);

  // Add the rope
  for (let i = 0; i < nrope; i++) {
    Rope(
      s,
      new Body(pos.minus(new vec(0, i * lrope)), CORPSE_SIZE, [0, 0, 0])
    );
  }

  // Fix the last point
  s.bodies[s.bodies.length - 1].static = true;

  return s;
}

function Grid(pos, points, sparse) {
  const s = { bodies: [], constraints: [] };

  // Points
  for (let i = 0; i < points; i++) {
    for (let j = 0; j < points; j++) {
      s.bodies.push(
        new Body(
          pos.plus(new vec(j * sparse, i * sparse)),
          CORPSE_SIZE,
          [0, 0, 0]
        )
      );
    }
  }

  // Fix top ones

  for (let i = 0; i < points; i++) {
    s.bodies[i].static = true;
  }

  // Horizontal
  for (let i = 0; i < points; i++) {
    for (let j = 0; j < points - 1; j++) {
      const bA = s.bodies[i * points + j];
      const bB = s.bodies[i * points + j + 1];
      s.constraints.push(new Constraint(bA, bB, [0, 0, 0]));
    }
  }

  // Vertical
  for (let i = 0; i < points; i++) {
    for (let j = 0; j < points - 1; j++) {
      const bA = s.bodies[i + j * points];
      const bB = s.bodies[i + (j + 1) * points];
      s.constraints.push(new Constraint(bA, bB, [0, 0, 0]));
    }
  }

  return s;
}

export { System, Constraint, Body, Grid, RopeSquare, Rope, Square }