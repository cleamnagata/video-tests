export default function(sceneClass, sceneArgs, manifests) {
  if (window.videoTestScene) {
    window.videoTestScene.close();
  }
  window.videoTestScene = new sceneClass(sceneArgs);
}