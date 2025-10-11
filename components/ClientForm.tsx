// components/ClientForm.tsx
"use client";
import { useState } from "react";

interface Props {
  onSubmit: (data: { nombre: string; telefono: string; correo: string }) => void;
}

export default function ClientForm({ onSubmit }: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !correo) return alert("Por favor, completa tu nombre y correo electrónico.");
    onSubmit({ nombre, telefono, correo });
  };

  const inputClasses = "w-full border border-[#555] bg-transparent text-[#fff3e7] p-3 rounded-lg placeholder-gray-500 focus:outline-none focus:border-2 focus:border-[#d4a97e] transition duration-200";

  return (
    // CAMBIO 1: Fondo del formulario oscuro y borde sutil
    <form 
      onSubmit={handle} 
      className="p-6 bg-[#212023] rounded-xl shadow-2xl space-y-4 border border-[#3e3c3c]"
    >
      
      {/* Input Nombre */}
      <input 
        className={inputClasses} 
        placeholder="Nombre completo *" 
        value={nombre} 
        onChange={(e)=>setNombre(e.target.value)} 
        required
      />
      
      {/* Input Teléfono */}
      <input 
        className={inputClasses} 
        placeholder="Teléfono (Opcional)" 
        type="tel"
        value={telefono} 
        onChange={(e)=>setTelefono(e.target.value)} 
      />
      
      {/* Input Correo */}
      <input 
        className={inputClasses} 
        placeholder="Correo electrónico *" 
        type="email" 
        value={correo} 
        onChange={(e)=>setCorreo(e.target.value)} 
        required
      />

      {/* CAMBIO 2: Botón de Confirmación con color de acento dorado */}
      <button 
        type="submit"
        className={`w-full py-3 font-semibold rounded-lg transition duration-200 text-lg ${
          !nombre || !correo
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-[#d4a97e] text-black hover:bg-[#835d37] hover:shadow-lg"
        }`}
      >
        Confirmar Reserva
      </button>
    </form>
  );
}