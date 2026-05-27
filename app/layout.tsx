import type { Metadata } from "next";
import "./globals.css";
import { CookieBanner } from "../components/CookieBanner";

export const metadata: Metadata = {
  title: "Compañía de Mudanzas en Florida Central | 100% en Español para la Comunidad Latina",
  description: "Compañía de mudanzas en Florida Central de familia hispana para la comunidad latina. Servicio 100% en español en Orlando, Kissimmee, Lake Nona, Clermont y toda Florida Central. Cotización en 60 segundos.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Compañía de Mudanzas en Florida Central | 100% en Español",
    description: "De familia hispana para la comunidad latina. Mudanzas en Orlando, Kissimmee, Lake Nona y Florida Central con servicio completo en español.",
    images: [
      {
        url: "/hero-family.jpg",
        width: 1200,
        height: 630,
        alt: "Compañía de Mudanzas en Florida Central - 100% en Español",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
