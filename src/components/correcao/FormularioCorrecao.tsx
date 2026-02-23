import type { DevolutivaGestor } from "../../common/types/solicitacao";
import { useCamposCorrecao } from "../../common/maps/camposCorrecao";
import { useFormContext } from "../../context/FormContext";

interface Props {
	devolutiva: DevolutivaGestor;
	onSubmit?: (dados: any) => void;
}

export function FormularioCorrecao({ devolutiva, onSubmit }: Props) {
	const campos = useCamposCorrecao();
	const { formData } = useFormContext();

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(formData);
		}
	};

	return (
		<div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Linha separadora do cabeçalho */}
			<div className="mt-8 pt-8 border-t border-slate-100">
				<h4 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">
					Correções Solicitadas
				</h4>

				<form className="space-y-8" onSubmit={submitHandler}>
					{/* CAIXA DE AVISO (Estilo combinando com o TokenStatus) */}
					<div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8">
						<h5 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
							<span className="text-base">⚠️</span> Motivo da Devolução
						</h5>

						<ul className="space-y-4">
							{devolutiva.campos.map(({ campo, mensagem }) => {
								const config = campos[campo as keyof typeof campos];
								if (!config) return null;

								return (
									<li key={campo} className="flex flex-col gap-1">
										<span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
											{config.label}
										</span>
										<span className="text-sm font-medium text-slate-700">
											{mensagem}
										</span>
									</li>
								);
							})}
						</ul>
					</div>

					{/* CAMPOS PARA CORREÇÃO */}
					<div className="space-y-6">
						{devolutiva.campos.map(({ campo }) => {
							const config = campos[campo as keyof typeof campos];
							if (!config) return null;

							return (
								<div key={campo} className="space-y-2">
									<label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1 block">
										Novo valor para: {config.label}
									</label>

									{/* A renderização do input com o estilo novo */}
									<div className="w-full">{config.render()}</div>
								</div>
							);
						})}
					</div>

					{/* BOTÃO (Exatamente igual ao botão de Consultar Token) */}
					<div className="pt-4">
						<button
							type="submit"
							className="w-full rounded-2xl bg-indigo-600 py-5 font-black text-xs text-white uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
						>
							Reenviar Correções
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
