import BusinessCTA from "@/components/BusinessCTA";
import CategoryBrowseSection from "@/components/CategoryBrowseSection";
import Hero from "@/components/Hero";
import { getUserRole } from "@/utils/roles";

export default async function Home() {
  const userRole = await getUserRole();
  return (
    <main className="flex flex-col row-start-2 items-center sm:items-start">
      <Hero />
      <CategoryBrowseSection />
      {userRole != "businessOwner" && <BusinessCTA />}
    </main>
  );
}
