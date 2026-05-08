/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from "react";
import {
	X,
	Clock,
	FileText,
	Users,
	Layers,
	Accessibility,
	ChevronRight,
	GraduationCap,
	History,
	UserCheck,
	GitBranch,
	CalendarDays,
	Timer,
} from "lucide-react";
import type { Card } from "../../pages/GestorLocal";
import {
	FORMATO_PRODUCAO_LABELS,
	TIPO_PRODUCAO_LABELS,
	type TipoProducao,
	type HistoricoEtapa,
	type DelegacaoEtapa,
} from "../../common/types/solicitacao";
import { buscarSolicitacaoPorToken } from "../../services/solicitacoes";
import ModalDelegacaoEtapa from "../modals/ModalDelegacaoEtapa";

interface DetailBoxProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

function DetailBox({ icon, label, value }: DetailBoxProps) {
	return (
		<div className="flex items-start gap-3 bg-[#F8FAFC] px-5 py-4 rounded-2xl border border-slate-50">
			<div className="text-[#4f46e5] mt-0.5 shrink-0">{icon}</div>
			<div className="flex flex-col min-w-0">
				<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
					{label}
				</span>
				<span className="text-xs font-bold text-[#334155] wrap-break-word">
					{value}
				</span>
			</div>
		</div>
	);
}

