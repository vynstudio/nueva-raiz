import { NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const twilioClient = (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  console.log("[Toro Mudanzas] Nueva solicitud de cotización:", body);

  // Si no hay Resend configurado, solo devolvemos OK (modo desarrollo)
  if (!resend) {
    console.log("⚠️ RESEND_API_KEY no está configurada. Email no enviado.");
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    helpType,
    fromAddress,
    toAddress,
    date,
    specialItems,
  } = body;

  const nombreCompleto = `${firstName} ${lastName}`.trim();

  try {
    // Email al cliente
    await resend.emails.send({
      from: "Toro Mudanzas <hola@toromudanzas.com>", // Usa un dominio verificado en Resend
      to: email,
      replyTo: "hola@toromudanzas.com",
      subject: "Recibimos tu solicitud de cotización",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C8442A;">¡Gracias por contactarnos!</h2>
          <p>Hola ${firstName},</p>
          <p>Recibimos tu solicitud de cotización. Te responderemos con un precio por escrito <strong>el mismo día</strong>.</p>
          
          <p><strong>Resumen de tu solicitud:</strong></p>
          <ul>
            <li><strong>Tipo de servicio:</strong> ${helpType}</li>
            <li><strong>Desde:</strong> ${fromAddress}</li>
            <li><strong>Hacia:</strong> ${toAddress}</li>
            <li><strong>Fecha preferida:</strong> ${date || "No especificada"}</li>
            ${specialItems ? `<li><strong>Detalles especiales:</strong> ${specialItems}</li>` : ""}
          </ul>

          <p>Para algo urgente, llámanos directamente:</p>
          <p><strong>(689) 600-2720</strong></p>

          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Toro Mudanzas — Florida Central<br>
            Compañía de familia hispana • 100% en español
          </p>
        </div>
      `,
    });

    // Email de notificación al equipo
    await resend.emails.send({
      from: "Toro Mudanzas <notificaciones@toromudanzas.com>",
      to: "hello@toromudanzas.net", // Cambiar por el email real del dueño
      replyTo: email,
      subject: `Nueva cotización de ${nombreCompleto}`,
      html: `
        <h3>Nueva solicitud de cotización</h3>
        <p><strong>Cliente:</strong> ${nombreCompleto}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${helpType}</p>
        <p><strong>Desde:</strong> ${fromAddress}</p>
        <p><strong>Hacia:</strong> ${toAddress}</p>
        <p><strong>Fecha:</strong> ${date || "No especificada"}</p>
        ${specialItems ? `<p><strong>Detalles:</strong> ${specialItems}</p>` : ""}
      `,
    });

    // Notifications (non-blocking)
    sendToTelegram(body);
    sendSms(body);

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("Error enviando emails con Resend:", error);
    // Still try to notify via other channels even if email failed
    sendToTelegram(body);
    sendSms(body);
    return NextResponse.json({ ok: true, emailSent: false });
  }
}

// Send notification to Telegram (if configured)
async function sendToTelegram(data: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("⚠️ Telegram not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)");
    return;
  }

  const nombreCompleto = `${data.firstName} ${data.lastName}`.trim();

  const message = `
🆕 *Nueva Cotización - Toro Mudanzas*

👤 *Cliente:* ${nombreCompleto}
📞 *Tel:* ${data.phone}
✉️ *Email:* ${data.email}

🚚 *Servicio:* ${data.helpType}
📍 *Desde:* ${data.fromAddress}
📍 *Hacia:* ${data.toAddress}
📅 *Fecha:* ${data.date || "No especificada"}

${data.specialItems ? `📝 *Detalles:* ${data.specialItems}` : ""}

🌐 Ver en panel o responder rápido.
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Error sending to Telegram:", err);
  }
}

// Send SMS via Twilio (if configured)
async function sendSms(data: any) {
  if (!twilioClient) {
    console.log("⚠️ Twilio not configured (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN)");
    return;
  }

  const from = process.env.TWILIO_FROM_PHONE;
  const to = process.env.TWILIO_TO_PHONE; // Número del equipo que recibe los leads

  if (!from || !to) {
    console.log("⚠️ TWILIO_FROM_PHONE or TWILIO_TO_PHONE missing — SMS skipped");
    return;
  }

  const nombreCompleto = `${data.firstName} ${data.lastName}`.trim();

  const message = `🆕 Nueva Cotización
${nombreCompleto}
Tel: ${data.phone}
Servicio: ${data.helpType}
Desde: ${data.fromAddress}
Hacia: ${data.toAddress}
Fecha: ${data.date || "No especificada"}
${data.specialItems ? `Detalles: ${data.specialItems}` : ""}`;

  try {
    await twilioClient.messages.create({
      body: message,
      from,
      to,
    });
  } catch (err) {
    console.error("Error sending SMS via Twilio:", err);
  }
}
