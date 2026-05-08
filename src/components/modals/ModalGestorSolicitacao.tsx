import { Fragment } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {
	X,
	User,
	Mail,
	Building2,
	Phone,
	Film,
	FileVideo,
	FolderOpen,
	Type,
	CalendarDays,
	Clock,
	Users,
	AlertCircle,
	StickyNote,
	AlignLeft,
} from "lucide-react";

import {
	FORMATO_PRODUCAO_LABELS,
	TIPO_PRODUCAO_LABELS,
	type SolicitacaoAPI,
} from "../../common/types/solicitacao";

export type AcaoGestor = "ACEITAR" | "RECUSAR" | "DEVOLVER";

interface ModalGestorSolicitacaoProps {
	open: boolean;
	onClose: () => void;
	dados: SolicitacaoAPI;
	onAction: (acao: AcaoGestor) => void;
}

export default function ModalGestorSolicitacao({
	open,
	onClose,
	dados,
	onAction,
}: ModalGestorSolicitacaoProps) {
	const isEdicao = dados.TipoProducao === "EDICAO";
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-5xl rounded-4xl bg-white p-10 shadow-xl shadow-slate-200/50">
								{/* Header */}
								<div className="flex items-start justify-between mb-8">
									<div className="space-y-1">
										<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
											Revisão de Solicitação
										</p>
										<DialogTitle className="text-3xl font-black text-[#334155] uppercase tracking-tight">
											{dados.titulo || "Sem título"}
										</DialogTitle>
									</div>
									<button
										onClick={onClose}
										className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
									>
										<X size={16} />
									</button>
								</div>

								{/* Info Grid */}
								<div className="grid grid-cols-3 gap-3 mb-8">
									<InfoChip
										icon={<User size={13} />}
										label="Responsável"
										value={dados.responsavel}
									/>
									<InfoChip
										icon={<Mail size={13} />}
										label="Email"
										value={dados.email}
									/>
									<InfoChip
										icon={<Building2 size={13} />}
										label="Setor"
										value={dados.setor}
									/>
									<InfoChip
										icon={<Phone size={13} />}
										label="Telefone"
										value={dados.telefone}
									/>
									<InfoChip
										icon={<Film size={13} />}
										label="Tipo"
										value={
											dados.TipoProducao
												? TIPO_PRODUCAO_LABELS[dados.TipoProducao]
												: undefined
										}
									/>
									<InfoChip
										icon={<FileVideo size={13} />}
										label="Formato"
										value={
											dados.FormatoProducao
												? FORMATO_PRODUCAO_LABELS[dados.FormatoProducao]
												: undefined
										}
									/>
									<InfoChip
										icon={<FolderOpen size={13} />}
										label="Projeto"
										value={dados.nomeProjeto}
									/>
									<InfoChip
										icon={<Type size={13} />}
										label="Título"
										value={dados.titulo}
									/>
									{isEdicao ? (
										<InfoChip
											icon={<FolderOpen size={13} />}
											label="Material de edição"
											value={dados.materialEdicao}
										/>
									) : (
										<>
											<InfoChip
												icon={<CalendarDays size={13} />}
												label="Data da gravação"
												value={dados.data}
											/>
											<InfoChip
												icon={<Clock size={13} />}
												label="Hora da gravação"
												value={dados.hora}
											/>
											<InfoChip
												icon={<Users size={13} />}
												label="Pessoas"
												value={dados.pessoas}
											/>
										</>
									)}
									<InfoChip
										icon={<AlertCircle size={13} />}
										label="Data limite"
										value={dados.dataLimite}
									/>
									<InfoChip
										icon={<StickyNote size={13} />}
										label="Roteiro"
										value={dados.roteiro}
									/>
									<div className="col-span-2">
										<InfoChip
											icon={<AlignLeft size={13} />}
											label="Observações"
											value={dados.observacoes}
										/>
									</div>
								</div>

								{/* Descrição */}
								{dados.descricao && (
									<div className="bg-[#F8FAFC] rounded-3xl border border-slate-50 p-6 mb-8">
										<p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">
											Descrição
										</p>
										<p className="text-sm font-medium text-[#334155] leading-relaxed wrap-break-word">
											{dados.descricao}
										</p>
									</div>
								)}

								{/* Ações */}
								<div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
									<button
										className="px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider hover:bg-red-100 transition-colors"
										onClick={() => onAction("RECUSAR")}
									>
										Rejeitar
									</button>
									<button
										className="px-5 py-2.5 rounded-2xl bg-amber-50 text-amber-600 text-xs font-black uppercase tracking-wider hover:bg-amber-100 transition-colors"
										onClick={() => onAction("DEVOLVER")}
									>
										Estornar
									</button>
									<button
										className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider hover:bg-indigo-700 transition-colors"
										onClick={() => onAction("ACEITAR")}
									>
										Aceitar
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

function InfoChip({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value?: unknown;
}) {
	const display =
		value === null || value === undefined || value === "" ? "—" : String(value);

	return (
		<div className="flex items-start gap-3 bg-[#F8FAFC] px-5 py-4 rounded-2xl border border-slate-50">
			<div className="text-[#4f46e5] mt-0.5 shrink-0">{icon}</div>
			<div className="flex flex-col min-w-0">
				<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
					{label}
				</span>
				<span className="text-xs font-bold text-[#334155] wrap-break-word">
					{display}
				</span>
			</div>
		</div>
	);
}
