import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  console.log("[Toro Mudanzas] Nueva solicitud de cotización:", body);
  // TODO: Wire Resend + notification when ready
  return NextResponse.json({ ok: true });
}
