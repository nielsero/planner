import { api } from "../lib/api";

type GetParticipantParams = {
  participantId: string;
};

type GetParticipantResponse = {
  participant: {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
  };
};

export const getParticipant = async ({
  participantId,
}: GetParticipantParams) => {
  const response = await api.get<GetParticipantResponse>(
    `/participants/${participantId}`
  );

  return response.data;
};
