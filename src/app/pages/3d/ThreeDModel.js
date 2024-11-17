// pages/3d/ThreeDModel.js

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModel = ({ weight, height, modelType }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Ajuste de cámara: posicionarla más lejos para una vista completa
    camera.position.set(0, height * 0.6, height * 3.5); // Posición ajustada en base a la altura

    // Luz ambiental y direccional
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz ambiental más intensa
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enablePan = false;

    const modelFile = modelType === 'male' ? '/models/human.glb' : '/models/female.glb';

    const loader = new GLTFLoader();
    loader.load(modelFile, (gltf) => {
      const model = gltf.scene;

      // Verificar las dimensiones del modelo
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log('Dimensiones del modelo: ', size);

      // Ajuste de la escala y la posición
      const baseHeight = 170; // Altura base en cm
      const scaleHeight = height / baseHeight;
      const scaleFactor = scaleHeight * 0.9; // Escala para ajustar al tamaño correcto

      // Aplicar la escala y posición según el tipo de modelo
      if (modelType === 'female') {
        // Modelo femenino
        model.scale.set(scaleFactor, scaleFactor, scaleFactor); // Ajuste de la escala

        // Ajustar la posición para centrar el modelo en la escena
        model.position.set(0, -scaleHeight * 2.2, 0); // Ajuste en Y para que el modelo no esté flotando
      } else {
        // Modelo masculino
        model.scale.set(scaleHeight, scaleHeight, scaleHeight); // Escala para el modelo masculino
        model.position.set(0, -scaleHeight * 2.5, 0); // Ajuste en Y para el modelo masculino
      }

      // Ajuste de la escala de torso y abdomen según el peso
      const scaleWeightFactor = 1 + (weight - 70) / 100; // Factor de escala según peso
      model.traverse((child) => {
        if (child.isMesh && (child.name.includes("Torso") || child.name.includes("Abdomen"))) {
          child.scale.set(scaleWeightFactor, 1, scaleWeightFactor); // Escala para torso y abdomen
        }
      });

      // Añadir el modelo a la escena
      scene.add(model);

      // Función de animación
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
    });

    // Limpiar al desmontar el componente
    return () => {
      controls.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [weight, height, modelType]);

  return (
    <div
      className="w-full h-full bg-blackish-blue flex items-center justify-center"
      ref={mountRef}
    />
  );
};

export default ThreeDModel;
