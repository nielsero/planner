import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../../api/get-links";

type ImportantLinksProps = {
  openCreateLinkModal: () => void;
};

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const { tripId } = useParams() as { tripId: string };

  const { data } = useQuery({
    queryKey: ["links", tripId],
    queryFn: () => getLinks({ tripId }),
  });

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {data?.links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>

              <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>
          );
        })}
      </div>

      <Button
        variant="secondary"
        className="w-full h-11"
        onClick={openCreateLinkModal}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
