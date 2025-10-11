import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    // CAMBIO 1: Tema Oscuro y Texto Blanco Crema
    <main className="min-h-screen bg-gradient-to-b text-[#fff3e7] from-[#14130f] to-[#272528]">
      
      {/* HEADER: Ajustado para Móvil (paddings reducidos) y tema oscuro */}
      <header className="px-4 py-4 flex justify-between items-center shadow-md bg-transparent md:px-8 md:py-4">
        {/* Usamos el logo placeholder o el texto */}
        <h1 className="text-xl font-bold text-[#d4a97e] md:text-2xl">
            Barbería Elite
        </h1>
        
        {/* CAMBIO 2: Menú Hamburguesa en Móvil (Ocultamos la navegación grande) */}
        <button 
            className="md:hidden text-[#d4a97e] text-2xl"
            aria-label="Menú de Navegación"
        >
            &#9776; 
        </button>

        {/* Navegación - Oculta en móvil, visible en md (desktop/tablet) */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link href="#services" className="hover:text-[#d4a97e] transition">Servicios</Link>
          <Link href="#about" className="hover:text-[#d4a97e] transition">Nosotros</Link>
          {/* Botón con color de acento */}
          <Link 
            href="/reserva" 
            className="px-4 py-2 bg-[#d4a97e] text-black rounded-lg hover:bg-[#835d37] transition font-medium"
          >
            Reservar
          </Link>
        </nav>
      </header>

      {/* SECCIÓN HERO: Ajustada para apilar en Móvil (flex-col) y paddings reducidos */}
      <section className="flex flex-col items-center text-center p-8 md:flex-row md:text-left md:justify-between md:px-10 md:py-20">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-[#fff3e7] mb-4 md:text-5xl">
            Tu estilo empieza aquí 💈
          </h2>
          <p className="text-lg text-[#fff3e7] mb-6 opacity-90">
            Agenda tu corte o servicio de barbería de manera rápida, sencilla y segura. 
            Elige tu horario y servicio favorito, nosotros hacemos el resto.
          </p>
          {/* Botón principal con color de acento */}
          <Link 
            href="/reserva" 
            className="inline-block px-6 py-3 bg-[#d4a97e] text-black rounded-lg hover:bg-[#835d37] text-lg font-medium transition"
          >
            Reservar Ahora
          </Link>
        </div>
        
        {/* Imagen: Margen superior en móvil, ajuste de tamaño */}
        <div className="mt-10 md:mt-0 md:ml-12 max-w-sm md:max-w-none">
          <Image 
            src="/barber-hero.png" 
            alt="Barbería" 
            className="rounded-2xl shadow-xl w-full h-auto opacity-90 md:w-[400px]"
            width={400} 
            height={267} 
          />
        </div>
      </section>

      {/* SECCIÓN SERVICIOS: Ajustada para Tema Oscuro y grid de 1 columna en Móvil */}
      <section id="services" className="py-12 px-8 text-center bg-[#212023] md:py-16 md:px-10">
        <h3 className="text-3xl font-bold text-[#d4a97e] mb-8">Nuestros Servicios</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          
          {/* Tarjeta de Servicio - Adaptación de colores */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow-lg hover:shadow-2xl hover:border-[#d4a97e] transition">
            <Image 
              src="/corte.jpg" 
              alt="Corte de Pelo" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg text-[#fff3e7]">Corte de Pelo</h4>
            <p className="text-gray-400">Q75 • 1 hora</p>
          </div>
          
          {/* Tarjeta de Servicio */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow-lg hover:shadow-2xl hover:border-[#d4a97e] transition">
            <Image 
              src="/barba.jpg" 
              alt="Corte de Barba" 
              className="rounded-lg mb-4 w-full h-40 object-cover" 
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg text-[#fff3e7]">Corte de Barba</h4>
            <p className="text-gray-400">Q50 • 1 hora</p>
          </div>
          
          {/* Tarjeta de Servicio */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow-lg hover:shadow-2xl hover:border-[#d4a97e] transition">
            <Image 
              src="/spa.jpg" 
              alt="Exfoliación" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg text-[#fff3e7]">Exfoliación</h4>
            <p className="text-gray-400">Q60 • 1 hora</p>
          </div>
          
          {/* Tarjeta de Servicio */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow-lg hover:shadow-2xl hover:border-[#d4a97e] transition">
            <Image 
              src="/masaje.jpg" 
              alt="Spa Facial" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg text-[#fff3e7]">Spa Facial</h4>
            <p className="text-gray-400">Q120 • 1 hora</p>
          </div>
        </div>
      </section>

      {/* FOOTER: Texto gris claro para fondo oscuro */}
      <footer id="about" className="py-10 text-center text-gray-400">
        <p>© 2025 Barbería Elite - Todos los derechos reservados</p>
      </footer>
    </main>
  );
}