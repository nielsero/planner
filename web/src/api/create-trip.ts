import { api } from "../lib/api";

type CreateTripRequest = {
  destination: string;
  starts_at: string;
  ends_at: string;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
};

export const createTrip = async ({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
  owner_name,
  owner_email,
}: CreateTripRequest) => {
  await api.post("/trips", {
    destination,
    starts_at,
    ends_at,
    emails_to_invite,
    owner_name,
    owner_email,
  });
};
