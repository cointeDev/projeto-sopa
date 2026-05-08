import { Fragment, useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { X, XCircle } from "lucide-react";

interface ModalRejeicaoGestorProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (motivo: string) => void;
}

export default function ModalRejeicaoGestor({
	open,
	onClose,
	onSubmit,
}: ModalRejeicaoGestorProps) {
	const [motivo, setMotivo] = useState("");

	useEffect(() => {
		if (!open) setMotivo("");
	}, [open]);

	const handleSubmit = () => {
		if (motivo.trim() !== "") {
			onSubmit(motivo);
		}
	};

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[60]" onClose={onClose}>
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
							<DialogPanel className="w-full max-w-lg rounded-4xl bg-white p-10 shadow-xl shadow-slate-200/50">
								{/* Header */}
								<div className="flex items-start justify-between mb-6">
									<div className="space-y-1">
										<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
											Ação do Gestor
										</p>
										<DialogTitle className="text-3xl font-black text-[#334155] uppercase tracking-tight flex items-center gap-3">
											<XCircle size={22} className="text-red-500" />
											Rejeitar Solicitação
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
									Por favor, informe o motivo da rejeição. Esta justificativa ficará visível para o solicitante.
								</p>

								<textarea
									className="w-full rounded-3xl border border-slate-100 bg-[#F8FAFC] p-5 text-xs text-[#334155] placeholder:text-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-200 outline-none transition-all resize-none"
									rows={5}
									placeholder="Ex: O pedido não atende aos critérios estratégicos do setor..."
									value={motivo}
									onChange={(e) => setMotivo(e.target.value)}
								/>

								<div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
									<button
										className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
										onClick={onClose}
									>
										Cancelar
									</button>
									<button
										className="px-5 py-2.5 rounded-2xl bg-red-600 text-white text-xs font-black uppercase tracking-wider hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
										disabled={!motivo.trim()}
										onClick={handleSubmit}
									>
										Confirmar Rejeição
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
