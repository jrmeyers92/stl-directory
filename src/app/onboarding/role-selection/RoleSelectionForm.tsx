"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setRole } from "../_actions";

export default function RoleSelectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (role: "user" | "businessOwner") => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("role", role);

    const result = await setRole(formData);

    if (result.success) {
      // Redirect to appropriate onboarding page based on role
      router.push(
        role === "user" ? "/onboarding/user" : "/onboarding/business"
      );
    } else {
      // Handle error
      console.error("Error setting role:", result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={() => handleSubmit("user")}
        disabled={isSubmitting}
        className="py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        I want to explore local businesses
      </button>

      <button
        onClick={() => handleSubmit("businessOwner")}
        disabled={isSubmitting}
        className="py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        I want to list my business
      </button>
    </div>
  );
}
