import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CAMPOS_DEVOLUCAO } from "../../common/maps/camposDevolucaoGestor";
import type { CampoComErro } from "../../common/types/solicitacao";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (campos: CampoComErro[]) => void;
}

export default function ModalDevolucaoGestor({
	open,
	onClose,
	onSubmit,
}: Props) {
	const [selecionados, setSelecionados] = useState<Record<string, string>>({});

	function toggleCampo(campo: string) {
		setSelecionados((prev) => {
			const novo = { ...prev };
			if (novo[campo]) delete novo[campo];
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
			<div className="fixed inset-0 bg-black/40" />

			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="bg-white w-full max-w-3xl rounded-2xl p-8 space-y-6">
					<Dialog.Title className="text-2xl font-bold">
						Devolver solicitação
					</Dialog.Title>

					<p className="text-slate-500">
						Selecione os campos que precisam de correção e escreva o motivo.
					</p>

					<div className="space-y-4 max-h-[400px] overflow-y-auto">
						{Object.entries(CAMPOS_DEVOLUCAO).map(([campo, config]) => (
							<div key={campo} className="border rounded-lg p-4">
								<label className="flex gap-2 font-semibold">
									<input
										type="checkbox"
										onChange={() => toggleCampo(campo)}
										checked={campo in selecionados}
									/>
									{config.label}
								</label>

								{campo in selecionados && (
									<textarea
										className="mt-3 w-full border rounded-lg p-2"
										placeholder="Descreva o problema..."
										onChange={(e) => atualizarMensagem(campo, e.target.value)}
									/>
								)}
							</div>
						))}
					</div>

					<div className="flex justify-end gap-3">
						<button onClick={onClose} className="px-4 py-2">
							Cancelar
						</button>

						<button
							onClick={enviar}
							className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
						>
							Enviar devolutiva
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
}
