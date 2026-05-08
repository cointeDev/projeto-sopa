import { createFileRoute } from "@tanstack/react-router";
import { Devolutiva } from "../pages/Devolutiva";

export const Route = createFileRoute("/devolutiva")({
	component: Devolutiva,
});
