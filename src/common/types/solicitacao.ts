export type TipoProducao =
	| "Evento in loco"
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
	| "Animações para eventos in loco"
	| "Criação, edição e animações";

export type Acessibilidade =
	| "Incluir LIBRAS"
	| "Incluir Legenda"
	| "Não se aplica";

export type Distribuicao = "interna" | "seec" | "instagram" | "outro";

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
	pessoas: string;
	roteiro: File | null;
	observacoes: string;
}

export const TIPOS_PRODUCAO: Array<TipoProducao> = [
	"Evento in loco",
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
	"Animações para eventos in loco",
	"Criação, edição e animações",
];

export const OPCOES_ACESSIBILIDADE: Array<Acessibilidade> = [
	"Incluir LIBRAS",
	"Incluir Legenda",
	"Não se aplica",
];

export const OPCOES_DISTRIBUICAO: Array<Distribuicao> = [
	"interna",
	"seec",
	"instagram",
	"outro",
];
