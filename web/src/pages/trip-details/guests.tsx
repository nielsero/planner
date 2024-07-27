import { CheckCircle2, CircleDashed, Mail, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../../api/get-participants";
import { FormEvent, useState } from "react";
import { Modal } from "../../components/modal";

export function Guests() {
  const { tripId } = useParams() as { tripId: string };

  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["participants", tripId],
    queryFn: () => getParticipants({ tripId }),
  });

  function openInviteGuestModal() {
    setIsInviteGuestModalOpen(true);
  }

  function closeInviteGuestModal() {
    setIsInviteGuestModalOpen(false);
  }

  function handleInviteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {data?.participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>

              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 text-lime-300 shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <Button
        variant="secondary"
        className="w-full h-11"
        onClick={openInviteGuestModal}
      >
        <UserCog className="size-5" />
        Adicionar convidado
      </Button>

      {isInviteGuestModalOpen && (
        <Modal
          title="Adicionar convidado"
          description="O convidado irá receber e-mail para confirmar a participação na viagem."
          onClose={closeInviteGuestModal}
          className="w-[640px]"
        >
          <form className="space-y-3" onSubmit={handleInviteGuest}>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="size-5 text-zinc-400" />
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="email"
                name="email"
                placeholder="E-mail do convidado"
              />
            </div>

            <Button type="submit" className="w-full h-11">
              Adicionar convidado
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
