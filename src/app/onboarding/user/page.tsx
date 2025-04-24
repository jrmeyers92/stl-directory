// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import UserOnboardingForm from "./UserOnboardingForm";

// export default async function UserOnboardingPage() {
//   const user = await currentUser();

//   if (!user) {
//     redirect("/sign-in");
//   }

//   // Check if user has the correct role
//   if (user.publicMetadata.role !== "user") {
//     redirect("/onboarding/role-selection");
//   }

//   // Check if user has already completed onboarding
//   if (user.publicMetadata.onboardingComplete === true) {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
//       <p className="mb-4">
//         Tell us a bit about yourself to get personalized recommendations.
//       </p>
//       <UserOnboardingForm />
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
