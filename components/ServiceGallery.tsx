"use client";
import Image from "next/image";

export type Servicio = {
  id: number;
  titulo: string;
  precio: number;
  duracion: number; // en horas
  img: string;
};

interface Props {
  servicios: Servicio[];
  selected: number[];
  toggle: (id: number) => void;
}

export default function ServiceGallery({ servicios, selected, toggle }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {servicios.map(s => {
        const active = selected.includes(s.id);
        return (
          <div key={s.id} onClick={()=>toggle(s.id)} className={`cursor-pointer p-4 rounded-lg border ${active ? "border-blue-500 bg-blue-50" : "border-gray-200"} shadow`}>
            <div className="w-full h-40 relative mb-3">
              <Image 
                src={s.img} 
                alt={s.titulo} 
                fill 
                className="object-cover rounded" 
              />
            </div>
            <h3 className="font-semibold">{s.titulo}</h3>
            <p className="text-sm text-gray-600">Q{s.precio} • {s.duracion}h</p>
          </div>
        )
      })}
    </div>
  );
}
