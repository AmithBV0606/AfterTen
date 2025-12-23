import { createClient } from "redis";

export const redisClient = await createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST_URL,
    port: Number(process.env.REDIS_PORT),
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
