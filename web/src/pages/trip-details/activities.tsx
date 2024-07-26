import { CircleCheck, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../api/get-activities";
import { Button } from "../../components/button";

type ActivitiesProps = {
  openCreateActivityModal: () => void;
};

export function Activities({ openCreateActivityModal }: ActivitiesProps) {
  const { tripId } = useParams() as { tripId: string };

  const { data: dailyActivitiesPlan } = useQuery({
    queryKey: ["activities", tripId],
    queryFn: () => getActivities({ tripId }),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Actividades</h2>

        <Button onClick={openCreateActivityModal}>
          <Plus className="size-5" />
          Cadastrar actividade
        </Button>
      </div>

      <div className="space-y-8">
        {dailyActivitiesPlan?.activities.map((dailyActivities) => {
          return (
            <div key={dailyActivities.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(dailyActivities.date, "d")}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(dailyActivities.date, "EEEE", { locale: pt })}
                </span>
              </div>

              {dailyActivities.activities.length > 0 ? (
                dailyActivities.activities.map((activity) => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, "HH:mm'h'", {
                            locale: pt,
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma actividade cadastrada nessa data.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
