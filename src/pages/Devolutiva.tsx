import { FormularioCorrecao } from "../components/correcao/FormularioCorrecao";

import { FormProvider } from "../components/forms/FormProvider";

import type { DevolutivaGestor } from "../common/types/solicitacao";

export function Devolutiva() {
	const devolutivaMock: DevolutivaGestor = {
		status: "Devolvido",
		campos: [
			{
				campo: "telefone",
				mensagem: "Telefone inválido",
			},
			{
				campo: "nomeProjeto",
				mensagem: "Nome muito genérico",
			},
			{
				campo: "roteiro",
				mensagem: "Roteiro pouco detalhado",
			},
			{
				campo: "thumbnail",
				mensagem: "Thumbnail improprio",
			},
		],
	};

	return (
		<FormProvider>
			<FormularioCorrecao devolutiva={devolutivaMock} />
		</FormProvider>
	);
}
