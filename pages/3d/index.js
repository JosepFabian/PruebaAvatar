// pages/3d/index.js

import { useState } from 'react';
import ThreeDModel from './ThreeDModel';

const ModelPage = () => {
  const [weight, setWeight] = useState(70); // Peso inicial en kg
  const [height, setHeight] = useState(170); // Altura inicial en cm

  return (
    <div style={{ padding: '20px' }}>
      <h1>Generar Modelo 3D</h1>
      <label>
        Peso (kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </label>
      <label>
        Altura (cm):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>
      <ThreeDModel weight={weight} height={height} />
    </div>
  );
};

export default ModelPage;
