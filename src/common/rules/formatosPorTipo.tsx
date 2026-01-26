import { TipoProducao, FormatoProducao } from "../types/solicitacao";

export const FORMATOS_POR_TIPO: Record<TipoProducao, FormatoProducao[]> = {
	"Evento in loco": ["Animações para eventos in loco"],

	"Evento em estúdio": [
		"Live pré-gravada",
		"Live presencial (em estúdio)",
		"Criação, edição e animações",
	],

	"Vídeo institucional": [
		"Live pré-gravada",
		"Live presencial (em estúdio)",
		"Live remota",
		"Podcast / Mesacast",
		"Gravação de programa",
		"Criação, edição e animações",
	],

	"Gravação de chamada": ["Shorts / Reels"],

	"Gravação de videoaula": [
		"Live pré-gravada",
		"Live presencial (em estúdio)",
		"Gravação de programa",
		"Criação, edição e animações",
	],

	Edição: ["Criação, edição e animações", "Shorts / Reels"],
};
