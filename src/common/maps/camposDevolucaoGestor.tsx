import type { SolicitarFormData } from "../types/solicitacao";

export type CampoGestorConfig = {
	label: string;
};

export const CAMPOS_DEVOLUCAO: Record<
	keyof SolicitarFormData,
	CampoGestorConfig
> = {
	responsavel: { label: "Responsável" },
	email: { label: "Email" },
	setor: { label: "Setor" },
	telefone: { label: "Telefone" },
	localExterno: { label: "Local externo" },
	data: { label: "Data" },
	hora: { label: "Hora" },
	TipoProducao: { label: "Tipo de Produção" },
	FormatoProducao: { label: "Formato de Produção" },
	nomeProjeto: { label: "Nome do Projeto" },
	titulo: { label: "Título" },
	descricao: { label: "Descrição" },
	thumbnail: { label: "Thumbnail" },
	acessibilidade: { label: "Acessibilidade" },
	distribuicao: { label: "Distribuição" },
	local: { label: "Local" },
	dataLimite: { label: "Data limite" },
	pessoas: { label: "Quantidade de pessoas" },
	roteiro: { label: "Roteiro" },
	observacoes: { label: "Observações" },
};
