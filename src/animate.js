export function animate(renderer, scene, camera, controls) {
  requestAnimationFrame(() => animate(renderer, scene, camera, controls));
  controls.update();
  renderer.render(scene, camera);
}
