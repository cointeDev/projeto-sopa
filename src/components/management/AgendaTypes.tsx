export type AgendaScope = "local" | "geral";

export type AgendaEvent = {
	id: string;
	title: string;
	start: string;
	end?: string;
	fase?: string;
	dataLimite?: string;

	tipo?: "unico" | "frequente";
	dataInicio?: string;
	dataFim?: string;
	description?: string;
	url?: string;
	editable?: boolean;
};
