import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "../../api/create-activity";
import { Spinner } from "../../components/spinner";
import { Modal } from "../../components/modal";
import { DayPicker } from "react-day-picker";
import { pt } from "date-fns/locale";
import { format, setHours, setMinutes } from "date-fns";

type CreateActivityModalProps = {
  closeCreateActivityModal: () => void;
};

const createActivitySchema = z.object({
  title: z.string().min(3),
  occurs_at: z.string().datetime(),
});

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams() as { tripId: string };

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const queryClient = useQueryClient();

  const { mutateAsync: createActivityFn, isPending: isCreatingActivity } =
    useMutation({
      mutationFn: createActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["activities", tripId] });
      },
      onError: (error) => {
        console.error(error);
      },
    });

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function formatDate(date: Date) {
    try {
      return format(date, "dd/MM/yyyy HH:mm");
    } catch (error) {
      return "Data invalida";
    }
  }

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selectedDate) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedDate, minutes), hours);
    setSelectedDate(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelectedDate(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelectedDate(newDate);
  };

  async function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");

    try {
      const activity = createActivitySchema.parse({
        title,
        occurs_at: selectedDate?.toISOString(),
      });

      await createActivityFn({
        tripId,
        title: activity.title,
        occurs_at: activity.occurs_at,
      });

      closeCreateActivityModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.flatten().fieldErrors);
        console.log("4");
      }
      return;
    }
  }

  return (
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

        <form onSubmit={handleCreateActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="title"
              placeholder="Qual a actividade?"
            />
          </div>

          <button
            className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 w-full text-left"
            onClick={openDatePicker}
            type="button"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 flex-1 min-w-40">
              {selectedDate
                ? formatDate(selectedDate)
                : "Data e horário da actividade"}
            </span>
          </button>

          {isDatePickerOpen && (
            <Modal title="Selecione a data" onClose={closeDatePicker}>
              <div>
                <span>Horário: </span>
                <input
                  type="time"
                  className="bg-zinc-950 text-lg text-zinc-100 outline-none rounded-lg px-2 py-1"
                  value={timeValue}
                  onChange={handleTimeChange}
                />
              </div>

              <DayPicker
                mode="single"
                locale={pt}
                selected={selectedDate}
                onSelect={handleDaySelect}
              />
            </Modal>
          )}

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isCreatingActivity}
          >
            {isCreatingActivity ? <Spinner /> : "Salvar actividade"}
          </Button>
        </form>
      </div>
    </div>
  );
}
