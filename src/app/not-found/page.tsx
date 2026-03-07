"use client";

import { NotFound } from "@/components/ui/not-found";

export default function NotFoundPage() {
  return (
    <NotFound 
      title="Page not found"
      description="Oops! The page you're looking for doesn't exist or has been moved."
      showSearch={true}
      errorCode="404"
    />
  );
}
