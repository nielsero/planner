import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../lib/db";
import { dayjs } from "../lib/dayjs";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(3),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { title, occurs_at } = request.body;

      const trip = await db.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new Error("Trip not found.");
      }

      if (dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new Error("Invalid activity date.");
      }

      if (dayjs(occurs_at).isAfter(trip.ends_at)) {
        throw new Error("Invalid activity date.");
      }

      const activity = await db.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId,
        },
      });

      return { activityId: activity.id };
    }
  );
}
