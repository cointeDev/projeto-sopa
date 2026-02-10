import { api } from "./api";

export async function criarSolicitacao(dados: any) {
	return api.post("/solicitacoes", dados);
}

export async function listarSolicitacoesPendentes() {
	const response = await api.get("/solicitacoes", {
		params: { status: "PENDENTE" },
	});

	return response.data;
}

export async function listarSolicitacoesAceitas() {
	const response = await api.get("/solicitacoes", {
		params: { status: "ACEITO" },
	});

	return response.data;
}

export async function aceitarSolicitacao(id: number) {
	const response = await api.patch(`/solicitacoes/${id}/aceitar`);
	return response.data;
}

export async function recusarSolicitacao(id: number) {
	const response = await api.patch(`/solicitacoes/${id}/recusar`);
	return response.data;
}
