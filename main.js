import { animate } from "./src/animate";
import { createThreeApp } from "./src/createThreeApp";
import {
  buttons,
  generateButtonId,
  generateButtonIndicatorId,
} from "./src/optionsPanel";
import "./style.css";

const config = {
  enableShadows: true,
  drawBackgroundTrees: true,
  backgroundTreesNumber: 1024,
  enableBackgroundTreeShadow: true,
  useGroundTexture: true,
};

function isButtonActive(button) {
  return config[button.prop];
}

function updateButtonIndicator(button) {
  document.querySelector(`#${generateButtonIndicatorId(button)}`).innerHTML =
    isButtonActive(button) ? "🟢" : "🔴";
}

function handleClickBase(button) {
  config[button.prop] = !config[button.prop];
  updateButtonIndicator(button);

  // Supposedly, this will clean up all the elements from the previous scene that are no longer used.
  // TODO: test!
  // https://threejs.org/docs/index.html#manual/en/introduction/How-to-dispose-of-objects
  appData.renderer.dispose();

  const data = createThreeApp(canvas, config);
  appData.renderer = data.renderer;
  appData.scene = data.scene;
}

const canvasId = "canvas";

document.querySelector("#app").innerHTML = `
  <div style="position: absolute; left: 16px; bottom: 16px; padding: 12px; padding-top: 0; border-radius: 5px; background-color: rgba(0, 0, 0, 0.4)">
    <h1 style="margin: 0;">three.js example</h1>
    <p style="margin: 4px;">Rendering options:</p>
    ${buttons
      .map(
        (button) =>
          `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <button id="${generateButtonId(button)}">
                ${button.text}
              </button>
              <div id="${generateButtonIndicatorId(button)}"></div>
            </div>
          `
      )
      .join("")}
  </div>
  <canvas id="${canvasId}"></canvas>
`;

buttons.forEach((button) => {
  updateButtonIndicator(button);
  document
    .querySelector(`#${generateButtonId(button)}`)
    .addEventListener("click", () => handleClickBase(button));
});

const canvas = document.querySelector(`#${canvasId}`);
let appData = createThreeApp(canvas, config);
animate(appData);
