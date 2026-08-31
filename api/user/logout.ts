// @ts-nocheck
import { clearUserSessionCookie } from "../../lib/db/src/user-auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  clearUserSessionCookie(res);
  res.status(200).json({ ok: true });
}