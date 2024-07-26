import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

type ImportantLinksProps = {
  openCreateLinkModal: () => void;
};

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              href="#"
            >
              https://www.airbnb.com/rooms/12345611231222223123123123348539539438353954587
            </a>
          </div>

          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Bilhetes de avião
            </span>
            <a
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              href="#"
            >
              https://www.airline.com/plane/12345611231222223123123123348539539438353954587
            </a>
          </div>

          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>
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
