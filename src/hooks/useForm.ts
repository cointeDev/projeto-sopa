import { useEffect, useState } from "react";
import type { SolicitarFormData } from "../common/types/solicitacao";
import { initialData } from "../components/forms/FormData";
import { solicitarFormSchema } from "../common/utils/schemas";
import { toast } from "sonner";

export interface UseFormReturn {
	passo: number;
	formData: SolicitarFormData;
	setPassoAtual: (novoPasso: number) => void;
	updateField: <K extends keyof SolicitarFormData>(
		field: K,
		value: SolicitarFormData[K]
	) => void;
	validarPassoAtual: () => boolean;
	resetForm: () => void;
}

export function useForm(): UseFormReturn {
	const [passo, setPasso] = useState<number>(() => {
		const savedPasso = Number(localStorage.getItem("passo")) || 1;
		if (savedPasso === 6) {
			localStorage.removeItem("formData");
			localStorage.removeItem("passo");
			return 1;
		}
		return savedPasso;
	});

	const [formData, setFormData] = useState<SolicitarFormData>(() => {
		const saved = localStorage.getItem("formData");
		return saved ? (JSON.parse(saved) as SolicitarFormData) : initialData;
	});

	useEffect(() => {
		localStorage.setItem("formData", JSON.stringify(formData));
		localStorage.setItem("passo", passo.toString());
	}, [formData, passo]);

	function setPassoAtual(novoPasso: number): void {
		setPasso(novoPasso);
	}

	function updateField<K extends keyof SolicitarFormData>(
		field: K,
		value: SolicitarFormData[K]
	): void {
		setFormData((previous) => ({ ...previous, [field]: value }));
	}

	function validarStep1(data: SolicitarFormData): boolean {
		const result = solicitarFormSchema
			.pick({
				responsavel: true,
				email: true,
				setor: true,
				telefone: true,
				local: true,
				localExterno: true,
				data: true,
				hora: true,
			})
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		return true;
	}

	function validarStep2(data: SolicitarFormData): boolean {
		const result = solicitarFormSchema
			.pick({ tipo: true, formato: true })
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		return true;
	}

	function validarStep3(data: SolicitarFormData): boolean {
		const result = solicitarFormSchema
			.pick({
				nomeProjeto: true,
				titulo: true,
				descricao: true,
				thumbnail: true,
				acessibilidade: true,
				distribuicao: true,
			})
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		return true;
	}

	function validarStep4(data: SolicitarFormData): boolean {
		const result = solicitarFormSchema
			.pick({
				dataLimite: true,
				pessoas: true,
			})
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		return true;
	}

	function validarPassoAtual(): boolean {
		if (passo === 1) return validarStep1(formData);
		if (passo === 2) return validarStep2(formData);
		if (passo === 3) return validarStep3(formData);
		if (passo === 4) return validarStep4(formData);
		return true;
	}

	function resetForm(): void {
		setFormData(initialData);
		setPasso(1);
		localStorage.removeItem("formData");
		localStorage.removeItem("passo");
	}

	return {
		passo,
		formData,
		setPassoAtual,
		updateField,
		validarPassoAtual,
		resetForm,
	};
}
