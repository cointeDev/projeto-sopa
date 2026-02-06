import { api } from "./api";

export async function criarSolicitacao(dados: any) {
	return api.post("/solicitacoes", dados);
}
