import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

type InviteGuestsModalProps = {
  emailsToInvite: string[];
  closeGuestsModal: () => void;
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
};

export function InviteGuestsModal({
  emailsToInvite,
  closeGuestsModal,
  addNewEmailToInvite,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeGuestsModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button>
                  <X
                    className="size-4 text-zinc-400"
                    onClick={() => removeEmailFromInvites(email)}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
          onSubmit={addNewEmailToInvite}
        >
          <AtSign className="size-5 text-zinc-400" />
          <input
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            type="email"
            name="email"
            placeholder="Digite o e-mail do convidado"
          />
          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
