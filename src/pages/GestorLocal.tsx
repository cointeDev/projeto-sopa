/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "../common/utils/auth";
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
import ModalRejeicaoGestor from "../components/modals/ModalRejeicaoGestor";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";

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
	dataLimite?: string;

	solicitacao?: SolicitacaoAPI;
}

export default function GestorLocal() {
	const [abaAtual, setAbaAtual] = useState<Aba>("Quadro");
	const navigate = useNavigate();

	async function handleLogout() {
		await logout();
		void navigate({ to: "/login" });
	}
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [cards, setCards] = useState<Array<Card>>([]);
	const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");
	const [projetos, setProjetos] = useState<Array<Projeto>>([]);

	const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAPI[]>([]);

	const [abrirModalDevolucao, setAbrirModalDevolucao] = useState(false);
	const [abrirModalRejeicao, setAbrirModalRejeicao] = useState(false);

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

		console.log("SOLICITAÇÃO RECEBIDA:", JSON.stringify(solicitacao, null, 2));

		return {
			id: solicitacao.id.toString(),
			etapa: etapaNome,
			titulo: solicitacao.titulo,
			responsavel: solicitacao.responsavel,
			projeto: solicitacao.nomeProjeto,
			etiquetas: [solicitacao.TipoProducao],
			solicitacao,
			dataLimite: solicitacao.dataLimite,
		};
	};

	async function enviarDevolutiva(campos: CampoComErro[]) {
		if (!solicitacaoSelecionada) return;

		try {
			const resposta = await devolverSolicitacao(solicitacaoSelecionada.id, {
				campos,
			});

			console.log("RESPOSTA DA API:", resposta);

			setSolicitacoes((prev) =>
				prev.filter((s) => s.id !== solicitacaoSelecionada.id)
			);
		} catch (error) {
			console.error("ERRO AO DEVOLVER:", error);
		}
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

		try {
			if (acao === "ACEITAR") {
				await aceitarSolicitacao(solicitacaoSelecionada.id);

				const novoCard = criarCardSolicitacao(solicitacaoSelecionada);
				setCards((prev) => [...prev, novoCard]);

				setSolicitacoes((prev) =>
					prev.filter((s) => s.id !== solicitacaoSelecionada.id)
				);

				setSolicitacaoSelecionada(null);
			}

			if (acao === "RECUSAR") {
				setAbrirModalRejeicao(true);
			}

			if (acao === "DEVOLVER") {
				setAbrirModalDevolucao(true);
			}
		} catch (err) {
			console.error("Erro ao atualizar solicitação", err);
		}
	};
	async function enviarRejeicao(motivo: string) {
		if (!solicitacaoSelecionada) return;

		try {
			// OBS: Certifique-se de que a função recusarSolicitacao no seu arquivo services/solicitacoes.ts
			// foi atualizada para receber o 'motivo' como segundo parâmetro!
			await recusarSolicitacao(solicitacaoSelecionada.id, motivo);

			setSolicitacoes((previous) =>
				previous.filter((s) => s.id !== solicitacaoSelecionada.id)
			);

			setAbrirModalRejeicao(false);
			setSolicitacaoSelecionada(null); // Fecha o modal principal também
		} catch (error) {
			console.error("Erro ao recusar solicitação", error);
		}
	}

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
				<div className="flex items-center gap-4">
					<button
						className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
						onClick={() => { void handleLogout(); }}
					>
						Sair
					</button>
					<button
						className="rounded-2xl bg-[#4f46e5] px-8 py-3 text-[11px] font-black text-white shadow-xl hover:bg-[#3730a3]"
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						+ NOVO CARD
					</button>
				</div>
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
				{abaAtual === "Agenda" && (
					<div className="h-full overflow-hidden">
						<Agenda scope="local" cards={cards} />
					</div>
				)}
				{abaAtual === "Diário" && <Diario />}
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
			<ModalRejeicaoGestor
				open={abrirModalRejeicao}
				onClose={() => setAbrirModalRejeicao(false)}
				onSubmit={enviarRejeicao}
			/>
		</div>
	);
}
