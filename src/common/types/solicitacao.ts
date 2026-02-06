export type TipoProducao =
	| "EVENTO_IN_LOCO"
	| "Evento em estúdio"
	| "Vídeo institucional"
	| "Gravação de chamada"
	| "Gravação de videoaula"
	| "Edição";

export type FormatoProducao =
	| "Live pré-gravada"
	| "Live presencial (em estúdio)"
	| "Live remota"
	| "Podcast / Mesacast"
	| "Gravação de programa"
	| "Shorts / Reels"
	| "ANIMACOES_EVENTOS_IN_LOCO"
	| "Criação, edição e animações";

export type Acessibilidade = "INCLUIR_LIBRAS" | "NAO_SE_APLICA";

export type Distribuicao = "INTERNA" | "SEEC" | "INSTAGRAM" | "OUTRO";

export interface SolicitarFormData {
	// STEP 1
	responsavel: string;
	email: string;
	setor: string;
	telefone: string;
	local: string;
	localExterno?: string;
	data: string;
	hora: string;

	// STEP 2
	tipo: TipoProducao | "";
	formato: FormatoProducao | "";

	// STEP 3
	nomeProjeto: string;
	titulo: string;
	descricao: string;
	thumbnail: File | null;
	acessibilidade: Array<Acessibilidade>;
	distribuicao: Distribuicao | "";

	// STEP 4
	dataLimite: string;
	pessoas: number;
	roteiro: File | null;
	observacoes: string;
}

export const TIPOS_PRODUCAO: Array<TipoProducao> = [
	"EVENTO_IN_LOCO",
	"Evento em estúdio",
	"Vídeo institucional",
	"Gravação de chamada",
	"Gravação de videoaula",
	"Edição",
];

export const FORMATOS_PRODUCAO: Array<FormatoProducao> = [
	"Live pré-gravada",
	"Live presencial (em estúdio)",
	"Live remota",
	"Podcast / Mesacast",
	"Gravação de programa",
	"Shorts / Reels",
	"ANIMACOES_EVENTOS_IN_LOCO",
	"Criação, edição e animações",
];

export const OPCOES_ACESSIBILIDADE: Array<Acessibilidade> = [
	"INCLUIR_LIBRAS",
	"NAO_SE_APLICA",
];

export const OPCOES_DISTRIBUICAO: Array<Distribuicao> = [
	"INTERNA",
	"SEEC",
	"INSTAGRAM",
	"OUTRO",
];
export const DISTRIBUICAO_LABELS: Record<Distribuicao, string> = {
	INTERNA: "Veiculação interna",
	SEEC: "Canal da SEEC",
	INSTAGRAM: "Instagram da SEEC",
	OUTRO: "Outro",
};

export type CampoComErro = {
	campo: keyof SolicitarFormData;
	mensagem: string;
};

export type DevolutivaGestor = {
	status: "Devolvido";
	campos: Array<CampoComErro>;
};
