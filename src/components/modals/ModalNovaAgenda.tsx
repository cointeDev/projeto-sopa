import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDay } from "date-fns";
import { DatePicker } from "../forms/DatePicker";

interface ModalNovaAgendaProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

const DIAS_SEMANA = [
	{ id: 0, label: "Dom" },
	{ id: 1, label: "Seg" },
	{ id: 2, label: "Ter" },
	{ id: 3, label: "Qua" },
	{ id: 4, label: "Qui" },
	{ id: 5, label: "Sex" },
	{ id: 6, label: "Sáb" },
];

const HORARIOS_INICIO = [
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

const HORARIOS_FIM = [
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
	"17:30",
	"18:00",
];

const timeToMinutes = (timeStr: string): number => {
	if (!timeStr || !timeStr.includes(":")) return 0;
	const [hours = 0, minutes = 0] = timeStr.split(":").map(Number);
	return hours * 60 + minutes;
};

export function ModalNovaAgenda({
	isOpen,
	onClose,
	onSuccess,
}: ModalNovaAgendaProps) {
	const [tipo, setTipo] = useState<"unico" | "frequente">("unico");
	const [titulo, setTitulo] = useState("");
	const [dataInicio, setDataInicio] = useState("");
	const [dataFim, setDataFim] = useState("");
	const [horaInicio, setHoraInicio] = useState("09:00");
	const [horaFim, setHoraFim] = useState("18:00");
	const [diasSemana, setDiasSemana] = useState<number[]>([]);
	const [solicitacoesAtivas, setSolicitacoesAtivas] = useState<any[]>([]);
	const [eventosExistentes, setEventosExistentes] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [erroFormulario, setErroFormulario] = useState("");

	useEffect(() => {
		if (!isOpen) return;

		const carregarDados = async () => {
			try {
				const [resSolicitacoes, resAgenda] = await Promise.all([
					axios.get("http://localhost:3000/solicitacoes"),
					axios.get("http://localhost:3000/agenda-eventos"),
				]);

				const ativas = resSolicitacoes.data.filter(
					(s: any) => s.status === "PENDENTE" || s.status === "ACEITO"
				);
				setSolicitacoesAtivas(ativas);
				setEventosExistentes(resAgenda.data);
			} catch (error) {
				console.error("Erro ao carregar dados:", error);
			}
		};

		void carregarDados();
	}, [isOpen]);

	const limparFormulario = () => {
		setTipo("unico");
		setTitulo("");
		setDataInicio("");
		setDataFim("");
		setHoraInicio("09:00");
		setHoraFim("18:00");
		setDiasSemana([]);
		setErroFormulario("");
	};

	if (!isOpen) return null;

	const toggleDia = (diaId: number) => {
		setErroFormulario("");
		setDiasSemana((prev) =>
			prev.includes(diaId) ? prev.filter((d) => d !== diaId) : [...prev, diaId]
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErroFormulario("");

		if (!titulo.trim()) {
			setErroFormulario("O título é obrigatório.");
			return;
		}

		if (!dataInicio) {
			setErroFormulario("A data de início é obrigatória.");
			return;
		}

		if (tipo === "frequente") {
			if (!dataFim) {
				setErroFormulario(
					"A data de término é obrigatória para projetos frequentes."
				);
				return;
			}

			if (diasSemana.length === 0) {
				setErroFormulario(
					"Selecione pelo menos um dia da semana para projetos frequentes."
				);
				return;
			}

			if (dataFim < dataInicio) {
				setErroFormulario(
					"A data de término não pode ser anterior à data de início."
				);
				return;
			}
		}

		if (horaFim <= horaInicio) {
			setErroFormulario(
				"A hora de término deve ser posterior à hora de início."
			);
			return;
		}

		const novoInicioMin = timeToMinutes(horaInicio);
		const novoFimMin = timeToMinutes(horaFim);

		// Helper para verificar sobreposição de datas/dias da semana
		const sobrepoeDatasEDias = (
			tipoA: "unico" | "frequente",
			dataInicioA: string,
			dataFimA?: string,
			diasSemanaA?: number[],
			tipoB: "unico" | "frequente" = "unico",
			dataInicioB: string = "",
			dataFimB?: string,
			diasSemanaB?: number[]
		): boolean => {
			if (tipoA === "unico" && tipoB === "unico") {
				return dataInicioA === dataInicioB;
			}

			if (tipoA === "unico" && tipoB === "frequente") {
				if (!dataInicioB || !dataFimB) return false;
				const dentroDoPeriodo =
					dataInicioA >= dataInicioB && dataInicioA <= dataFimB;
				const diaSemana = getDay(new Date(`${dataInicioA}T00:00:00`));
				return dentroDoPeriodo && (diasSemanaB?.includes(diaSemana) ?? false);
			}

			if (tipoA === "frequente" && tipoB === "unico") {
				if (!dataInicioA || !dataFimA) return false;
				const dentroDoPeriodo =
					dataInicioB >= dataInicioA && dataInicioB <= dataFimA;
				const diaSemana = getDay(new Date(`${dataInicioB}T00:00:00`));
				return dentroDoPeriodo && (diasSemanaA?.includes(diaSemana) ?? false);
			}

			if (tipoA === "frequente" && tipoB === "frequente") {
				if (!dataInicioA || !dataFimA || !dataInicioB || !dataFimB)
					return false;
				const intersecaoDatas =
					Math.max(
						new Date(dataInicioA).getTime(),
						new Date(dataInicioB).getTime()
					) <=
					Math.min(new Date(dataFimA).getTime(), new Date(dataFimB).getTime());
				const intersecaoDias =
					diasSemanaA?.some((d) => diasSemanaB?.includes(d)) ?? false;
				return intersecaoDatas && intersecaoDias;
			}

			return false;
		};

		// 1. Valida conflitos com Eventos da Agenda já existentes
		const conflitoAgenda = eventosExistentes.find((item) => {
			const sobrepoeData = sobrepoeDatasEDias(
				tipo,
				dataInicio,
				dataFim,
				diasSemana,
				item.tipo,
				item.dataInicio,
				item.dataFim,
				item.diasSemana
			);

			if (!sobrepoeData) return false;

			const itemInicioMin = timeToMinutes(item.horaInicio);
			const itemFimMin = timeToMinutes(item.horaFim);

			return novoInicioMin < itemFimMin && novoFimMin > itemInicioMin;
		});

		if (conflitoAgenda) {
			setErroFormulario(
				`Já existe um evento na agenda neste horário: "${conflitoAgenda.titulo}" (${conflitoAgenda.horaInicio} às ${conflitoAgenda.horaFim}).`
			);
			return;
		}

		// 2. Valida conflitos com Solicitações em aberto (PENDENTE / ACEITO)
		const conflitoSolicitacao = solicitacoesAtivas.find((sol) => {
			const solInicioMin = timeToMinutes(sol.hora);
			const solFimMin = solInicioMin + 60; // Duração de 60 minutos

			const sobrepoeData = sobrepoeDatasEDias(
				tipo,
				dataInicio,
				dataFim,
				diasSemana,
				"unico",
				sol.data
			);

			if (!sobrepoeData) return false;

			return novoInicioMin < solFimMin && novoFimMin > solInicioMin;
		});

		if (conflitoSolicitacao) {
			setErroFormulario(
				`Já existe uma solicitação (${conflitoSolicitacao.status.toLowerCase()}) na data ${conflitoSolicitacao.data} às ${conflitoSolicitacao.hora}.`
			);
			return;
		}

		setLoading(true);

		try {
			const payload = {
				titulo,
				tipo,
				dataInicio,
				dataFim: tipo === "frequente" ? dataFim : undefined,
				diasSemana: tipo === "frequente" ? diasSemana : undefined,
				horaInicio,
				horaFim,
			};

			await axios.post("http://localhost:3000/agenda-eventos", payload);

			onSuccess();
			limparFormulario();
			onClose();
		} catch (error) {
			console.error("Erro ao salvar agenda:", error);
			setErroFormulario(
				"Ocorreu um erro ao salvar a agenda. Por favor, tente novamente."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
			<div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 flex flex-col gap-6">
				<div>
					<p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
						Bloqueio & Gravações
					</p>
					<h3 className="text-xl font-black uppercase tracking-tight text-[#334155]">
						Nova Agenda
					</h3>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* Título */}
					<div>
						<label className="text-[10px] font-black uppercase text-slate-400">
							Nome do Projeto / Evento
						</label>
						<input
							type="text"
							required
							placeholder="Ex: Uso Interno do Estúdio"
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
							className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-indigo-500"
						/>
					</div>

					{/* Tipo */}
					<div>
						<label className="text-[10px] font-black uppercase text-slate-400">
							Tipo de Projeto
						</label>
						<select
							value={tipo}
							onChange={(e) => {
								setTipo(e.target.value as "unico" | "frequente");
								setErroFormulario("");
							}}
							className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-xs font-bold text-[#334155] outline-none focus:border-indigo-500"
						>
							<option value="unico">Projeto Único</option>
							<option value="frequente">Projeto Frequente (Recorrente)</option>
						</select>
					</div>

					{/* Datas */}
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-[10px] font-black uppercase text-slate-400">
								{tipo === "frequente" ? "Data de Início" : "Data"}
							</label>
							<DatePicker
								value={dataInicio}
								onChange={setDataInicio}
								minDate={new Date()}
							/>
						</div>

						{tipo === "frequente" && (
							<div>
								<label className="text-[10px] font-black uppercase text-slate-400">
									Data de Término
								</label>
								<DatePicker
									value={dataFim}
									onChange={setDataFim}
									minDate={
										dataInicio ? new Date(`${dataInicio}T00:00:00`) : new Date()
									}
								/>
							</div>
						)}
					</div>

					{/* Seleção de Dias (Se frequente) */}
					{tipo === "frequente" && (
						<div>
							<label className="text-[10px] font-black uppercase text-slate-400">
								Dias da Semana
							</label>
							<div className="mt-1.5 flex gap-1.5 flex-wrap">
								{DIAS_SEMANA.map((dia) => {
									const ativo = diasSemana.includes(dia.id);
									return (
										<button
											type="button"
											key={dia.id}
											onClick={() => toggleDia(dia.id)}
											className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-xl border transition-all ${
												ativo
													? "bg-indigo-600 text-white border-indigo-600"
													: "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
											}`}
										>
											{dia.label}
										</button>
									);
								})}
							</div>
						</div>
					)}

					{/* Horários */}
					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="text-[10px] font-black uppercase text-slate-400">
								Hora Início
							</label>
							<select
								value={horaInicio}
								onChange={(e) => setHoraInicio(e.target.value)}
								className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs font-bold text-[#334155] outline-none"
							>
								{HORARIOS_INICIO.map((hora) => (
									<option key={hora} value={hora}>
										{hora}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="text-[10px] font-black uppercase text-slate-400">
								Hora Fim
							</label>
							<select
								value={horaFim}
								onChange={(e) => setHoraFim(e.target.value)}
								className="mt-1 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 py-2.5 text-xs font-bold text-[#334155] outline-none"
							>
								{HORARIOS_FIM.map((hora) => (
									<option key={hora} value={hora}>
										{hora}
									</option>
								))}
							</select>
						</div>
					</div>

					{erroFormulario && (
						<p className="text-xs text-red-500 font-medium">{erroFormulario}</p>
					)}

					{/* Botões */}
					<div className="mt-4 flex justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							className="rounded-2xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={loading}
							className="rounded-2xl bg-indigo-600 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg hover:bg-indigo-700 disabled:opacity-50"
						>
							{loading ? "Salvando..." : "Cadastrar Agenda"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
