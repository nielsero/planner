import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getTrip } from "../../api/get-trip";

export function DestinationAndDateHeader() {
  const { tripId } = useParams() as { tripId: string };

  const { data } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip({ tripId }),
  });

  const displayedDate = data
    ? `${format(data.trip.starts_at, "d 'de' LLL")} até 
    ${format(data.trip.ends_at, "d 'de' LLL")}`
    : null;

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
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

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </header>
  );
}
