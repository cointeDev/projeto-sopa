import type { DevolutivaGestor } from "../../common/types/solicitacao";
import { useCamposCorrecao } from "../../common/maps/camposCorrecao";
import { useFormContext } from "../../context/FormContext";

interface Props {
	devolutiva: DevolutivaGestor;
	onSubmit?: (dados: any) => void;
}

export function FormularioCorrecao({ devolutiva, onSubmit }: Props) {
	const campos = useCamposCorrecao();
	// Pegamos o formData do seu próprio contexto para enviar depois!
	const { formData } = useFormContext();

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault(); // Evita que a página recarregue
		if (onSubmit) {
			// Envia os dados que foram atualizados pelos inputs (updateField)
			onSubmit(formData);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<form
				className="w-full max-w-7xl md:grid-cols-[350px_1fr] gap-10 my-4 space-y-4"
				onSubmit={submitHandler}
			>
				<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
					<p className="text-yellow-700 font-bold text-sm">
						⚠️ Sua solicitação foi devolvida. Olhe os comentários e corrija os
						campos abaixo.
					</p>
					<ul className="list-disc list-inside text-sm text-red-500 font-medium space-y-1 mt-5">
						{devolutiva.campos.map(({ campo, mensagem }) => {
							const config = campos[campo as keyof typeof campos];
							if (!config) return null;

							return (
								<li key={campo}>
									<strong>{config.label}:</strong> {mensagem}
								</li>
							);
						})}
					</ul>
				</div>

				{/* Renderização dinâmica dos inputs */}
				{devolutiva.campos.map(({ campo }) => {
					const config = campos[campo as keyof typeof campos];
					if (!config) return null;

					return (
						<div key={campo} className="mt-4">
							<h2 className="text-lg pb-2 font-semibold text-slate-800">
								{config.label}
							</h2>
							{config.render()}
						</div>
					);
				})}

				<div className="flex justify-start pt-4">
					<button
						type="submit"
						className="rounded-2xl bg-indigo-600 px-8 py-3 font-black text-xs text-white uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all"
					>
						Reenviar correções
					</button>
				</div>
			</form>
		</div>
	);
}
