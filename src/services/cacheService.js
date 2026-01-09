import redis from "../config/redis.js";

export async function setCache(key, value) {
  await redis.set(key, JSON.stringify(value));
}

export async function getCache(key) {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
}

export async function deleteCache(key) {
    await redis.del(key);
}
