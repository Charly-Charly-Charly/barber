"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// La interfaz ahora coincide con la estructura de datos que la API devuelve
interface Reserva {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  start_datetime: string;
  services: string; // La API devuelve un string JSON
  duration_hours: number;
  total_price: string; // El precio es un string en tu JSON de ejemplo
  created_at: string;
}

export default function AdminTable() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("/api/reservas");
        const data = await res.json();
        if (Array.isArray(data)) {
          setReservas(data);
        } else {
          console.error("La API no devolvió un array de reservas.");
          setReservas([]);
        }
      } catch (error) {
        console.error("Error al obtener reservas:", error);
        setReservas([]);
      }
    };
    fetchReservas();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Cliente</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Teléfono</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Correo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Hora</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Servicios</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Duración (h)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total (Q)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservas.length > 0 ? (
              reservas.map((reserva, index) => {
                // --- MANEJO DE LA FECHA Y HORA ---
                let fecha = 'N/A';
                let hora = 'N/A';
                try {
                  const date = new Date(reserva.start_datetime);
                  // Usar las opciones de formato para una mejor visualización
                  fecha = date.toLocaleDateString('es-GT', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  hora = date.toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });
                } catch (e) {
                  console.error("Error al parsear la fecha:", e);
                }

                // --- MANEJO DE SERVICIOS ---
                let parsedServicios: { titulo: string }[] = [];
                if (typeof reserva.services === 'string' && reserva.services.trim() !== '') {
                  try {
                    parsedServicios = JSON.parse(reserva.services);
                  } catch (e) {
                    console.error("Error al parsear el JSON de servicios:", e);
                  }
                }
                
                return (
                  <motion.tr
                    key={reserva.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{reserva.nombre}</td>
                    <td className="px-4 py-3">{reserva.telefono}</td>
                    <td className="px-4 py-3">{reserva.correo}</td>
                    <td className="px-4 py-3">{fecha}</td>
                    <td className="px-4 py-3">{hora}</td>
                    <td className="px-4 py-3">
                      {parsedServicios.map((s) => s.titulo).join(", ")}
                    </td>
                    <td className="px-4 py-3">{reserva.duration_hours}h</td>
                    <td className="px-4 py-3 font-semibold text-indigo-700">
                      Q{parseFloat(reserva.total_price).toFixed(2)}
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No hay reservas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}