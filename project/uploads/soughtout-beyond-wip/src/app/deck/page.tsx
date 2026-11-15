import type { Metadata } from "next";
import { Deck } from "@/components/deck/Deck";

export const metadata: Metadata = {
  title: "Project demo slides",
  description: "SoughtOut Beyond: 7-slide project demo for the NASA Space Apps Challenge 2026.",
};

export default function DeckPage() {
  return <Deck />;
}
