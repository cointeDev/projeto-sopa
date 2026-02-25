import { useState, useEffect } from "react";
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
import { listarSolicitacoesOperacional } from "../services/solicitacoes";

export default function PainelTarefas() {
	const [solicitacoes, setSolicitacoes] = useState<Array<Solicitacao>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [tarefaExpandida, setTarefaExpandida] = useState<string | null>(null);

	useEffect(() => {
		async function carregarTarefas() {
			try {
				setLoading(true);
				const dados = await listarSolicitacoesOperacional();
				setSolicitacoes(dados);
			} catch (error) {
				console.error("Erro ao buscar solicitações:", error);
			} finally {
				setLoading(false);
			}
		}
		void carregarTarefas();
	}, []);

	const toggleTarefa = (id: string) => {
		setTarefaExpandida(tarefaExpandida === id ? null : id);
	};

	if (loading) {
		return (
			<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="text-center py-20 text-[10px] font-black uppercase tracking-widest text-slate-400">
					Carregando demandas...
				</div>
			</section>
		);
	}

	if (solicitacoes.length === 0) {
		return (
			<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="text-center py-20 text-[10px] font-black uppercase tracking-widest text-slate-400">
					Nenhuma demanda pendente no momento.
				</div>
			</section>
		);
	}

	return (
		<section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="grid grid-cols-1 gap-5">
				{solicitacoes.map((solicitacao) => {
					// Formatando os labels usando os dicionários do seu types.ts
					// Usamos o '|| solicitacao.campo' como fallback caso a string não exista no map
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
					const distribuicaoLabel =
						DISTRIBUICAO_LABELS[solicitacao.distribuicao as Distribuicao] ||
						solicitacao.distribuicao;

					return (
						<div
							key={solicitacao.id}
							className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 flex flex-col gap-6 hover:shadow-xl hover:shadow-slate-200/40 transition-all group overflow-hidden"
						>
							{/* CABEÇALHO DA TAREFA */}
							<div
								className="flex items-center justify-between cursor-pointer"
								onClick={() => { toggleTarefa(solicitacao.id); }}
							>
								<div className="flex gap-6 items-center">
									<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#4f46e5] group-hover:scale-110 transition-transform">
										{tarefaExpandida === solicitacao.id ? (
											<svg
												className="w-6 h-6"
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
												className="w-6 h-6"
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
										<p className="text-lg font-black text-[#334155] uppercase tracking-tighter leading-none">
											{solicitacao.titulo}
										</p>
										<p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">
											Projeto: {solicitacao.nomeProjeto} · Etapa: {etapaLabel}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-6">
									<span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
										📅 Limite:{" "}
										{new Date(solicitacao.dataLimite).toLocaleDateString(
											"pt-BR"
										)}
									</span>
									<span className="px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#4f46e5] border border-indigo-100 shadow-sm">
										{solicitacao.status}
									</span>
								</div>
							</div>

							{/* DETALHES DA TAREFA EXPANDIDA */}
							{tarefaExpandida === solicitacao.id && (
								<div className="animate-in slide-in-from-top-2 fade-in duration-300 border-t border-slate-200 pt-6 mt-2 grid grid-cols-2 gap-8 text-sm">
									{/* Coluna 1: Informações Gerenciais */}
									<div className="flex flex-col gap-4">
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Responsável / Setor
											</span>
											<span className="font-semibold text-[#334155]">
												{solicitacao.responsavel} ({solicitacao.setor})
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Contato
											</span>
											<span className="font-semibold text-[#334155]">
												{solicitacao.email} | {solicitacao.telefone}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Localização
											</span>
											<span className="font-semibold text-[#334155]">
												{localLabel}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Data e Hora Sugeridas
											</span>
											<span className="font-semibold text-[#334155]">
												{new Date(solicitacao.data).toLocaleDateString("pt-BR")}{" "}
												às {solicitacao.hora}
											</span>
										</div>
									</div>

									{/* Coluna 2: Informações Técnicas */}
									<div className="flex flex-col gap-4">
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Produção / Formato
											</span>
											<span className="font-semibold text-[#334155]">
												{producaoLabel} | {formatoLabel}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Distribuição / Acessibilidade
											</span>
											<span className="font-semibold text-[#334155]">
												{distribuicaoLabel} | {acessibilidadeLabel}
											</span>
										</div>
										<div>
											<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
												Descrição da Demanda
											</span>
											<span className="font-medium text-slate-600 block">
												{solicitacao.descricao}
											</span>
										</div>
										{solicitacao.observacoes && (
											<div>
												<span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest block mb-1">
													Observações
												</span>
												<span className="font-medium text-slate-600 italic block">
													{solicitacao.observacoes}
												</span>
											</div>
										)}
									</div>

									{/* Botões de Ação */}
									<div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
										<button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
											Baixar Roteiro
										</button>
										<button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#4f46e5] text-white shadow-md hover:bg-indigo-700 transition-colors">
											Iniciar Produção
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
