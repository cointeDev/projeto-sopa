import { createFileRoute } from "@tanstack/react-router";
import { MvpPage } from "../pages/MvpPage";

export const Route = createFileRoute('/mvp')({
  component: MvpPage,
})