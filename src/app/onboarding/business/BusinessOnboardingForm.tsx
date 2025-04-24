"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { completeBusinessOnboarding } from "../_actions";

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
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  clerkId: z.string(),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessCategory: z.string().min(1, {
    message: "Please select a business category.",
  }),
  businessSubcategory: z.string().min(1, {
    message: "Please select a business subcategory.",
  }),
  businessAddress: z.string().min(3, {
    message: "Please enter a valid address.",
  }),
  businessCity: z.string().min(2, {
    message: "Please enter a valid city.",
  }),
  businessState: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  businessZip: z.string().min(5, {
    message: "Please enter a valid ZIP code.",
  }),
  businessPhone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  businessEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  businessWebsite: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  businessDescription: z.string().min(20, {
    message: "Business description must be at least 20 characters.",
  }),
});

export default function BusinessOnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clerkId: userId || "",
      businessName: "",
      businessCategory: "",
      businessSubcategory: "",
      businessAddress: "",
      businessCity: "St. Louis",
      businessState: "MO",
      businessZip: "",
      businessPhone: "",
      businessEmail: "",
      businessWebsite: "",
      businessDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log(values);

      // Call the server action to complete onboarding
      const result = await completeBusinessOnboarding(values);

      if (result?.success) {
        // Show success toast
        toast.success("Business profile created!", {
          description: "Your business has been successfully registered.",
        });

        // Force a hard navigation to refresh the session
        window.location.href = "/";

        // Alternatively, if you want to stay within the Next.js router:
        // router.push("/");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
      } else {
        // Show error toast for server errors
        toast.error("Registration failed", {
          description:
            result?.error ||
            "There was a problem creating your business profile.",
        });
      }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="businessCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Reset subcategory when category changes
                      form.setValue("businessSubcategory", "");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Creative & Media">
                        Creative & Media
                      </SelectItem>
                      <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                      <SelectItem value="Retail & Shopping">
                        Retail & Shopping
                      </SelectItem>
                      <SelectItem value="Home Services">
                        Home Services
                      </SelectItem>
                      <SelectItem value="Health & Wellness">
                        Health & Wellness
                      </SelectItem>
                      <SelectItem value="Beauty & Personal Care">
                        Beauty & Personal Care
                      </SelectItem>
                      <SelectItem value="Events & Entertainment">
                        Events & Entertainment
                      </SelectItem>
                      <SelectItem value="Kids & Family">
                        Kids & Family
                      </SelectItem>
                      <SelectItem value="Travel & Recreation">
                        Travel & Recreation
                      </SelectItem>
                      <SelectItem value="Professional Services">
                        Professional Services
                      </SelectItem>
                      <SelectItem value="Auto Services">
                        Auto Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the main category for your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessSubcategory"
              render={({ field }) => {
                const selectedCategory = form.watch("businessCategory");

                // Get subcategories based on selected category
                const getSubcategories = () => {
                  switch (selectedCategory) {
                    case "Creative & Media":
                      return [
                        "Photographers",
                        "Videographers",
                        "Graphic Designers",
                        "Web Designers",
                        "Marketing Agencies",
                        "Printing Services",
                      ];
                    case "Food & Drink":
                      return [
                        "Restaurants",
                        "Cafés & Coffee Shops",
                        "Food Trucks",
                        "Bakeries",
                        "Breweries",
                        "Wineries",
                        "Bars & Lounges",
                        "Caterers",
                      ];
                    case "Retail & Shopping":
                      return [
                        "Boutiques",
                        "Gift Shops",
                        "Antique Stores",
                        "Bookstores",
                        "Florists",
                        "Farmers Markets",
                        "Art Galleries",
                      ];
                    case "Home Services":
                      return [
                        "Plumbers",
                        "Electricians",
                        "HVAC Services",
                        "General Contractors",
                        "Roofing Companies",
                        "Interior Designers",
                        "Cleaning Services",
                        "Landscapers",
                      ];
                    case "Health & Wellness":
                      return [
                        "Gyms & Fitness Studios",
                        "Yoga & Pilates",
                        "Massage Therapists",
                        "Chiropractors",
                        "Dentists",
                        "Family Doctors",
                        "Mental Health Services",
                        "Nutritionists",
                      ];
                    case "Beauty & Personal Care":
                      return [
                        "Hair Salons",
                        "Barbershops",
                        "Nail Salons",
                        "Spas",
                        "Estheticians",
                        "Makeup Artists",
                        "Tattoo & Piercing Studios",
                      ];
                    case "Events & Entertainment":
                      return [
                        "Event Planners",
                        "DJs & Live Bands",
                        "Wedding Venues",
                        "Party Rentals",
                        "Catering Services",
                        "Event Photographers",
                      ];
                    case "Kids & Family":
                      return [
                        "Childcare & Daycares",
                        "Pediatricians",
                        "Kids Activities & Classes",
                        "Tutoring Services",
                        "Toy Stores",
                      ];
                    case "Travel & Recreation":
                      return [
                        "Hotels & B&Bs",
                        "Local Attractions",
                        "Parks & Trails",
                        "Tour Services",
                        "Bike Rentals",
                        "Museums & Cultural Centers",
                      ];
                    case "Professional Services":
                      return [
                        "Real Estate Agents",
                        "Lawyers",
                        "Accountants",
                        "Insurance Agents",
                        "Financial Advisors",
                        "Notaries",
                      ];
                    case "Auto Services":
                      return [
                        "Auto Repair",
                        "Car Washes",
                        "Towing Services",
                        "Auto Detailers",
                        "Dealerships",
                      ];
                    default:
                      return [];
                  }
                };

                return (
                  <FormItem>
                    <FormLabel>Business Subcategory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedCategory}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedCategory
                                ? "Select a subcategory"
                                : "Select a category first"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getSubcategories().map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the specific type of business you operate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

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
