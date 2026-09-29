/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from "react";
import axios from "axios";
import { addDays, parseISO, getDay } from "date-fns";
import {
	Local,
	OPCOES_LOCAL,
	LOCAL_LABELS,
} from "../../common/types/solicitacao";
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import { DatePicker } from "../forms/DatePicker";

const HORARIOS_DISPONIVEIS = [
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
];

const timeToMinutes = (timeStr: string): number => {
	if (!timeStr || !timeStr.includes(":")) return 0;
	const [hours = 0, minutes = 0] = timeStr.split(":").map(Number);
	return hours * 60 + minutes;
};

export default function Step4() {
	const {
		setPassoAtual,
		validarPassoAtual,
		updateField,
		getMaxPessoasPorFormato,
		formData,
	} = useFormContext();

	const [, setLocalValue] = useState(formData.local);
	const maxPessoas = getMaxPessoasPorFormato();
	const [eventos, setEventos] = useState<any[]>([]);
	const [solicitacoesAtivas, setSolicitacoesAtivas] = useState<any[]>([]);

	// Busca agenda e solicitações pendentes/aceitas
	useEffect(() => {
		const carregarDados = async () => {
			try {
				const [resAgenda, resSolicitacoes] = await Promise.all([
					axios.get("http://localhost:3000/agenda-eventos"),
					axios.get("http://localhost:3000/solicitacoes"),
				]);

				setEventos(resAgenda.data);

				// Filtra apenas solicitações PENDENTE ou ACEITO
				const ativas = resSolicitacoes.data.filter(
					(s: any) => s.status === "PENDENTE" || s.status === "ACEITO"
				);
				setSolicitacoesAtivas(ativas);
			} catch (error) {
				console.error("Erro ao carregar agenda e solicitações:", error);
			}
		};

		void carregarDados();
	}, []);

	// Verifica se um horário está ocupado por Evento ou por Solicitação
	const isHorarioOcupado = (horarioSlot: string): boolean => {
		if (!formData.data) return false;

		const DURACAO_SOLICITACAO = 60; // Solicitação ocupa 60 minutos
		const slotInicio = timeToMinutes(horarioSlot);
		const slotFim = slotInicio + DURACAO_SOLICITACAO;

		const dataSelecionadaObj = new Date(`${formData.data}T00:00:00`);
		const diaSemana = getDay(dataSelecionadaObj);

		// 1. Bloqueio por Eventos da Agenda
		const ocupadoNaAgenda = eventos.some((item) => {
			let aplicaNaData = false;

			if (item.tipo === "unico" && item.dataInicio === formData.data) {
				aplicaNaData = true;
			}

			if (item.tipo === "frequente" && item.dataInicio && item.dataFim) {
				const dentroDoPeriodo =
					formData.data >= item.dataInicio && formData.data <= item.dataFim;
				const noDiaDaSemana = item.diasSemana?.includes(diaSemana);
				aplicaNaData = dentroDoPeriodo && noDiaDaSemana;
			}

			if (!aplicaNaData) return false;

			const eventoInicio = timeToMinutes(item.horaInicio);
			const eventoFim = timeToMinutes(item.horaFim);

			return slotInicio < eventoFim && slotFim > eventoInicio;
		});

		if (ocupadoNaAgenda) return true;

		// 2. Bloqueio por Solicitações (PENDENTE ou ACEITO)
		const ocupadoPorSolicitacao = solicitacoesAtivas.some((sol) => {
			if (sol.data !== formData.data) return false;

			const solInicio = timeToMinutes(sol.hora);
			const solFim = solInicio + DURACAO_SOLICITACAO;

			return slotInicio < solFim && slotFim > solInicio;
		});

		return ocupadoPorSolicitacao;
	};

	useEffect(() => {
		if (formData.hora && isHorarioOcupado(formData.hora)) {
			updateField("hora", "");
		}
	}, [formData.data]);

	const dataMinimaEntrega = formData.data
		? addDays(parseISO(formData.data), 14)
		: undefined;

	return (
		<div className="font-inter text-left">
			<h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
				Prazos e roteiro
			</h3>

			<div className="space-y-8">
				{/* Local de Gravação */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Local de Gravação
					</h2>
					<div className="relative">
						<select
							className="w-full bg-[#F8FAFC] border border-slate-300 text-[#334155] text-sm font-bold rounded-2xl p-5 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20"
							value={formData.local || ""}
							onChange={(event_) => {
								setLocalValue(event_.target.value as Local);
								updateField("local", event_.target.value as Local);
							}}
						>
							<option value="">Selecione o estúdio</option>
							{OPCOES_LOCAL.map((local) => (
								<option key={local} value={local}>
									{LOCAL_LABELS[local]}
								</option>
							))}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-[#4f46e5]">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M19 9l-7 7-7-7"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Data e Hora da Gravação */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Data e Hora da Gravação
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="min-w-0">
							<DatePicker
								value={formData.data || ""}
								onChange={(novaData) => updateField("data", novaData)}
							/>
						</div>

						<div className="relative min-w-0">
							<select
								className="w-full bg-[#F8FAFC] border border-slate-300 text-[#334155] text-sm font-bold rounded-2xl p-5 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20"
								value={formData.hora || ""}
								onChange={(event_) => {
									updateField("hora", event_.target.value);
								}}
							>
								<option value="">Selecione um horário</option>
								{HORARIOS_DISPONIVEIS.map((horario) => {
									const ocupado = isHorarioOcupado(horario);
									return (
										<option
											key={horario}
											value={horario}
											disabled={ocupado}
											className={ocupado ? "text-slate-300 bg-slate-100" : ""}
										>
											{horario} {ocupado ? "(Indisponível)" : ""}
										</option>
									);
								})}
							</select>

							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-[#4f46e5]">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M19 9l-7 7-7-7"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Data Limite e Pessoas */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="min-w-0">
						<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
							Data Limite para Entrega
						</h2>

						<DatePicker
							value={formData.dataLimite || ""}
							onChange={(novaData) => updateField("dataLimite", novaData)}
							minDate={dataMinimaEntrega}
						/>
					</div>

					<div>
						<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
							Quantidade de Pessoas
						</h2>
						<input
							className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm focus:ring-2 focus:ring-indigo-500/20"
							max={maxPessoas}
							min={1}
							placeholder="Qtd"
							type="number"
							value={formData.pessoas || ""}
							onChange={(event_) => {
								updateField("pessoas", Number(event_.target.value));
							}}
						/>
					</div>
				</div>

				{/* Roteiro */}
				<div>
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Anexar Roteiro
					</h2>
					<label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-[2.5rem] cursor-pointer bg-[#F8FAFC] hover:bg-white transition-all group shadow-inner">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform border border-slate-50">
								<svg
									className="w-8 h-8 text-[#4f46e5]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
								</svg>
							</div>
							<p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
								{formData.roteiro
									? formData.roteiro.name
									: "Clique para anexar o roteiro"}
							</p>
						</div>
						<input
							accept=".pdf,.doc,.docx,.txt"
							className="hidden"
							type="file"
							onChange={(event_) => {
								const file = event_.target.files?.[0];
								if (file) updateField("roteiro", file);
							}}
						/>
					</label>
				</div>

				{/* Observações */}
				<div>
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Observações finais
					</h2>
					<textarea
						className="w-full bg-[#F8FAFC] border border-slate-300 rounded-4xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm min-h-32 focus:ring-2 focus:ring-indigo-500/20"
						maxLength={144}
						placeholder="Alguma observação extra?"
						value={formData.observacoes || ""}
						onChange={(event_) => {
							updateField("observacoes", event_.target.value);
						}}
					/>
				</div>
			</div>

			{/* Navegação */}
			<div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
				<button
					className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-slate-50 cursor-pointer"
					onClick={() => {
						setPassoAtual(3);
					}}
				>
					← Voltar
				</button>
				<button
					className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3] cursor-pointer"
					onClick={() => {
						if (!validarPassoAtual()) return;

						if (formData.data && formData.dataLimite) {
							const dataGravacao = parseISO(formData.data);
							const dataLimite = parseISO(formData.dataLimite);
							const dataMinima = addDays(dataGravacao, 14);

							if (dataLimite < dataMinima) {
								alert(
									`A data limite para entrega deve ser pelo menos 14 dias após a gravação. A data mínima permitida é ${dataMinima.toLocaleDateString("pt-BR")}.`
								);
								return;
							}
						}

						setPassoAtual(5);
					}}
				>
					Continuar →
				</button>
			</div>
			<Footer />
		</div>
	);
}
