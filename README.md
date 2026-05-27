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

## Despliegue en Netlify

Este proyecto está configurado para desplegarse en **Netlify** usando el plugin oficial de Next.js.

### Pasos para desplegar:

1. Ve a [Netlify](https://app.netlify.com) y haz clic en **"Add new site" → "Import an existing project"**.
2. Conecta tu cuenta de GitHub y selecciona el repositorio `nueva-raiz`.
3. En la configuración del sitio usa estos valores:

   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Branch to deploy:** `main`

4. En la sección **"Build settings" > "Build plugins"**, Netlify debería detectar automáticamente el plugin `@netlify/plugin-nextjs` (porque ya está en `netlify.toml`).

5. Haz clic en **"Deploy site"**.

Una vez desplegado, puedes conectar el dominio personalizado **toromudanzas.com** desde la sección **Domain settings**.

### Archivo de configuración
El proyecto ya incluye un `netlify.toml` con la configuración recomendada para Next.js.

## Notas importantes
- Este proyecto es **totalmente separado** de toromovers.net.
- El teléfono actual es (689) 600-2720 (mismo equipo operativo).
- El endpoint `/api/booking` envía emails por Resend y notificaciones a Telegram (cuando las variables estén configuradas).

## Variables de entorno requeridas (Netlify)
- `RESEND_API_KEY`
- `TELEGRAM_BOT_TOKEN` → Usa el **mismo** que ya tienes en toromovers.net
- `TELEGRAM_CHAT_ID` → Usa el **mismo** que ya tienes en toromovers.net
- `OPENPHONE_API_KEY`
- `OPENPHONE_FROM_NUMBER_ID` (el ID del número en OpenPhone desde el que quieres enviar SMS)

## Próximos pasos recomendados
- Añadir logo real de Toro Mudanzas
- Configurar las variables de Telegram y Resend en Netlify (usa los mismos valores del sitio principal)
- Añadir Meta Pixel + Conversions API cuando estés listo para ads

---

Creado como proyecto independiente para pruebas de Meta Ads en el nicho hispanohablante.
