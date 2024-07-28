import { api } from "../lib/api";

type GetParticipantsParams = {
  tripId: string;
};

type GetParticipantsResponse = {
  participants: Array<{
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
  }>;
};

export const getParticipants = async ({ tripId }: GetParticipantsParams) => {
  const response = await api.get<GetParticipantsResponse>(
    `/trips/${tripId}/participants`
  );

  return response.data;
};
