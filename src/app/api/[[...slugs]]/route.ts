import { Elysia, t } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .get("/", "Hello Nextjs")
  .get("/users", { user: { name: "Amith", age: 25 } });

export const GET = app.fetch;
export const POST = app.fetch;
