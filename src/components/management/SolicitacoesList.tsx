import type { SolicitacaoAPI } from "../../common/types/solicitacao";

interface Props {
	solicitacoes: SolicitacaoAPI[];
	onSelect: (dados: SolicitacaoAPI) => void;
}

export function SolicitacoesList({ solicitacoes, onSelect }: Props) {
	if (!solicitacoes.length) {
		return (
			<div className="p-8 text-slate-400">Nenhuma solicitação encontrada.</div>
		);
	}

	return (
		<div className="p-8 grid gap-4">
			{solicitacoes.map((s, index) => (
				<div
					key={index}
					className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md transition"
					onClick={() => onSelect(s)}
				>
					<p className="font-semibold">{s.nomeProjeto}</p>
					<p className="text-sm text-slate-500">{s.titulo}</p>
					<p className="text-sm text-slate-400">Responsável: {s.responsavel}</p>
					<p className="text-sm text-slate-400">
						Data: {s.data} às {s.hora}
					</p>
				</div>
			))}
		</div>
	);
}
