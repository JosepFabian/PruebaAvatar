

export const Actividad = () => {
  // 1. Necesito que usen la API de FatSecret para obtener la información nutricional de los alimentos.
  // 2. Necesito que me muestren la información nutricional de los alimentos en la interfaz.
  // 3. Necesito que me muestren mensajes de ejemplo entre el usuario y CardioBOT.
  // -- CONDICIÓN -> Si el usuario escribe un alimento, CardioBOT debe mostrar la información nutricional de ese alimento.
  // -- SOLO USAR UN SERVICE PARA OBTENER LA INFORMACIÓN NUTRICIONAL DE LOS ALIMENTOS. NO MUEVAN NADA DE ESTILOS.

  return (
    <>
      <div className="mt-5">
        <p className="text-sm text-gray-500">
          CardioBOT es un asistente virtual que te ayudará a encontrar el valor
          nutricional de tus alimentos.
        </p>
        <p
          className="text-sm text-red-300/70 mt-2"
          style={{ fontSize: "0.6rem" }}
        >
          Por favor, solo escribe el nombre del alimento y CardioBOT te dará la
          información que necesitas.
        </p>
      </div>
      <hr className="border border-gray-500 my-4" />

      {/* Mensajes de ejemplo */}
      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
            <p>Hola, soy CardioBOT, ¿Sobre que alimentos deseas saber más?</p>
          </div>
        </div>
        {/* Mensaje del usuario */}
        <div className="flex justify-start">
          <div className="bg-gray-200 text-black rounded-lg p-2 max-w-xs">
            <p>Manzana</p>
          </div>
        </div>
      </div>
      <hr className="border border-gray-500 my-4" />
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        className="w-full rounded-lg p-2 mt-2 focus:outline-none"
      />
    </>
  );
};
