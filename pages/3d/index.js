import { useState } from 'react';
import ThreeDModel from './ThreeDModel';

const ModelPage = () => {
  const [weight, setWeight] = useState(70); // Valor inicial de peso
  const [height, setHeight] = useState(170); // Valor inicial de altura
  const [modelType, setModelType] = useState('female'); // Estado para seleccionar el modelo

  return (
    <div className="min-h-screen bg-blackish-blue flex flex-col items-center justify-center text-white space-y-6">
      <h1 className="text-3xl font-bold">Ajustar Avatar 3D</h1>
      <div className="w-11/12 max-w-lg flex flex-col space-y-4 bg-gray-900 p-6 rounded-lg">
        {/* Control deslizante para el peso */}
        <div>
          <label className="block mb-2 text-lg">Peso (kg): {weight}</label>
          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))} // Convierte a número
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Control deslizante para la altura */}
        <div>
          <label className="block mb-2 text-lg">Altura (cm): {height}</label>
          <input
            type="range"
            min="140"
            max="200"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))} // Convierte a número
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Botones para seleccionar el modelo */}
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={() => setModelType('female')}
          >
            Modelo Femenino
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={() => setModelType('human')}
          >
            Modelo Masculino
          </button>
        </div>
      </div>

      {/* Componente del modelo 3D */}
      <ThreeDModel weight={weight} height={height} modelType={modelType} />
    </div>
  );
};

export default ModelPage;


