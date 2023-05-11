import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  createBasicMesh,
  createCamera,
  createGround,
  createRenderer,
} from "./utils";
import { animate } from "./animate";

export function createThreeApp(canvas) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = createCamera(
    canvas,
    new THREE.Vector3(30, 15, 0),
    new THREE.Vector3(0, 0, 0)
  );

  const ambientLight = new THREE.AmbientLight("#556", 2.4);
  scene.add(ambientLight);

  const mesh = createBasicMesh();
  scene.add(mesh);

  const ground = createGround();
  scene.add(ground);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  animate(renderer, scene, camera, controls);
}
