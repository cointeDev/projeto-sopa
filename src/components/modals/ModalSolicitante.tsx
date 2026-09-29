import { X, User, Building2, Phone, Mail } from "lucide-react";

interface ModalSolicitanteProps {
	responsavel: string;
	setor: string;
	telefone: string;
	email: string;
	onClose: () => void;
}

export default function ModalSolicitante({
	responsavel,
	setor,
	telefone,
	email,
	onClose,
}: ModalSolicitanteProps) {
	return (
		<div
			className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
				onClick={(event) => event.stopPropagation()}
			>
				{/* Cabeçalho do modal */}
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h2 className="text-lg font-black text-slate-800">
							Dados do solicitante
						</h2>

						<p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
							Informações de contato
						</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
						aria-label="Fechar modal"
					>
						<X size={18} />
					</button>
				</div>

				{/* Informações do solicitante */}
				<div className="space-y-3">
					<div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
						<User size={18} className="mt-0.5 shrink-0 text-indigo-600" />

						<div className="min-w-0">
							<span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
								Responsável
							</span>

							<p className="mt-1 break-words text-sm font-bold text-slate-700">
								{responsavel || "Não informado"}
							</p>
						</div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
						<Building2 size={18} className="mt-0.5 shrink-0 text-indigo-600" />

						<div className="min-w-0">
							<span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
								Setor
							</span>

							<p className="mt-1 break-words text-sm font-bold text-slate-700">
								{setor || "Não informado"}
							</p>
						</div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
						<Phone size={18} className="mt-0.5 shrink-0 text-indigo-600" />

						<div className="min-w-0">
							<span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
								Telefone
							</span>

							<p className="mt-1 break-words text-sm font-bold text-slate-700">
								{telefone || "Não informado"}
							</p>
						</div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
						<Mail size={18} className="mt-0.5 shrink-0 text-indigo-600" />

						<div className="min-w-0">
							<span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">
								E-mail
							</span>

							<p className="mt-1 break-words text-sm font-bold text-slate-700">
								{email || "Não informado"}
							</p>
						</div>
					</div>
				</div>

				{/* Botão de fechar */}
				<button
					type="button"
					onClick={onClose}
					className="mt-6 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-indigo-700"
				>
					Fechar
				</button>
			</div>
		</div>
	);
}
