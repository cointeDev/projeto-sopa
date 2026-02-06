/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import { criarSolicitacao } from "../../services/solicitacoes";

export default function Step5() {
	const { formData, setPassoAtual } = useFormContext();

	async function handleConfirmar() {
		try {
			const payload = {
				responsavel: formData.responsavel,
				email: formData.email,
				setor: formData.setor,
				telefone: formData.telefone,

				local: formData.local,

				data: formData.data,
				hora: formData.hora,

				TipoProducao: formData.tipo,
				FormatoProducao: formData.formato,

				nomeProjeto: formData.nomeProjeto,
				titulo: formData.titulo,
				descricao: formData.descricao,

				thumbnail: formData.thumbnail?.name,

				acessibilidade: formData.acessibilidade[0],

				distribuicao: formData.distribuicao,

				dataLimite: formData.dataLimite,
				pessoas: formData.pessoas,

				roteiro: formData.roteiro?.name,
				observacoes: formData.observacoes,
			};

			await criarSolicitacao(payload);

			setPassoAtual(6);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Erro ao enviar solicitação:", error);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			console.error("Resposta da API:", error.response);

			alert(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				error.response?.data?.message ||
					"Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente."
			);
		}
	}

	return (
		<>
			<h3 className="text-2xl font-extrabold text-white mb-6">
				Revisar informações
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#B4B9C7] bg-[#0F111A] p-6 rounded-2xl border border-white/5">
				{/* Coluna 1: Identificação */}
				<div className="space-y-3">
					<h4 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest border-b border-white/10 pb-2">
						Identificação
					</h4>
					<p>
						<strong>Projeto:</strong> {formData.nomeProjeto || "Não informado"}
					</p>
					<p>
						<strong>Título:</strong> {formData.titulo || "Não informado"}
					</p>
					<p>
						<strong>Solicitante:</strong>{" "}
						{formData.responsavel || "Não informado"}
					</p>
					<p>
						<strong>Setor:</strong> {formData.setor || "Não informado"}
					</p>
				</div>

				{/* Coluna 2: Produção e Prazos */}
				<div className="space-y-3">
					<h4 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest border-b border-white/10 pb-2">
						Produção e Prazos
					</h4>
					<p>
						<strong>Distribuição:</strong>{" "}
						{formData.distribuicao || "Não informado"}
					</p>
					<p>
						<strong>Entrega:</strong>{" "}
						{formData.dataLimite
							? new Date(formData.dataLimite).toLocaleDateString("pt-BR")
							: "Não informado"}
					</p>
					<p>
						<strong>Pessoas em cena:</strong> {formData.pessoas || "0"}
					</p>
					<p>
						<strong>Acessibilidade:</strong>{" "}
						{formData.acessibilidade?.join(", ") || "Nenhuma"}
					</p>
				</div>

				{/* Bloco de Descrição (Largura Total) */}
				<div className="md:col-span-2 space-y-2 pt-4">
					<h4 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest border-b border-white/10 pb-2">
						Descrição e Observações
					</h4>
					<p className="text-sm italic leading-relaxed">
						{formData.descricao || "Sem descrição informada."}
					</p>
					{formData.observacoes && (
						<p className="text-sm mt-2">
							<span className="text-white font-bold">Obs:</span>{" "}
							{formData.observacoes}
						</p>
					)}
				</div>

				{/* Arquivos anexados */}
				<div className="md:col-span-2 flex gap-4 pt-2">
					{formData.thumbnail && (
						<div className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
							✓ Capa anexada
						</div>
					)}
					{formData.roteiro && (
						<div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
							✓ Roteiro anexado
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-10">
				<button
					className="btn-secundario"
					type="button"
					onClick={() => {
						setPassoAtual(4);
					}}
				>
					← Ajustar
				</button>
				<button
					className="btn-primario"
					type="button"
					onClick={handleConfirmar}
				>
					Confirmar e Gerar Card
				</button>
			</div>
			<Footer />
		</>
	);
}
