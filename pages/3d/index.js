// pages/3d/index.js

import { useState } from 'react';
import ThreeDModel from './ThreeDModel';

const ModelPage = () => {
  const [weight, setWeight] = useState(70); // Valor inicial de peso
  const [height, setHeight] = useState(170); // Valor inicial de altura

  return (
    <div className="min-h-screen bg-blackish-blue flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4">Ajustar Avatar 3D</h1>
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block mb-2">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-20 text-center"
          />
        </div>
        <div>
          <label className="block mb-2">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white w-20 text-center"
          />
        </div>
      </div>
      <ThreeDModel weight={weight} height={height} />
    </div>
  );
};

export default ModelPage;
