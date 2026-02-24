/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import {
	buscarSolicitacaoPorToken,
	reenviarSolicitacao,
} from "../services/solicitacoes";
import { FormularioCorrecao } from "../components/correcao/FormularioCorrecao";
import { FormProvider } from "../components/forms/FormProvider";

// O tipo original da sua API sem modificações
type Solicitacao = {
	id: string;
	titulo: string;
	nomeProjeto?: string;
	status: "PENDENTE" | "ACEITO" | "REJEITADA" | "ESTORNO";
	Etapa?: {
		id: number;
		nome: string;
	};
	createdAt: string;
	devolutiva?: {
		campos: Array<{
			campo: string;
			mensagem: string;
		}>;
	};
	motivoRejeicao?: string;
};

const tokenSchema = z
	.string()
	.regex(
		/^SOPA-\d{4}\-\d{2}-[0-9a-fA-F]{8}$/,
		"Formato inválido. Ex: SOPA-2026/02-4c249225"
	);

// Mapeamento dos 5 passos numerados atrelados ao ID das etapas da sua API
const fluxoProducao = [
	{ stepNumber: 1, limitId: 1 }, // Recebido / Standby
	{ stepNumber: 2, limitId: 4 }, // Produção / Ao vivo / Gravado
	{ stepNumber: 3, limitId: 8 }, // Edições
	{ stepNumber: 4, limitId: 11 }, // Libras / Revisão / LSE
	{ stepNumber: 5, limitId: 13 }, // Concluído / Publicado
];

