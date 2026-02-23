import type { DevolutivaGestor } from "../../common/types/solicitacao";
import { useCamposCorrecao } from "../../common/maps/camposCorrecao";
import { useFormContext } from "react-hook-form";

interface Props {
	devolutiva: DevolutivaGestor;
	onSubmit?: (dados: any) => void;
}

// min-h-screen bg-linear-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4//
export function FormularioCorrecao({ devolutiva, onSubmit }: Props) {
	const campos = useCamposCorrecao();

	return (
		<div className="min-h-screen bg-linear-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
			<div className="w-full max-w-7xl md:grid-cols-[350px_1fr] gap-10 my-14 space-y-4">
				<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
					<p className="text-yellow-300 text-sm">
						⚠️ Sua solicitação foi devolvida. Olhe os comentários e corrija os
						campos abaixo.
					</p>
					<ul className="list-disc list-inside text-sm text-red-400 space-y-1 mt-5">
						{devolutiva.campos.map(({ campo, mensagem }) => {
							const config = campos[campo];
							if (!config) return null;

							return (
								<li key={campo}>
									<strong>{config.label}:</strong> {mensagem}
								</li>
							);
						})}
					</ul>
				</div>

				{devolutiva.campos.map(({ campo }) => {
					const config = campos[campo];

					if (!config) return null;

					return (
						<div key={campo}>
							<h2 className="text-xg pb-2 font-semibold text-white">
								{config.label}
							</h2>

							{config.render()}
						</div>
					);
				})}

				<div className="flex justify-center pt-8">
					<button
						className="btn-primario px-8 py-3 text-base font-semibold"
						onClick={onSubmit}
					>
						Reenviar correções
					</button>
				</div>
			</div>
		</div>
	);
}
