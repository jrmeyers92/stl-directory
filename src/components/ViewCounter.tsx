"use client";

import { createClient } from "@/utils/supabase/create-client/client";
import { useEffect } from "react";

interface ViewCounterProps {
  businessId: string;
}

export default function ViewCounter({ businessId }: ViewCounterProps) {
  useEffect(() => {
    const updateViewCount = async () => {
      try {
        const supabase = createClient();

        // First get the current view count
        const { data: currentBusiness, error: fetchError } = await supabase
          .from("stl_directory_businesses")
          .select("view_count")
          .eq("id", businessId)
          .single();

        if (fetchError) {
          console.error("Error fetching current view count:", fetchError);
          return;
        }

        // Increment the view count
        const newViewCount = (currentBusiness?.view_count || 0) + 1;

        const { error: updateError } = await supabase
          .from("stl_directory_businesses")
          .update({ view_count: newViewCount })
          .eq("id", businessId);

        if (updateError) {
          console.error("Error updating view count:", updateError);
        }
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    // Update view count when component mounts
    updateViewCount();
  }, [businessId]);

  // This component doesn't render anything visible
  return null;
}
