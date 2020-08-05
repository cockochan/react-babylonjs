import React,{useState} from 'react';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder,SceneLoader,StandardMaterial,Texture } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook' 
import './App.css';
import { colorPixelShader } from '@babylonjs/core/Shaders/color.fragment';
import botl from './botl.babylon'
const coord=([{x:8,z:4}],[{x:1,z:9}])
let box;

const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
 
  const canvas = scene.getEngine().getRenderingCanvas();
  scene.getEngine().resize();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
// var bootle = SceneLoader.ImportMesh("",'https://github.com/cockochan/react-babylonjs/blob/master/src/botl.babylon')

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(8, 4, 0), scene);
 
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
  var grass0 = new StandardMaterial("grass0", scene);
	grass0.diffuseTexture = new Texture("./textures/velvet.jpg", scene);
  // Our built-in 'box' shape.
  box = MeshBuilder.CreateSphere("sphere", {size: 35}, scene);
  // Move the box upward 1/2 its height
  box.material = grass0;
  box.position.y = 5;
  box.position.z = -8.2;

  MeshBuilder.CreatePlane("myPlane", {width: 50, height: 20}, scene);
  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("gd", {width: 60,height:100, subdivisions: 4}, scene);
  let bu = SceneLoader.ImportMesh(["myMesh1", "myMesh2"], "./", "botl.babylon", scene, function (meshes, particleSystems, skeletons) {
    bu.position.y = 5;
    bu.position.z = -8.2;
});
 
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = scene => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

export default () => (
    
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
 
)