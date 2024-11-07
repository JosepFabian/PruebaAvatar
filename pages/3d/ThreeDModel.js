import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModel = ({ weight, height, modelType }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.5, // Ajuste del valor near
      10000 // Ajuste del valor far
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Luz de la escena
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Controles de órbita para rotación manual
    const controls = new OrbitControls(camera, renderer.domElement);

    // Configuraciones por defecto para female.glb
    if (modelType === 'female') {
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.minDistance = 8000; // Mínima distancia para el zoom
      controls.maxDistance = 10000; // Máxima distancia para el zoom
      controls.enablePan = false;  // Deshabilitar pan
    }
    // Configuración específica para human.glb
    else if (modelType === 'human') {
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.minDistance = 300; // Mínima distancia para el zoom
      controls.maxDistance = 10000; // Máxima distancia para el zoom
      controls.enablePan = false;  // Deshabilitar pan
    }

    const loader = new GLTFLoader();
    const modelPath = modelType === 'female' ? '/models/female.glb' : '/models/human.glb';

    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;

      // Ajustes de escala basados en peso y altura
      const baseHeight = 170; // Altura base en cm
      const baseWeight = 70;  // Peso base en kg

      const scaleHeight = height / baseHeight;
      const scaleWidth = 1 + (weight - baseWeight) / 100; // Factor de escala según peso

      // Escalar modelo en altura y ancho según peso y altura
      model.scale.set(scaleWidth, scaleHeight, scaleWidth); // Ajustar el ancho y la profundidad, mantener proporción en altura

      // Ajuste de posición según altura
      model.position.y = (scaleHeight / 1) * baseHeight;

      // Si el modelo es "human", lo colocamos más arriba
      if (modelType === 'human') {
        model.position.y += -200; // Ajusta este valor para subirlo más o menos
      }

      scene.add(model);

      // Función para centrar el modelo y que la cámara mire hacia él
      function centerModel(model) {
        // Obtener la caja delimitadora del modelo
        const boundingBox = new THREE.Box3().setFromObject(model);

        // Obtener el centro de la caja delimitadora
        const center = boundingBox.getCenter(new THREE.Vector3());

        // Mover la cámara hacia el centro del modelo
        camera.position.copy(center);
        camera.position.z += height * 2; // Ajustar distancia de la cámara

        // Asegurarse de que la cámara esté mirando hacia el modelo
        camera.lookAt(center);

        // Ajustar el punto de interés de los controles
        controls.target.copy(center);

        // Actualizar los controles para reflejar los cambios
        controls.update();
      }

      // Llamar a la función para centrar el modelo
      centerModel(model);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // Actualiza los controles de órbita
        renderer.render(scene, camera); // Renderiza la escena
      };
      animate();
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
    });

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
