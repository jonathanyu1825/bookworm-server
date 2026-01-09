import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "jbni8mcQXFC4HreofMpcZhm7JdFZd6vL",
  socket: {
    host: "redis-14310.fcrce190.us-east-1-1.ec2.cloud.redislabs.com",
    port: 14310,
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log('Redis connected');
    }
}

export default client;
