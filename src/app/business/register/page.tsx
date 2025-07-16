import BusinessOnboardingForm from "@/app/onboarding/business/BusinessOnboardingForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await auth();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register Your Business</h1>
      <p className="mb-4">
        Provide details about your business to get started.
      </p>
      <BusinessOnboardingForm />
    </div>
  );
};

export default page;
