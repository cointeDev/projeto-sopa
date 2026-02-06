import { useState } from "react";
import ModalGestorSolicitacao, {
	AcaoGestor,
} from "../components/modals/ModalGestorSolicitacao";
import type { SolicitarFormData } from "../common/types/solicitacao";

// Dados mockados só para teste enquanto a API não existe
const mockSolicitacao: SolicitarFormData = {
	responsavel: "João da Silva",
	email: "joao@email.com",
	setor: "Comunicação",
	telefone: "(99) 99999-9999",
	local: "Estúdio A",
	localExterno: "",
	data: "2026-03-10",
	hora: "14:00",

	tipo: "Evento em estúdio",
	formato: "Podcast / Mesacast",

	nomeProjeto: "Podcast Institucional",
	titulo: "Episódio Piloto",
	descricao:
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
	thumbnail: null,
	acessibilidade: ["Não se aplica"],
	distribuicao: "interna",

	dataLimite: "2026-03-20",
	pessoas: "4",
	roteiro: null,
	observacoes:
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
};

export default function Modal() {
	const [open, setOpen] = useState(false);

	function handleAction(acao: AcaoGestor) {
		console.log("Ação do gestor:", acao);
		setOpen(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<button onClick={() => setOpen(true)}>Abrir solicitação</button>

			<ModalGestorSolicitacao
				open={open}
				onClose={() => setOpen(false)}
				dados={mockSolicitacao}
				onAction={handleAction}
			/>
		</div>
	);
}
