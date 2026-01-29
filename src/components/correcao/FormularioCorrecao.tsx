import type { DevolutivaGestor } from "../../common/types/solicitacao";
import { useCamposCorrecao } from "../../common/maps/camposCorrecao";

interface Props {
	devolutiva: DevolutivaGestor;
	onSubmit?: () => void;
}

export function FormularioCorrecao({ devolutiva, onSubmit }: Props) {
	const campos = useCamposCorrecao();

	return (
		<div className="max-w-3xl mx-auto space-y-6">
			<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
				<p className="text-yellow-300 text-sm">
					⚠️ Sua solicitação foi devolvida. Corrija os campos abaixo.
				</p>
			</div>

			{devolutiva.campos.map(({ campo, mensagem }) => {
				const config = campos[campo];

				if (!config) return null;

				return (
					<div key={campo}>
						<h2 className="text-xg pb-2 font-semibold text-white">
							{config.label}
						</h2>

						{config.render()}

						<p className="mt-2 text-sm text-red-400">{mensagem}</p>
					</div>
				);
			})}

			<button className="btn-primario" onClick={onSubmit}>
				Reenviar correções
			</button>
		</div>
	);
}
