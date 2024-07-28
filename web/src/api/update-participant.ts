import { api } from "../lib/api";

type UpdateParticipantParams = {
  participantId: string;
};

type UpdateParticipantRequest = {
  name: string;
  email: string;
};

type UpdateParticipantResponse = {
  tripId: string;
};

export const updateParticipant = async ({
  participantId,
  name,
  email,
}: UpdateParticipantParams & UpdateParticipantRequest) => {
  const response = await api.put<UpdateParticipantResponse>(
    `/participants/${participantId}`,
    {
      name,
      email,
    }
  );

  return response.data;
};
