---
name: Server-side admin authentication
description: Admin credentials must be validated server-side and sessions must use HTTP-only signed cookies.
---

Admin passwords must never be shipped in the client bundle or stored in localStorage. Validate them only on the server using deployment secrets, and issue short-lived HTTP-only signed session cookies.

**Why:** Frontend credentials and browser-managed auth can be extracted or forged by anyone who loads the app.

**How to apply:** Keep `ADMIN_PASSWORD` and `SESSION_SECRET` in the deployment secret store; never add their values to source, chat, or client environment variables.