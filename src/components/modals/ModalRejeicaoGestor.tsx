import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

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

	// Limpa o campo sempre que o modal fechar ou abrir
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
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/60" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
										✕
									</div>
									<Dialog.Title className="text-2xl font-bold text-slate-800">
										Rejeitar Solicitação
									</Dialog.Title>
								</div>

								<p className="text-slate-600 mb-6">
									Por favor, informe o motivo da rejeição. Esta justificativa
									ficará visível para o solicitante.
								</p>

								<textarea
									className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
									rows={5}
									placeholder="Ex: O pedido não atende aos critérios estratégicos do setor..."
									value={motivo}
									onChange={(e) => setMotivo(e.target.value)}
								/>

								<div className="mt-8 flex justify-end gap-3">
									<button
										className="rounded-lg bg-white px-5 py-2.5 text-slate-600 border border-slate-300 hover:bg-slate-50 font-medium transition-colors"
										onClick={onClose}
									>
										Cancelar
									</button>
									<button
										className="rounded-lg bg-red-600 px-5 py-2.5 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
										disabled={!motivo.trim()}
										onClick={handleSubmit}
									>
										Confirmar Rejeição
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
