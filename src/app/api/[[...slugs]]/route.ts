import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", "Hello Nextjs")
  .get("/users", { user: { name: "Amith" } });

export const GET = app.fetch;
export const POST = app.fetch;
