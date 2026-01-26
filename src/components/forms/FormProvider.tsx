import type { ReactNode } from "react";
import { FormContext } from "../../context/FormContext";
import { useForm } from "../../hooks/useForm";

interface FormProviderProps {
	children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps): ReactNode {
	const form = useForm();

	return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}
