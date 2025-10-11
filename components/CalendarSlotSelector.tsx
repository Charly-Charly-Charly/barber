"use client";
import { useState } from "react";

interface Props {
  onSelect: (startISO: string) => void;
}

export default function CalendarSlotSelector({ onSelect }: Props) {
  const [date, setDate] = useState<string>("");
  const [hour, setHour] = useState<string>("");

  // Genera horas: 9:00 a 20:00 (intervalo 1h)
  const hours = Array.from({ length: 12 }).map((_, i) => {
    const val = 9 + i;
    return val.toString().padStart(2, "0") + ":00";
  });

  // Fecha mínima: Hoy
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const handleSelect = () => {
    if (!date || !hour) return;
    // Formato ISO 8601: YYYY-MM-DDTTHH:MM:SS
    const startISO = `${date}T${hour}:00`;
    onSelect(startISO);
  };

  return (
    // Contenedor principal: Fondo oscuro con borde sutil
    <div className="p-4 bg-[#212023] rounded-lg shadow-xl border border-[#3e3c3c]">
      
      {/* Selector de Fecha */}
      <label className="block text-sm text-[#fff3e7] font-medium mb-1">Fecha</label>
      <input 
        type="date" 
        min={minDate} 
        value={date} 
        // Estilo oscuro: texto blanco crema, fondo transparente, borde sutil.
        className="text-[#fff3e7] bg-transparent border border-[#555] focus:border-[#d4a97e] p-3 rounded-lg w-full mb-4 transition placeholder-gray-500" 
        onChange={(e)=>setDate(e.target.value)} 
      />

      {/* Selector de Hora */}
      <label className="block text-sm text-[#fff3e7] font-medium mb-1">Hora</label>
      <select 
        value={hour} 
        onChange={(e)=>setHour(e.target.value)} 
        // Estilo oscuro para el select, con fondo más sólido para consistencia
        className="text-[#fff3e7] bg-[#14130f] border border-[#555] focus:border-[#d4a97e] p-3 rounded-lg w-full mb-6 appearance-none transition"
      >
        <option value="" className="text-gray-500 bg-[#14130f]">Selecciona una hora</option>
        {hours.map(h => 
          <option key={h} value={h} className="text-[#fff3e7] bg-[#14130f]">
            {h}
          </option>
        )}
      </select>

      {/* Botón de Acción: Dorado de acento, deshabilitado si faltan datos */}
      <button 
        onClick={handleSelect} 
        disabled={!date || !hour} 
        className={`px-4 py-3 rounded-lg w-full font-semibold transition text-lg ${
          date && hour 
            ? "bg-[#d4a97e] text-black hover:bg-[#835d37] shadow-md" 
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        Elegir Horario
      </button>
    </div>
  );
}