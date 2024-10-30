// pages/3d/ThreeDModel.js

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModel = ({ weight, height }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Ajuste de la cámara
    camera.position.set(0, height / 2, height * 2);

    // Luz de la escena
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Controles de órbita para rotación manual
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enablePan = false;

    const loader = new GLTFLoader();
    loader.load('/models/human.glb', (gltf) => {
      const model = gltf.scene;

      // Ajustes de escala basados en peso y altura
      const baseHeight = 170;  // Altura base en cm
      const baseWeight = 70;   // Peso base en kg

      const scaleHeight = height / baseHeight;
      const scaleWeightFactor = 1 + (weight - baseWeight) / 100;  // Factor de escala según peso

      // Escalar modelo general en altura
      model.scale.set(scaleHeight, scaleHeight, scaleHeight);

      // Escalar torso y abdomen específicamente según peso
      model.traverse((child) => {
        if (child.isMesh && (child.name.includes("Torso") || child.name.includes("Abdomen"))) {
          child.scale.set(scaleWeightFactor, 1, scaleWeightFactor);  // Solo ancho y profundidad
        }
      });

      // Ajuste de posición según altura
      model.position.y = scaleHeight / 2;
      scene.add(model);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
    });

    return () => {
      controls.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [weight, height]);

  return (
    <div
      className="w-full h-full bg-blackish-blue flex items-center justify-center"
      ref={mountRef}
    />
  );
};

export default ThreeDModel;

