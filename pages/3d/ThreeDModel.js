// pages/3d/ThreeDModel.js

import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const ThreeDModel = ({ weight, height }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Agregar una luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Agregar una luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('/models/human.glb', (gltf) => {
      const model = gltf.scene;

      // Escalar el modelo según el peso
      const scale = weight / 20; // Ajustar la escala según el peso
      model.scale.set(scale, scale, scale);
      model.position.y = scale / 2; // Ajustar la posición en función de la escala

      scene.add(model);

      camera.position.set(0, scale * 1.5, scale * 3); // Ajustar según la escala


      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01; // Rotar el modelo
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
    });

    // Limpiar al desmontar el componente
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, [weight, height]);

  return null;
};

export default ThreeDModel;
