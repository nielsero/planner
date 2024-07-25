import { CircleDashed, UserCog } from "lucide-react";

export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Jack Emmanuel
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              jack.emmanuel12@live.com
            </span>
          </div>

          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Dr. Lisa Kholwani
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              lisa.kholwani22@gmail.com
            </span>
          </div>

          <CircleDashed className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium hover:bg-zinc-700">
        <UserCog className="size-5" />
        Actualizar convidados
      </button>
    </div>
  );
}
