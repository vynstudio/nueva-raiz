import type { Metadata } from "next";
import Script from "next/script";
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

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
