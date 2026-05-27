import Link from "next/link";

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12 text-[#0A0A0A]">
      <h1 className="text-4xl font-semibold mb-8">Política de Privacidad</h1>

      <p className="mb-6 text-[#2A2A2A]">
        En <strong>Toro Mudanzas</strong> respetamos tu privacidad. Esta política explica qué datos recolectamos, cómo los utilizamos y tus derechos.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Información que recolectamos</h2>
      <p className="mb-4 text-[#2A2A2A]">
        A través de nuestro formulario de cotización recolectamos:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[#2A2A2A]">
        <li>Nombre y apellido</li>
        <li>Número de teléfono</li>
        <li>Correo electrónico</li>
        <li>Direcciones de origen y destino</li>
        <li>Detalles de la mudanza (tipo de servicio, fecha, artículos especiales, etc.)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Uso de la información</h2>
      <p className="mb-4 text-[#2A2A2A]">
        Utilizamos tus datos exclusivamente para:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[#2A2A2A]">
        <li>Preparar y enviar cotizaciones de mudanzas</li>
        <li>Comunicarnos contigo respecto a tu solicitud</li>
        <li>Programar y ejecutar el servicio de mudanza (cuando contratas)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Cookies</h2>
      <p className="mb-4 text-[#2A2A2A]">
        Este sitio utiliza cookies técnicas esenciales para su correcto funcionamiento. 
        Actualmente <strong>no utilizamos cookies de seguimiento, publicidad ni de terceros</strong>. 
        Puedes rechazar las cookies no esenciales en cualquier momento.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Compartir información</h2>
      <p className="mb-6 text-[#2A2A2A]">
        No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para prestar el servicio de mudanza (por ejemplo, coordinación con el equipo operativo).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Tus derechos</h2>
      <p className="mb-4 text-[#2A2A2A]">
        Puedes solicitar en cualquier momento:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[#2A2A2A]">
        <li>Acceso a tus datos</li>
        <li>Corrección de información incorrecta</li>
        <li>Eliminación de tus datos</li>
        <li>Retiro del consentimiento</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Contacto</h2>
      <p className="mb-6 text-[#2A2A2A]">
        Si tienes preguntas sobre esta política o deseas ejercer tus derechos, puedes contactarnos:
      </p>
      <p className="mb-8">
        <strong>Teléfono:</strong> (689) 600-2720<br />
        <strong>Horario:</strong> Lunes a Sábado, 7:00 AM – 7:00 PM
      </p>

      <div className="border-t pt-6 text-sm text-[#6B6B6B]">
        Última actualización: Mayo 2026
        <br />
        <Link href="/" className="underline hover:text-[#C8442A]">Volver al inicio</Link>
      </div>
    </div>
  );
}
