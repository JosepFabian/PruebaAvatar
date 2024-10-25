import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('/models/human.glb', (gltf) => {
      const model = gltf.scene;

      // Ajustes de altura y peso
      const baseHeight = 170; // altura base en cm
      const baseWeight = 70;  // peso base en kg

      const scaleHeight = height / baseHeight;  // Escalar la altura
      const scaleWeightX = 1 + (weight - baseWeight) / 100; // Escalar el ancho (panza) por el peso

      // Escalar todo el cuerpo según la altura
      model.scale.set(1, scaleHeight, 1);

      // Aumentar solo el ancho y profundidad en el torso (zona de la panza) según el peso
      model.traverse((child) => {
        if (child.isMesh) {
          if (child.name.includes("Torso") || child.name.includes("Abdomen")) {
            child.scale.set(scaleWeightX, 1, scaleWeightX); // Escalar solo ancho y profundidad
          }
        }
      });

      // Ajustar la posición del modelo según la altura
      model.position.y = scaleHeight / 2;
      scene.add(model);

      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01; // Rotación del modelo
        renderer.render(scene, camera);
      };
      animate();
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
    });

    return () => {
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
