import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/smart-glasses")({
  beforeLoad: () => {
    throw redirect({ to: "/ai-glasses" });
  },
});
