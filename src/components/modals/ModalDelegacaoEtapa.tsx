import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ETAPAS_MAP } from "../../common/types/solicitacao";
import { delegarEtapa } from "../../services/solicitacoes";

interface ModalDelegacaoEtapaProps {
	open: boolean;
	onClose: () => void;
	solicitacaoId: string;
	etapaAtualId: number;
	role?: "GESTOR_GERAL" | "GESTOR_LOCAL";
	onSuccess?: () => void;
}

export default function ModalDelegacaoEtapa({
	open,
	onClose,
	solicitacaoId,
	etapaAtualId,
	role = "GESTOR_GERAL",
	onSuccess,
}: ModalDelegacaoEtapaProps) {
	const [etapaId, setEtapaId] = useState<number>(etapaAtualId);
	const [operacionalId, setOperacionalId] = useState<string>("");
	const [salvando, setSalvando] = useState(false);
	const [erro, setErro] = useState<string | null>(null);
	const [sucesso, setSucesso] = useState(false);

	// Etapas válidas para delegação (excluindo STANDBY=1, CONCLUÍDO=12, PUBLICADO=13)
	const etapasValidas = Object.entries(ETAPAS_MAP).filter(
		([id]) => Number(id) !== 1 && Number(id) !== 12 && Number(id) !== 13
	);

	async function handleSubmit() {
		const opId = Number(operacionalId);
		if (!operacionalId || isNaN(opId) || opId <= 0) {
			setErro("Informe um ID de operacional válido.");
			return;
		}

		try {
			setSalvando(true);
			setErro(null);
			await delegarEtapa(solicitacaoId, etapaId, opId, role);
			setSucesso(true);
			onSuccess?.();
			setTimeout(() => {
				setSucesso(false);
				onClose();
			}, 1500);
		} catch (error: unknown) {
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
					: "Erro ao delegar etapa. Verifique o ID do operacional.";
			setErro(mensagem);
		} finally {
			setSalvando(false);
		}
	}

	function handleClose() {
		setErro(null);
		setSucesso(false);
		setOperacionalId("");
		setEtapaId(etapaAtualId);
		onClose();
	}

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={handleClose}>
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
							<Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
								<Dialog.Title className="text-2xl font-black uppercase tracking-tighter text-[#334155] mb-6">
									Delegar Etapa
								</Dialog.Title>

								<div className="flex flex-col gap-5">
									<div>
										<label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
											Etapa
										</label>
										<select
											className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#334155] outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
											value={etapaId}
											onChange={(e) => setEtapaId(Number(e.target.value))}
										>
											{etapasValidas.map(([id, nome]) => (
												<option key={id} value={id}>
													{nome}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
											ID do Operacional
										</label>
										<input
											className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#334155] outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
											min={1}
											placeholder="Ex: 3"
											type="number"
											value={operacionalId}
											onChange={(e) => setOperacionalId(e.target.value)}
										/>
										<p className="mt-1 text-[10px] text-slate-400">
											Informe o ID do usuário com role OPERACIONAL.
										</p>
									</div>

									{erro && (
										<div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] font-bold text-red-600">
											{erro}
										</div>
									)}

									{sucesso && (
										<div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-[11px] font-bold text-emerald-600">
											Etapa delegada com sucesso!
										</div>
									)}
								</div>

								<div className="mt-8 flex justify-end gap-3">
									<button
										className="rounded-xl border border-slate-200 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-colors hover:bg-slate-50"
										onClick={handleClose}
									>
										Cancelar
									</button>
									<button
										className="rounded-xl bg-[#4f46e5] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
										disabled={salvando || sucesso}
										onClick={() => void handleSubmit()}
									>
										{salvando ? "Salvando..." : "Delegar"}
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
