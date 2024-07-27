import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getParticipant } from "../../api/get-participant";
import { getTrip } from "../../api/get-trip";
import { Mail, User } from "lucide-react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { FormEvent } from "react";
import { updateParticipant } from "../../api/update-participant";
import { z } from "zod";
import { Spinner } from "../../components/spinner";

const updateParticipantSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export function ConfirmParticipantPage() {
  const { tripId, participantId } = useParams() as {
    tripId: string;
    participantId: string;
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data: tripData } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip({ tripId }),
  });

  const { data: participantData } = useQuery({
    queryKey: ["participant", participantId],
    queryFn: () => getParticipant({ participantId }),
  });

  const { mutateAsync: updateParticipantFn, isPending: isUpdatingParticipant } =
    useMutation({
      mutationFn: updateParticipant,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["participants"] });
        navigate(`/trips/${tripId}`);
      },
    });

  async function handleUpdateParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      const participant = updateParticipantSchema.parse({
        name,
        email,
      });

      await updateParticipantFn({
        participantId,
        name: participant.name,
        email: participant.email,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.flatten().fieldErrors);
      }
      return;
    }
  }

  return (
    <>
      {participantData && tripData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar participação
                </h2>
              </div>

              <p className="text-sm text-zinc-400">
                Você foi convidado(a) para participar de uma viagem para{" "}
                <span className="font-semibold text-zinc-100">
                  {tripData?.trip.destination}
                </span>{" "}
                nas datas de{" "}
                <span className="font-semibold text-zinc-100">
                  {tripData &&
                    `${format(
                      tripData.trip.starts_at,
                      "d 'de' LLL"
                    )} até ${format(tripData.trip.ends_at, "d 'de' LLL")}`}
                </span>
                .
              </p>
            </div>

            <p className="text-sm text-zinc-400">
              Para confirmar sua presença na viagem, preencha os dados abaixo:
            </p>

            <form className="space-y-3" onSubmit={handleUpdateParticipant}>
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  defaultValue={participantData?.participant.name || ""}
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Mail className="size-5 text-zinc-400" />
                <input
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  type="email"
                  name="email"
                  defaultValue={participantData?.participant.email}
                  placeholder="Seu e-mail pessoal"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11"
                disabled={isUpdatingParticipant}
              >
                {isUpdatingParticipant ? (
                  <Spinner />
                ) : (
                  "Confirmar minha presença"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
