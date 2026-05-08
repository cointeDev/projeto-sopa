/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import moment from "moment";
import axios from "axios";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import type { AgendaScope } from "./AgendaTypes";
import type { Card } from "../../pages/GestorLocal";
import type { AgendaEvent } from "./AgendaTypes";

// Converte data de DD/MM/YYYY para YYYY-MM-DD (formato que o FullCalendar entende)
function converterData(data?: string): string | undefined {
	if (!data) return undefined;
	// Se já estiver no formato correto, retorna como está
	if (/^\d{4}-\d{2}-\d{2}/.test(data)) return data;
	// Converte de DD/MM/YYYY para YYYY-MM-DD
	return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
}

function cardParaEvento(card: Card): AgendaEvent | null {
	const solicitacao = card.solicitacao;
	if (!solicitacao) return null;

	// Monta o start com data + hora
	const dataBase = solicitacao.data ?? solicitacao.dataLimite;
	if (!dataBase) return null;

	const start = solicitacao.hora
		? `${dataBase}T${solicitacao.hora}:00`
		: dataBase;

	// End deve ser no mesmo dia do start com +1h, não o dataLimite
	// O dataLimite fica só como metadado no description/fase
	const end = solicitacao.hora
		? `${dataBase}T${adicionarUmaHora(solicitacao.hora)}`
		: undefined;

	return {
		id: card.id,
		title: card.titulo,
		start,
		end, // fim no mesmo dia
		fase: card.etapa,
		description:
			`${solicitacao.descricao ?? ""} | Prazo: ${solicitacao.dataLimite ?? ""}`.trim(),
	};
}

