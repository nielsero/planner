import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Spinner } from "../../components/spinner";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

type ConfirmTripModalProps = {
  destination: string;
  eventDateRange: DateRange | undefined;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
  isCreatingTrip: boolean;
};

export function ConfirmTripModal({
  destination,
  eventDateRange,
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  isCreatingTrip,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? `${format(eventDateRange.from, "d 'de' LLL")} até ${format(
          eventDateRange.to,
          "d 'de' LLL"
        )}`
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">
              {destination || "sem destino"}
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {displayedDate || "sem data"}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form className="space-y-3" onSubmit={createTrip}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="name"
              placeholder="Seu nome completo"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isCreatingTrip}
          >
            {isCreatingTrip ? <Spinner /> : "Confirmar criação da viagem"}
          </Button>
        </form>
      </div>
    </div>
  );
}
