import { useEffect, useState } from "react";
import type { SolicitarFormData } from "../common/types/solicitacao";
import { initialData } from "../components/forms/FormData";

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

	function validarPassoAtual(): boolean {
		if (passo === 1) {
			return (
				!!formData.responsavel &&
				!!formData.setor &&
				!!formData.telefone &&
				!!formData.local &&
				!!formData.data &&
				!!formData.hora
			);
		}

		if (passo === 2) {
			return !!formData.tipo && !!formData.formato;
		}

		if (passo === 3) {
			return !!formData.titulo && !!formData.descricao;
		}

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
