import crypto from "node:crypto";
import { Router, type IRouter } from "express";
import {
  createUserSession,
  findUserByEmail,
  findUserBySession,
  hashPassword,
  publicUser,
  setUserSessionCookie,
  clearUserSessionCookie,
  verifyPassword,
  db,
  usersTable,
} from "@workspace/db/user-auth";

const router: IRouter = Router();

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

router.post("/user/register", async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    const plan = String(req.body?.plan || "Foundation Plan");
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
    const [created] = await db.insert(usersTable).values({
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: await hashPassword(password),
      country: String(req.body?.country || ""),
      phone: String(req.body?.phone || ""),
      plan,
      investedAmount: "0",
      withdrawableProfit: "0",
      totalReturns: "0",
      investmentStartDate: now,
      maturityDate: maturityDate(now, plan),
      joinDate: now,
      lastProfitAt: Date.now(),
    }).returning();
    setUserSessionCookie(res, createUserSession(created.id));
    res.status(201).json({ user: publicUser(created) });
  } catch (error) {
    req.log.error({ error }, "User registration failed");
    res.status(503).json({ error: "User authentication is not configured" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    setUserSessionCookie(res, createUserSession(user.id));
    res.json({ user: publicUser(user) });
  } catch (error) {
    req.log.error({ error }, "User login failed");
    res.status(503).json({ error: "User authentication is not configured" });
  }
});

router.get("/user/session", async (req, res) => {
  try {
    const user = await findUserBySession(req);
    if (!user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    res.json({ user: publicUser(user) });
  } catch (error) {
    req.log.error({ error }, "User session lookup failed");
    res.status(503).json({ error: "User authentication is not configured" });
  }
});

router.post("/user/logout", (_req, res) => {
  clearUserSessionCookie(res);
  res.json({ ok: true });
});

export default router;