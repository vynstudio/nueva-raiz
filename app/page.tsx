"use client";

import { useState } from "react";
import { AddressInput } from "../components/address-input";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/contact";
import {
  QuoteSchema,
  type HelpType,
  HELP_LABEL,
  RESIDENCE_LABEL,
  FLOOR_LABEL,
  type ResidenceType,
  type ApartmentFloor,
} from "../lib/booking-schema";

const HELP_OPTIONS: HelpType[] = ["labor", "labor-truck", "hauling"];
const RESIDENCE_OPTIONS: ResidenceType[] = ["house", "apartment", "townhome", "storage"];
const FLOOR_OPTIONS: ApartmentFloor[] = ["1", "2", "3", "4", "5+"];

export default function ToroMudanzasLanding() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    helpType: "labor-truck" as HelpType,
    fromAddress: "",
    fromResidence: "house" as ResidenceType,
    fromFloor: undefined as ApartmentFloor | undefined,
    toAddress: "",
    toResidence: "house" as ResidenceType,
    toFloor: undefined as ApartmentFloor | undefined,
    date: "",
    specialItems: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setResidence = (which: "from" | "to", value: ResidenceType) => {
    if (which === "from") {
      update("fromResidence", value);
      if (value !== "apartment") update("fromFloor", undefined);
    } else {
      update("toResidence", value);
      if (value !== "apartment") update("toFloor", undefined);
    }
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    const parsed = QuoteSchema.safeParse(form);
    if (!parsed.success) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* stub */
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-6">✓</div>
          <h1 className="text-3xl font-semibold tracking-tight mb-4">Recibimos tu solicitud.</h1>
          <p className="text-lg text-[#2A2A2A] mb-8">
            Te enviaremos una cotización por escrito el mismo día. Para algo urgente, llámanos ahora.
          </p>
          <a href={PHONE_TEL} className="inline-flex items-center justify-center bg-[#C8442A] text-white px-8 py-4 rounded-md text-lg font-semibold">
            Llamar {PHONE_DISPLAY}
          </a>
          <p className="mt-6 text-sm text-[#6B6B6B]">Toro Mudanzas — Florida Central</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0A0A0A] font-sans">
      {/* Light top bar */}
      <header className="border-b border-[#E0DCD4]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C8442A] rounded-md flex items-center justify-center text-white font-bold text-lg">T</div>
            <div>
              <div className="font-semibold tracking-[0.5px] text-lg">TORO MUDANZAS</div>
              <div className="text-[10px] text-[#6B6B6B] -mt-1">Florida Central</div>
            </div>
          </div>

          <a href={PHONE_TEL} className="flex items-center gap-2 text-sm font-semibold hover:text-[#C8442A] transition-colors">
            <span className="hidden sm:inline">Llamar ahora</span> {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      {/* Hero with Background Image */}
      <section 
        className="relative min-h-[620px] md:min-h-[700px] lg:min-h-[750px] flex items-end justify-center text-white"
        style={{
          backgroundImage: "url('/hero-family.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Stronger gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/60 to-black/80" />

        <div className="relative z-10 max-w-5xl px-5 text-center pb-20 md:pb-24 lg:pb-28">
          <div className="inline-flex items-center gap-2 bg-white/95 text-[#0A0A0A] px-4 py-1.5 rounded-full text-xs tracking-[1.5px] font-semibold mb-5 shadow-sm">
            COMPAÑÍA HISPANA · 100% EN ESPAÑOL
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-1.6px] font-semibold mb-5 [text-shadow:_0_2px_12px_rgb(0,0,0,0.45)]">
            Compañía de Mudanzas en Florida Central
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById("cotiza")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#C8442A] hover:bg-[#E55A3D] transition-all text-white text-lg font-semibold px-8 py-4 rounded-md shadow-lg min-h-[52px]"
            >
              Cotización gratis en 60 segundos
            </button>
            <a 
              href={PHONE_TEL} 
              className="border-2 border-white/90 hover:bg-white hover:text-[#0A0A0A] transition-all text-white text-lg font-semibold px-8 py-4 rounded-md min-h-[52px]"
            >
              Llamar {PHONE_DISPLAY}
            </a>
          </div>

          <p className="text-xs text-white/70 mt-4 tracking-wide">
            Mínimo 2 horas · Sin recargos por gasolina ni escaleras
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#FAFAF9] border-y border-[#E0DCD4] py-4">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-[#2A2A2A]">
          <div>4.9★ en Google</div>
          <div>Cuadrilla hispanohablante</div>
          <div>Precios por hora claros</div>
          <div>Asegurados</div>
          <div>Misma cuadrilla todo el proceso</div>
          <div>Sin sorpresas en el precio</div>
        </div>
      </div>

      {/* Por qué las familias hispanas nos eligen */}
      <section className="max-w-6xl mx-auto px-5 py-16 lg:py-20">
        <div className="text-center mb-10">
          <div className="uppercase tracking-[2px] text-xs font-semibold text-[#C8442A] mb-3">LA DIFERENCIA REAL</div>
          <h2 className="text-4xl tracking-[-1px] font-semibold">Hablamos español de verdad.<br />No solo en la cotización.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-[15px]">
          {[
            { title: "Toda la comunicación en español", text: "Cotizamos, agendamos y ejecutamos tu mudanza completa en español. Sin traductores, sin confusiones, sin estrés." },
            { title: "Entendemos a las familias hispanas", text: "Sabemos lo que significa mudarse con abuelos, niños, y pertenencias que tienen historia. Tratamos cada hogar con respeto." },
            { title: "Dueños locales, sin call center", text: "Cuando llamas o cotizas, hablas directo con quien maneja la operación. Sin intermediarios ni promesas que después no se cumplen." },
          ].map((item, i) => (
            <div key={i} className="bg-[#FAFAF9] border border-[#E0DCD4] rounded-xl p-7">
              <div className="font-semibold text-lg mb-3">{item.title}</div>
              <p className="text-[#2A2A2A]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust with Images + Reviews */}
      <section className="max-w-7xl mx-auto px-5 py-16 lg:py-20 bg-[#FAFAF9]">
        <div className="text-center mb-10">
          <div className="uppercase tracking-[2px] text-xs font-semibold text-[#C8442A] mb-3">LA CONFIANZA DE NUESTRA GENTE</div>
          <h2 className="text-4xl tracking-[-1px] font-semibold">Lo que dicen las familias hispanas<br />que ya se mudaron con nosotros</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              photo: "https://picsum.photos/id/1011/120/120",
              name: "María González",
              location: "Kissimmee → Clermont",
              review: "Mudamos a mis papás. Todo el proceso en español, con mucha paciencia y respeto. La cuadrilla fue excelente. Recomiendo 100%.",
              stars: "★★★★★"
            },
            {
              photo: "https://picsum.photos/id/1005/120/120",
              name: "Carlos & Ana Ramírez",
              location: "Lake Nona",
              review: "Nuestra primera mudanza grande con los niños. Nos explicaron todo claro y el precio nunca cambió. Muy profesionales y amables.",
              stars: "★★★★★"
            },
            {
              photo: "https://picsum.photos/id/1009/120/120",
              name: "Javier Morales",
              location: "Winter Garden",
              review: "Tenía que mudarme con solo 3 días de aviso. Me ayudaron rápido, sin complicaciones y a buen precio. La mejor decisión.",
              stars: "★★★★★"
            }
          ].map((r, i) => (
            <div key={i} className="bg-white border border-[#E0DCD4] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={r.photo} 
                  alt={r.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E0DCD4]" 
                />
                <div>
                  <div className="font-semibold text-lg">{r.name}</div>
                  <div className="text-sm text-[#6B6B6B]">{r.location}</div>
                </div>
              </div>

              <div className="text-[#C8442A] text-lg tracking-widest mb-3">{r.stars}</div>

              <p className="text-[#2A2A2A] italic flex-1">“{r.review}”</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#6B6B6B] mt-8">4.9 de 5 estrellas en más de 100 reseñas de Google</p>
      </section>

      {/* Cómo funciona */}
      <section className="bg-[#FAFAF9] border-y border-[#E0DCD4] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-10">
            <div className="uppercase tracking-[2px] text-xs font-semibold text-[#C8442A] mb-3">PROCESO SIMPLE</div>
            <h2 className="text-4xl tracking-[-1px] font-semibold">Tres pasos. Sin complicaciones.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Cotiza en 60 segundos", text: "Dinos de dónde a dónde, qué tipo de ayuda necesitas y la fecha. Te respondemos con precio por escrito el mismo día." },
              { num: "02", title: "Reserva tu día", text: "Un pequeño depósito reembolsable asegura tu fecha. La misma cuadrilla que te cotizó llega el día de la mudanza." },
              { num: "03", title: "Nosotros nos encargamos", text: "Envolvemos, cargamos, transportamos y colocamos todo. El reloj se detiene cuando termina el trabajo. Pagas el saldo al finalizar." },
            ].map((s, i) => (
              <div key={i} className="border border-[#E0DCD4] bg-white rounded-xl p-7">
                <div className="text-[#C8442A] font-mono text-sm tracking-[2px] mb-3">{s.num}</div>
                <div className="font-semibold text-xl mb-3">{s.title}</div>
                <p className="text-[#2A2A2A]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <div className="text-center mb-10">
          <div className="uppercase tracking-[2px] text-xs font-semibold text-[#C8442A] mb-3">LO QUE HACEMOS</div>
          <h2 className="text-4xl tracking-[-1px] font-semibold">Tres formas de moverte.<br />Precios claros en las tres.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Solo mano de obra", desc: "Tienes camión, U-Haul o PODS. Nosotros ponemos la cuadrilla fuerte y experimentada.", bullets: ["2 mudanceros mínimo", "Mantas, carretillas y envoltura", "Carga o descarga", "Tarifa por hora clara"] },
            { title: "Mudanza completa", desc: "Camión + cuadrilla. La opción más solicitada para apartamentos y casas en Florida Central.", bullets: ["Camión de 16' o 26' incluido", "2 mudanceros", "Envoltura completa de muebles", "Misma cuadrilla todo el proceso"], featured: true },
            { title: "Mudanza grande o día completo", desc: "Casas grandes o mudanzas que requieren más manos. 3 mudanceros + camión.", bullets: ["3 mudanceros", "Camión incluido", "Envoltura y protección", "Ideal para casas de 3+ habitaciones"] },
          ].map((service, i) => (
            <div key={i} className={`border rounded-2xl p-7 flex flex-col ${service.featured ? "border-[#C8442A] bg-[#FAFAF9]" : "border-[#E0DCD4]"}`}>
              {service.featured && <div className="text-xs font-semibold tracking-widest text-[#C8442A] mb-2">MÁS SOLICITADO</div>}
              <div className="font-semibold text-2xl mb-2">{service.title}</div>
              <p className="text-[#2A2A2A] mb-6 text-[15px]">{service.desc}</p>
              <ul className="space-y-2 text-sm mb-auto">
                {service.bullets.map((b, idx) => <li key={idx} className="flex gap-2">• {b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario de cotización completo */}
      <section id="cotiza" className="bg-[#0A0A0A] text-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8">
            <div className="uppercase tracking-[2px] text-xs font-semibold text-[#E55A3D] mb-3">COTIZACIÓN GRATIS</div>
            <h2 className="text-4xl tracking-[-1px] font-semibold text-white">Dinos sobre tu mudanza.<br />Te respondemos hoy.</h2>
          </div>

          <div className="bg-white text-[#0A0A0A] rounded-2xl p-7 sm:p-9">
            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="font-semibold text-xl mb-4">¿Qué tipo de ayuda necesitas?</div>
                <div className="space-y-3 mb-8">
                  {HELP_OPTIONS.map((h) => (
                    <button key={h} onClick={() => update("helpType", h)} className={`w-full text-left border rounded-xl px-5 py-4 transition ${form.helpType === h ? "border-[#C8442A] bg-[#FBE6E0]" : "border-[#E0DCD4] hover:bg-[#FAFAF9]"}`}>
                      {HELP_LABEL[h]}
                    </button>
                  ))}
                </div>
                <button onClick={next} className="w-full bg-[#C8442A] text-white py-4 rounded-md font-semibold text-lg">Continuar</button>
              </div>
            )}

            {/* STEP 2 - FROM */}
            {step === 2 && (
              <div>
                <div className="font-semibold text-xl mb-4">¿Desde dónde te mudas?</div>
                <div className="mb-4">
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">Dirección de origen</label>
                  <AddressInput value={form.fromAddress} onChange={(v) => update("fromAddress", v)} placeholder="Calle, ciudad, FL" />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-[#6B6B6B] block mb-2">¿Qué tipo de lugar es?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RESIDENCE_OPTIONS.map((r) => (
                      <button key={r} onClick={() => setResidence("from", r)} className={`px-4 py-3 rounded-lg border text-sm ${form.fromResidence === r ? "border-[#C8442A] bg-[#FBE6E0]" : "border-[#E0DCD4]"}`}>
                        {RESIDENCE_LABEL[r]}
                      </button>
                    ))}
                  </div>
                </div>
                {form.fromResidence === "apartment" && (
                  <div className="mb-6">
                    <label className="text-sm text-[#6B6B6B] block mb-2">¿Qué piso?</label>
                    <div className="flex flex-wrap gap-2">
                      {FLOOR_OPTIONS.map((f) => (
                        <button key={f} onClick={() => update("fromFloor", f)} className={`px-4 py-2 rounded-lg border text-sm ${form.fromFloor === f ? "border-[#C8442A] bg-[#FBE6E0]" : "border-[#E0DCD4]"}`}>
                          {FLOOR_LABEL[f]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-8">
                  <button onClick={back} className="flex-1 border py-4 rounded-md font-semibold">Atrás</button>
                  <button onClick={next} className="flex-1 bg-[#C8442A] text-white py-4 rounded-md font-semibold">Continuar</button>
                </div>
              </div>
            )}

            {/* STEP 3 - TO */}
            {step === 3 && (
              <div>
                <div className="font-semibold text-xl mb-4">¿A dónde te mudas?</div>
                <div className="mb-4">
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">Dirección de destino</label>
                  <AddressInput value={form.toAddress} onChange={(v) => update("toAddress", v)} placeholder="Calle, ciudad, FL" />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-[#6B6B6B] block mb-2">¿Qué tipo de lugar es?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {RESIDENCE_OPTIONS.map((r) => (
                      <button key={r} onClick={() => setResidence("to", r)} className={`px-4 py-3 rounded-lg border text-sm ${form.toResidence === r ? "border-[#C8442A] bg-[#FBE6E0]" : "border-[#E0DCD4]"}`}>
                        {RESIDENCE_LABEL[r]}
                      </button>
                    ))}
                  </div>
                </div>
                {form.toResidence === "apartment" && (
                  <div className="mb-6">
                    <label className="text-sm text-[#6B6B6B] block mb-2">¿Qué piso?</label>
                    <div className="flex flex-wrap gap-2">
                      {FLOOR_OPTIONS.map((f) => (
                        <button key={f} onClick={() => update("toFloor", f)} className={`px-4 py-2 rounded-lg border text-sm ${form.toFloor === f ? "border-[#C8442A] bg-[#FBE6E0]" : "border-[#E0DCD4]"}`}>
                          {FLOOR_LABEL[f]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-8">
                  <button onClick={back} className="flex-1 border py-4 rounded-md font-semibold">Atrás</button>
                  <button onClick={next} className="flex-1 bg-[#C8442A] text-white py-4 rounded-md font-semibold">Continuar</button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <div className="font-semibold text-xl mb-5">Fecha y detalles</div>
                <div className="mb-5">
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">Fecha preferida</label>
                  <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3 text-base" />
                </div>
                <div>
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">¿Algo especial que debamos saber? (piano, escaleras estrechas, muebles grandes, etc.)</label>
                  <textarea value={form.specialItems} onChange={(e) => update("specialItems", e.target.value)} rows={3} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3 text-base resize-y" placeholder="Opcional" />
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={back} className="flex-1 border py-4 rounded-md font-semibold">Atrás</button>
                  <button onClick={next} className="flex-1 bg-[#C8442A] text-white py-4 rounded-md font-semibold">Continuar</button>
                </div>
              </div>
            )}

            {/* STEP 5 - Contact */}
            {step === 5 && (
              <div>
                <div className="font-semibold text-xl mb-5">¿A dónde te enviamos la cotización?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-[#6B6B6B] block mb-1.5">Nombre</label>
                    <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3" placeholder="Nombre" />
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] block mb-1.5">Apellido</label>
                    <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3" placeholder="Apellido" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3" placeholder="tu@email.com" />
                </div>
                <div className="mb-8">
                  <label className="text-sm text-[#6B6B6B] block mb-1.5">Teléfono</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full border border-[#E0DCD4] rounded-lg px-4 py-3" placeholder="(689) 555-1234" />
                </div>
                <div className="flex gap-3">
                  <button onClick={back} className="flex-1 border py-4 rounded-md font-semibold">Atrás</button>
                  <button onClick={handleSubmit} disabled={submitting} className="flex-1 bg-[#C8442A] disabled:opacity-70 text-white py-4 rounded-md font-semibold text-lg">
                    {submitting ? "Enviando..." : "Enviar mi solicitud"}
                  </button>
                </div>
                <p className="text-center text-xs text-[#6B6B6B] mt-6">Respondemos el mismo día. Para algo urgente, llama.</p>
              </div>
            )}
          </div>
          <p className="text-center text-[#888] text-sm mt-6">Toro Mudanzas · Mismo teléfono, misma cuadrilla, misma calidad.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 py-14">
        <div className="text-center mb-8">
          <div className="uppercase tracking-[2px] text-xs font-semibold text-[#C8442A] mb-3">PREGUNTAS FRECUENTES</div>
          <h2 className="text-3xl tracking-[-0.5px] font-semibold">Lo que las familias hispanas preguntan</h2>
        </div>
        <div className="space-y-4 text-[15px]">
          {[
            ["¿Realmente hablan español todo el tiempo?", "Sí. Toda nuestra cuadrilla es hispanohablante. Puedes cotizar, agendar y manejar toda tu mudanza en español sin problema."],
            ["¿Cobran extra por gasolina, escaleras o fines de semana?", "No. Tarifa por hora clara desde el principio. Mínimo 2 horas. Sin recargos por gasolina, escaleras ni fines de semana."],
            ["¿Pueden ayudarme con mis papás o abuelos?", "Sí. Tenemos mucha experiencia ayudando a familias con personas mayores. Vamos con paciencia y cuidado."],
            ["¿Cuánto cuesta aproximadamente?", "Depende del tipo de servicio, distancia y volumen. Cotizamos en 60 segundos y te damos precio por escrito el mismo día."],
            ["¿Trabajan en Kissimmee, Lake Nona, Clermont, etc.?", "Sí. Servimos toda Florida Central: Orlando, Kissimmee, Lake Nona, Winter Garden, Clermont, Apopka, Oviedo, Sanford y más."],
          ].map(([q, a], i) => (
            <details key={i} className="border border-[#E0DCD4] rounded-xl px-6 py-4 group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-[#C8442A] group-open:rotate-180 transition">↓</span>
              </summary>
              <p className="mt-3 text-[#2A2A2A] pr-6">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#C8442A] text-white py-12 text-center">
        <div className="max-w-xl mx-auto px-5">
          <div className="text-xl sm:text-2xl font-semibold mb-2">¿Listo para moverte sin estrés?</div>
          <p className="mb-6 text-[#FBE6E0]">Cotización en 60 segundos. Respuesta el mismo día.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => document.getElementById("cotiza")?.scrollIntoView({ behavior: "smooth" })} className="bg-white text-[#C8442A] font-semibold px-8 py-3.5 rounded-md text-lg">Cotizar ahora</button>
            <a href={PHONE_TEL} className="border border-white/70 hover:bg-white/10 transition px-8 py-3.5 rounded-md text-lg font-semibold">Llamar {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-[#6B6B6B] py-8 border-t">
        Toro Mudanzas · Florida Central · (689) 600-2720<br />
        Asegurados · Cuadrilla bilingüe · Precios claros<br />
        <a href="/privacidad" className="underline hover:text-[#C8442A]">Política de Privacidad</a>
      </footer>
    </div>
  );
}
