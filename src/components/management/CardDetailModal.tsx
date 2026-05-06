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
		<div className="group flex items-center gap-4 rounded-3xl border border-slate-50 bg-[#F8FAFC]/50 p-5 transition-all hover:bg-white hover:shadow-md">
			<div className="rounded-2xl bg-white p-3 text-indigo-500 shadow-sm group-hover:bg-[#4f46e5] group-hover:text-white transition-colors">
				{icon}
			</div>
			<div className="flex flex-col text-left">
				<span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
					{label}
				</span>
				<span className="tracking-tight text-sm font-black text-slate-800">
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

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-500 md:p-12 text-left">
			<div className="animate-fade-in flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-1 ring-white/20">
				<header className="relative shrink-0 border-b border-slate-100 bg-white p-12 pb-8">
					<div
						className="absolute left-0 top-0 h-4 w-40 rounded-br-4xl"
						style={{ backgroundColor: areaColor }}
					/>
					<div className="flex items-start justify-between">
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<h2 className="tracking-tighter text-4xl font-black leading-none text-slate-900 uppercase">
									{solicitacao?.titulo || "-"}
								</h2>
								<div className="flex gap-2">
									<span className="flex items-center gap-1 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase text-slate-600">
										{solicitacao?.TipoProducao
											? (TIPO_PRODUCAO_LABELS[solicitacao.TipoProducao as TipoProducao] ?? solicitacao.TipoProducao)
											: "-"} <ChevronRight size={12} />
									</span>
									<span className="rounded-full bg-indigo-600 px-4 py-1.5 text-[10px] font-black uppercase text-white shadow-lg shadow-indigo-100">
										{card.etapa} <ChevronRight size={12} />
									</span>
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2 text-slate-400 font-bold">
									<GraduationCap className="text-slate-300" size={18} />{" "}
									<span className="text-xs uppercase tracking-widest">
										{solicitacao?.setor || "SEEC/RN"}
									</span>
								</div>
								<div
									className="inline-flex items-center gap-3 rounded-xl py-2 px-4 shadow-sm border border-slate-100"
									style={{ backgroundColor: areaColor + "20" }}
								>
									<div
										className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
										style={{ backgroundColor: areaColor }}
									>
										<Clock size={16} />
									</div>
									<span
										className="text-[11px] font-black uppercase tracking-tighter"
										style={{ color: areaColor }}
									>
										{card.projeto}
									</span>
								</div>
							</div>
						</div>
						<button
							className="group rounded-3xl bg-white p-4 shadow-xl shadow-slate-200/50 transition-all hover:bg-red-50 hover:text-red-500"
							type="button"
							onClick={onClose}
						>
							<X size={28} />
						</button>
					</div>
				</header>

				<div className="custom-scrollbar grid flex-1 grid-cols-1 gap-12 overflow-y-auto p-12 lg:grid-cols-3">
					<div className="space-y-12 lg:col-span-2">
						<section>
							<h3 className="mb-6 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-300">
								Detalhes
							</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<DetailBox
									icon={<Layers size={16} />}
									label="Formato"
									value={
										solicitacao?.FormatoProducao
											? FORMATO_PRODUCAO_LABELS[solicitacao.FormatoProducao]
											: "-"
									}
								/>
								<DetailBox
									icon={<Users size={16} />}
									label="Participantes"
									value={`${solicitacao?.pessoas || 0} Participantes`}
								/>
								<div
									className={`flex items-center gap-4 rounded-3xl p-5 border border-slate-50 ${solicitacao?.acessibilidade?.includes("LIBRAS") ? "bg-emerald-50/30" : "bg-[#F8FAFC]/50"}`}
								>
									<div
										className={`p-3 rounded-2xl ${solicitacao?.acessibilidade?.includes("LIBRAS") ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}
									>
										<Accessibility size={16} />
									</div>
									<div className="flex flex-col">
										<span className="text-[9px] font-black uppercase text-slate-400">
											LIBRAS
										</span>
										<span className="text-sm font-black text-slate-800">
											{solicitacao?.acessibilidade?.includes("LIBRAS")
												? "Sim"
												: "Não"}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-4 rounded-3xl p-5 border border-slate-50 bg-[#F8FAFC]/50">
									<div className="p-3 rounded-2xl bg-slate-200 text-slate-400">
										<Users size={16} />
									</div>
									<div className="flex flex-col">
										<span className="text-[9px] font-black uppercase text-slate-400">
											Legendagem
										</span>
										<span className="text-sm font-black text-slate-800">
											Não
										</span>
									</div>
								</div>
							</div>
						</section>

						<section>
							<h3 className="mb-6 text-[11px] font-black uppercase tracking-widest text-slate-300">
								Roteiro
							</h3>
							<div className="flex items-center justify-between bg-white border border-slate-100 rounded-4xl p-6 shadow-sm">
								<div className="flex items-center gap-4">
									<div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
										<FileText size={24} />
									</div>
									<div>
										<p className="font-black text-slate-800 text-sm">
											{solicitacao?.roteiro || "Sem roteiro"}
										</p>
										<span className="text-[10px] text-slate-400 font-bold uppercase">
											{solicitacao?.createdAt
												? new Date(solicitacao.createdAt).toLocaleDateString("pt-BR")
												: ""}
										</span>
									</div>
								</div>
								<button
									className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
									type="button"
								>
									<ChevronRight size={20} />
								</button>
							</div>
						</section>
					</div>

					<div className="space-y-10">
						<section className="rounded-4xl bg-white p-10 border border-slate-100 shadow-sm">
							<h3 className="mb-8 text-[10px] font-black uppercase tracking-widest text-slate-300">
								Datas
							</h3>
							<div className="space-y-5">
								<div className="flex justify-between items-center text-sm font-bold text-slate-600">
									<span>Data da gravação</span>
									<span>{solicitacao?.data || "-"}</span>
								</div>
								<div className="flex justify-between items-center text-sm font-bold text-slate-600">
									<span>Início da edição</span>
									<span>-</span>
								</div>
								<div className="flex justify-between items-center text-sm font-bold text-slate-600">
									<span>Previsão de término</span>
									<span>{solicitacao?.dataLimite || "-"}</span>
								</div>

								<div className="mt-8 pt-8 border-t border-slate-50">
									<div className="flex items-center justify-between mb-4">
										<span className="rounded-full bg-indigo-600 px-4 py-1.5 text-[9px] font-black uppercase text-white">
											{card.etapa}
										</span>
									</div>
									<div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
										<div className="bg-indigo-600 h-full w-[75%] shadow-[0_0_10px_rgba(79,70,229,0.4)]"></div>
									</div>
									<div className="grid grid-cols-2 gap-y-2 text-[8px] font-black uppercase text-slate-300">
										<span>Solicitado</span>
										<span>Pré-produção</span>
										<span className="text-indigo-400">Gravado</span>
										<span className="text-indigo-600">{card.etapa}</span>
									</div>
								</div>
							</div>
						</section>

						<div className="flex items-center gap-4 p-6 rounded-4xl bg-slate-50/50 border border-slate-100">
							<div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden">
								<img
									alt="Avatar"
									src={`https://ui-avatars.com/api/?name=${encodeURIComponent(solicitacao?.responsavel || "?")}&background=4f46e5&color=fff`}
								/>
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-black text-slate-800">
									{solicitacao?.responsavel || "Sem responsável"}
								</span>
								<span className="text-[9px] font-black text-slate-400 uppercase">
									Responsável
								</span>
							</div>
						</div>

						{/* DELEGAÇÕES */}
						{delegacoes.length > 0 && (
							<section className="rounded-4xl bg-white p-8 border border-slate-100 shadow-sm">
								<h3 className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
									<UserCheck size={14} /> Delegações
								</h3>
								<div className="flex flex-col gap-3">
									{delegacoes.map((d) => (
										<div
											key={d.id}
											className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#F8FAFC] px-4 py-3"
										>
											<div>
												<p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
													{d.etapa.nome}
												</p>
												<p className="text-sm font-bold text-[#334155]">
													{d.operacional.login}
												</p>
											</div>
											<span className="rounded-full bg-indigo-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600">
												{d.operacional.local}
											</span>
										</div>
									))}
								</div>
							</section>
						)}

						{/* BOTÃO DELEGAR */}
						{solicitacao?.id && (
							<button
								className="w-full rounded-2xl border-2 border-dashed border-indigo-200 py-4 text-[10px] font-black uppercase tracking-widest text-indigo-400 transition-colors hover:border-indigo-400 hover:text-indigo-600"
								onClick={() => setModalDelegacao(true)}
							>
								+ Delegar Etapa
							</button>
						)}

						{/* HISTÓRICO */}
						{historico.length > 0 && (
							<section className="rounded-4xl bg-white p-8 border border-slate-100 shadow-sm">
								<h3 className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
									<History size={14} /> Histórico de Etapas
								</h3>
								<ol className="relative border-l border-slate-200 pl-5 flex flex-col gap-4">
									{historico.map((h) => (
										<li key={h.id} className="relative">
											<span className="absolute -left-[1.15rem] top-1 h-3 w-3 rounded-full border-2 border-indigo-400 bg-white" />
											<p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
												{new Date(h.createdAt).toLocaleString("pt-BR")}
											</p>
											<p className="text-sm font-bold text-[#334155]">
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
