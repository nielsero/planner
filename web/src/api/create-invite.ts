import { api } from "../lib/api";

type CreateInviteParams = {
  tripId: string;
};

type CreateInviteRequest = {
  email: string;
};

type CreateInviteResponse = {
  participantId: string;
};

export const createInvite = async ({
  tripId,
  email,
}: CreateInviteParams & CreateInviteRequest) => {
  const response = await api.post<CreateInviteResponse>(
    `/trips/${tripId}/invites`,
    { email }
  );

  return response.data;
};
