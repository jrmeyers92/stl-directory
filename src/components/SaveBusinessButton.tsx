"use client";

import { saveBusiness } from "@/actions/_saveBusiness";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner"; // or whatever toast library you're using
import { Button } from "./ui/button";

type SaveBusinessButtonProps = {
  businessId: string;
  isSaved?: boolean; // Optional prop to show current save state
};

const SaveBusinessButton = ({
  businessId,
  isSaved,
}: SaveBusinessButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("businessId", businessId);

      const result = await saveBusiness(formData);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1"
      onClick={handleSave}
      disabled={isPending}
    >
      <Heart
        className={`mr-2 h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
      />
      {isPending ? "..." : isSaved ? "Saved" : "Save"}
    </Button>
  );
};

export default SaveBusinessButton;
