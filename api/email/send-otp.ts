// @ts-nocheck
import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "landseccapital@gmail.com";
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || "";
const SECURITY_EMAIL = process.env.SECURITY_EMAIL || "extemetrade22@gmail.com";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_PASS },
  });
}

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`;

function emailWrapper(content: string, previewText = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>Landsec Capital Security</title></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
${previewText ? `<span style="display:none;font-size:0;max-height:0;overflow:hidden;">${previewText}</span>` : ""}
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:16px;overflow:hidden;border:1px solid #1e3a5f;">
      <tr><td style="background:linear-gradient(135deg,#0a0f1e 0%,#1e3a5f 100%);padding:32px 40px;text-align:center;border-bottom:1px solid #1e3a5f;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding-bottom:12px;">${logoSvg}</td></tr>
          <tr><td align="center"><span style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#ffffff;">Landsec Capital</span></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:40px;">${content}</td></tr>
      <tr><td style="background:#0a0f1e;padding:28px 40px;border-top:1px solid #1e3a5f;text-align:center;">
        <p style="margin:0;font-size:11px;color:#2d3f55;">&copy; 2026 Landsec Capital. All rights reserved.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

async function readBody(req: any): Promise<any> {
  if (req.body !== undefined) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk: Buffer) => { data += chunk.toString(); });
    req.on("end", () => { try { resolve(JSON.parse(data)); } catch { resolve({}); } });
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body: any;
  try { body = await readBody(req); } catch { body = {}; }

  const { action } = body as { action: string };
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  if (!GMAIL_PASS) {
    res.status(200).json({ ok: true, simulated: true, code, message: "OTP simulated (GMAIL_APP_PASSWORD not configured)" });
    return;
  }

  const subject = "[SECURITY] Admin Action Verification Code — Landsec Capital";
  const date = new Date().toLocaleString();
  const html = `
    <div style="background:#ef444418;border-left:4px solid #ef4444;border-radius:8px;padding:16px 20px;margin:20px 0;">
      <p style="margin:0;font-size:14px;color:#ef4444;font-weight:600;">SECURITY ALERT — Admin Action Requested</p>
    </div>
    <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#ffffff;">Admin Security Verification</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;">An admin action was requested on <strong style='color:#ffffff;'>${date}</strong>.</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;">Action: <strong style='color:#f59e0b;'>${action || "Unknown"}</strong></p>
    <hr style="border:none;border-top:1px solid #1e3a5f;margin:24px 0;"/>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;">Use the following one-time code to authorise this action:</p>
    <div style="background:#0a0f1e;border:1px solid #1e3a5f;border-radius:10px;padding:24px;text-align:center;margin:20px 0;">
      <span style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#3b82f6;font-family:monospace;">${code}</span>
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;">This code expires in 10 minutes.</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;"><strong style='color:#ef4444;'>Do not share this code with anyone.</strong></p>
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Landsec Capital Security" <${GMAIL_USER}>`,
      to: SECURITY_EMAIL,
      subject,
      html: emailWrapper(html, "A security verification code has been requested."),
    });
    res.status(200).json({ ok: true, code });
  } catch (err: any) {
    res.status(500).json({ error: "OTP delivery failed", detail: err.message });
  }
}
