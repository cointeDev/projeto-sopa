import { FormularioCorrecao } from "../components/correcao/FormularioCorrecao";

import type { DevolutivaGestor } from "../common/types/solicitacao";

export function Devolutiva() {
	const devolutivaMock: DevolutivaGestor = {
		status: "devolvido",
		campos: [
			{
				campo: "telefone",
				mensagem: "Telefone inválido",
			},
			{
				campo: "nomeProjeto",
				mensagem: "Nome muito genérico",
			},
		],
	};

	return <FormularioCorrecao devolutiva={devolutivaMock} />;
}
