import { User, Layout, Calendar, ChevronRight } from "lucide-react";
import type { SolicitacaoAPI } from "../../common/types/solicitacao";
import { TIPO_PRODUCAO_LABELS, type TipoProducao } from "../../common/types/solicitacao";

interface Props {
	solicitacoes: SolicitacaoAPI[];
	onSelect: (dados: SolicitacaoAPI) => void;
}

const STATUS_STYLES: Record<string, string> = {
	PENDENTE: "bg-indigo-50 text-indigo-600",
	ACEITO: "bg-emerald-50 text-emerald-600",
	DEVOLVIDO: "bg-amber-50 text-amber-600",
	REJEITADO: "bg-red-50 text-red-500",
};

const STATUS_LABELS: Record<string, string> = {
	PENDENTE: "Pendente",
	ACEITO: "Aceito",
	DEVOLVIDO: "Devolvido",
	REJEITADO: "Rejeitado",
};

export function SolicitacoesList({ solicitacoes, onSelect }: Props) {
	if (!solicitacoes.length) {
		return (
			<div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-300 text-xs font-black uppercase tracking-[0.2em]">
				Nenhuma solicitação encontrada
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-2 mb-8">
				<h2 className="text-4xl font-black text-[#334155] uppercase tracking-tighter">Solicitações</h2>
				<p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
					{solicitacoes.length} solicitação{solicitacoes.length !== 1 ? "ões" : ""} encontrada{solicitacoes.length !== 1 ? "s" : ""}
				</p>
			</div>

			{solicitacoes.map((s, index) => (
				<div
					key={index}
					className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm cursor-pointer hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
					onClick={() => onSelect(s)}
				>
					<div className="flex items-center justify-between gap-6">
						<div className="space-y-5 flex-1 min-w-0">
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<span
										className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${STATUS_STYLES[s.status] ?? "bg-slate-100 text-slate-500"}`}
									>
										{STATUS_LABELS[s.status] ?? s.status}
									</span>
									{s.TipoProducao && (
										<span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
											{TIPO_PRODUCAO_LABELS[s.TipoProducao as TipoProducao] ?? s.TipoProducao}
										</span>
									)}
								</div>
								<h3 className="text-xl font-black text-[#334155] uppercase tracking-tight truncate">
									{s.titulo}
								</h3>
							</div>

							<div className="flex flex-wrap gap-3">
								<div className="flex items-center gap-3 bg-[#F8FAFC] px-5 py-3 rounded-2xl border border-slate-50">
									<User className="text-[#4f46e5] shrink-0" size={14} />
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
											Solicitante
										</span>
										<span className="text-xs font-bold text-[#334155]">
											{s.responsavel || "Sem responsável"}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 bg-[#F8FAFC] px-5 py-3 rounded-2xl border border-slate-50">
									<Layout className="text-[#4f46e5] shrink-0" size={14} />
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
											Projeto
										</span>
										<span className="text-xs font-bold text-[#334155]">
											{s.nomeProjeto}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-3 bg-[#F8FAFC] px-5 py-3 rounded-2xl border border-slate-50">
									<Calendar className="text-[#4f46e5] shrink-0" size={14} />
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
											Data
										</span>
										<span className="text-xs font-bold text-[#334155]">
											{s.data} às {s.hora}
										</span>
									</div>
								</div>
							</div>
						</div>

						<ChevronRight
							className="text-slate-200 group-hover:text-[#4f46e5] transition-colors shrink-0"
							size={22}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
