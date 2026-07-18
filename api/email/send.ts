import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER || "landseccapital@gmail.com";
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || "";

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
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Landsec Capital</title></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'Segoe UI',Arial,sans-serif;">
${previewText ? `<span style="display:none;font-size:0;max-height:0;overflow:hidden;">${previewText}</span>` : ""}
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111827;border-radius:16px;overflow:hidden;border:1px solid #1e3a5f;">
      <tr><td style="background:linear-gradient(135deg,#0a0f1e 0%,#1e3a5f 100%);padding:32px 40px;text-align:center;border-bottom:1px solid #1e3a5f;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding-bottom:12px;">${logoSvg}</td></tr>
          <tr><td align="center"><span style="font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#ffffff;">Landsec Capital</span></td></tr>
          <tr><td align="center" style="padding-top:4px;"><span style="font-size:11px;color:#6b8cbb;letter-spacing:3px;text-transform:uppercase;">Institutional Real Estate Investment</span></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:40px;">${content}</td></tr>
      <tr><td style="background:#0a0f1e;padding:28px 40px;border-top:1px solid #1e3a5f;text-align:center;">
        <p style="margin:0 0 8px;font-size:12px;color:#4b6080;">100 Victoria Street, London SW1E 5JL, United Kingdom</p>
        <p style="margin:0 0 8px;font-size:12px;color:#4b6080;"><a href="mailto:support@landseccapital.com" style="color:#3b82f6;text-decoration:none;">support@landseccapital.com</a></p>
        <p style="margin:0;font-size:11px;color:#2d3f55;">&copy; 2026 Landsec Capital. All rights reserved.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function h1(t: string) { return `<h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;font-weight:bold;color:#ffffff;">${t}</h1>`; }
function p(t: string) { return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#94aabf;">${t}</p>`; }
function divider() { return `<hr style="border:none;border-top:1px solid #1e3a5f;margin:24px 0;"/>`; }
function infoTable(rows: [string, string][]) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">${rows.map(([l, v]) => `<tr><td style="padding:10px 0;font-size:13px;color:#6b8cbb;border-bottom:1px solid #1a2a40;">${l}</td><td style="padding:10px 0;font-size:13px;color:#ffffff;font-weight:600;text-align:right;border-bottom:1px solid #1a2a40;">${v}</td></tr>`).join("")}</table>`;
}
function alertBox(t: string, c = "#3b82f6") { return `<div style="background:${c}18;border-left:4px solid ${c};border-radius:8px;padding:16px 20px;margin:20px 0;"><p style="margin:0;font-size:14px;color:${c};font-weight:600;">${t}</p></div>`; }
function codeBox(code: string) { return `<div style="background:#0a0f1e;border:1px solid #1e3a5f;border-radius:10px;padding:24px;text-align:center;margin:20px 0;"><span style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#3b82f6;font-family:monospace;">${code}</span></div>`; }