// Soma 1 hora ao horário "HH:mm" e retorna "HH:mm:00"
function adicionarUmaHora(hora: string): string {
	const [h, m] = hora.split(":").map(Number);
	const novaHora = (h + 1) % 24;
	return `${String(novaHora).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

const fasesDoDia: Record<number, string> = {
	1: "Edição Final",
	2: "Ilustração",
	3: "Revisão LP+LSE",
	4: "Decupagem",
	5: "Ajustes e Entrega",
};

function Agenda({ scope, cards = [] }: { scope: AgendaScope; cards?: Card[] }) {
	const eventosDoCards: AgendaEvent[] = cards
		.map(cardParaEvento)
		.filter((e): e is AgendaEvent => e !== null);

	const [viewType, setViewType] = useState("timeGridWeek");
	const [selectedDate, setSelectedDate] = useState<string>(
		moment().format("YYYY-MM-DD")
	);
	const [events, setEvents] = useState<AgendaEvent[]>(eventosDoCards);
	const [feriados, setFeriados] = useState<any[]>([]);

	const diaSemana = moment(selectedDate).isoWeekday();
	const faseAtual = fasesDoDia[diaSemana] ?? "";

	useEffect(() => {
		setEvents(
			cards.map(cardParaEvento).filter((e): e is AgendaEvent => e !== null)
		);
	}, [cards]);

	const handleDatesSet = (dateInfo: any) => {
		setSelectedDate(moment(dateInfo.start).format("YYYY-MM-DD"));
		setViewType(dateInfo.view.type);
	};

	const handleEventDrop = (info: any) => {
		setEvents((prev) =>
			prev.map((event) =>
				event.id === info.event.id
					? { ...event, start: info.event.startStr, end: info.event.endStr }
					: event
			)
		);
	};

	const handleEventResize = (info: any) => {
		setEvents((prev) =>
			prev.map((event) =>
				event.id === info.event.id
					? { ...event, start: info.event.startStr, end: info.event.endStr }
					: event
			)
		);
	};

	useEffect(() => {
		const anos = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
		Promise.all(
			anos.map((ano) =>
				axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
			)
		)
			.then((responses) => {
				setFeriados(
					responses.flatMap((r) =>
						r.data.map((f: any) => ({
							title: f.name,
							start: f.date,
							allDay: true,
							color: "#fee2e2",
							textColor: "#dc2626",
							editable: false,
							description: "Feriado nacional",
						}))
					)
				);
			})
			.catch(console.error);
	}, []);

	// Contadores para o header
	const total = events.length;
	const emAtraso = events.filter(
		(e) => e.end && moment(e.end).isBefore(moment(), "day")
	).length;
	const emProgresso = total - emAtraso;

	return (
		<div className="flex gap-6 w-full h-full p-8 font-inter bg-[#F8FAFC] overflow-hidden">
			{/* Coluna principal */}
			<div className="flex-1 flex flex-col gap-6 min-w-0 h-full overflow-hidden">
				{/* Header */}
				<div className="flex items-center gap-4">
					<div className="flex-1">
						<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
							Gestão
						</p>
						<h2 className="text-3xl font-black text-[#334155] uppercase tracking-tight">
							Agenda
						</h2>
					</div>

					<div className="flex gap-3">
						<StatChip
							label="Em Progresso"
							value={emProgresso}
							color="text-indigo-600"
							bg="bg-indigo-50"
							border="border-indigo-100"
						/>
						<StatChip
							label="Em Atraso"
							value={emAtraso}
							color="text-red-500"
							bg="bg-red-50"
							border="border-red-100"
						/>
						<StatChip
							label="Total"
							value={total}
							color="text-slate-600"
							bg="bg-slate-50"
							border="border-slate-200"
						/>
					</div>
				</div>

				{/* Calendário */}
				{/* Calendário */}
				<div className="bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-100 flex-1 min-h-0 flex flex-col">
					<style>{`
        .fc .fc-toolbar { padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; }
        .fc .fc-toolbar-title { font-size: 0.9rem; font-weight: 900; color: #334155; text-transform: uppercase; letter-spacing: 0.1em; }
        .fc .fc-button { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; color: #334155 !important; font-size: 0.65rem !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; border-radius: 0.75rem !important; padding: 0.4rem 0.9rem !important; box-shadow: none !important; transition: all 0.15s; }
        .fc .fc-button:hover { background: #ede9fe !important; border-color: #c4b5fd !important; color: #4f46e5 !important; }
        .fc .fc-button-active, .fc .fc-button-primary:not(:disabled).fc-button-active { background: #4f46e5 !important; border-color: #4f46e5 !important; color: white !important; }
        .fc .fc-col-header-cell { background: #f8fafc; padding: 0.6rem 0; }
        .fc .fc-col-header-cell-cushion { font-size: 0.65rem; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.12em; text-decoration: none; }
        .fc .fc-timegrid-slot-label-cushion { font-size: 0.65rem; font-weight: 700; color: #94a3b8; }
        .fc .fc-daygrid-day-number { font-size: 0.7rem; font-weight: 700; color: #64748b; }
        .fc .fc-event { border-radius: 0.6rem !important; border: none !important; padding: 2px 6px !important; font-size: 0.65rem !important; font-weight: 700 !important; }
        .fc .fc-week-number { font-size: 0.6rem; color: #94a3b8; }
        .fc td, .fc th { border-color: #f1f5f9 !important; }
        .fc .fc-scrollgrid { border-color: #f1f5f9 !important; }
        .fc .fc-timegrid-now-indicator-line { border-color: #4f46e5; }
        .fc .fc-timegrid-now-indicator-arrow { border-top-color: #4f46e5; border-bottom-color: #4f46e5; }
        .fc .fc-highlight { background: #ede9fe !important; }
        .fc-theme-standard .fc-scrollgrid { border-radius: 0; }
    `}</style>

					{/*  flex-1 + min-h-0 é o que permite o FullCalendar crescer corretamente */}
					<div className="flex-1 min-h-0">
						<FullCalendar
							droppable
							editable
							nowIndicator
							weekNumbers
							datesSet={handleDatesSet}
							eventDrop={handleEventDrop}
							eventResize={handleEventResize}
							events={[...events, ...feriados]}
							height="100%"
							scrollTime="08:00:00"
							initialView="timeGridWeek"
							locale={ptLocale}
							weekends={false}
							businessHours={[
								{
									daysOfWeek: [1, 2, 3, 4, 5],
									startTime: "09:00",
									endTime: "12:00",
								},
								{
									daysOfWeek: [1, 2, 3, 4, 5],
									startTime: "14:00",
									endTime: "18:00",
								},
							]}
							plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
							eventClassNames={() => "!bg-indigo-500 !text-white"}
							eventClick={(info) => {
								if (info.event.url) {
									window.open(info.event.url);
									info.jsEvent.preventDefault();
								}
							}}
							eventDidMount={(info) => {
								tippy(info.el, {
									content:
										info.event.extendedProps["description"] || "Sem descrição",
									placement: "top",
									theme: "light-border",
								});
							}}
							headerToolbar={{
								start: "prev,next today",
								center: "title",
								end: "timeGridDay,timeGridWeek,dayGridMonth",
							}}
						/>
					</div>

					{/* Faixa de fases */}
					{viewType !== "dayGridMonth" && (
						<div
							className={`grid text-center py-2.5 border-t border-slate-100 ${
								viewType === "timeGridDay" ? "grid-cols-1" : "grid-cols-5 pl-12"
							}`}
						>
							{viewType === "timeGridDay" ? (
								<span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
									{faseAtual || "Nenhuma fase aplicável"}
								</span>
							) : (
								[
									"Edição Final",
									"Ilustração",
									"Revisão LP+LSE",
									"Decupagem",
									"Ajustes e Entrega",
								].map((fase) => (
									<span
										key={fase}
										className="text-[9px] font-black uppercase tracking-widest text-slate-400"
									>
										{fase}
									</span>
								))
							)}
						</div>
					)}
				</div>
			</div>

			{/* Painel lateral */}
			<div className="w-72 shrink-0 flex flex-col gap-4 overflow-y-auto">
				<div>
					<p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
						Visão geral
					</p>
					<h3 className="text-lg font-black text-[#334155] uppercase tracking-tight">
						Em andamento
					</h3>
				</div>

				<div className="flex flex-col gap-3">
					{events.length === 0 && (
						<p className="text-xs text-slate-400 font-medium">
							Nenhuma demanda em andamento.
						</p>
					)}
					{events.map((evento, index) => {
						const atrasado = evento.end
							? moment(evento.end).isBefore(moment(), "day")
							: false;
						// Progresso mockado por etapa — substitua pela lógica real quando disponível
						const etapaIndex = Object.values(fasesDoDia).indexOf(
							evento.fase ?? ""
						);
						const progresso =
							etapaIndex >= 0 ? ((etapaIndex + 1) / 5) * 100 : 0;

						return (
							<div
								key={evento.id ?? index}
								className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col gap-2 shadow-sm"
							>
								<p className="text-xs font-black text-[#334155] leading-snug">
									{evento.title}
								</p>

								<div className="flex items-center gap-1.5">
									<span className="text-[8px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
										{evento.fase ?? "—"}
									</span>
									{atrasado && (
										<span className="text-[8px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
											Atrasado
										</span>
									)}
								</div>

								{evento.end && (
									<p className="text-[9px] text-slate-400 font-medium">
										Prazo:{" "}
										<span
											className={`font-bold ${atrasado ? "text-red-500" : "text-slate-500"}`}
										>
											{moment(evento.end).format("DD/MM/YYYY")}
										</span>
									</p>
								)}

								<div className="flex flex-col gap-1">
									<div className="w-full bg-slate-100 rounded-full h-1.5">
										<div
											className="bg-indigo-500 h-1.5 rounded-full transition-all"
											style={{ width: `${progresso}%` }}
										/>
									</div>
									<p className="text-[9px] text-slate-400 font-medium">
										Fase {etapaIndex >= 0 ? etapaIndex + 1 : "—"} de 5
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

// Componente auxiliar para os chips de estatísticas
function StatChip({
	label,
	value,
	color,
	bg,
	border,
}: {
	label: string;
	value: number;
	color: string;
	bg: string;
	border: string;
}) {
	return (
		<div
			className={`flex flex-col items-center px-5 py-3 rounded-2xl border ${bg} ${border}`}
		>
			<span className={`text-xl font-black ${color}`}>{value}</span>
			<span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
				{label}
			</span>
		</div>
	);
}

export default Agenda;
