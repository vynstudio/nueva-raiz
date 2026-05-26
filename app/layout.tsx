import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toro Mudanzas | Mudanzas en Español · Florida Central",
  description: "Mudanzas en español para familias hispanas en Orlando, Kissimmee, Lake Nona, Clermont y toda Florida Central. Cuadrilla bilingüe, precios claros, sin sorpresas. Cotización en 60 segundos.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
