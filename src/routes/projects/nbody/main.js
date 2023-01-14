var paused = false;

let holders = [];
let system = undefined;

const V = {
  PARTICLES_NUMBER: 300,
  GRAVITY_CONSTANT: 4,
  LIGHT_SPEED: 6,
  PATH_LENGTH: 3,
  SPACE_RATIO: 10,
};

const A = {
  reset: {
    label: "&#8634;",
    function: () => {
      system = new System();

      for (var i = 0; i < V.PARTICLES_NUMBER; i++) {
        system.add(
          new Body(
            Random(window.innerWidth) / V.SPACE_RATIO,
            Random(window.innerHeight) / V.SPACE_RATIO,
            randomColor()
          )
        );
      }
    },
  },
  pause: {
    label: "&#10074;&#10074;",
    function: () => {
      paused = !paused;
      holders.buttons["pause"].elt.innerHTML = paused
        ? "&#9658;"
        : "&#10074;&#10074;";
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

    while (this.trail.length > V.PATH_LENGTH) {
      this.trail.shift();
    }

    this.trail.push(this.pos);
  }

  Draw() {
    fill(this.color);
    stroke(this.color);
    point(this.pos.x * V.SPACE_RATIO, this.pos.y * V.SPACE_RATIO);

    for (var i = 0; i < this.trail.length - 1; i++) {
      line(
        this.trail[i].x * V.SPACE_RATIO,
        this.trail[i].y * V.SPACE_RATIO,
        this.trail[i + 1].x * V.SPACE_RATIO,
        this.trail[i + 1].y * V.SPACE_RATIO
      );
    }
  }

  Gravity(body) {
    let diff_x = body.pos.x - this.pos.x;
    let diff_y = body.pos.y - this.pos.y;

    let dist_2 = Math.pow(diff_x, 2) + Math.pow(diff_y, 2) + 10 / V.SPACE_RATIO;

    let tempLS = V.LIGHT_SPEED * 100000000; // 2,998 * 10e+8
    let tempG = V.GRAVITY_CONSTANT; //6.7 * 10e-11

    let force = tempG * (0.01 / dist_2); // V.GRAVITY_CONSTANT * (ma * mb)/(r^2)

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

  Draw() {
    strokeWeight(3);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].Draw();
    }
  }

  add(body) {
    this.bodies.push(body);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  holders = inputs(V, A, A.reset.function);
  A.reset.function();
}

function draw() {
  background(255);

  system.Step();
  system.Draw();

  inputsUpdate(V, holders);
  labels(V);
  fps();
}
