"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeOnboarding } from "../_actions";

export default function UserOnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically process form data and save preferences
    // For this example, we're just marking onboarding as complete

    const result = await completeOnboarding();

    if (result.success) {
      router.push("/dashboard");
    } else {
      // Handle error
      console.error("Error completing onboarding:", result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Favorite Neighborhoods
        </label>
        <select className="w-full p-2 border rounded-md">
          <option value="">Select neighborhoods</option>
          <option value="downtown">Downtown</option>
          <option value="central-west-end">Central West End</option>
          <option value="the-grove">The Grove</option>
          {/* Add more neighborhoods */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Interests</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Restaurants
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Shopping
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Services
          </label>
          {/* Add more categories */}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Complete Profile"}
      </button>
    </form>
  );
}
