import { api } from "../lib/api";

type GetActivitiesParams = {
  tripId: string;
};

type GetActivitiesResponse = {
  activities: {
    date: string;
    activities: {
      id: string;
      title: string;
      occurs_at: string;
    }[];
  }[];
};

export const getActivities = async ({ tripId }: GetActivitiesParams) => {
  const response = await api.get<GetActivitiesResponse>(
    `/trips/${tripId}/activities`
  );

  return response.data;
};
