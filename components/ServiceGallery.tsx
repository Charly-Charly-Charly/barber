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
  // Definición de colores de la paleta
  const COLOR_PRIMARIO = "#fff3e7"; // Blanco crema para el texto
  const COLOR_ACENTO = "#d4a97e"; // Dorado/Marrón de acento

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {servicios.map(s => {
        const active = selected.includes(s.id);
        
        // Clases CSS dinámicas
        const baseClasses = "cursor-pointer p-4 rounded-lg border shadow transition-all duration-300";
        const inactiveClasses = "border-[#3e3c3c] bg-transparent hover:border-white/50";
        const activeClasses = `border-4 border-[${COLOR_ACENTO}] bg-white/5 shadow-2xl`; // Resalta la selección con el dorado
        
        // Clases de texto
        const titleClasses = `font-semibold ${active ? "text-[#fff3e7]" : "text-[#fff3e7]"}`;
        const priceClasses = `text-sm ${active ? "text-gray-300" : "text-gray-400"}`;

        return (
          <div 
            key={s.id} 
            onClick={() => toggle(s.id)} 
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
          >
            <div className="w-full h-40 relative mb-3">
              <Image 
                src={s.img} 
                alt={s.titulo} 
                fill 
                className="object-cover rounded" 
              />
            </div>
            <h3 className={titleClasses}>{s.titulo}</h3>
            <p className={priceClasses}>Q{s.precio} • {s.duracion}h</p>
          </div>
        )
      })}
    </div>
  );
}