// pages/3d/index.js

import { useState } from 'react';
import ThreeDModel from './ThreeDModel';

const ModelPage = () => {
  const [weight, setWeight] = useState(70); // Peso inicial en kg
  const [height, setHeight] = useState(170); // Altura inicial en cm
  const [modelType, setModelType] = useState('male'); // 'male' o 'female'

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-black to-gray-800 text-white flex flex-col items-center justify-center space-y-8 p-10">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-teal-500 animate-pulse">
        Ajustar Avatar 3D
      </h1>
      <div className="w-11/12 max-w-lg flex flex-col space-y-6 bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-2xl backdrop-blur-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
        <div className="space-y-4">
          <label className="text-lg font-semibold">Peso (kg): {weight}</label>
          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg appearance-none cursor-pointer transition-all transform hover:scale-105"
          />
        </div>
        <div className="space-y-4">
          <label className="text-lg font-semibold">Altura (cm): {height}</label>
          <input
            type="range"
            min="140"
            max="200"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg appearance-none cursor-pointer transition-all transform hover:scale-105"
          />
        </div>
        <div className="flex space-x-6 justify-center">
          <button
            onClick={() => setModelType('male')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ease-in-out duration-300 
              ${modelType === 'male' ? 'bg-teal-600 transform scale-105' : 'bg-gray-700 hover:bg-teal-600'}`}
          >
            Hombre
          </button>
          <button
            onClick={() => setModelType('female')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-all ease-in-out duration-300 
              ${modelType === 'female' ? 'bg-pink-600 transform scale-105' : 'bg-gray-700 hover:bg-pink-600'}`}
          >
            Mujer
          </button>
        </div>
      </div>
      <div className="w-full h-[500px] mt-8 rounded-lg shadow-2xl overflow-hidden bg-gradient-to-r from-blue-800 to-gray-900 p-2">
        <ThreeDModel weight={weight} height={height} modelType={modelType} />
      </div>
    </div>
  );
};

export default ModelPage;
