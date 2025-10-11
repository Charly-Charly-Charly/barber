"use client";

import { useState } from "react";
// Asegúrate de que estos componentes existan en las rutas especificadas
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

      // Simulación de API (reemplazar con tu endpoint real)
      // const res = await fetch("/api/reservas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(createPayload) });
      // const json = await res.json();
      
      // Simulación de respuesta exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      const json = { id: Math.floor(Math.random() * 1000) + 100 };
      const res = { ok: true, status: 200 };
      
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
    // CAMBIO 1: Fondo principal de la barbería
    <main className="min-h-screen p-8 text-[#fff3e7] bg-gradient-to-b from-[#14130f] to-[#272528]">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-[#d4a97e] text-center mb-10">
          Reservar Cita
        </h1>

        {/* Mensaje de Error */}
        {error && (
          <div className="p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg shadow-inner text-center font-medium">
            {error}
          </div>
        )}

        {/* PASO 1: Fecha y Hora */}
        {step === 1 && (
          // CAMBIO 2: Contenedor con fondo oscuro secundario
          <div className="bg-[#212023] p-8 rounded-xl shadow-2xl border border-[#3e3c3c]">
            <h2 className="text-2xl font-semibold mb-6 text-[#fff3e7]">
              1. Selecciona fecha y hora
            </h2>
            <CalendarSlotSelector onSelect={onPickSlot} />
          </div>
        )}

        {/* PASO 2: Servicios */}
        {step === 2 && (
          // CAMBIO 2: Contenedor con fondo oscuro secundario
          <div className="bg-[#212023] p-8 rounded-xl shadow-2xl border border-[#3e3c3c]">
            <h2 className="text-2xl font-semibold mb-6 text-[#fff3e7]">
              2. Selecciona servicios
            </h2>
            <ServiceGallery servicios={CATALOG} selected={selected} toggle={toggle} />
            
            {/* Resumen de Total */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-lg font-medium">
              <div>
                Duración: <b className="text-[#d4a97e]">{totalHours} hora(s)</b>
              </div>
              <div>
                Total: <b className="text-[#d4a97e]">Q{subtotal}</b>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Botón secundario para volver */}
              <button
                className="w-full sm:w-auto px-6 py-3 bg-[#14130f] text-gray-400 rounded-lg transition-colors duration-200 hover:bg-[#272528] hover:text-[#fff3e7]"
                onClick={() => setStep(1)}
              >
                ← Cambiar fecha
              </button>
              
              {/* Botón principal (Continuar) con color de acento */}
              <button
                className="w-full sm:w-auto px-6 py-3 bg-[#d4a97e] text-black rounded-lg font-bold transition-all duration-300 hover:bg-[#835d37] shadow-lg hover:shadow-xl disabled:bg-gray-700 disabled:text-gray-400"
                onClick={onProceedToClient}
                disabled={selected.length === 0}
              >
                Continuar ({selected.length} servicios)
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Datos del Cliente */}
        {step === 3 && (
          // CAMBIO 2: Contenedor con fondo oscuro secundario
          <div className="bg-[#212023] p-8 rounded-xl shadow-2xl border border-[#3e3c3c]">
            <h2 className="text-2xl font-semibold mb-4 text-[#fff3e7]">
              3. Tus datos
            </h2>
            <p className="mb-6 text-sm text-gray-400">
              Cita:{" "}
              <b className="text-[#d4a97e]">
                {new Date(startISO).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
              </b>
            </p>
            <ClientForm onSubmit={handleClientSubmit} />
            {loading && (
              <div className="mt-4 text-sm text-[#d4a97e] text-center font-medium">
                Enviando reserva, por favor espera...
              </div>
            )}
          </div>
        )}

        {/* PASO 4: Confirmación */}
        {step === 4 && confirmed && (
          // Estilo de éxito adaptado: fondo verde oscuro para buen contraste
          <div className="p-8 bg-green-950 border border-green-700 rounded-xl text-green-200 shadow-2xl">
            <h2 className="text-3xl font-bold text-green-400 text-center mb-4">
              ¡Reserva confirmada! ✅
            </h2>
            <p className="mt-4 text-center text-lg">
              Te esperamos en **Barbería Elite**.
            </p>
            <div className="mt-4 p-4 bg-green-900 rounded-lg space-y-2">
                <p>Fecha y hora: <b className="text-white block sm:inline">{confirmed.start}</b></p>
                <p>Servicios: <b className="text-white block sm:inline">
                    {confirmed.services.map((s: any) => s.titulo).join(", ")}
                </b></p>
                <p>Total: <b className="text-white block sm:inline">Q{confirmed.total_price}</b></p>
            </div>
            
            <div className="mt-8 flex justify-center">
              {/* Botón principal (Hacer otra reserva) con color de acento */}
              <button
                className="px-6 py-3 bg-[#d4a97e] text-black rounded-lg font-bold transition-all duration-300 hover:bg-[#835d37] shadow-lg hover:shadow-xl"
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