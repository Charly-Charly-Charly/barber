import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b text-[#fff3e7] from-[#14130f] to-[#272528]">
      {/* AJUSTE CLAVE: En el Header, ocultamos la navegación en móvil (md:block) 
        y añadimos un botón de "menú hamburguesa" (solo visible en móvil). 
        El logo y los paddings se ajustan para móvil.
      */}
      <header className="px-4 py-4 flex justify-between items-center shadow-sm bg-transparent md:px-8 md:py-4">
        <Image
          src="/logo.png"
          alt="Barbería Elite"
          width={150}
          height={50}
          className="w-28 md:w-36 h-auto" 
        />

        {/* Menú visible en móvil: Icono de hamburguesa */}
        <button 
            className="md:hidden text-[#d4a97e] text-2xl"
            aria-label="Menú de Navegación"
        >
            &#9776; {/* Icono de hamburguesa simple */}
        </button>
        
        {/* Navegación - Oculta en móvil, visible en md (desktop/tablet) */}
        <nav className="hidden md:flex space-x-4">
          <Link href="#services" className="hover:text-[#d4a97e]">Servicios</Link>
          <Link href="#about" className="hover:text-[#d4a97e]">Nosotros</Link>
          <Link href="/reserva" className="px-4 py-2 bg-[#d4a97e] text-black rounded-md hover:bg-[#835d37] transition">Reservar</Link>
        </nav>
      </header>

      {/* SECCIÓN PRINCIPAL (HERO) 
        AJUSTE CLAVE: En móvil (por defecto), es columna y sin padding grande. 
        En md (desktop), vuelve a ser fila (flex-row) y con el padding original.
      */}
      <section className="flex flex-col items-center text-center p-8 md:flex-row md:text-left md:justify-between md:pl-48 md:px-0">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-[#fff3e7] mb-4 md:text-4xl">
            Tu estilo empieza aquí
          </h2>
          <p className="text-base text-[#fff3e7] mb-6 md:text-lg">
            Agenda tu corte o servicio de barbería de manera rápida, sencilla y segura.
            Elige tu horario y servicio favorito, nosotros hacemos el resto.
          </p>
          <Link href="/reserva" className="inline-block px-6 py-3 bg-[#d4a97e] text-black rounded-md hover:bg-[#835d37] text-lg font-medium transition">
            Reservar Ahora
          </Link>
        </div>
        
        {/* Imagen del Hero - Oculta o más pequeña en móvil para ahorrar espacio vertical */}
        <div className="mt-8 md:mt-0 md:ml-12 max-w-sm md:max-w-none">
          <Image
            src="/barber-hero.png"
            alt="Barbería"
            className="w-full h-auto opacity-80 md:w-[800px] md:opacity-100"
            width={400}
            height={267}
          />
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS
        AJUSTE CLAVE: Reducir el tamaño del título en móvil y cambiar el padding horizontal. 
        Las tarjetas de servicio son una sola columna en móvil (grid-cols-1).
      */}
      <section id="services" className="py-12 px-8 text-center md:py-16 md:px-48">
        <h3 className="text-4xl font-bold text-[#d4a97e] mb-8 md:text-[96px]">NUESTROS SERVICIOS</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          
          {/* Tarjeta de servicio 1 - Ajusté el color de texto para el fondo claro */}
          <div className="p-4 rounded-xl shadow hover:shadow-lg bg-[#d4a97e] transition">
            <Image
              src="/corte.jpg"
              alt="Corte de Pelo"
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={400}
            />
            <h4 className="font-semibold text-black uppercase text-lg">Corte de Pelo</h4>
            <p className="text-gray-900">Q75 • 1 hora</p>
          </div>
          
          {/* Tarjeta de servicio 2 - Ajusté el borde y el color de texto para el fondo oscuro */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow hover:shadow-lg transition">
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
          
          {/* Tarjeta de servicio 3 */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow hover:shadow-lg transition">
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
          
          {/* Tarjeta de servicio 4 */}
          <div className="p-4 border border-[#3e3c3c] rounded-xl shadow hover:shadow-lg transition">
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

      <footer id="about" className="py-10 text-center text-gray-500">
        <p>© 2025 Barbería Elite - Todos los derechos reservados</p>
      </footer>
    </main>
  );
}