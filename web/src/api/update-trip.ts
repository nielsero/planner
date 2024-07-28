import { api } from "../lib/api";

type UpdateTripParams = {
  tripId: string;
};

type UpdateTripRequest = {
  destination: string;
  starts_at: string;
  ends_at: string;
};

type UpdateTripResponse = {
  tripId: string;
};

export const updateTrip = async ({
  tripId,
  destination,
  starts_at,
  ends_at,
}: UpdateTripParams & UpdateTripRequest) => {
  const response = await api.put<UpdateTripResponse>(`/trips/${tripId}`, {
    destination,
    starts_at,
    ends_at,
  });

  return response.data;
};
