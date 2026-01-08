interface SolicitarFormData {
	responsavel: string;
	email: string;
	setor: string;
	telefone: string;
	local: string;
	localExterno?: string;
	data: string;
	hora: string;

	tipo: string;
	formato: string;

	nomeProjeto: string;
	titulo: string;
	descricao: string;
	thumbnail: File | null;
	acessibilidade: string[];
	distribuicao: string;

	dataLimite: string;
	pessoas: string;
	roteiro: File | null;
	observacoes: string;
}

const initialData: SolicitarFormData = {
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
	acessibilidade: [],
	distribuicao: "",

	dataLimite: "",
	pessoas: "",
	roteiro: null,
	observacoes: "",
};

export type { SolicitarFormData };
export { initialData };
