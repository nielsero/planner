import fastify from "fastify";
import { prisma } from "./lib/prisma";

const app = fastify();

app.get("/cadastrar", async () => {
  await prisma.trip.create({
    data: {
      destination: "Maputo",
      starts_at: new Date(),
      ends_at: new Date(),
    },
  });

  return "Viagem cadastrada!";
});

app.get("/listar", async () => {
  const trips = await prisma.trip.findMany();

  return trips;
});

app.listen({ port: 3333 }, () => {
  console.log("Server running!");
});
