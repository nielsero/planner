import { api } from "../lib/api";

type CreateLinkParams = {
  tripId: string;
};

type CreateLinkRequest = {
  title: string;
  url: string;
};

type CreateLinkResponse = {
  linkId: string;
};

export const createLink = async ({
  tripId,
  title,
  url,
}: CreateLinkParams & CreateLinkRequest) => {
  const response = await api.post<CreateLinkResponse>(
    `/trips/${tripId}/links`,
    {
      title,
      url,
    }
  );

  return response.data;
};
