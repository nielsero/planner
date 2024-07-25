import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  Tag,
  UserCog,
  X,
} from "lucide-react";
import { useState } from "react";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Maputo, Moçambique</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800"></div>

          <button className="flex items-center gap-2 bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium hover:bg-zinc-700">
            Alterar local/data
            <Settings2 className="size-5" />
          </button>
        </div>
      </header>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Actividades</h2>

            <button
              className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
              onClick={openCreateActivityModal}
            >
              <Plus className="size-5" />
              Cadastrar actividade
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia 17
                </span>
                <span className="text-xs text-zinc-500">Sábado</span>
              </div>

              <p className="text-zinc-500 text-sm">
                Nenhuma actividade cadastrada nessa data.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia 18
                </span>
                <span className="text-xs text-zinc-500">Domingo</span>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Corrida de kart</span>
                  <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Pequeno almoço</span>
                  <span className="text-zinc-400 text-sm ml-auto">10:00h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
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

            <button className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium hover:bg-zinc-700">
              <Plus className="size-5" />
              Cadastrar novo link
            </button>
          </div>

          <div className="w-full h-px bg-zinc-800"></div>

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
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar actividade</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={closeCreateActivityModal}
                  />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Todos convidados podem visualizar as actividades.
              </p>
            </div>

            <form className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  type="text"
                  name="title"
                  placeholder="Qual a actividade?"
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  type="datetime-local"
                  name="occurs_at"
                  placeholder="Data e horário da actividade"
                />
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium hover:bg-lime-400"
                type="submit"
              >
                Salvar actividade
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