export function CardDetailModal({
	card,
	onClose,
}: {
	card: Card;
	onClose: () => void;
}) {
	const solicitacao = card.solicitacao;
	const [historico, setHistorico] = useState<Array<HistoricoEtapa>>([]);
	const [delegacoes, setDelegacoes] = useState<Array<DelegacaoEtapa>>([]);
	const [modalDelegacao, setModalDelegacao] = useState(false);

	useEffect(() => {
		if (!solicitacao?.id) return;
		buscarSolicitacaoPorToken(solicitacao.id)
			.then((data) => {
				setHistorico(data.historico ?? []);
				setDelegacoes(data.delegacoes ?? []);
			})
			.catch(console.error);
	}, [solicitacao?.id]);

	const COLORS = {
		matematica: "#fdde82",
		linguagens: "#bec658",
		humanas: "#c3dcf6",
		natureza: "#4068a7",
	};
	let areaColor = "#4f46e5";
	const tags = card.etiquetas?.join(" ") || "";
	if (tags.includes("Matemática")) areaColor = COLORS.matematica;
	else if (tags.includes("Linguagens")) areaColor = COLORS.linguagens;
	else if (tags.includes("Humanas")) areaColor = COLORS.humanas;
	else if (tags.includes("Natureza")) areaColor = COLORS.natureza;

	const isEdicao = solicitacao?.TipoProducao === "EDICAO";

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-500 md:p-12 text-left">
			<div className="animate-fade-in flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-4xl bg-white shadow-2xl shadow-slate-300/30">
				{/* Header */}
				<header className="relative shrink-0 border-b border-slate-100 bg-white px-12 py-10">
					<div
						className="absolute left-0 top-0 h-1 w-full rounded-t-4xl"
						style={{ backgroundColor: areaColor }}
					/>
					<div className="flex items-start justify-between mt-2">
						<div className="space-y-4">
							<div className="flex flex-wrap items-center gap-3">
								<span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
									Card de Produção
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-3">
								<h2 className="tracking-tight text-4xl font-black leading-none text-[#334155] uppercase">
									{solicitacao?.titulo || "-"}
								</h2>
								<span className="flex items-center gap-1 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase text-slate-500">
									{solicitacao?.TipoProducao
										? (TIPO_PRODUCAO_LABELS[
												solicitacao.TipoProducao as TipoProducao
											] ?? solicitacao.TipoProducao)
										: "-"}
									<ChevronRight size={10} />
								</span>
								<span
									className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase text-white shadow-sm"
									style={{ backgroundColor: areaColor }}
								>
									{card.etapa}
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-4">
								<div className="flex items-center gap-2 text-slate-400">
									<GraduationCap size={14} className="text-slate-300" />
									<span className="text-[10px] font-black uppercase tracking-widest">
										{solicitacao?.setor || "SEEC/RN"}
									</span>
								</div>
								<div
									className="flex items-center gap-2 rounded-2xl px-4 py-2 border border-slate-50"
									style={{ backgroundColor: areaColor + "18" }}
								>
									<Clock size={12} style={{ color: areaColor }} />
									<span
										className="text-[10px] font-black uppercase tracking-tighter"
										style={{ color: areaColor }}
									>
										{card.projeto}
									</span>
								</div>
							</div>
						</div>
						<button
							className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
							type="button"
							onClick={onClose}
						>
							<X size={18} />
						</button>
					</div>
				</header>

				{/* Body */}
				<div className="custom-scrollbar grid flex-1 grid-cols-1 gap-10 overflow-y-auto p-12 lg:grid-cols-3">
					{/* Coluna principal */}
					<div className="space-y-10 lg:col-span-2">
						{/* Detalhes */}
						<section>
							<h3 className="mb-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
								Detalhes
							</h3>
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<DetailBox
									icon={<Layers size={13} />}
									label="Formato"
									value={
										solicitacao?.FormatoProducao
											? FORMATO_PRODUCAO_LABELS[solicitacao.FormatoProducao]
											: "-"
									}
								/>
								<DetailBox
									icon={<Users size={13} />}
									label="Participantes"
									value={`${solicitacao?.pessoas || 0} participantes`}
								/>
								<div
									className={`flex items-start gap-3 px-5 py-4 rounded-2xl border transition-colors ${
										solicitacao?.acessibilidade?.includes("LIBRAS")
											? "border-emerald-100 bg-emerald-50"
											: "border-slate-50 bg-[#F8FAFC]"
									}`}
								>
									<div
										className={`mt-0.5 shrink-0 ${
											solicitacao?.acessibilidade?.includes("LIBRAS")
												? "text-emerald-500"
												: "text-slate-300"
										}`}
									>
										<Accessibility size={13} />
									</div>
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
											LIBRAS
										</span>
										<span className="text-xs font-bold text-[#334155]">
											{solicitacao?.acessibilidade?.includes("LIBRAS")
												? "Sim"
												: "Não"}
										</span>
									</div>
								</div>
								<div className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-slate-50 bg-[#F8FAFC]">
									<div className="text-slate-300 mt-0.5 shrink-0">
										<Users size={13} />
									</div>
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
											Legendagem
										</span>
										<span className="text-xs font-bold text-[#334155]">
											Não
										</span>
									</div>
								</div>
							</div>
						</section>

						{/* Roteiro */}
						<section>
							<h3 className="mb-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
								Roteiro
							</h3>
							<div className="flex items-center justify-between bg-[#F8FAFC] border border-slate-50 rounded-3xl p-6">
								<div className="flex items-center gap-4">
									<div className="bg-indigo-50 p-4 rounded-2xl text-indigo-500">
										<FileText size={20} />
									</div>
									<div>
										<p className="font-black text-[#334155] text-sm">
											{solicitacao?.roteiro || "Sem roteiro"}
										</p>
										<span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
											{solicitacao?.createdAt
												? new Date(solicitacao.createdAt).toLocaleDateString(
														"pt-BR"
													)
												: ""}
										</span>
									</div>
								</div>
								<button
									className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center text-slate-300 hover:text-[#4f46e5] border border-slate-100 transition-colors"
									type="button"
								>
									<ChevronRight size={16} />
								</button>
							</div>
						</section>
					</div>

					{/* Coluna lateral */}
					<div className="space-y-6">
						{/* Datas + Pipeline */}
						<section className="rounded-4xl bg-white border border-slate-100 shadow-sm overflow-hidden">
							<div className="px-8 pt-8 pb-6 border-b border-slate-50">
								<h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-5">
									Datas
								</h3>
								<div className="space-y-4">
									{!isEdicao && (
										<div className="flex items-center gap-3 bg-[#F8FAFC] rounded-2xl border border-slate-50 px-4 py-3">
											<CalendarDays
												size={13}
												className="text-[#4f46e5] shrink-0"
											/>
											<div className="flex flex-col">
												<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
													Data da gravação
												</span>
												<span className="text-xs font-bold text-[#334155]">
													{solicitacao?.data || "-"}
												</span>
											</div>
										</div>
									)}

									<div className="flex items-center gap-3 bg-[#F8FAFC] rounded-2xl border border-slate-50 px-4 py-3">
										<Timer size={13} className="text-[#4f46e5] shrink-0" />
										<div className="flex flex-col">
											<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
												Previsão de término
											</span>
											<span className="text-xs font-bold text-[#334155]">
												{solicitacao?.dataLimite || "-"}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Pipeline */}
							<div className="px-8 py-6">
								<h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-5">
									Pipeline
								</h3>
								<div className="flex items-center justify-between mb-3">
									<span
										className="rounded-full px-3 py-1 text-[9px] font-black uppercase text-white shadow-sm"
										style={{ backgroundColor: areaColor }}
									>
										{card.etapa}
									</span>
									<span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
										75%
									</span>
								</div>
								<div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
									<div
										className="h-full w-[75%] rounded-full shadow-sm"
										style={{ backgroundColor: areaColor }}
									/>
								</div>
								<div className="grid grid-cols-2 gap-y-1.5">
									{["Solicitado", "Pré-produção", "Gravado", card.etapa].map(
										(label, i) => (
											<span
												key={label}
												className="text-[8px] font-black uppercase tracking-widest"
												style={{ color: i >= 2 ? areaColor : "#cbd5e1" }}
											>
												{label}
											</span>
										)
									)}
								</div>
							</div>
						</section>

						{/* Responsável */}
						<div className="flex items-center gap-4 p-5 rounded-4xl bg-[#F8FAFC] border border-slate-100">
							<div className="w-11 h-11 rounded-full bg-indigo-100 overflow-hidden shrink-0">
								<img
									alt="Avatar"
									src={`https://ui-avatars.com/api/?name=${encodeURIComponent(solicitacao?.responsavel || "?")}&background=4f46e5&color=fff`}
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-xs font-black text-[#334155]">
									{solicitacao?.responsavel || "Sem responsável"}
								</span>
								<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
									Responsável
								</span>
							</div>
						</div>

						{/* Delegações */}
						{delegacoes.length > 0 && (
							<section className="rounded-4xl bg-white border border-slate-100 shadow-sm p-8">
								<h3 className="mb-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
									<UserCheck size={13} /> Delegações
								</h3>
								<div className="flex flex-col gap-3">
									{delegacoes.map((d) => (
										<div
											key={d.id}
											className="flex items-center justify-between rounded-2xl border border-slate-50 bg-[#F8FAFC] px-4 py-3"
										>
											<div>
												<p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
													{d.etapa.nome}
												</p>
												<p className="text-xs font-bold text-[#334155]">
													{d.operacional.login}
												</p>
											</div>
											<span className="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-500">
												{d.operacional.local}
											</span>
										</div>
									))}
								</div>
							</section>
						)}

						{/* Botão Delegar */}
						{solicitacao?.id && (
							<button
								className="w-full rounded-3xl border-2 border-dashed border-indigo-200 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
								onClick={() => setModalDelegacao(true)}
							>
								<GitBranch size={13} />
								Delegar Etapa
							</button>
						)}

						{/* Histórico */}
						{historico.length > 0 && (
							<section className="rounded-4xl bg-white border border-slate-100 shadow-sm p-8">
								<h3 className="mb-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
									<History size={13} /> Histórico de Etapas
								</h3>
								<ol className="relative border-l border-slate-100 pl-5 flex flex-col gap-4">
									{historico.map((h) => (
										<li key={h.id} className="relative">
											<span className="absolute -left-[1.15rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-indigo-400 bg-white" />
											<p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
												{new Date(h.createdAt).toLocaleString("pt-BR")}
											</p>
											<p className="text-xs font-bold text-[#334155]">
												{h.etapa.nome}
											</p>
										</li>
									))}
								</ol>
							</section>
						)}
					</div>
				</div>
			</div>

			{solicitacao?.id && (
				<ModalDelegacaoEtapa
					etapaAtualId={solicitacao.EtapaId ?? 2}
					open={modalDelegacao}
					solicitacaoId={solicitacao.id}
					localSolicitacao={solicitacao.local}
					onClose={() => setModalDelegacao(false)}
					onSuccess={() => {
						buscarSolicitacaoPorToken(solicitacao.id)
							.then((data) => setDelegacoes(data.delegacoes ?? []))
							.catch(console.error);
					}}
				/>
			)}
		</div>
	);
}
