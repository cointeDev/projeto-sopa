import { useEffect, useState } from "react";
import type { SolicitarFormData } from "../common/types/solicitacao";
import { initialData } from "../components/forms/FormData";
import { solicitarFormSchema } from "../common/utils/schemas";
import { toast } from "sonner";
import { FORMATOS_POR_TIPO } from "../common/rules/formatosPorTipo";

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
	getMaxPessoasPorFormato: () => number;
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
				//local: true,
				//localExterno: true,
				//data: true,
				//hora: true,
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
			.pick({ TipoProducao: true, FormatoProducao: true })
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		if (!data.TipoProducao || !data.FormatoProducao) {
			toast.error("Selecione o tipo e o formato de produção.");
			return false;
		}

		const formatosValidos = FORMATOS_POR_TIPO[data.TipoProducao] ?? [];

		if (!formatosValidos.includes(data.FormatoProducao)) {
			toast.error("Formato inválido para o tipo de produção selecionado.");
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
				local: true,
				data: true,
				hora: true,
				dataLimite: true,
				pessoas: true,
				roteiro: true,
				observacoes: true,
			})
			.safeParse(data);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			return false;
		}

		//if (!formData.data) return false;
		//if (!formData.hora) return false;
		//if (formData.hora < "09:00" || formData.hora > "17:00") return false;

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

	function getMaxPessoasPorFormato(): number {
		switch (formData.FormatoProducao) {
			case "LIVE_REMOTA":
				return 8;

			case "LIVE_PRESENCIAL_ESTUDIO":
			case "PODCAST_MESACAST":
			case "GRAVACAO_PROGRAMA":
				return 4;

			default:
				return 4;
		}
	}

	return {
		passo,
		formData,
		setPassoAtual,
		updateField,
		validarPassoAtual,
		resetForm,
		getMaxPessoasPorFormato,
	};
}
