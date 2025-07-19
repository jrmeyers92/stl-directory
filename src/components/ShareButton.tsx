"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  businessName: string;
  businessId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export default function ShareButton({
  businessName,
  businessId,
  className = "flex-1",
  size = "sm",
  variant = "outline",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/business/${businessId}`;

      // Check if the Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: businessName,
          text: `Check out ${businessName} on our business directory`,
          url: url,
        });
      } else {
        // Fallback to clipboard API
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Link copied to clipboard!", {
          description: "You can now share this business with others.",
        });

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);

      // Fallback: try to copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/business/${businessId}`
        );
        setCopied(true);
        toast.success("Link copied to clipboard!", {
          description: "You can now share this business with others.",
        });
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (clipboardError) {
        console.error("Failed to copy to clipboard:", clipboardError);
        toast.error("Failed to copy link", {
          description: "Please try copying the URL manually from your browser.",
        });
      }
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </>
      )}
    </Button>
  );
}
