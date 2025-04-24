import BusinessCTA from "@/components/BusinessCTA";
import Hero from "@/components/Hero";
import HomeSection from "@/components/HomeSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Hero />
      <HomeSection />
      <BusinessCTA />
    </main>
  );
}
