import { api } from "../lib/api";

type CreateTripRequest = {
  destination: string;
  starts_at: string;
  ends_at: string;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
};

type CreateTripResponse = {
  tripId: string;
};

export const createTrip = async ({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
  owner_name,
  owner_email,
}: CreateTripRequest) => {
  const response = await api.post<CreateTripResponse>("/trips", {
    destination,
    starts_at,
    ends_at,
    emails_to_invite,
    owner_name,
    owner_email,
  });

  return response.data;
};
