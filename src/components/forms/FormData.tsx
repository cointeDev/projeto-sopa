import type { SolicitarFormData } from "../../common/types/solicitacao";

export const initialData: SolicitarFormData = {
	responsavel: "",
	email: "",
	setor: "",
	telefone: "",
	local: "",
	localExterno: "",
	data: "",
	hora: "",

	tipo: "",
	formato: "",

	nomeProjeto: "",
	titulo: "",
	descricao: "",
	thumbnail: null,
	acessibilidade: "",
	distribuicao: "",

	dataLimite: "",
	pessoas: 0,
	roteiro: null,
	observacoes: "",
};
