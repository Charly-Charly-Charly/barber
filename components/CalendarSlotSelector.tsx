// components/CalendarSlotSelector.tsx
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

  // min para date input
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const handleSelect = () => {
    if (!date || !hour) return;
    const startISO = `${date}T${hour}:00`;
    onSelect(startISO);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <label className="block text-sm text-black font-medium mb-1">Fecha</label>
      <input type="date" min={minDate} value={date} className="text-gray-500 border p-2 rounded w-full mb-4" onChange={(e)=>setDate(e.target.value)} />

      <label className="block text-sm text-black font-medium mb-1">Hora</label>
      <select value={hour} onChange={(e)=>setHour(e.target.value)}  className="color-cus-black border p-2 placeholder-gray-500 rounded w-full mb-4">
        <option value="" className="text-black placeholder-gray-500 border p-2 rounded w-full mb-4">Selecciona una hora</option>
        {hours.map(h => <option key={h} value={h} className="text-black placeholder-gray-500">{h}</option>)}
      </select>

      <button onClick={handleSelect} className="px-4 py-2 bg-blue-600 text-white rounded w-full">Elegir</button>
    </div>
  );
}
