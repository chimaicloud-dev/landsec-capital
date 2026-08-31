// Export your models here. Add one export per file
// export * from "./posts";
//
// Each model/table should ideally be split into different files.
// Each model/table should define a Drizzle table, insert schema, and types:
//
//   import { pgTable, text, serial } from "drizzle-orm/pg-core";
//   import { createInsertSchema } from "drizzle-zod";
//   import { z } from "zod/v4";
//
//   export const postsTable = pgTable("posts", {
//     id: serial("id").primaryKey(),
//     title: text("title").notNull(),
//   });
//
//   export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true });
//   export type InsertPost = z.infer<typeof insertPostSchema>;
//   export type Post = typeof postsTable.$inferSelect;

import { bigint, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  country: text("country").notNull().default(""),
  phone: text("phone").notNull().default(""),
  plan: text("plan").notNull().default("Foundation Plan"),
  investedAmount: numeric("invested_amount", { precision: 14, scale: 2 }).notNull().default("0"),
  withdrawableProfit: numeric("withdrawable_profit", { precision: 14, scale: 2 }).notNull().default("0"),
  totalReturns: numeric("total_returns", { precision: 14, scale: 2 }).notNull().default("0"),
  investmentStartDate: text("investment_start_date").notNull(),
  maturityDate: text("maturity_date").notNull(),
  joinDate: text("join_date").notNull(),
  lastProfitAt: bigint("last_profit_at", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UserRecord = typeof usersTable.$inferSelect;