export function TokenStatus() {
	const [token, setToken] = useState("");
	const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null);
	const [loading, setLoading] = useState(false);
	const [erro, setErro] = useState("");

	async function consultarToken() {
		setErro("");
		setSolicitacao(null);

		const validacao = tokenSchema.safeParse(token);

		if (!validacao.success) {
			setErro(validacao.error.errors[0].message);
			return;
		}

		try {
			setLoading(true);
			const data = await buscarSolicitacaoPorToken(token);
			console.log("DEVOLUTIVA:", data.devolutiva);
			console.log("CAMPOS:", data.devolutiva?.campos);
			setSolicitacao(data);
		} catch {
			setErro("Token não encontrado. Verifique e tente novamente.");
		} finally {
			setLoading(false);
		}
	}

	function traduzirStatus(status: string) {
		switch (status) {
			case "PENDENTE":
				return "Pendente";
			case "ACEITO":
				return "Em Andamento";
			case "REJEITADA":
				return "Rejeitada";
			case "ESTORNO":
				return "Devolvida";
			default:
				return status;
		}
	}

	// Lógica para calcular o progresso da barra visual
	const etapaAtualId = solicitacao?.Etapa?.id ?? 0;
	const indexAtual = fluxoProducao.reduce((acc, step, index) => {
		return etapaAtualId >= step.limitId ? index : acc;
	}, -1);
	const porcentagemProgresso = Math.max(
		0,
		(indexAtual / (fluxoProducao.length - 1)) * 100
	);

	// --- GERAÇÃO DINÂMICA DA TIMELINE BASEADA NA SUA API REAL ---
	// --- GERAÇÃO DINÂMICA DA TIMELINE ---
	function gerarTimeline(dados: Solicitacao) {
		const eventos = [];

		// 1. Fluxo de Produção (Se estiver ACEITO e tiver uma Etapa)
		if (dados.status === "ACEITO" && dados.Etapa) {
			// A. Etapa Atual (Entra no topo, em destaque)
			eventos.push({
				id: `etapa-atual`,
				titulo: dados.Etapa.nome,
				data: "Em andamento",
				descricao: "A produção encontra-se atualmente nesta etapa.",
				status: "atual", // Usaremos isso para pintar a bolinha de azul
			});

			// B. Lista de todas as etapas possíveis da sua API
			const TODAS_ETAPAS = [
				{ id: 1, nome: "STANDBY" },
				{ id: 2, nome: "PARA PRODUÇÃO SEMANAL" },
				{ id: 3, nome: "AO VIVO" },
				{ id: 4, nome: "GRAVADO" },
				{ id: 5, nome: "EDIÇÃO 1" },
				{ id: 6, nome: "EDIÇÃO 2" },
				{ id: 7, nome: "EDIÇÃO 3" },
				{ id: 8, nome: "EDIÇÃO FINAL" },
				{ id: 9, nome: "LIBRAS" },
				{ id: 10, nome: "REVISÃO LP" },
				{ id: 11, nome: "PRODUÇÃO LSE" },
				{ id: 12, nome: "CONCLUÍDO" },
				{ id: 13, nome: "PUBLICADO" },
			];

			// C. Filtra apenas as etapas que ficaram para trás (ID menor que o atual)
			// Usamos o .reverse() para a mais recente ficar em cima
			const etapasConcluidas = TODAS_ETAPAS.filter(
				(etapa) => etapa.id < dados.Etapa!.id
			).reverse();

			// Adiciona as etapas anteriores como concluídas
			etapasConcluidas.forEach((etapa) => {
				// Dica: Se quiser pular etapas exclusivas (ex: se é Gravado, não mostrar Ao Vivo),
				// você pode fazer um if aqui dentro depois!
				eventos.push({
					id: `etapa-${etapa.id}`,
					titulo: etapa.nome,
					data: "Concluído",
					descricao: "Etapa finalizada com sucesso.",
					status: "concluido", // Bolinha verde
				});
			});

			// D. Evento de quando o pedido foi oficialmente Aceito
			eventos.push({
				id: "accepted",
				titulo: "Solicitação Aceita",
				data: "Aprovado",
				descricao:
					"O pedido passou pela avaliação e entrou no fluxo de produção.",
				status: "concluido",
			});
		}
		// 2. Fluxos Alternativos (Rejeitada, Estorno, Pendente)
		else if (dados.status === "REJEITADA") {
			eventos.push({
				id: "rejected",
				titulo: "Solicitação Rejeitada",
				data: "Encerrado",
				descricao: "O pedido foi analisado e não pôde seguir para produção.",
				status: "erro", // Bolinha vermelha
			});
		} else if (dados.status === "ESTORNO") {
			eventos.push({
				id: "returned",
				titulo: "Devolvida para Correção",
				data: "Ação Necessária",
				descricao: "Verifique os apontamentos da equipe, corrija e reenvie.",
				status: "erro",
			});
		} else if (dados.status === "PENDENTE") {
			eventos.push({
				id: "pending",
				titulo: "Aguardando Avaliação",
				data: "Em Análise",
				descricao:
					"A equipe está analisando os dados antes de iniciar a produção.",
				status: "atual",
			});
		}

		// 3. Evento Base de Criação (Fica sempre na base, lá embaixo)
		eventos.push({
			id: "created",
			titulo: "Solicitação Recebida",
			data: new Date(dados.createdAt).toLocaleDateString("pt-BR"),
			descricao: "O pedido foi registrado no sistema.",
			status: "concluido",
		});

		return eventos;
	}

	async function reenviarCorrecoes(dadosCorrigidos: any) {
		if (!solicitacao || !solicitacao.devolutiva) return;

		// 1. Pegamos a lista de campos que o gestor pediu para corrigir
		const camposDevolvidos = solicitacao.devolutiva.campos.map((c) => c.campo);

		// 2. Criamos um objeto vazio para colocar apenas o que importa
		const dadosFiltrados: Record<string, any> = {};

		// 3. Preenchemos o objeto apenas com os campos devolvidos
		camposDevolvidos.forEach((campo) => {
			// Verifica se o campo existe no formData antes de adicionar
			if (dadosCorrigidos[campo] !== undefined) {
				dadosFiltrados[campo] = dadosCorrigidos[campo];
			}
		});

		try {
			// 4. Enviamos APENAS os dados filtrados para a API!
			// Agora o back-end não vai mais reclamar de e-mail vazio ou dados inválidos
			await reenviarSolicitacao(solicitacao.id, dadosFiltrados);

			const atualizado = await buscarSolicitacaoPorToken(token);
			setSolicitacao(atualizado);

			alert("Correções enviadas com sucesso!");
		} catch (error) {
			console.error(error);
			alert("Erro ao reenviar solicitação. Verifique os dados.");
		}
	}

	return (
		<div className="min-h-screen bg-[#F1F5F9] font-inter px-6 py-10">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
				{/* PAINEL TOKEN */}
				<aside className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 self-start sticky top-10">
					<h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter uppercase">
						Consultar Pedido
					</h2>
					<p className="text-sm font-medium text-slate-400 mb-8">
						Acompanhe o fluxo de produção em tempo real.
					</p>

					<form
						className="space-y-5"
						onSubmit={(e) => {
							e.preventDefault();
							consultarToken();
						}}
					>
						<div className="space-y-2">
							<label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
								Token de Acesso
							</label>
							<input
								className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-6 py-5 text-slate-800 font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
								placeholder="SOPA-2026-02-xxxxxxxx"
								value={token}
								onChange={(e) => setToken(e.target.value)}
							/>
						</div>

						<button
							className="w-full rounded-2xl bg-indigo-600 py-5 font-black text-xs text-white uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
							disabled={loading}
							type="submit"
						>
							{loading ? "Processando..." : "Consultar Status"}
						</button>
					</form>

					{erro && (
						<p className="mt-6 text-xs font-bold text-red-500 uppercase tracking-widest text-center italic">
							{erro}
						</p>
					)}

					<div className=" pt-6 border-t border-slate-50 text-center">
						<Link
							className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400"
							to="/"
						>
							← Voltar para a Home
						</Link>
					</div>
				</aside>

				{/* PAINEL STATUS */}
				<section className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden min-h-[600px] flex flex-col">
					{loading && (
						<div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20">
							<div className="h-12 w-12 rounded-2xl border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-4" />
							<p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
								Sincronizando Dados...
							</p>
						</div>
					)}

					{!solicitacao && !loading && (
						<div className="h-full flex flex-col items-center justify-center text-center flex-1">
							<p className="text-xl font-black text-slate-300 uppercase tracking-tighter">
								Nenhum pedido ativo
							</p>
							<p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">
								Insira um token válido ao lado
							</p>
						</div>
					)}

					{solicitacao && !loading && (
						<div className="animate-in fade-in slide-in-from-right-8 duration-700 flex-1">
							{/* CABEÇALHO DO PROJETO */}
							<header className="mb-10 flex flex-col items-start gap-4">
								<div>
									<h3 className="text-4xl font-black text-slate-800 tracking-tighter uppercase leading-none">
										{solicitacao.titulo}
									</h3>
									<p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.3em]">
										Projeto: {solicitacao.nomeProjeto ?? "Não informado"}
									</p>
									<p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-widest">
										Protocolo: {solicitacao.id}
									</p>
								</div>

								{/* Badge de Status estático baseado no design mais recente */}
								<span
									className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest border
                  ${solicitacao.status === "ACEITO" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
                  ${solicitacao.status === "PENDENTE" ? "bg-slate-100 text-slate-600 border-slate-200" : ""}
                  ${solicitacao.status === "REJEITADA" || solicitacao.status === "ESTORNO" ? "bg-red-50 text-red-600 border-red-100" : ""}
                `}
								>
									{traduzirStatus(solicitacao.status)}
								</span>
							</header>

							<div className="mt-12 w-full max-w-2xl">
								{/* O STEPPER APARECE APENAS SE ESTIVER ACEITO (EM PRODUÇÃO) */}
								{/* {solicitacao.status === "ACEITO" && (
									<div className="relative flex items-center justify-between w-full mb-16 px-2">
										<div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 -z-10"></div>

										<div
											className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-indigo-500 -z-10 transition-all duration-700 ease-in-out"
											style={{ width: `${porcentagemProgresso}%` }}
										></div>

										{fluxoProducao.map((step, index) => {
											const isActive = index <= indexAtual;
											return (
												<div
													key={step.stepNumber}
													className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors duration-500 shadow-sm
                            ${
															isActive
																? "bg-indigo-500 text-white border-2 border-indigo-500"
																: "bg-[#F8FAFC] text-slate-400 border-2 border-slate-200"
														}`}
												>
													{step.stepNumber}
												</div>
											);
										})}
									</div>
								)} */}

								{/* TIMELINE DE HISTÓRICO GERADA COM OS DADOS DA SUA API */}
								<div className="mt-14">
									<h4 className="text-xl font-bold text-slate-800 mb-8 tracking-tight">
										Histórico de atividades
									</h4>
									<div className="relative border-l-2 border-slate-200 ml-[9px] space-y-8 pb-4">
										{gerarTimeline(solicitacao).map((item) => (
											<div key={item.id} className="relative pl-6">
												{/* BOLINHA COLORIDA DINÂMICA */}
												<div
													className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white
                ${item.status === "atual" ? "bg-indigo-600" : ""}
                ${item.status === "concluido" ? "bg-emerald-500" : ""}
                ${item.status === "erro" ? "bg-red-500" : ""}
            `}
												></div>

												<p className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
													{item.titulo}
													<span className="font-normal text-slate-300">—</span>

													{/* TEXTO DA DATA COLORIDO DINAMICAMENTE */}
													<span
														className={`font-black text-[10px] uppercase tracking-widest
                    ${item.status === "atual" ? "text-indigo-600" : ""}
                    ${item.status === "concluido" ? "text-emerald-600" : ""}
                    ${item.status === "erro" ? "text-red-600" : ""}
                `}
													>
														{item.data}
													</span>
												</p>
												<p className="text-sm text-slate-500 leading-relaxed">
													{item.descricao}
												</p>
											</div>
										))}
									</div>
								</div>

								{/* TELA DE REJEIÇÃO (APENAS SE ESTIVER REJEITADA) */}
								{solicitacao.status === "REJEITADA" && (
									<div className="mt-8 bg-red-50/50 border border-red-200 rounded-3xl p-8 shadow-sm">
										<div className="flex items-center gap-3 mb-4">
											<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg">
												✕
											</div>
											<h4 className="text-xl font-black text-red-700 tracking-tight uppercase">
												Pedido Rejeitado
											</h4>
										</div>

										<p className="text-sm text-red-600/80 mb-6 font-medium">
											Infelizmente, a sua solicitação não pôde ser continuada.
											Confira abaixo a justificativa da equipe:
										</p>

										<div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm relative overflow-hidden">
											<div className="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
											<p className="text-sm font-medium text-slate-700 leading-relaxed pl-2">
												{/* Mostra o motivo da API ou uma mensagem padrão se vier vazio */}
												{solicitacao.motivoRejeicao ||
													"Nenhum motivo específico foi detalhado no sistema. Por favor, entre em contato diretamente com a coordenação para mais informações."}
											</p>
										</div>
									</div>
								)}

								{/* FORMULÁRIO DE CORREÇÃO (APENAS SE ESTIVER ESTORNADO) */}
								{solicitacao.status === "ESTORNO" &&
									solicitacao.devolutiva &&
									solicitacao.devolutiva.campos.length > 0 && (
										<div className="mt-8">
											<FormProvider>
												<FormularioCorrecao
													devolutiva={{
														status: "Devolvido",
														campos: solicitacao.devolutiva.campos as any,
													}}
													onSubmit={(dadosCorrigidos) =>
														reenviarCorrecoes(dadosCorrigidos)
													}
												/>
											</FormProvider>
										</div>
									)}
							</div>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
