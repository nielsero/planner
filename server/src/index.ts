import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { updateParticipant } from "./routes/update-participant";
import { health } from "./routes/health";
import path from "path";

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});

app.get("/", async (request, reply) => {
  return reply.sendFile("index.html");
});

app.get("/trips/:tripId", async (request, reply) => {
  return reply.sendFile("index.html");
});

app.get(
  "/trips/:tripId/participants/:participantId",
  async (request, reply) => {
    return reply.sendFile("index.html");
  }
);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(health);
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);
app.register(updateParticipant);

app.listen({ port: env.PORT }, () => {
  console.log("Server running!");
});
