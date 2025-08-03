// Common server action response types

export interface ServerActionError {
  success: false;
  error: string;
  details?: any;
}

export interface ServerActionSuccess<T = any> {
  success: true;
  message: string;
  data?: T;
}

export type ServerActionResponse<T = any> = ServerActionError | ServerActionSuccess<T>;

// Specific response types for different actions

export type ContactFormResponse = ServerActionResponse<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}>;

export type SaveBusinessResponse = ServerActionResponse<{
  action: "saved" | "unsaved";
  data?: any;
}>;

export type ReviewSubmissionResponse = ServerActionResponse<{
  reviewId: string;
}>;

export type BusinessOnboardingResponse = ServerActionResponse<{
  businessId?: string;
}>;

export type RoleSelectionResponse = ServerActionResponse<{
  role: string;
}>;

// Type guard functions
export function isServerActionError(response: ServerActionResponse): response is ServerActionError {
  return response.success === false;
}

export function isServerActionSuccess<T>(response: ServerActionResponse<T>): response is ServerActionSuccess<T> {
  return response.success === true;
}