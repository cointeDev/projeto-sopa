import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, RotateCcw } from "lucide-react";
import { CAMPOS_DEVOLUCAO } from "../../common/maps/camposDevolucaoGestor";
import type { CampoComErro } from "../../common/types/solicitacao";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (campos: CampoComErro[]) => void;
}

export default function ModalDevolucaoGestor({ open, onClose, onSubmit }: Props) {
	const [selecionados, setSelecionados] = useState<Record<string, string>>({});

	function toggleCampo(campo: string) {
		setSelecionados((prev) => {
			const novo = { ...prev };
			if (novo[campo] !== undefined) delete novo[campo];
			else novo[campo] = "";
			return novo;
		});
	}

	function atualizarMensagem(campo: string, mensagem: string) {
		setSelecionados((prev) => ({ ...prev, [campo]: mensagem }));
	}

	function enviar() {
		const payload: CampoComErro[] = Object.entries(selecionados).map(
			([campo, mensagem]) => ({ campo: campo as any, mensagem })
		);
		onSubmit(payload);
		onClose();
	}

	return (
		<Dialog open={open} onClose={onClose} className="relative z-50">
			<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

			<div className="fixed inset-0 flex items-center justify-center p-4">
				<DialogPanel className="bg-white w-full max-w-3xl rounded-4xl p-10 shadow-xl shadow-slate-200/50">
					{/* Header */}
					<div className="flex items-start justify-between mb-6">
						<div className="space-y-1">
							<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
								Ação do Gestor
							</p>
							<DialogTitle className="text-3xl font-black text-[#334155] uppercase tracking-tight flex items-center gap-3">
								<RotateCcw size={22} className="text-amber-500" />
								Devolver Solicitação
							</DialogTitle>
						</div>
						<button
							onClick={onClose}
							className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
						>
							<X size={16} />
						</button>
					</div>

					<p className="text-xs font-medium text-slate-400 mb-6">
						Selecione os campos que precisam de correção e escreva o motivo.
					</p>

					<div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
						{Object.entries(CAMPOS_DEVOLUCAO).map(([campo, config]) => (
							<div
								key={campo}
								className={`rounded-3xl border transition-colors p-5 ${
									campo in selecionados
										? "border-amber-200 bg-amber-50"
										: "border-slate-100 bg-[#F8FAFC]"
								}`}
							>
								<label className="flex items-center gap-3 cursor-pointer">
									<input
										type="checkbox"
										className="w-4 h-4 accent-amber-500 rounded"
										onChange={() => toggleCampo(campo)}
										checked={campo in selecionados}
									/>
									<span className="text-xs font-black text-[#334155] uppercase tracking-wider">
										{config.label}
									</span>
								</label>

								{campo in selecionados && (
									<textarea
										className="mt-3 w-full bg-white border border-amber-200 rounded-2xl p-3 text-xs text-[#334155] placeholder:text-slate-300 focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all resize-none"
										rows={2}
										placeholder="Descreva o problema..."
										onChange={(e) => atualizarMensagem(campo, e.target.value)}
									/>
								)}
							</div>
						))}
					</div>

					<div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
						<button
							onClick={onClose}
							className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
						>
							Cancelar
						</button>
						<button
							onClick={enviar}
							disabled={Object.keys(selecionados).length === 0}
							className="px-5 py-2.5 rounded-2xl bg-amber-500 text-white text-xs font-black uppercase tracking-wider hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
						>
							Enviar Devolutiva
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
