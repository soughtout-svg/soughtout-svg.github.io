import { Catalog } from "@/components/home/Catalog";
import { ChapterStrip } from "@/components/home/ChapterStrip";
import { DriftingBanner } from "@/components/home/DriftingBanner";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Lifespans } from "@/components/home/Lifespans";
import { MeetScout } from "@/components/home/MeetScout";
import { Prologue } from "@/components/home/Prologue";

export default function Home() {
  return (
    <>
      <Prologue />
      <Hero />
      <Catalog />
      <ChapterStrip />
      <Lifespans />
      <DriftingBanner />
      <MeetScout />
      <HowItWorks />
    </>
  );
}
