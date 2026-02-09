import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import type { SolicitacaoAPI } from "../../common/types/solicitacao";

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
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/40" />
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
							<Dialog.Panel className="w-full max-w-5xl rounded-2xl bg-white py-6 px-12 shadow-xl">
								<Dialog.Title className="text-3xl font-semibold mb-4">
									Revisão da Solicitação
								</Dialog.Title>

								{/* DADOS DO FORM */}
								<div className="grid grid-cols-3 gap-5 text-9xl">
									<Info label="Responsável" value={dados.responsavel} />
									<Info label="Email" value={dados.email} />
									<Info label="Setor" value={dados.setor} />
									<Info label="Telefone" value={dados.telefone} />
									<Info label="Tipo" value={dados.tipo} />
									<Info label="Formato" value={dados.formato} />
									<Info label="Projeto" value={dados.nomeProjeto} />
									<Info label="Título" value={dados.titulo} />
									<Info label="Data da gravação" value={dados.data} />
									<Info label="Hora da gravação" value={dados.hora} />
									<Info label="Pessoas" value={dados.pessoas} />
									<Info label="Data limite" value={dados.dataLimite} />
									<Info label="Roteiro" value={dados.roteiro} />
									<div className="col-span-2">
										<Info label="Observações" value={dados.observacoes} />
									</div>
								</div>

								<div className="mt-4">
									<p className="text-lg font-medium">Descrição</p>
									<p className="text-lg text-muted-foreground wrap-break-word">
										{dados.descricao}
									</p>
								</div>

								{/* AÇÕES */}
								<div className="mt-12 flex justify-end gap-3">
									<button
										className="rounded-lg bg-blue-500 px-4 py-2 text-white"
										onClick={() => onAction("RECUSAR")}
									>
										Rejeitar
									</button>

									<button
										className="rounded-lg bg-blue-500 px-4 py-2 text-white"
										onClick={() => onAction("DEVOLVER")}
									>
										Estornar
									</button>

									<button
										className="rounded-lg bg-blue-500 px-4 py-2 text-white"
										onClick={() => onAction("ACEITAR")}
									>
										Aceitar
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

function Info({ label, value }: { label: string; value?: string }) {
	return (
		<div>
			<p className="text-xl font-medium text-muted-foreground">{label}</p>
			<p className="text-lg wrap-break-word">{value || "—"}</p>
		</div>
	);
}
