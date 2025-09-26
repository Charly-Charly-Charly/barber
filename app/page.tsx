import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <header className="px-6 py-4 flex justify-between items-center shadow-sm bg-white">
        <h1 className="text-xl font-bold text-blue-700">Barbería Elite</h1>
        <nav className="space-x-4">
          <Link href="#services" className="hover:text-blue-600">Servicios</Link>
          <Link href="#about" className="hover:text-blue-600">Nosotros</Link>
          <Link href="/reserva" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Reservar</Link>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tu estilo empieza aquí ✂️
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Agenda tu corte o servicio de barbería de manera rápida, sencilla y segura. 
            Elige tu horario y servicio favorito, nosotros hacemos el resto.
          </p>
          <Link href="/reserva" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium">
            Reservar Ahora
          </Link>
        </div>
        <div className="mt-10 md:mt-0 md:ml-12">
          <Image 
            src="/barber-hero.png" 
            alt="Barbería" 
            className="rounded-2xl shadow-lg w-[400px]"
            width={400} 
            height={267} 
          />
        </div>
      </section>

      <section id="services" className="bg-white py-16 px-10 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <Image 
              src="/corte.jpg" 
              alt="Corte de Pelo" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg">Corte de Pelo</h4>
            <p className="text-gray-600">Q75 • 1 hora</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <Image 
              src="/barba.jpg" 
              alt="Corte de Barba" 
              className="rounded-lg mb-4 w-full h-40 object-cover" 
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg">Corte de Barba</h4>
            <p className="text-gray-600">Q50 • 1 hora</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <Image 
              src="/spa.jpg" 
              alt="Exfoliación" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg">Exfoliación</h4>
            <p className="text-gray-600">Q60 • 1 hora</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <Image 
              src="/masaje.jpg" 
              alt="Spa Facial" 
              className="rounded-lg mb-4 w-full h-40 object-cover"
              width={500}
              height={160}
            />
            <h4 className="font-semibold text-lg">Spa Facial</h4>
            <p className="text-gray-600">Q120 • 1 hora</p>
          </div>
        </div>
      </section>

      <footer id="about" className="py-10 text-center text-gray-600">
        <p>© 2025 Barbería Elite - Todos los derechos reservados</p>
      </footer>
    </main>
  );
}
