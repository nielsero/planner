import { api } from "../lib/api";

type GetTripParams = {
  tripId: string;
};

type GetTripResponse = {
  trip: {
    id: string;
    destination: string;
    starts_at: string;
    ends_at: string;
    is_confirmed: boolean;
  };
};

export const getTrip = async ({ tripId }: GetTripParams) => {
  const response = await api.get<GetTripResponse>(`/trips/${tripId}`);

  return response.data;
};
