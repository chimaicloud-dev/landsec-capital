import crypto from "node:crypto";
import { Router, type IRouter } from "express";

const router: IRouter = Router();
const COOKIE_NAME = "landsec_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function config() {
  const email = process.env.ADMIN_EMAIL || "landseccapital@gmail.com";
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!password || !secret) throw new Error("Admin authentication is not configured");
  return { email, password, secret };
}

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function sessionFor(email: string, secret: string) {
  const payload = Buffer.from(JSON.stringify({
    email,
    role: "super",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  })).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

function readSession(req: any) {
  const { secret } = config();
  const cookies = Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((part: string) => part.trim().split("="))
      .filter(([key, value]: string[]) => key && value),
  );
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || sign(payload, secret) !== signature) return null;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return value.exp > Math.floor(Date.now() / 1000) ? value : null;
  } catch {
    return null;
  }
}

router.post("/admin/login", (req, res) => {
  try {
    const { email, password, secret } = config();
    if (req.body?.email !== email || req.body?.password !== password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=${sessionFor(email, secret)}; HttpOnly; Path=/; Max-Age=${SESSION_TTL_SECONDS}; SameSite=Lax${secure}`);
    res.json({ admin: { email, name: "Super Admin", role: "super" } });
  } catch {
    res.status(503).json({ error: "Admin authentication is not configured" });
  }
});

router.get("/admin/session", (req, res) => {
  try {
    const session = readSession(req);
    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    res.json({ admin: { email: session.email, name: "Super Admin", role: "super" } });
  } catch {
    res.status(503).json({ error: "Admin authentication is not configured" });
  }
});

router.post("/admin/logout", (_req, res) => {
  res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
  res.json({ ok: true });
});

router.post("/admin/password", (req, res) => {
  try {
    if (!readSession(req)) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
  } catch {
    res.status(503).json({ error: "Admin authentication is not configured" });
    return;
  }
  res.status(409).json({ error: "Update ADMIN_PASSWORD in the deployment environment and redeploy." });
});

export default router;