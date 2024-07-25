import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { pt } from "date-fns/locale";
import "react-day-picker/style.css";
import { format } from "date-fns";

type DestinationAndDateStepProps = {
  isGuestsInputOpen: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  eventDateRange: DateRange | undefined;
  setEventDateRange: (eventDateRange: DateRange | undefined) => void;
};

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput,
  setDestination,
  eventDateRange,
  setEventDateRange,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventDateRange && eventDateRange.from && eventDateRange.to
      ? `${format(eventDateRange.from, "d 'de' LLL")} até ${format(
          eventDateRange.to,
          "d 'de' LLL"
        )}`
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        className="flex items-center gap-2 text-left"
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 flex-1 min-w-40">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecione a data</h2>
              <button>
                <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
              </button>
            </div>

            <DayPicker
              mode="range"
              locale={pt}
              selected={eventDateRange}
              onSelect={setEventDateRange}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800"></div>

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
