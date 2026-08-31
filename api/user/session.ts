// @ts-nocheck
import { findUserBySession, publicUser } from "../../lib/db/src/user-auth";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const user = await findUserBySession(req);
    if (!user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    res.status(200).json({ user: publicUser(user) });
  } catch (error: any) {
    console.error("User session lookup failed", error);
    res.status(503).json({ error: "User authentication is not configured" });
  }
}