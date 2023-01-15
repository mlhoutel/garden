/**
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
function RandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 *
 * @param {*} max
 * @returns
 */
function Random(max) {
  return Math.random() * Math.floor(max);
}

/**
 *
 * @param {*} max
 * @returns
 */
function RandomInt(max) {
  return Math.floor(Random(max));
}

/**
 *
 * @returns
 */
function RandomColor() {
  return [RandomInt(255), RandomInt(255), RandomInt(255)];
}

/**
 *
 */
class vec {
  /**
   *
   * @param {*} x
   * @param {*} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @param {*} other
   * @returns
   */
  plus(other) {
    return new vec(this.x + other.x, this.y + other.y);
  }

  /**
   *
   * @param {*} other
   * @returns
   */
  minus(other) {
    return new vec(this.x - other.x, this.y - other.y);
  }

  /**
   *
   * @param {*} other
   * @returns
   */
  times(other) {
    return new vec(this.x * other, this.y * other);
  }

  /**
   *
   * @param {*} other
   * @returns
   */
  divide(other) {
    return new vec(this.x / other, this.y / other);
  }

  /**
   *
   * @returns
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   *
   * @param {*} ang
   * @returns
   */
  rotate(ang) {
    return new vec(this.x * Math.cos(ang), this.y * Math.sin(ang));
  }

  /**
   *
   * @param {*} ang
   * @param {*} from
   * @returns
   */
  rotate(ang, from) {
    const origin = this.minus(from);
    const rotated = origin.rotate(ang);
    return rotated.plus(from);
  }
}

export { RandomBetween, RandomInt, Random, RandomColor, vec }