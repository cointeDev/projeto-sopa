/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from "react";
import {
	CreateCardModal,
	type NovoCardInterface,
} from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { CardDetailModal } from "../components/management/CardDetailModal";
import Dashboard from "../components/management/Dashboard";

import ModalGestorSolicitacao, {
	AcaoGestor,
} from "../components/modals/ModalGestorSolicitacao";

import ModalDevolucaoGestor from "../components/modals/ModalDevolucaoGestor";
import { devolverSolicitacao } from "../services/solicitacoes";

import { SolicitacoesList } from "../components/management/SolicitacoesList";

import { ETAPAS_MAP } from "../common/types/solicitacao";

import {
	listarSolicitacoesPendentes,
	listarSolicitacoesAceitas,
	aceitarSolicitacao,
	recusarSolicitacao,
} from "../services/solicitacoes";

import type { CampoComErro, SolicitacaoAPI } from "../common/types/solicitacao";

export type Aba = "Dashboard" | "Quadro" | "Solicitações" | "Agenda" | "Diário";

export interface Projeto {
	id: string;
	nome: string;
	etapas: Array<string>;
}

export interface Card {
	id: string;
	etapa: string;
	titulo: string;
	responsavel: string;
	projeto: string;
	etiquetas?: Array<string>;
	corDestaque?: string;
	fluxoEtapas?: Array<string>;

	solicitacao?: SolicitacaoAPI;
}

// Dados mockados só para teste

/*
const mockSolicitacao: SolicitarFormData = {
	responsavel: "João da Silva",
	email: "joao@email.com",
	setor: "Comunicação",
	telefone: "(99) 99999-9999",
	local: "Estúdio A",
	localExterno: "",
	data: "2026-03-10",
	hora: "14:00",

	tipo: "Evento em estúdio",
	formato: "Podcast / Mesacast",

	nomeProjeto: "Podcast Institucional",
	titulo: "Episódio Piloto",
	descricao:
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
	thumbnail: null,
	acessibilidade: ["NAO_SE_APLICA"],
	distribuicao: "interna",

	dataLimite: "2026-03-20",
	pessoas: "4",
	roteiro: null,
	observacoes:
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
};

*/

