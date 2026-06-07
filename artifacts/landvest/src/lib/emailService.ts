const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function sendEmail(to: string, type: string, data: Record<string, string>) {
  try {
    const res = await fetch(`${BASE}/api/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, type, data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function requestAdminOTP(action: string): Promise<{ ok: boolean; code?: string; simulated?: boolean }> {
  try {
    const res = await fetch(`${BASE}/api/email/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    if (!res.ok) return { ok: false };
    return res.json();
  } catch {
    return { ok: false };
  }
}
