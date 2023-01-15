import { vec, Random, RandomColor } from "$utils/projects/utils.js"

var paused = false;

let holders = [];
let system = undefined;

const Parameters = {
  PARTICLES_NUMBER: 300,
  GRAVITY_CONSTANT: 4,
  LIGHT_SPEED: 6,
  PATH_LENGTH: 3,
  SPACE_RATIO: 10,
};

const Methods = {
  reset: {
    label: "&#8634;",
    function: () => {
      system = new System();

      for (var i = 0; i < Parameters.PARTICLES_NUMBER; i++) {
        system.add(
          new Body(
            Random(window.innerWidth) / Parameters.SPACE_RATIO,
            Random(window.innerHeight) / Parameters.SPACE_RATIO,
            RandomColor()
          )
        );
      }
    },
  },
  pause: {
    label: "&#10074;&#10074;",
    function: () => {
      paused = !paused;
    },
  },
};

class Body {
  constructor(x, y, color) {
    this.pos = new vec(x, y);
    this.vel = new vec(0, 0);
    this.trail = [this.pos];
    this.color = color;
  }

  Step() {
    this.pos = this.pos.plus(this.vel);

    while (this.trail.length > Parameters.PATH_LENGTH) {
      this.trail.shift();
    }

    this.trail.push(this.pos);
  }

  Draw(p5) {
    p5.fill(this.color);
    p5.stroke(this.color);
    p5.point(this.pos.x * Parameters.SPACE_RATIO, this.pos.y * Parameters.SPACE_RATIO);

    for (var i = 0; i < this.trail.length - 1; i++) {
      p5.line(
        this.trail[i].x * Parameters.SPACE_RATIO,
        this.trail[i].y * Parameters.SPACE_RATIO,
        this.trail[i + 1].x * Parameters.SPACE_RATIO,
        this.trail[i + 1].y * Parameters.SPACE_RATIO
      );
    }
  }

  Gravity(body) {
    let diff_x = body.pos.x - this.pos.x;
    let diff_y = body.pos.y - this.pos.y;

    let dist_2 = Math.pow(diff_x, 2) + Math.pow(diff_y, 2) + 10 / Parameters.SPACE_RATIO;

    let tempLS = Parameters.LIGHT_SPEED * 100000000; // 2,998 * 10e+8
    let tempG = Parameters.GRAVITY_CONSTANT; //6.7 * 10e-11

    let force = tempG * (0.01 / dist_2); // Parameters.GRAVITY_CONSTANT * (ma * mb)/(r^2)

    if (force > tempLS) {
      force = tempLS;
    }

    let norm = new vec(diff_x, diff_y).divide(Math.sqrt(dist_2));

    let acc = norm.times(force);

    this.vel = this.vel.plus(acc);
    body.vel = body.vel.minus(acc);
  }
}

class System {
  constructor() {
    this.bodies = [];
  }

  Step() {
    if (!paused) {
      for (let i = 0; i < this.bodies.length; i++) {
        this.bodies[i].Step();
      }

      for (let i = 0; i < this.bodies.length - 1; i++) {
        for (let j = i + 1; j < this.bodies.length; j++) {
          this.bodies[i].Gravity(this.bodies[j]);
        }
      }
    }
  }

  Draw(p5) {
    p5.strokeWeight(3);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].Draw(p5);
    }
  }

  add(body) {
    this.bodies.push(body);
  }
}

export { Parameters, Methods, system }
