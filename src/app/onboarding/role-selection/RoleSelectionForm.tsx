"use client";

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { setRole } from "../_actions";

export default function RoleSelectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSession();
  const router = useRouter();

  const handleSubmit = async (role: "user" | "businessOwner") => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("role", role);

    const userRole = await setRole(formData);
    await session?.reload();

    if (userRole.success) {
      if (userRole.data?.role == "businessOwner") {
        router.push("onboarding/business");
      } else if (userRole.data?.role == "user") {
        router.push("/");
      }
    } else {
      toast.error("Role Selection failed", {
        description: userRole.error,
      });
    }

    setIsSubmitting(false);

    return;
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
