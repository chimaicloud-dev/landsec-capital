// @ts-nocheck
import crypto from "node:crypto";
import {
  createUserSession,
  findUserByEmail,
  hashPassword,
  publicUser,
  setUserSessionCookie,
  db,
  usersTable,
} from "../../lib/db/src/user-auth";

const PLAN_TERM_DAYS: Record<string, number> = {
  "Foundation Plan": 365,
  "Growth Plan": 730,
  "Premier Plan": 1095,
  "Prestige Plan": 1095,
  "Institutional Plan": 1460,
  "Heritage Plan": 1460,
};

function maturityDate(start: string, plan: string) {
  const date = new Date(start);
  date.setDate(date.getDate() + (PLAN_TERM_DAYS[plan] || 365));
  return date.toISOString();
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const plan = String(body.plan || "Foundation Plan");
    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ error: "Password must be at least 8 characters" });
      return;
    }
    if (await findUserByEmail(email)) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const now = new Date().toISOString();
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: await hashPassword(password),
      country: String(body.country || ""),
      phone: String(body.phone || ""),
      plan,
      investedAmount: "0",
      withdrawableProfit: "0",
      totalReturns: "0",
      investmentStartDate: now,
      maturityDate: maturityDate(now, plan),
      joinDate: now,
      lastProfitAt: Date.now(),
    };
    const [created] = await db.insert(usersTable).values(user).returning();
    setUserSessionCookie(res, createUserSession(created.id));
    res.status(201).json({ user: publicUser(created) });
  } catch (error: any) {
    console.error("User registration failed", error);
    res.status(503).json({ error: "User authentication is not configured" });
  }
}