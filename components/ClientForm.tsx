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
    if (!nombre || !correo) return alert("Completa nombre y correo");
    onSubmit({ nombre, telefono, correo });
  };

  return (
    <form onSubmit={handle} className="p-4 bg-white rounded-lg shadow space-y-3">
      <input className="w-full border p-2 rounded placeholder-gray-500" placeholder="Nombre completo" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
      <input className="w-full border p-2 rounded placeholder-gray-500" placeholder="Teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
      <input className="w-full border p-2 rounded placeholder-gray-500" placeholder="Correo" type="email" value={correo} onChange={(e)=>setCorreo(e.target.value)} />
      <button className="w-full py-2 bg-green-600 text-white rounded">Confirmar reserva</button>
    </form>
  );
}
