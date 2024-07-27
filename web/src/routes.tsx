import { createBrowserRouter } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { ConfirmParticipantPage } from "./pages/confirm-participant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
  {
    path: "trips/:tripId/participants/:participantId",
    element: <ConfirmParticipantPage />,
  },
]);
