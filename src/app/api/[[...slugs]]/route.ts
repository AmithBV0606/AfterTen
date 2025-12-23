import { redisClient } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";

const ROOM_TTL_SECONDS = 60 * 10;

const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  // Create a roomId :
  const roomId = nanoid();

  // Connecting to Redis Client :
  await redisClient.HSET(`meta:${roomId}`, {
    connected: JSON.stringify([]),
    createdAt: String(Date.now()),
  });

  // Auto Deletion :
  await redisClient.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

  return { roomId };
});

export const app = new Elysia({ prefix: "/api" }).use(rooms);

export const GET = app.fetch;
export const POST = app.fetch;
