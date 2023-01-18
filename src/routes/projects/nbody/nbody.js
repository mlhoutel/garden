import { vec } from "$utils/projects.js"

// Avoid speed explosion when two bodies overlap
const MIN_DIST = 10

class Body {
  constructor(x, y, color) {
    this.pos = new vec(x, y);
    this.vel = new vec(0, 0);
    this.color = color;
  }

  step() {
    this.pos = this.pos.plus(this.vel);
  }
}

class System {
  constructor() {
    this.bodies = [];
    this.trails = [];

    this.gravity_constant = 6.7 * 10e-1; // 6.7 * 10e-11
    this.light_speed = 2,998 * 10e+8; // 2,998 * 10e+8
    this.paths_length = 5;

    this.number_iterations = 10
  }

  step() {

    for (let k = 0; k < this.number_iterations; k++) {
      for (let i = 0; i < this.bodies.length; i++) {
        this.bodies[i].step();
      }
      
      for (let i = 0; i < this.bodies.length - 1; i++) {
        for (let j = i + 1; j < this.bodies.length; j++) {
          this.gravity(this.bodies[i], this.bodies[j]);
        }
      }
    }

    for (let i = 0; i < this.bodies.length; i++) {
      while (this.trails[i].length > this.paths_length) {
        this.trails[i].shift();
      }

      this.trails[i].push(this.bodies[i].pos);
    }
  }

  gravity(bodyA, bodyB) {
    let diff_x = bodyB.pos.x - bodyA.pos.x;
    let diff_y = bodyB.pos.y - bodyA.pos.y;

    let dist_2 = Math.pow(diff_x, 2) + Math.pow(diff_y, 2) + MIN_DIST;

    let tempLS = this.light_speed;
    let tempG = this.gravity_constant;

    let force = tempG * (0.01 / dist_2); // G * (ma * mb)/(r^2)

    if (force > tempLS) {
      force = tempLS;
    }

    let norm = new vec(diff_x, diff_y).divide(Math.sqrt(dist_2));

    let acc = norm.times(force);

    bodyA.vel = bodyA.vel.plus(acc);
    bodyB.vel = bodyB.vel.minus(acc);
  }

  add(body) {
    this.bodies.push(body);
    this.trails.push([body.pos])
  }
}

export { Body, System }
