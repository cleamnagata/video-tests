export default function(sceneClass, sceneArgs, manifests) {
  if (window.videoTestScene) {
    window.videoTestScene.close();
  }
  console.log(1);
  window.videoTestScene = new sceneClass(sceneArgs);
}
