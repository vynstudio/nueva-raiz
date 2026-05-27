"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] text-white z-50 border-t border-[#333]">
      <div className="max-w-5xl mx-auto px-5 py-5 text-sm">
        <p className="mb-3">
          Utilizamos cookies esenciales para el funcionamiento del sitio. 
          No usamos cookies de seguimiento ni de terceros por el momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="bg-[#C8442A] hover:bg-[#E55A3D] text-white px-6 py-2 rounded text-sm font-semibold transition"
          >
            Aceptar
          </button>
          <button
            onClick={handleReject}
            className="border border-white/70 hover:bg-white/10 px-6 py-2 rounded text-sm font-semibold transition"
          >
            Solo esenciales
          </button>
          <a 
            href="/privacidad" 
            className="text-white/70 hover:text-white underline text-sm self-center"
          >
            Ver política de privacidad
          </a>
        </div>
      </div>
    </div>
  );
}
