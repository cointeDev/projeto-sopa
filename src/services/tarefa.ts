import { api } from "./api";

export async function listarTarefas(solicitacaoId?: string) {
	const response = await api.get("/tarefas", {
		params: solicitacaoId ? { solicitacaoId } : undefined,
	});
	return response.data;
}

export async function criarTarefa(data: {
	nome: string;
	descricao: string;
	etapaId: number;
	solicitacaoId: string;
}) {
	const response = await api.post("/tarefas", data);
	return response.data;
}

export async function deletarTarefa(id: number) {
	const response = await api.delete(`/tarefas/${id}`);
	return response.data;
}
