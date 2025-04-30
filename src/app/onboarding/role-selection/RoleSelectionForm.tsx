"use client";

import { useState } from "react";
import { setRole } from "../_actions";

export default function RoleSelectionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (role: "user" | "businessOwner") => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("role", role);

    await setRole(formData);

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