export default function GestorLocal() {
	const [abaAtual, setAbaAtual] = useState<Aba>("Quadro");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [cards, setCards] = useState<Array<Card>>([]);
	const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");
	const [projetos, setProjetos] = useState<Array<Projeto>>([
		{ id: "1", nome: "Se Liga no Enem", etapas: ["STANDBY", "CONCLUÍDO"] },
	]);

	const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAPI[]>([]);

	const [abrirModalDevolucao, setAbrirModalDevolucao] = useState(false);

	useEffect(() => {
		async function carregarSolicitacoes() {
			try {
				const data = await listarSolicitacoesPendentes();
				setSolicitacoes(data);
			} catch (error) {
				console.error("Erro ao carregar solicitações:", error);
			}
		}
		carregarSolicitacoes();
	}, []);

	const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
		useState<SolicitacaoAPI | null>(null);

	const criarCardSolicitacao = (solicitacao: SolicitacaoAPI): Card => {
		const etapaId = solicitacao.EtapaId ?? 1;

		const etapaNome = ETAPAS_MAP[etapaId] ?? "STANDBY";

		return {
			id: solicitacao.id.toString(),
			etapa: etapaNome,
			titulo: solicitacao.titulo,
			responsavel: solicitacao.responsavel,
			projeto: solicitacao.nomeProjeto,
			etiquetas: [solicitacao.TipoProducao],
			solicitacao,
		};
	};

	async function enviarDevolutiva(campos: CampoComErro[]) {
		if (!solicitacaoSelecionada) return;

		await devolverSolicitacao(solicitacaoSelecionada.id, { campos });

		setSolicitacoes((prev) =>
			prev.filter((s) => s.id !== solicitacaoSelecionada.id)
		);
	}

	useEffect(() => {
		async function carregarCards() {
			try {
				const data = await listarSolicitacoesAceitas();

				const cardsFormatados = data.map(criarCardSolicitacao);

				setCards(cardsFormatados);
			} catch (error) {
				console.error("Erro ao carregar cards:", error);
			}
		}

		carregarCards();
	}, []);

	const handleCreateProject = (novoProjeto: Projeto) => {
		setProjetos((previous) => {
			const existe = previous.find(
				(p) => p.nome.toLowerCase() === novoProjeto.nome.toLowerCase()
			);
			if (existe) return previous;
			return [...previous, novoProjeto];
		});
	};

	const handleCreateCard = (dados: NovoCardInterface) => {
		const novoCard: Card = {
			...dados,
			id: Math.random().toString(36).substring(2, 9),
			etiquetas: [dados.etiquetaArea],
		};
		setCards((previous) => [...previous, novoCard]);
		setIsModalOpen(false);
	};

	const handleAcaoSolicitacao = async (acao: AcaoGestor) => {
		if (!solicitacaoSelecionada) return;

		console.log("AÇÃO:", acao);

		try {
			if (acao === "ACEITAR") {
				await aceitarSolicitacao(solicitacaoSelecionada.id);

				const novoCard = criarCardSolicitacao(solicitacaoSelecionada);

				setCards((prev) => [...prev, novoCard]);
			}

			if (acao === "DEVOLVER") {
				setAbrirModalDevolucao(true);
			}

			if (acao === "RECUSAR") {
				await recusarSolicitacao(solicitacaoSelecionada.id);
			}

			setSolicitacoes((prev) =>
				prev.filter((s) => s.id !== solicitacaoSelecionada.id)
			);

			setSolicitacaoSelecionada(null);
		} catch (err) {
			console.error("Erro ao atualizar solicitação", err);
		}
	};

	return (
		<div className="flex h-screen flex-col overflow-hidden bg-[#F1F5F9] font-inter text-[#334155] text-left">
			<header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-10 py-5">
				<nav className="flex gap-10 font-black text-[11px] tracking-widest uppercase">
					{(
						[
							"Dashboard",
							"Quadro",
							"Solicitações",
							"Agenda",
							"Diário",
						] as Array<Aba>
					).map((key) => (
						<button
							key={key}
							className={`pb-2 transition-all ${abaAtual === key ? "border-b-2 border-[#4f46e5] text-[#4f46e5]" : "text-slate-400"}`}
							onClick={() => {
								setAbaAtual(key);
							}}
						>
							{key}
						</button>
					))}
				</nav>
				<button
					className="rounded-2xl bg-[#4f46e5] px-8 py-3 text-[11px] font-black text-white shadow-xl hover:bg-[#3730a3]"
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					+ NOVO CARD
				</button>
			</header>

			<main className="bg-[#F8FAFC] flex-1 overflow-hidden">
				{abaAtual === "Dashboard" && (
					<div className="p-8 h-full overflow-y-auto">
						<Dashboard cards={cards} />
					</div>
				)}
				{abaAtual === "Quadro" && (
					<QuadroProduction
						cards={cards}
						projetos={projetos}
						setCards={setCards}
						setVisaoQuadro={setVisaoQuadro}
						visaoQuadro={visaoQuadro}
						onCardClick={(card) => {
							setSelectedCard(card);
						}}
					/>
				)}
				{abaAtual === "Solicitações" && (
					<div className="p-8 h-full overflow-y-auto">
						<SolicitacoesList
							solicitacoes={solicitacoes}
							onSelect={(solicitacao) => {
								setSolicitacaoSelecionada(solicitacao);
							}}
						/>
					</div>
				)}
			</main>

			{selectedCard && (
				<CardDetailModal
					card={selectedCard}
					onClose={() => {
						setSelectedCard(null);
					}}
				/>
			)}

			{isModalOpen && (
				<CreateCardModal
					isOpen={isModalOpen}
					projetosAtuais={projetos}
					onClose={() => {
						setIsModalOpen(false);
					}}
					onCreateProject={handleCreateProject}
					onSave={handleCreateCard}
				/>
			)}
			{solicitacaoSelecionada && (
				<ModalGestorSolicitacao
					open={true}
					onClose={() => setSolicitacaoSelecionada(null)}
					dados={solicitacaoSelecionada}
					onAction={handleAcaoSolicitacao}
				/>
			)}

			<ModalDevolucaoGestor
				open={abrirModalDevolucao}
				onClose={() => setAbrirModalDevolucao(false)}
				onSubmit={enviarDevolutiva}
			/>
		</div>
	);
}