function buildEmail(type: string, data: Record<string, string>) {
  switch (type) {
    case "welcome": return {
      subject: "Welcome to Landsec Capital — Your Account is Active",
      preview: "Your investor account has been created successfully.",
      html: `${h1("Welcome to Landsec Capital")}${p(`Dear ${data.name},`)}${p("We are delighted to welcome you to Landsec Capital — the UK's premier institutional real estate investment platform.")}${divider()}${infoTable([["Account Name",data.name],["Email Address",data.email],["Investment Plan",data.plan||"Foundation Plan"],["Account Status","Active"]])}${divider()}${p("Your investor dashboard is now live.")}${alertBox("Please complete your KYC verification to unlock full investment access.","#f59e0b")}${p("Regards,<br><strong style='color:#ffffff;'>The Landsec Capital Team</strong>")}`,
    };
    case "deposit": return {
      subject: `Deposit Confirmed — $${data.amount} Received`,
      preview: `Your deposit of $${data.amount} has been confirmed.`,
      html: `${h1("Deposit Confirmed")}${p(`Dear ${data.name},`)}${p("Your deposit has been received and credited to your account.")}${divider()}${infoTable([["Transaction Reference",data.txRef||"N/A"],["Deposit Method",data.method||"Cryptocurrency"],["Amount",`$${data.amount}`],["Date",data.date||new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})],["Status","Confirmed"]])}${divider()}${alertBox("Funds have been credited automatically.")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "withdrawal": return {
      subject: `Withdrawal Request Received — $${data.amount}`,
      preview: `Your withdrawal of $${data.amount} is being processed.`,
      html: `${h1("Withdrawal Request Received")}${p(`Dear ${data.name},`)}${p("We have received your withdrawal request.")}${divider()}${infoTable([["Reference",data.txRef||"N/A"],["Amount Requested",`$${data.amount}`],["Destination",data.destination||"Nominated Account"],["Date Submitted",data.date||new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})],["Expected Completion","1-3 Business Days"],["Status","Processing"]])}${divider()}${alertBox("If you did not request this withdrawal, contact us immediately.","#ef4444")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "withdrawal_approved": return {
      subject: `Withdrawal Approved — $${data.amount} Sent`,
      preview: `Your withdrawal of $${data.amount} has been approved.`,
      html: `${h1("Withdrawal Approved")}${p(`Dear ${data.name},`)}${p(`Your withdrawal of <strong style='color:#ffffff;'>$${data.amount}</strong> has been approved and dispatched.`)}${divider()}${infoTable([["Reference",data.txRef||"N/A"],["Amount",`$${data.amount}`],["Destination",data.destination||"Nominated Account"],["Status","Sent"]])}${alertBox("Please allow 1-3 business days for funds to arrive.")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "kyc_approved": return {
      subject: "KYC Verification Approved — Account Fully Active",
      preview: "Your identity has been verified.",
      html: `${h1("Identity Verified")}${p(`Dear ${data.name},`)}${p("Your KYC has been successfully completed. Your account is now fully active.")}${divider()}${infoTable([["Verification Status","Approved"],["Date Verified",data.date||new Date().toLocaleDateString()],["Account Level","Fully Verified"]])}${alertBox("You now have full access to all investment plans.","#10b981")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "kyc_rejected": return {
      subject: "KYC Verification — Action Required",
      preview: "We need additional information to complete your verification.",
      html: `${h1("Verification Requires Attention")}${p(`Dear ${data.name},`)}${p("We were unable to verify your identity. Please re-submit with clearer documents.")}${alertBox(`Reason: ${data.reason||"Document quality insufficient."}`, "#ef4444")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "profit": return {
      subject: `Investment Return Credited — $${data.amount}`,
      preview: `$${data.amount} has been added to your account.`,
      html: `${h1("Return Credited to Your Account")}${p(`Dear ${data.name},`)}${p(`Your return of <strong style='color:#10b981;'>$${data.amount}</strong> has been credited.`)}${divider()}${infoTable([["Return Amount",`$${data.amount}`],["Period",data.period||"24-Hour Return"],["Plan",data.plan||"Foundation Plan"],["New Balance",`$${data.newBalance}`]])}${alertBox("Your investment continues to grow.","#10b981")}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    case "custom": return {
      subject: data.subject || "Message from Landsec Capital",
      preview: data.preview || "",
      html: `${h1(data.heading||"Message from Landsec Capital")}${p(`Dear ${data.name||"Investor"},`)}<div style="font-size:15px;line-height:1.8;color:#94aabf;">${(data.body||"").replace(/\n/g,"<br/>")}</div>${divider()}${p("Regards,<br><strong style='color:#ffffff;'>Landsec Capital</strong>")}`,
    };
    default: return { subject: "Notification from Landsec Capital", preview: "", html: p("You have a new notification.") };
  }
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

  const { to, type, data } = body as { to: string; type: string; data: Record<string, string> };

  if (!to || !type) {
    res.status(400).json({ error: "Missing required fields: to, type" });
    return;
  }

  if (!GMAIL_PASS) {
    res.status(200).json({ ok: true, simulated: true, message: "Email simulated (GMAIL_APP_PASSWORD not configured)" });
    return;
  }

  try {
    const { subject, html, preview } = buildEmail(type, data || {});
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Landsec Capital" <${GMAIL_USER}>`,
      to,
      subject,
      html: emailWrapper(html, preview),
    });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: "Email delivery failed", detail: err.message });
  }
}
