import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrip } from "../../api/get-trip";
import { FormEvent, useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { pt } from "date-fns/locale";
import { Spinner } from "../../components/spinner";
import { updateTrip } from "../../api/update-trip";
import { z } from "zod";

const updateTripSchema = z.object({
  destination: z.string().min(3),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
});

export function DestinationAndDateHeader() {
  const { tripId } = useParams() as { tripId: string };

  const [eventDateRange, setEventDateRange] = useState<DateRange | undefined>();
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip({ tripId }),
  });

  const { mutateAsync: updateTripFn, isPending: isUpdatingTrip } = useMutation({
    mutationFn: updateTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
      queryClient.invalidateQueries({ queryKey: ["activities", tripId] });
      closeUpdateTripModal();
    },
  });

  useEffect(() => {
    if (data?.trip) {
      setEventDateRange({
        from: new Date(data.trip.starts_at),
        to: new Date(data.trip.ends_at),
      });
    }
  }, [data]);

  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? `${format(eventDateRange.from, "d 'de' LLL")} até ${format(
          eventDateRange.to,
          "d 'de' LLL"
        )}`
      : null;

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function handleUpdateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const destination = formData.get("destination");

    try {
      const updatedTrip = updateTripSchema.parse({
        destination,
        starts_at: eventDateRange?.from,
        ends_at: eventDateRange?.to,
      });

      await updateTripFn({
        tripId,
        destination: updatedTrip.destination,
        starts_at: updatedTrip.starts_at.toLocaleDateString(),
        ends_at: updatedTrip.ends_at.toLocaleDateString(),
      });
    } catch (error) {
      return;
    }
  }

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      {data && !data.trip.is_confirmed && (
        <Modal
          title="Viagem não confirmada"
          size="lg"
          description="Foi enviado um e-mail de confirmação para o endereço do criador da viagem."
          className="text-center"
          permanent
        >
          <img
            src="/no-travelling.png"
            alt="no travelling"
            className="w-40 mx-auto"
          />
          <p className="text-sm text-zinc-400">
            <Link to="/" className="text-zinc-100 underline">
              Voltar para a página inicial
            </Link>
          </p>
        </Modal>
      )}

      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{data?.trip.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"></div>

        <Button variant="secondary" onClick={openUpdateTripModal}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {isUpdateTripModalOpen && (
        <Modal
          title="Alterar dados da viagem"
          onClose={closeUpdateTripModal}
          className="w-[640px]"
        >
          <form className="space-y-3" onSubmit={handleUpdateTrip}>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="text"
                name="destination"
                placeholder="Para onde você vai?"
                defaultValue={data?.trip.destination}
              />
            </div>

            <button
              className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full text-left"
              onClick={openDatePicker}
              type="button"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-zinc-400 flex-1 min-w-40">
                {displayedDate || "Quando?"}
              </span>
            </button>

            {isDatePickerOpen && (
              <Modal title="Selecione a data" onClose={closeDatePicker}>
                <DayPicker
                  mode="range"
                  locale={pt}
                  selected={eventDateRange}
                  onSelect={setEventDateRange}
                />
              </Modal>
            )}

            <Button
              type="submit"
              className="w-full h-11"
              disabled={isUpdatingTrip}
            >
              {isUpdatingTrip ? <Spinner /> : "Alterar viagem"}
            </Button>
          </form>
        </Modal>
      )}
    </header>
  );
}
