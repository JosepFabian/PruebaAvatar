"use client";

import { useState } from "react";
import { getInfoByFood } from "./services/cardiobotService"; // Ajusta la ruta si es necesario

const Actividad = () => {
  const [input, setInput] = useState(""); // Maneja la entrada del usuario
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola, soy CardioBOT, ¿sobre qué alimentos deseas saber más?" },
  ]);

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Evita enviar mensajes vacíos

    // Agrega el mensaje del usuario al historial
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const foodInfo = await getInfoByFood(input);

      const botResponse = foodInfo.length
        ? `El alimento "${input}" contiene:\n${foodInfo[0].food_description}.`
        : `Lo siento, no encontré información sobre "${input}".`;

      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error al obtener la información:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Hubo un error al obtener la información. Por favor, inténtalo nuevamente." },
      ]);
    } finally {
      setInput(""); // Limpia el campo de entrada
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Introducción */}
      <div className="mt-5">
        <p className="text-sm text-gray-500">
          CardioBOT es un asistente virtual que te ayudará a encontrar el valor
          nutricional de tus alimentos.
        </p>
        <p className="text-sm text-red-300/70 mt-2" style={{ fontSize: "0.6rem" }}>
          Por favor, escribe el nombre del alimento y CardioBOT te dará la
          información que necesitas.
        </p>
      </div>
      <hr className="border border-gray-500 my-4" />

      {/* Conversación */}
      <div className="flex flex-col space-y-4 mt-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`${
                message.sender === "user" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
              } rounded-lg p-2 max-w-xs whitespace-pre-line`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <hr className="border border-gray-500 my-4" />

      {/* Entrada de texto */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="w-full rounded-lg p-2 mt-2 focus:outline-none border border-gray-300"
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
    </div>
  );
};

export default Actividad;