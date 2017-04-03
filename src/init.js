export default function(sceneClass, sceneArgs, manifests) {
  if (window.videoTestScene) {
    window.videoTestScene.close();
  }
  console.log("aa");
  window.videoTestScene = new sceneClass(sceneArgs);
}
