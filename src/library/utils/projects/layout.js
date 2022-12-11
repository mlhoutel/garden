const LABELS_PADDING_X = 15;
const LABELS_PADDING_Y = 25;
const LABELS_SPACING = 20;
const LABELS_LENGTH = 200;

/**
 * Called once at the start of the program, create inputs in the DOM
 * @param {{ [string]: string }} values debug values to create inputs for
 * @param {{ [string]: { string, function }}} actions operations to create buttons for
 * @param {function} callback  (optionnal) function to apply on input edit
 * @return { [any] } holders
 */
function inputs(values, actions, callback = () => {}) {
  noStroke();
  fill("#000000");
  textSize(15);

  const holders = { inputs: [], buttons: [] };

  const I = holders.inputs;
  const B = holders.buttons;

  // Inputs
  for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
    switch (typeof value) {
      case "number":
        {
          I[key] = createSlider(value / 2, value * 2, value, value / 100);
        }
        break;
      case "string":
        {
          I[key] = createColorPicker(value);
        }
        break;
      case "boolean":
        {
          I[key] = createCheckbox("", value);
        }
        break;
      default:
        break;
    }

    I[key].position(
      LABELS_LENGTH,
      LABELS_PADDING_Y - 13 + index * LABELS_SPACING
    );
    I[key].style("width", "100px");
    I[key].style("height", "15px");
    I[key].input(callback);
  }

  // Buttons
  for (const [index, [key, value]] of Object.entries(Object.entries(actions))) {
    B[key] = createButton(value.label);
    B[key].position(
      window.innerWidth - 40 - LABELS_PADDING_X,
      LABELS_PADDING_Y + 10 + index * 50
    );
    B[key].style("height", "40px");
    B[key].style("width", "40px");
    B[key].style("font-size: 2em");
    B[key].mousePressed(value.function);
  }

  return holders;
}

/**
 * Update the values from the inputs
 * @param {*} values
 * @param {*} holders
 */
function inputsUpdate(values, holders) {
  for (const [key, input] of Object.entries(holders.inputs)) {
    // console.log(input.elt.value);
    switch (typeof values[key]) {
      case "number":
        {
          values[key] = Number(input.elt.value);
        }
        break;
      case "string":
        {
          values[key] = input.elt.value;
        }
        break;
      case "boolean":
        {
          values[key] = input.checked();
        }
        break;
      default:
        break;
    }
  }
}

/**
 * Called each draw loop to add labels to the inputs
 * @param {*} values debug values to create labels for
 */
function labels(values) {
  noStroke();
  fill("#000000");
  textSize(15);

  for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
    text(key, LABELS_PADDING_X, LABELS_PADDING_Y + index * LABELS_SPACING);
    text(
      value,
      LABELS_LENGTH + LABELS_PADDING_X + 100,
      LABELS_PADDING_Y + index * LABELS_SPACING
    );
  }
}

/**
 * Draw current fps
 */
function fps() {
  textSize(20);
  const fps = Math.round(frameRate());
  text(
    fps + " fps",
    window.innerWidth - 50 - LABELS_PADDING_X,
    LABELS_PADDING_Y
  );
}
