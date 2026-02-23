import type { ReactNode } from "react";
import type { SolicitarFormData } from "../../common/types/solicitacao";
import { useFormContext } from "../../context/FormContext";

export type CampoCorrecaoConfig = {
	label: string;
	render: () => ReactNode;
};

export function useCamposCorrecao(): Partial<
	Record<keyof SolicitarFormData, CampoCorrecaoConfig>
> {
	const { updateField } = useFormContext();

	return {
		telefone: {
			label: "Telefone do Responsável",
			render: () => (
				<input
					className="input"
					onChange={(e) => updateField("telefone", e.target.value)}
				/>
			),
		},

		nomeProjeto: {
			label: "Nome do Projeto",
			render: () => (
				<input
					className="input"
					onChange={(e) => updateField("nomeProjeto", e.target.value)}
				/>
			),
		},

		roteiro: {
			label: "Anexar novo roteiro",
			render: () => (
				<input
					type="file"
					className="input"
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
					className="input"
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
					className="input"
					onChange={(e) => updateField("responsavel", e.target.value)}
				/>
			),
		},

		setor: {
			label: "Setor",
			render: () => (
				<input
					className="input"
					onChange={(e) => updateField("setor", e.target.value)}
				/>
			),
		},

		TipoProducao: {
			label: "Tipo de Produção",
			render: () => (
				<select
					className="input"
					onChange={(e) => updateField("TipoProducao", e.target.value as any)}
				>
					<option value="">Selecione...</option>
					<option value="GRAVACAO_CHAMADA">Gravação de Chamada</option>
					<option value="EVENTO_IN_LOCO">Evento In Loco</option>
					{/* ... outras opções ... */}
				</select>
			),
		},
	};
}
