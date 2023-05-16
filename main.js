import { createThreeApp } from "./src/createThreeApp";
import "./style.css";

const canvasId = "canvas";

document.querySelector("#app").innerHTML = `
  <canvas id="${canvasId}"></canvas>
`;

const canvas = document.querySelector(`#${canvasId}`);
createThreeApp(canvas);
