export type TipoProducao =
	| "EVENTO_IN_LOCO"
	| "EVENTO_EM_ESTUDIO"
	| "VIDEO_INSTITUCIONAL"
	| "GRAVACAO_CHAMADA"
	| "GRAVACAO_VIDEOAULA"
	| "EDICAO";

export type FormatoProducao =
	| "LIVE_PRE_GRAVADA"
	| "LIVE_PRESENCIAL_ESTUDIO"
	| "LIVE_REMOTA"
	| "PODCAST_MESACAST"
	| "GRAVACAO_PROGRAMA"
	| "SHORTS_REELS"
	| "ANIMACOES_EVENTOS_IN_LOCO"
	| "CRIACAO_EDICAO_ANIMACOES";

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
	acessibilidade: Acessibilidade | "";
	distribuicao: Distribuicao | "";

	// STEP 4
	dataLimite: string;
	pessoas: number;
	roteiro: File | null;
	observacoes: string;
}

export interface SolicitacaoAPI extends SolicitarFormData {
	id: number;
	status: string;
	createdAt: string;
	EtapaId: number | null;
}

export const TIPOS_PRODUCAO: Array<TipoProducao> = [
	"EVENTO_IN_LOCO",
	"EVENTO_EM_ESTUDIO",
	"VIDEO_INSTITUCIONAL",
	"GRAVACAO_CHAMADA",
	"GRAVACAO_VIDEOAULA",
	"EDICAO",
];

export const TIPO_PRODUCAO_LABELS: Record<TipoProducao, string> = {
	EVENTO_IN_LOCO: "Evento in loco",
	EVENTO_EM_ESTUDIO: "Evento em estúdio",
	VIDEO_INSTITUCIONAL: "Vídeo institucional",
	GRAVACAO_CHAMADA: "Gravação de chamada",
	GRAVACAO_VIDEOAULA: "Gravação de videoaula",
	EDICAO: "Edição",
};

export const FORMATOS_PRODUCAO: Array<FormatoProducao> = [
	"LIVE_PRE_GRAVADA",
	"LIVE_PRESENCIAL_ESTUDIO",
	"LIVE_REMOTA",
	"PODCAST_MESACAST",
	"GRAVACAO_PROGRAMA",
	"SHORTS_REELS",
	"ANIMACOES_EVENTOS_IN_LOCO",
	"CRIACAO_EDICAO_ANIMACOES",
];

export const FORMATO_PRODUCAO_LABELS: Record<FormatoProducao, string> = {
	LIVE_PRE_GRAVADA: "Live pré-gravada",
	LIVE_PRESENCIAL_ESTUDIO: "Live presencial (em estúdio)",
	LIVE_REMOTA: "Live remota",
	PODCAST_MESACAST: "Podcast / Mesacast",
	GRAVACAO_PROGRAMA: "Gravação de programa",
	SHORTS_REELS: "Shorts / Reels",
	ANIMACOES_EVENTOS_IN_LOCO: "Animações para eventos in loco",
	CRIACAO_EDICAO_ANIMACOES: "Criação, edição e animações",
};

export const OPCOES_ACESSIBILIDADE: Array<Acessibilidade> = [
	"INCLUIR_LIBRAS",
	"NAO_SE_APLICA",
];

export const ACESSIBILIDADE_LABELS: Record<Acessibilidade, string> = {
	INCLUIR_LIBRAS: "Incluir LIBRAS",
	NAO_SE_APLICA: "Não se aplica",
};

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
