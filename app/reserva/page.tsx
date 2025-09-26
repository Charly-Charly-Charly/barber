"use client";

import { useState } from "react";
import CalendarSlotSelector from "@/components/CalendarSlotSelector";
import ServiceGallery, { Servicio } from "@/components/ServiceGallery";
import ClientForm from "@/components/ClientForm";

const CATALOG: Servicio[] = [
  { id: 1, titulo: "Corte de Pelo", precio: 75, duracion: 1, img: "/corte.jpg" },
  { id: 2, titulo: "Corte de Barba", precio: 50, duracion: 1, img: "/barba.jpg" },
  { id: 3, titulo: "Exfoliación", precio: 60, duracion: 1, img: "/spa.jpg" },
  { id: 4, titulo: "Spa Facial", precio: 120, duracion: 1, img: "/masaje.jpg" },
];

export default function ReservaPage() {
  const [step, setStep] = useState<number>(1);
  const [startISO, setStartISO] = useState<string>(""); // e.g. 2025-09-21T09:00:00
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<any>(null);

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const subtotal = selected.reduce((acc, id) => acc + (CATALOG.find(s => s.id === id)?.precio || 0), 0);
  const totalHours = selected.reduce((acc, id) => acc + (CATALOG.find(s => s.id === id)?.duracion || 0), 0);

  // Paso 1 -> elegir fecha/hora
  const onPickSlot = (iso: string) => {
    setStartISO(iso);
    setStep(2);
    setError(null);
  };

  // Paso 2 -> elegir servicios
  const onProceedToClient = async () => {
    if (selected.length === 0) return setError("Selecciona al menos un servicio");
    setError(null);
    setStep(3);
  };

  // Paso 3 -> enviar reserva: solo POST
  const handleClientSubmit = async (client: { nombre: string; telefono: string; correo: string }) => {
    setError(null);
    setLoading(true);

    try {
      // Preparando y enviando el payload de creación
      const services = selected
        .map(id => CATALOG.find(c => c.id === id))
        .filter(s => s !== undefined)
        .map(s => ({
          id: s!.id,
          titulo: s!.titulo,
          precio: s!.precio,
          duracion: s!.duracion,
        }));

      const createPayload = {
        start: startISO,
        duration_hours: totalHours,
        services,
        total_price: subtotal,
        nombre: client.nombre,
        telefono: client.telefono,
        correo: client.correo,
      };

      const res = await fetch("/api/reservas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(createPayload) });
      const json = await res.json();
      
      if (!res.ok) {
        if (res.status === 409) { // Código de estado para conflicto
          setError("El horario seleccionado entra en conflicto con otra reserva. Elige otro horario.");
          setStep(1); // volver a seleccionar slot
        } else {
          throw new Error(json.error || "Error creando reserva");
        }
        return;
      }
      
      setConfirmed({ id: json.id, ...createPayload, start: new Date(startISO).toLocaleString() });
      setStep(4);

    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10">
          Reserva tu Cita
        </h1>

        {error && (
          <div className="p-4 bg-red-800 text-red-200 rounded-lg shadow-inner text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="bg-slate-900 p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 text-white">
              1. Selecciona fecha y hora
            </h2>
            <CalendarSlotSelector onSelect={onPickSlot} />
          </div>
        )}

        {step === 2 && (
          <div className="bg-slate-900 p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 text-white">
              2. Selecciona servicios
            </h2>
            <ServiceGallery servicios={CATALOG} selected={selected} toggle={toggle} />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-lg font-medium">
              <div>
                Total horas: <b className="text-teal-400">{totalHours}h</b>
              </div>
              <div>
                Total: <b className="text-teal-400">Q{subtotal}</b>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 text-slate-400 rounded-lg transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                onClick={() => setStep(1)}
              >
                Cambiar fecha
              </button>
              <button
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-bold transition-all duration-300 hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                onClick={onProceedToClient}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-slate-900 p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">
              3. Tus datos
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              Reserva para:{" "}
              <b className="text-teal-400">
                {new Date(startISO).toLocaleString()}
              </b>
            </p>
            <ClientForm onSubmit={handleClientSubmit} />
            {loading && (
              <div className="mt-4 text-sm text-slate-400 text-center">
                Enviando reserva...
              </div>
            )}
          </div>
        )}

        {step === 4 && confirmed && (
          <div className="p-8 bg-green-900 border border-green-700 rounded-xl text-green-200 shadow-2xl">
            <h2 className="text-2xl font-semibold text-green-400 text-center">
              ¡Reserva confirmada! ✅
            </h2>
            <p className="mt-4 text-center">
              ID: <b className="text-white">{confirmed.id}</b>
            </p>
            <p className="text-center">
              Fecha y hora: <b className="text-white">{confirmed.start}</b>
            </p>
            <p className="text-center">
              Servicios:{" "}
              <b className="text-white">
                {confirmed.services.map((s: any) => s.titulo).join(", ")}
              </b>
            </p>
            <p className="text-center">
              Total: <b className="text-white">Q{confirmed.total_price}</b>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-bold transition-all duration-300 hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                onClick={() => {
                  setStep(1);
                  setSelected([]);
                  setStartISO("");
                  setConfirmed(null);
                }}
              >
                Hacer otra reserva
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
