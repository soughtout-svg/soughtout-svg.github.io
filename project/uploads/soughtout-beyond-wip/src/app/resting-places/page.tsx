import type { Metadata } from "next";
import { RestingPlaces } from "@/components/map/RestingPlaces";

export const metadata: Metadata = {
  title: "Where they rest",
  description: "A map of where each machine stopped for good on the Moon and Mars, plus the ones drifting in deep space.",
};

export default function RestingPlacesPage() {
  return <RestingPlaces />;
}
