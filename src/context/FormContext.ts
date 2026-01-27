import { createContext, useContext } from "react";
import type { SolicitarFormData } from "../common/types/solicitacao";

export interface FormContextType {
	passo: number;
	formData: SolicitarFormData;
	setPassoAtual: (passo: number) => void;
	updateField: <K extends keyof SolicitarFormData>(
		field: K,
		value: SolicitarFormData[K]
	) => void;
	validarPassoAtual: () => boolean;
	resetForm: () => void;
	getMaxPessoasPorFormato: () => number;
}

export const FormContext = createContext<FormContextType | undefined>(
	undefined
);

export function useFormContext(): FormContextType {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContext must be used within FormProvider");
	}
	return context;
}
