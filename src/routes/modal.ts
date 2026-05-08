import { createFileRoute } from "@tanstack/react-router";
import Modal from "../pages/Modal";

export const Route = createFileRoute("/modal")({
	component: Modal,
});
