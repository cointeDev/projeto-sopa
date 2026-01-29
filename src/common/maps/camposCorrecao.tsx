import { ReactNode } from "react";
import type { SolicitarFormData } from "../../common/types/solicitacao";
import { useFormContext } from "../../context/FormContext";

export type CampoCorrecaoConfig = {
	label: string;
	render: () => ReactNode;
};

export function useCamposCorrecao(): Partial<
	Record<keyof SolicitarFormData, CampoCorrecaoConfig>
> {
	const { formData, updateField } = useFormContext();

	return {
		telefone: {
			label: "Telefone do Responsável",
			render: () => (
				<input
					className="input"
					value={formData.telefone}
					onChange={(e) => updateField("telefone", e.target.value)}
				/>
			),
		},

		nomeProjeto: {
			label: "Nome do Projeto",
			render: () => (
				<input
					className="input"
					value={formData.nomeProjeto}
					onChange={(e) => updateField("nomeProjeto", e.target.value)}
				/>
			),
		},

		// ⚠️ adicione outros campos conforme necessário
	};
}
