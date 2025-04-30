import BusinessCTA from "@/components/BusinessCTA";
import CategoryBrowseSection from "@/components/CategoryBrowseSection";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero />
      <CategoryBrowseSection />
      <BusinessCTA />
    </main>
  );
}
