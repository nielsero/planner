import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

type InviteGuestsStepProps = {
  emailsToInvite: string[];
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
};

export function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal,
  openConfirmTripModal,
}: InviteGuestsStepProps) {
  return (
    <div className="bg-zinc-900 py-4 md:py-2 px-4 rounded-xl flex flex-col md:flex-row md:items-center shadow-shape gap-6 md:gap-3">
      <button
        className="flex items-center gap-2 flex-1 text-left"
        onClick={openGuestsModal}
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-100 flex-1">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg text-zinc-400 flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="hidden md:block w-px h-6 bg-zinc-800"></div>

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
