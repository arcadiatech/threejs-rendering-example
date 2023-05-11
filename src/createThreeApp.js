import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  createCabin,
  createCamera,
  createDirectionalLight,
  createGround,
  createRenderer,
  createTree,
} from "./utils";
import { animate } from "./animate";

const enableShadows = true;

export function createThreeApp(canvas) {
  const renderer = createRenderer(canvas, { enableShadows });
  const scene = new THREE.Scene();
  const camera = createCamera(
    canvas,
    new THREE.Vector3(30, 15, 0),
    new THREE.Vector3(0, 0, 0)
  );

  const ambientLight = new THREE.AmbientLight("#556", 0.5);
  scene.add(ambientLight);

  const mainLight = createDirectionalLight({ enableShadows });
  mainLight.position.set(...new THREE.Vector3(1, 1, -1));
  scene.add(mainLight);

  const ground = createGround({ enableShadows });
  scene.add(ground);

  const trees = Array.from(Array(3), () => createTree({ enableShadows }));
  trees[0].position.set(-3, 0, 6);
  trees[1].position.set(-12, 0, 5);
  trees[2].position.set(1, 0, -6);
  scene.add(...trees);

  const cabin = createCabin({ enableShadows });
  cabin.position.set(-2, 0, 0);
  cabin.scale.multiplyScalar(0.8);
  cabin.rotateY(Math.PI / 8);
  scene.add(cabin);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  animate(renderer, scene, camera, controls);
}
