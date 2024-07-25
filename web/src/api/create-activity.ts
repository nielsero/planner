import { api } from "../lib/api";

type CreateActivityParams = {
  tripId: string;
};

type CreateActivityRequest = {
  title: string;
  occurs_at: string;
};

export const createActivity = async ({
  tripId,
  title,
  occurs_at,
}: CreateActivityParams & CreateActivityRequest) => {
  await api.post(`/trips/${tripId}/activities`, {
    title,
    occurs_at,
  });
};
