"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { businessCategories } from "@/mockdata/businessCategory";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { completeBusinessOnboarding } from "../_actions";
import {
  BusinessOnboardingValues,
  businessOnboardingFormSchema,
} from "../schema";

export default function BusinessOnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BusinessOnboardingValues>({
    resolver: zodResolver(businessOnboardingFormSchema),
    defaultValues: {
      clerkId: userId || "",
      businessName: "",
      businessCategory: "",
      businessAddress: "",
      businessCity: "St. Louis",
      businessState: "MO",
      businessZip: "",
      businessPhone: "",
      businessEmail: "",
      businessWebsite: "",
      businessDescription: "",
      socialMedia: [{ platform: "facebook", url: "https://facebook.com" }],
      logoImage: null,
    },
  });

  // Function to add a new social media field
  const addSocialMedia = () => {
    const currentSocialMedia = form.getValues("socialMedia") || [];
    form.setValue("socialMedia", [
      ...currentSocialMedia,
      { platform: "instagram", url: "" },
    ]);
  };

  // Function to remove a social media field
  const removeSocialMedia = (index: number) => {
    const currentSocialMedia = form.getValues("socialMedia") || [];
    if (currentSocialMedia.length <= 1) return; // Prevent removing the last item
    form.setValue(
      "socialMedia",
      currentSocialMedia.filter((_, i) => i !== index)
    );
  };

  // Handle image selection with preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      form.setValue("logoImage", null);
      setImagePreview(null);
      return;
    }

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Update form value
    form.setValue("logoImage", file);
  };

  async function onSubmit(values: BusinessOnboardingValues) {
    try {
      setIsSubmitting(true);

      // Ensure socialMedia is properly formatted
      const formattedValues = {
        ...values,
        socialMedia: values.socialMedia || [],
      };

      // Use startTransition to prevent UI from freezing during submission
      startTransition(async () => {
        // Call the server action to complete onboarding
        const result = await completeBusinessOnboarding(formattedValues);

        if (result?.success) {
          // Show success toast
          toast.success("Business profile created!", {
            description: "Your business has been successfully registered.",
          });

          // Force a hard navigation to refresh the session
          window.location.href = "/";
        } else {
          // Show error toast for server errors
          toast.error("Registration failed", {
            description:
              result?.error ||
              "There was a problem creating your business profile.",
          });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error toast for client-side errors
      toast.error("Submission error", {
        description:
          "There was a problem submitting your form. Please try again.",
        action: {
          label: "Retry",
          onClick: () => form.handleSubmit(onSubmit)(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Safely access socialMedia array with fallback
  const socialMediaFields = form.watch("socialMedia") || [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Complete Your Business Profile
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Business Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is how your business will appear in the directory.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="businessCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best describes your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Update logoImage field renderer to avoid TypeScript and ESLint errors */}
          <FormField
            control={form.control}
            name="logoImage"
            render={({ field }) => {
              // Destructuring only the props we need from field
              // This avoids passing 'value' to the Input component
              const { name, onBlur, disabled } = field;

              return (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div
                      className="relative w-32 h-32 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="w-full h-full relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imagePreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/jpeg, image/png, image/gif, image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                          ref={fileInputRef}
                          name={name}
                          onBlur={onBlur}
                          disabled={disabled}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full md:w-auto"
                      >
                        {imagePreview ? "Change Image" : "Upload Image"}
                      </Button>
                      <FormDescription className="mt-2">
                        Upload a professional logo for your business. Max size:
                        5MB. Recommended size: 400x400px. JPEG, PNG, GIF, or
                        WEBP format.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              );
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessZip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="63101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(314) 555-1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@yourbusiness.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="businessWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourbusiness.com" {...field} />
                </FormControl>
                <FormDescription>
                  Your business website or social media page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Social Media Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSocialMedia}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Link
              </Button>
            </div>

            {socialMediaFields.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <FormField
                  control={form.control}
                  name={`socialMedia.${index}.platform`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="pinterest">Pinterest</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`socialMedia.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-center">
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => removeSocialMedia(index)}
                        disabled={socialMediaFields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your business, what you offer, your story, etc."
                    className="h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This description will appear on your business listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending
              ? "Submitting..."
              : "Complete Registration"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
