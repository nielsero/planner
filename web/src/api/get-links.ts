import { api } from "../lib/api";

type GetLinksParams = {
  tripId: string;
};

type GetLinksResponse = {
  links: Array<{
    id: string;
    title: string;
    url: string;
  }>;
};

export const getLinks = async ({ tripId }: GetLinksParams) => {
  const response = await api.get<GetLinksResponse>(`/trips/${tripId}/links`);

  return response.data;
};
