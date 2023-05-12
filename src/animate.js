export function animate(options) {
  const { renderer, scene, camera, controls } = options;
  requestAnimationFrame(() => animate(options));
  controls.update();
  renderer.render(scene, camera);
}
