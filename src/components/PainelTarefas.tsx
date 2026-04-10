import { useState, useEffect } from "react";
// eslint-disable-next-line no-duplicate-imports
import type { ReactElement } from "react";

// ⚠️ ATENÇÃO: Importações de TIPOS separadas das importações de VALORES
import type {
	Solicitacao,
	TipoProducao,
	FormatoProducao,
	Local,
	Acessibilidade,
	Distribuicao,
} from "../common/types/solicitacao";

// eslint-disable-next-line no-duplicate-imports
import {
	TIPO_PRODUCAO_LABELS,
	FORMATO_PRODUCAO_LABELS,
	LOCAL_LABELS,
	ACESSIBILIDADE_LABELS,
	DISTRIBUICAO_LABELS,
	ETAPAS_MAP,
} from "../common/types/solicitacao";

import type { Tarefa } from "../common/types/tarefa";
import { listarSolicitacoesOperacional } from "../services/solicitacoes";
import { listarTarefas, criarTarefa, deletarTarefa } from "../services/tarefa";

export default function PainelTarefas(): ReactElement {
	// Correção: Usando Array<Tipo> conforme exigido pelo seu ESLint
	const [solicitacoes, setSolicitacoes] = useState<Array<Solicitacao>>([]);
	const [tarefas, setTarefas] = useState<Array<Tarefa>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [tarefaExpandida, setTarefaExpandida] = useState<string | null>(null);

	const [novaTarefaNome, setNovaTarefaNome] = useState<string>("");
	const [novaTarefaDescricao, setNovaTarefaDescricao] = useState<string>("");
	const [criandoTarefa, setCriandoTarefa] = useState<boolean>(false);

	useEffect(() => {
		async function carregarDados(): Promise<void> {
			try {
				setLoading(true);
				const dadosSolicitacoes =
					(await listarSolicitacoesOperacional()) as Array<Solicitacao>;
				const dadosTarefas = (await listarTarefas()) as Array<Tarefa>;

				setSolicitacoes(dadosSolicitacoes);
				setTarefas(dadosTarefas);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			} finally {
				setLoading(false);
			}
		}

		// Correção do "no-floating-promises"
		void carregarDados();
	}, []);

	const toggleTarefa = (id: string): void => {
		setTarefaExpandida(tarefaExpandida === id ? null : id);
		setNovaTarefaNome("");
		setNovaTarefaDescricao("");
	};

	const ETAPAS_BLOQUEADAS = [1, 12, 13]; // STANDBY, CONCLUÍDO, PUBLICADO

	const handleCriarTarefa = async (
		solicitacaoId: string,
		etapaId: number
	): Promise<void> => {
		if (!novaTarefaNome.trim() || !novaTarefaDescricao.trim()) return;

		try {
			setCriandoTarefa(true);
			const novaTarefa = (await criarTarefa({
				descricao: novaTarefaDescricao,
				etapaId: etapaId,
				nome: novaTarefaNome,
				solicitacaoId: solicitacaoId,
			})) as Tarefa;

			// Correção: renamed 'prev' to 'previous'
			setTarefas((previous) => [...previous, novaTarefa]);
			setNovaTarefaNome("");
			setNovaTarefaDescricao("");
		} catch (error: unknown) {
			console.error("Erro ao criar tarefa:", error);
			const mensagem =
				error &&
				typeof error === "object" &&
				"response" in error &&
				error.response &&
				typeof error.response === "object" &&
				"data" in error.response &&
				error.response.data &&
				typeof error.response.data === "object" &&
				"message" in error.response.data
					? String((error.response.data as { message: string }).message)
					: "Não foi possível criar a tarefa.";
			alert(mensagem);
		} finally {
			setCriandoTarefa(false);
		}
	};

	const handleDeletarTarefa = async (tarefaId: number): Promise<void> => {
		if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;

		try {
			await deletarTarefa(tarefaId);
			// Correção: renamed 'prev' to 'previous'
			setTarefas((previous) => previous.filter((t) => t.id !== tarefaId));
		} catch (error) {
			console.error("Erro ao deletar tarefa:", error);
			alert("Não foi possível excluir a tarefa.");
		}
	};

	if (loading) {
		return (
			<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="py-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
					Carregando demandas e tarefas...
				</div>
			</section>
		);
	}

	if (solicitacoes.length === 0) {
		return (
			<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="py-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
					Nenhuma demanda pendente no momento.
				</div>
			</section>
		);
	}

	return (
		<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="grid grid-cols-1 gap-5">
				{solicitacoes.map((solicitacao) => {
					// Mapeamento correto com os types garantidos
					const etapaLabel =
						ETAPAS_MAP[solicitacao.EtapaId] || `Etapa ${solicitacao.EtapaId}`;
					const localLabel =
						LOCAL_LABELS[solicitacao.local as Local] || solicitacao.local;
					const producaoLabel =
						TIPO_PRODUCAO_LABELS[solicitacao.TipoProducao as TipoProducao] ||
						solicitacao.TipoProducao;
					const formatoLabel =
						FORMATO_PRODUCAO_LABELS[
							solicitacao.FormatoProducao as FormatoProducao
						] || solicitacao.FormatoProducao;
					const acessibilidadeLabel =
						ACESSIBILIDADE_LABELS[
							solicitacao.acessibilidade as Acessibilidade
						] || solicitacao.acessibilidade;

					// Correção: Usando o distribuicaoLabel que estava ocioso
					const distribuicaoLabel =
						DISTRIBUICAO_LABELS[solicitacao.distribuicao as Distribuicao] ||
						solicitacao.distribuicao;

					const tarefasDaSolicitacao = tarefas.filter(
						(t) => t.solicitacaoId === solicitacao.id
					);

					return (
						<div
							className="group flex flex-col gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-[#F8FAFC] p-8 transition-all hover:shadow-xl hover:shadow-slate-200/40"
							key={solicitacao.id}
						>
							{/* CABEÇALHO DA SOLICITAÇÃO - Note a ordenação das props (className -> onClick) */}
							<div
								className="flex cursor-pointer items-center justify-between"
								onClick={() => {
									toggleTarefa(solicitacao.id);
								}}
							>
								<div className="flex items-center gap-6">
									<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4f46e5] shadow-sm transition-transform group-hover:scale-110">
										{tarefaExpandida === solicitacao.id ? (
											<svg
												className="h-6 w-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M5 15l7-7 7 7"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2.5}
												/>
											</svg>
										) : (
											<svg
												className="h-6 w-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M19 9l-7 7-7-7"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2.5}
												/>
											</svg>
										)}
									</div>
									<div>
										<p className="text-lg font-black uppercase leading-none tracking-tighter text-[#334155]">
											{solicitacao.titulo}
										</p>
										<p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
											Projeto: {solicitacao.nomeProjeto} · Etapa: {etapaLabel}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-6">
									<span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
										📅 Limite:{" "}
										{new Date(solicitacao.dataLimite).toLocaleDateString(
											"pt-BR"
										)}
									</span>
									<span className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-2 text-[9px] font-black uppercase tracking-widest text-[#4f46e5] shadow-sm">
										{solicitacao.status}
									</span>
								</div>
							</div>

							{/* DETALHES DA TAREFA EXPANDIDA */}
							{tarefaExpandida === solicitacao.id && (
								<div className="animate-in fade-in slide-in-from-top-2 mt-2 flex duration-300 flex-col gap-8 border-t border-slate-200 pt-6">
									{/* Grid de Informações da Solicitação */}
									<div className="grid grid-cols-2 gap-8 text-sm">
										<div className="flex flex-col gap-4">
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Responsável / Setor
												</span>{" "}
												<span className="font-semibold text-[#334155]">
													{solicitacao.responsavel} ({solicitacao.setor})
												</span>
											</div>
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Contato
												</span>{" "}
												<span className="font-semibold text-[#334155]">
													{solicitacao.email} | {solicitacao.telefone}
												</span>
											</div>
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Localização
												</span>{" "}
												<span className="font-semibold text-[#334155]">
													{localLabel}
												</span>
											</div>
										</div>
										<div className="flex flex-col gap-4">
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Produção / Formato
												</span>{" "}
												<span className="font-semibold text-[#334155]">
													{producaoLabel} | {formatoLabel}
												</span>
											</div>
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Acessibilidade / Distribuição
												</span>{" "}
												<span className="font-semibold text-[#334155]">
													{acessibilidadeLabel} | {distribuicaoLabel}
												</span>
											</div>
											<div>
												<span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400">
													Descrição
												</span>{" "}
												<span className="block font-medium text-slate-600">
													{solicitacao.descricao}
												</span>
											</div>
										</div>
									</div>

									<hr className="border-slate-100" />

									{/* SESSÃO: CHECKLIST DE TAREFAS */}
									<div>
										<h4 className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
											Checklist de Tarefas
										</h4>

										<div className="mb-4 flex flex-col gap-3">
											{tarefasDaSolicitacao.length === 0 ? (
												<p className="text-xs italic text-slate-400">
													Nenhuma tarefa adicionada ainda.
												</p>
											) : (
												tarefasDaSolicitacao.map((tarefa) => (
													<div
														className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
														key={tarefa.id}
													>
														<div>
															<p className="text-sm font-bold text-[#334155]">
																{tarefa.nome}
															</p>
															<p className="mt-1 text-xs text-slate-500">
																{tarefa.descricao}
															</p>
														</div>
														<button
															className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
															title="Excluir tarefa"
															onClick={() => {
																void handleDeletarTarefa(tarefa.id);
															}}
														>
															<svg
																className="h-4 w-4"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																/>
															</svg>
														</button>
													</div>
												))
											)}
										</div>

										{/* Formulário Inserir Nova Tarefa */}
										{ETAPAS_BLOQUEADAS.includes(solicitacao.EtapaId) ? (
											<div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-amber-700">
												<svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
												</svg>
												<p className="text-[11px] font-black uppercase tracking-widest">
													Tarefas não podem ser criadas na etapa{" "}
													<span className="text-amber-900">{etapaLabel}</span>.
													Só são permitidas em etapas de produção ativa.
												</p>
											</div>
										) : (
											<div className="flex items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
												<div className="flex-1">
													<label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-400">
														Nome da Tarefa
													</label>
													<input
														className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
														placeholder="Ex: Editar áudio principal"
														type="text"
														value={novaTarefaNome}
														onChange={(event_) => {
															setNovaTarefaNome(event_.target.value);
														}}
													/>
												</div>
												<div className="flex-1">
													<label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-400">
														Descrição
													</label>
													<input
														className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition-all focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
														placeholder="Detalhes adicionais..."
														type="text"
														value={novaTarefaDescricao}
														onChange={(event_) => {
															setNovaTarefaDescricao(event_.target.value);
														}}
													/>
												</div>
												<button
													className="h-[38px] rounded-lg bg-[#4f46e5] px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
													disabled={criandoTarefa || !novaTarefaNome.trim()}
													onClick={() => {
														void handleCriarTarefa(
															solicitacao.id,
															solicitacao.EtapaId
														);
													}}
												>
													{criandoTarefa ? "Adicionando..." : "Adicionar"}
												</button>
											</div>
										)}
									</div>

									{/* Botões de Ação Principais da Solicitação */}
									<div className="flex justify-end gap-3 pt-2">
										<button className="rounded-xl border border-slate-200 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-50">
											Baixar Roteiro
										</button>
										<button className="rounded-xl bg-emerald-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-colors hover:bg-emerald-600">
											Concluir Etapa Atual
										</button>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
