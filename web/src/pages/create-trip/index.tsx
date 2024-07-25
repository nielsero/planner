import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { createTrip } from "../../api/create-trip";

const createTripSchema = z.object({
  destination: z.string().min(3),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  owner_name: z.string(),
  owner_email: z.string().email(),
  emails_to_invite: z.array(z.string().email()),
});

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventDateRange, setEventDateRange] = useState<DateRange | undefined>();
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const { mutateAsync: createTripFn, isPending: isCreatingTrip } = useMutation({
    mutationFn: createTrip,
  });

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(
      emailsToInvite.filter((email) => email !== emailToRemove)
    );
  }

  async function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const trip = createTripSchema.parse({
        destination,
        starts_at: eventDateRange?.from,
        ends_at: eventDateRange?.to,
        owner_name: ownerName,
        owner_email: ownerEmail,
        emails_to_invite: emailsToInvite,
      });

      if (trip.emails_to_invite.length === 0) {
        return;
      }

      const { tripId } = await createTripFn({
        destination: trip.destination,
        starts_at: trip.starts_at.toLocaleDateString(),
        ends_at: trip.ends_at.toLocaleDateString(),
        owner_name: trip.owner_name,
        owner_email: trip.owner_email,
        emails_to_invite: trip.emails_to_invite,
      });

      navigate(`/trips/${tripId}`);
    } catch (error) {
      return;
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <header className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="planner logo" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </header>

        <main className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            eventDateRange={eventDateRange}
            setEventDateRange={setEventDateRange}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </main>

        <footer>
          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela Planner você automaticamente concorda{" "}
            <br /> com nossos{" "}
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{" "}
            e{" "}
            <a className="text-zinc-300 underline" href="#">
              politicas de privacidade
            </a>
            .
          </p>
        </footer>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          closeGuestsModal={closeGuestsModal}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={handleCreateTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          isCreatingTrip={isCreatingTrip}
        />
      )}
    </div>
  );
}
