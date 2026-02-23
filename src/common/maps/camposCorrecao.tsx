import type { ReactNode } from "react";
import type { SolicitarFormData } from "../../common/types/solicitacao";
import { useFormContext } from "../../context/FormContext";

export type CampoCorrecaoConfig = {
	label: string;
	render: () => ReactNode;
};

// Variáveis com as classes do Tailwind para não repetir código
const inputClasses =
	"w-full rounded-2xl bg-slate-50 border border-slate-200 px-6 py-5 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300";

const fileClasses =
	"w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-4 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 file:transition-all";

export function useCamposCorrecao(): Partial<
	Record<keyof SolicitarFormData, CampoCorrecaoConfig>
> {
	const { updateField } = useFormContext();

	return {
		telefone: {
			label: "Telefone do Responsável",
			render: () => (
				<input
					className={inputClasses}
					placeholder="(00) 00000-0000"
					onChange={(e) => updateField("telefone", e.target.value)}
				/>
			),
		},

		nomeProjeto: {
			label: "Nome do Projeto",
			render: () => (
				<input
					className={inputClasses}
					placeholder="Ex: Campanha Institucional 2026"
					onChange={(e) => updateField("nomeProjeto", e.target.value)}
				/>
			),
		},

		roteiro: {
			label: "Anexar novo roteiro",
			render: () => (
				<input
					type="file"
					className={fileClasses}
					accept=".pdf,.doc,.docx"
					onChange={(e) => updateField("roteiro", e.target.files?.[0] ?? null)}
				/>
			),
		},

		thumbnail: {
			label: "Anexar nova thumbnail",
			render: () => (
				<input
					type="file"
					className={fileClasses}
					accept="image/*"
					onChange={(e) =>
						updateField("thumbnail", e.target.files?.[0] ?? null)
					}
				/>
			),
		},

		responsavel: {
			label: "Nome do Responsável",
			render: () => (
				<input
					className={inputClasses}
					placeholder="Nome completo"
					onChange={(e) => updateField("responsavel", e.target.value)}
				/>
			),
		},

		setor: {
			label: "Setor",
			render: () => (
				<input
					className={inputClasses}
					placeholder="Ex: Marketing, TI, RH..."
					onChange={(e) => updateField("setor", e.target.value)}
				/>
			),
		},

		TipoProducao: {
			label: "Tipo de Produção",
			render: () => (
				<select
					className={inputClasses}
					onChange={(e) => updateField("TipoProducao", e.target.value as any)}
				>
					<option value="" className="text-slate-400">
						Selecione uma opção...
					</option>
					<option value="GRAVACAO_CHAMADA">Gravação de Chamada</option>
					<option value="EVENTO_IN_LOCO">Evento In Loco</option>
					{/* ... outras opções ... */}
				</select>
			),
		},
	};
}
