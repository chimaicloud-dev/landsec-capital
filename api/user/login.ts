// @ts-nocheck
import {
  createUserSession,
  findUserByEmail,
  publicUser,
  setUserSessionCookie,
  verifyPassword,
} from "../../lib/db/src/user-auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    setUserSessionCookie(res, createUserSession(user.id));
    res.status(200).json({ user: publicUser(user) });
  } catch (error: any) {
    console.error("User login failed", error);
    res.status(503).json({ error: "User authentication is not configured" });
  }
}