import { FastifyInstance } from "fastify";

export async function health(app: FastifyInstance) {
  app.get("/api", async (request) => {
    return { message: "Server running!" };
  });
}
