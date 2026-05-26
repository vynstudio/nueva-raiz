# Toro Mudanzas

Landing page independiente y 100% en español para el nicho hispano de Florida Central.

**Dominio objetivo:** toromudanzas.com

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind
- Formulario multi-paso de cotización (sin dependencias externas pesadas)
- Desplegable en Netlify

## Desarrollo local
```bash
npm install
npm run dev
```

## Variables de entorno (opcional)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — para autocompletado de direcciones inteligente (Mapbox). Si no la pones, el campo de dirección funciona normalmente con autofill del navegador.

## Despliegue
Recomendado: Netlify (igual que toromovers).

1. Conecta el repo a Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`

Una vez desplegado, apunta **toromudanzas.com** al sitio de Netlify.

## Notas importantes
- Este proyecto es **totalmente separado** de toromovers.net.
- El teléfono actual es (689) 600-2720 (mismo equipo operativo).
- El endpoint `/api/booking` es un stub. Cuando quieras, podemos conectar Resend + notificación al inbox.

## Próximos pasos recomendados
- Añadir logo real de Toro Mudanzas
- Conectar emails de cotización (Resend)
- Añadir Meta Pixel + Conversions API cuando estés listo para ads

---

Creado como proyecto independiente para pruebas de Meta Ads en el nicho hispanohablante.
