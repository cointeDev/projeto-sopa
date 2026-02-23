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

export async function aceitarSolicitacao(id: string) {
	const response = await api.patch(`/solicitacoes/${id}/aceitar`);
	return response.data;
}

export async function recusarSolicitacao(id: string) {
	const response = await api.patch(`/solicitacoes/${id}/recusar`);
	return response.data;
}

export async function devolverSolicitacao(id: string, dados: any) {
	const response = await api.patch(`/solicitacoes/${id}/devolver`, dados);
	return response.data;
}

export async function atualizarEtapaSolicitacao(id: string, etapaId: number) {
	const response = await fetch(
		`http://localhost:3000/solicitacoes/${id}/etapa`,
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ etapaId }),
		}
	);

	if (!response.ok) {
		throw new Error("Erro ao atualizar etapa");
	}

	return response.json();
}

export async function buscarSolicitacaoPorToken(id: string) {
	const response = await api.get(`/solicitacoes/${id}`);
	return response.data;
}

export async function reenviarSolicitacao(id: string, dados: any) {
	const response = await api.patch(`/solicitacoes/${id}/reenviar`, dados);
	return response.data;
}
