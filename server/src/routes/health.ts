import { FastifyInstance } from "fastify";

export async function health(app: FastifyInstance) {
  app.get("/", async (request) => {
    return { message: "Server running!" };
  });
}
