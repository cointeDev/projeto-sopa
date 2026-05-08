import { createFileRoute } from "@tanstack/react-router";
import Agenda from "../components/management/Agenda";

export const Route = createFileRoute("/agenda")({
	component: Agenda,
});
