import { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { X, GitBranch, CheckCircle } from "lucide-react";
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
			<Dialog as="div" className="relative z-200" onClose={handleClose}>
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
							<DialogPanel className="w-full max-w-md rounded-4xl bg-white p-10 shadow-xl shadow-slate-200/50">
								{/* Header */}
								<div className="flex items-start justify-between mb-8">
									<div className="space-y-1">
										<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
											Ação do Gestor
										</p>
										<DialogTitle className="text-3xl font-black text-[#334155] uppercase tracking-tight flex items-center gap-3">
											<GitBranch size={22} className="text-indigo-500" />
											Delegar Etapa
										</DialogTitle>
									</div>
									<button
										onClick={handleClose}
										className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
									>
										<X size={16} />
									</button>
								</div>

								<div className="flex flex-col gap-5">
									<div>
										<label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-slate-400">
											Etapa
										</label>
										<select
											className="w-full rounded-3xl border border-slate-100 bg-[#F8FAFC] px-5 py-3.5 text-xs font-bold text-[#334155] outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
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
										<label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-slate-400">
											ID do Operacional
										</label>
										<input
											className="w-full rounded-3xl border border-slate-100 bg-[#F8FAFC] px-5 py-3.5 text-xs font-bold text-[#334155] outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
											min={1}
											placeholder="Ex: 3"
											type="number"
											value={operacionalId}
											onChange={(e) => setOperacionalId(e.target.value)}
										/>
										<p className="mt-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
											Informe o ID do usuário com role operacional
										</p>
									</div>

									{erro && (
										<div className="rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-xs font-bold text-red-600">
											{erro}
										</div>
									)}

									{sucesso && (
										<div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-xs font-bold text-emerald-600 flex items-center gap-2">
											<CheckCircle size={14} />
											Etapa delegada com sucesso!
										</div>
									)}
								</div>

								<div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
									<button
										className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-500 text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
										onClick={handleClose}
									>
										Cancelar
									</button>
									<button
										className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-wider hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
										disabled={salvando || sucesso}
										onClick={() => void handleSubmit()}
									>
										{salvando ? "Salvando..." : "Delegar"}
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
