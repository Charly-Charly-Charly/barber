"use client";

import { useState } from "react";

interface CalendarProps {
  onSelect: (dateTime: string) => void;
}

export default function Calendar({ onSelect }: CalendarProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleConfirm = () => {
    if (date && time) {
      onSelect(`${date} ${time}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start p-4 border rounded-lg shadow bg-white">
      <div>
        <label className="block text-sm font-medium mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hora</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm text-black"
        />
      </div>
      <button
        onClick={handleConfirm}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Confirmar
      </button>
    </div>
  );
}
