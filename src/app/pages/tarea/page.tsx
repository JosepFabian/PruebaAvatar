"use client";

import { useState } from "react";
import { getInfoByFood } from "../../../services/cardiobotService";


export const Actividad = () => {
  const [input, setInput] = useState(""); // Entrada del usuario
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola, soy CardioBOT, ¿Sobre qué alimentos deseas saber más?" },
  ]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Añadir el mensaje del usuario
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Obtener información del alimento
    try {
      const foodInfo = await getInfoByFood(input);

      // Generar respuesta del bot
      const botResponse = foodInfo.length
        ? `El alimento "${input}" contiene:\n${foodInfo[0].food_description}.`
        : `Lo siento, no encontré información sobre "${input}".`;

      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Hubo un error al obtener la información. Inténtalo nuevamente." },
      ]);
    } finally {
      setInput("");
    }
  };

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

      {/* Mensajes */}
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

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        className="w-full rounded-lg p-2 mt-2 focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
    </>
  );
};

