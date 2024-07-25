import { api } from "../lib/api";

type CreateActivityParams = {
  tripId: string;
};

type CreateActivityRequest = {
  title: string;
  occurs_at: string;
};

type CreateActivityResponse = {
  activityId: string;
};

export const createActivity = async ({
  tripId,
  title,
  occurs_at,
}: CreateActivityParams & CreateActivityRequest) => {
  const response = await api.post<CreateActivityResponse>(
    `/trips/${tripId}/activities`,
    {
      title,
      occurs_at,
    }
  );

  return response.data;
};
