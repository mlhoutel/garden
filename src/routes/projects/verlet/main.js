import { vec, RandomInt } from "$utils/projects/utils.js"

let system = undefined;

const Parameters = {
  DEBUG: false,
  STEP_GRAVITY: 0.1,
  CONSTRAINT_DAMPING: 0.5,
  CORPSE_SIZE: 10,
};

const Methods = {
  reset: {
      label: "&#8634;",
      function: () => { reset() },
  },
};

class Body {
  constructor(pos, size, color) {
    this.cpos = pos;
    this.lpos = pos;
    this.static = false;
    this.size = size;
    this.color = color;
  }

  Step() {
    if (this.static) {
      this.cpos = this.lpos;
      return;
    }

    const vel = this.cpos.minus(this.lpos);
    this.lpos = this.cpos;
    this.cpos = this.cpos.plus(vel);
  }

  Bounds(p5) {
    const half = this.size / 2;
    if (this.cpos.y < half) {
      this.cpos.y = half + Math.abs(this.cpos.y);
    } else if (this.cpos.y > p5.height - half) {
      this.cpos.y = 2 * (p5.height - half) - this.cpos.y;
    }

    if (this.cpos.x < half) {
      this.cpos.x = half + Math.abs(this.cpos.x);
    } else if (this.cpos.x > p5.width - half) {
      this.cpos.y = 2 * (p5.width - half) - this.cpos.x;
    }
  }

  Gravity() {
    this.cpos.y += Parameters.STEP_GRAVITY;
  }

  Draw(p5) {
    p5.fill(this.color);
    p5.stroke(this.color);
    p5.circle(this.cpos.x, this.cpos.y, this.size);
  }

  DrawDebug(p5) {
    const vel = this.cpos.minus(this.lpos).times(10);
    p5.stroke([255, 0, 0]);
    p5.line(this.cpos.x, this.cpos.y, this.cpos.x + vel.x, this.cpos.y + vel.y); // Speed
  }
}

class Constraint {
  constructor(a, b, color) {
    this.a = a;
    this.b = b;

    this.size = this.a.cpos.minus(this.b.cpos).length();
    this.color = color;
  }

  Step() {
    const csize = this.a.cpos.minus(this.b.cpos).length();
    const diff = csize - this.size;
    const norm = this.a.cpos.minus(this.b.cpos).divide(csize);

    this.a.cpos = this.a.cpos.minus(
      norm.times(0.5 * diff * Parameters.CONSTRAINT_DAMPING)
    );
    this.b.cpos = this.b.cpos.plus(
      norm.times(0.5 * diff * Parameters.CONSTRAINT_DAMPING)
    );
  }

  Draw(p5) {
    p5.fill(this.color);
    p5.stroke(this.color);
    p5.line(this.a.cpos.x, this.a.cpos.y, this.b.cpos.x, this.b.cpos.y);
  }
}

class System {
  constructor() {
    this.bodies = [];
    this.constraints = [];
  }

  Step(p5) {
    for (let body of this.bodies) {
      body.Gravity();
      body.Bounds(p5);
      body.Step();
    }

    for (let constraint of this.constraints) {
      constraint.Step();
    }
  }

  Draw(p5) {
    p5.strokeWeight(3);

    for (let body of this.bodies) {
      body.Draw(p5);
    }

    for (let constraint of this.constraints) {
      constraint.Draw(p5);
    }

    if (Parameters.DEBUG) {
      for (let body of this.bodies) {
        body.DrawDebug(p5);
      }
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
function Square(pos, size, color) {
  const half = size.divide(2);
  const ihalf = new vec(-half.y, half.x);

  const s = {
    bodies: [
      new Body(pos.minus(half), Parameters.CORPSE_SIZE, color),
      new Body(pos.minus(ihalf), Parameters.CORPSE_SIZE, color),
      new Body(pos.plus(half), Parameters.CORPSE_SIZE, color),
      new Body(pos.plus(ihalf), Parameters.CORPSE_SIZE, color),
    ],
    constraints: [],
  };

  for (let i = 0; i < s.bodies.length - 1; i++) {
    for (let j = i + 1; j < s.bodies.length; j++) {
      s.constraints.push(new Constraint(s.bodies[i], s.bodies[j], color));
    }
  }
  return s;
}

/**
 * Add a body to the shape and link it
 * @param {*} shape
 * @param {*} pos
 * @param {*} color
 */
function Rope(shape, body) {
  shape.constraints.push(
    new Constraint(body, shape.bodies[shape.bodies.length - 1], body.color)
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
      new Body(pos.minus(new vec(0, i * lrope)), Parameters.CORPSE_SIZE, [0, 0, 0])
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
          Parameters.CORPSE_SIZE,
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

function reset() {
  system = new System();

  system.addStruct(RopeSquare(new vec(1000 / 2, 1000 / 2), 10, 20));

  system.addStruct(Grid(new vec(100, 100), 10, 30));

  for (let i = 0; i < 5; i++) {
    system.addStruct(
      Square(
        new vec(1000 - 50 - i * 70, RandomInt(500)),
        new vec(40, 40),
        [0, 0, 0]
      )
    );
  }
}

export { Parameters, Methods, system }