import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../lib/db";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params;

      const participant = await db.participant.findUnique({
        where: { id: participantId },
      });

      if (!participant) {
        throw new ClientError("Participant not found.");
      }

      if (participant.is_confirmed) {
        return reply.redirect(
          `${env.WEB_BASE_URL}/trips/${participant.trip_id}`
        );
      }

      await db.participant.update({
        where: { id: participantId },
        data: { is_confirmed: true },
      });

      return reply.redirect(
        `${env.WEB_BASE_URL}/trips/${participant.trip_id}/participants/${participant.id}`
      );
    }
  );
}
