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
import type { AgendaScope} from "./AgendaTypes";
// import { AgendaEvent } from "./AgendaTypes";

const initialEvents = [ // Exemplos de tarefas, usaremos as do banco de dados depois
  { id: "1", title: "Se liga no ENEM | Química - Aula 02", start: "2026-01-05T09:00:00", end: "2026-01-05T12:30:00", fase: "1", description: "Edição Final", url: "https://www.google.com/" },
  { id: "2", title: "Se liga no ENEM | História - Aula 03", start: "2026-01-06T15:00:00", end: "2026-01-06T16:30:00", fase: "2", description: "Ilustração", url: "https://www.google.com/" },
  { id: "3", title: "Se liga no ENEM | Matemática - Aula 05", start: "2026-01-07T17:00:00", end: "2026-01-07T19:00:00", fase: "4", description: "Revisão LP+LSE", url: "https://www.google.com/" },
  { id: "4", title: "Se liga no ENEM | Física - Aula 02", start: "2026-01-08T12:00:00", end: "2026-01-08T15:00:00", fase: "6", description: "Decupagem", url: "https://www.google.com/" },
  { id: "5", title: "Se liga no ENEM | Biologia - Aula 03", start: "2026-01-09T10:00:00", end: "2026-01-09T16:35:00", fase: "3", description:"Ajustes e Entrega" , url:"https://www.google.com/" }
];

const fasesDoDia: Record<number, string> = {
  1: "Edição Final", // Segunda
  2: "Ilustração", // Terça
  3: "Revisão LP+LSE", // Quarta
  4: "Decupagem", // Quinta
  5: "Ajustes e Entrega" // Sexta
};

function Agenda ({ scope }: { scope: AgendaScope }) {
  const [viewType, setViewType] = useState("timeGridWeek");
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [events, setEvents] = useState(initialEvents);
  const [feriados, setFeriados] = useState([]);

  const diaSemana = moment(selectedDate).isoWeekday();
  const faseAtual = fasesDoDia[diaSemana] || "";

  const handleDatesSet = (dateInfo: any) => {
    const newDate = moment(dateInfo.start).format("YYYY-MM-DD");
    const newViewType = dateInfo.view.type;

    console.log("Nova data selecionada:", newDate);
    console.log("Nova visão selecionada:", newViewType);

    setSelectedDate(newDate);
    setViewType(newViewType);
  };

  // Atualiza a demanda ao ser movida para outro dia
  const handleEventDrop = (info: any) => {
    const updatedEvents = events.map(event =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr, end: info.event.endStr }
        : event
    );
    setEvents(updatedEvents);
    console.log(`Demanda movida: ${info.event.title} para ${info.event.startStr} terminando às ${info.event.endStr}`);
    // info.event.startStr e info.event.endStr são os valores que substituirão, respectivamente, os tempos de começo e o de final da demanda no banco de dados
  };

  // Atualiza a demanda ao aumentar/diminuir duração
  const handleEventResize = (info: any) => {
    const updatedEvents = events.map(event =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr, end: info.event.endStr }
        : event
    );
    setEvents(updatedEvents);
    console.log(`Demanda redimensionada: ${info.event.title} durará até ${info.event.endStr}`);
    // info.event.endStr é o valor que substituirá o tempo do fim da duração da demanda no banco de dados
  };

  useEffect(() => {
    const anos = [2024, 2025, 2026, 2027, 2028, 2029, 2030]; // Lista dos anos com feriados
    const requests = anos.map(ano =>
      axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`) // A cada elemento da lista (os anos) chama o get contendo o valor do elemento
    );

    Promise.all(requests) // Espera obter todos os gets
      .then(responses => {
        const feriadosFormatados = responses.flatMap(response =>
          response.data.map((feriado: any) => ({
            title: feriado.name,
            start: feriado.date,
            allDay: true,
            color: "red",
            editable: false,
            description: "Feriado nacional"
          }))
        );
        setFeriados(feriadosFormatados);
      })
      .catch(error => { console.error("Erro ao buscar feriados:", error); });
  }, []);


  return (
    <div className="flex gap-8 w-full mx-auto p-6 font-sans">
      <div className="w-4/5">
        <div className="flex gap-4 mb-10">
          <h2 className="text-left text-[50px] font-bold text-blue-600 w-5/6">Quadro Geral</h2>
          <div className="bg-white/5 text-green-700 font-bold text-center px-4 py-2 rounded-md w-1/5">
            <p>✅ Concluídas</p><p className="text-3xl mt-2">12</p>
          </div>
          <div className="bg-white/5 text-orange-500 font-bold text-center px-4 py-2 rounded-md w-1/5">
            <p>🟠 Em Progresso</p><p className="text-3xl mt-2">4</p>
          </div>
          <div className="bg-white/5 text-red-600 font-bold text-center px-4 py-2 rounded-md w-1/5">
            <p>⏳ Em Atraso</p><p className="text-3xl mt-2">2</p>
          </div>
        </div>
        <FullCalendar
          droppable // Permite jogar demandas para o calendário
          editable // Permite mover e redimensionar demandas
          nowIndicator // Indicador que diz em que horas estamos no calendário
          weekNumbers // Ativa a contagem de semanas do ano
          datesSet={handleDatesSet} // Atualiza ao mudar a visualização (dia/semana/mês)
          dayHeaderClassNames={() => "bg-blue-600 text-white font-bold"}
          eventClassNames={() => "bg-yellow-500 text-white px-2 py-1 rounded-md shadow-md"}
          eventDrop={handleEventDrop} // Atualiza ao mover demandas
          eventResize={handleEventResize} // Atualiza ao mudar a duração de uma demanda
          events={[...events, ...feriados]} // Chama as demandas e os feriados para o calendário
          height="auto"
          initialView="timeGridWeek"
          locale={ptLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          slotLabelClassNames={() => "text-[#B4B9C7] font-medium"}
          weekends={false} // Tira finais de semana
          businessHours={[{ // Horário antes do almoço
            daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
            startTime: "09:00", // Começa às 09:00
            endTime: "12:00", // Termina às 12:00
          }, { // Horário depois do almoço
            daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
            startTime: "14:00", // Começa às 14:00
            endTime: "18:00", // Termina às 18:00
          }]}
          eventClick={function (info) {
            const eventObject = info.event;
            if (eventObject.url) {
              window.open(eventObject.url);
              info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
            } else {
              alert('Clicked ' + eventObject.title);
            }
          }}
          eventDidMount={(info) => {
            tippy(info.el, {
              content: info.event.extendedProps["description"] || "Sem descrição",
              placement: "top",
              theme: "light-border",
            });
          }}
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "timeGridDay,timeGridWeek,dayGridMonth"
          }}
        />

        {viewType === "timeGridDay" ? (
          <div className={`text-white text-center font-bold py-2 rounded-t-md ${faseAtual ? "bg-blue-600" : "bg-gray-300"}`}>
            {faseAtual ? faseAtual : "Nenhuma fase aplicável"}
          </div>
        ) : (
          <div className={`grid grid-cols-5 bg-blue-600 text-white text-center font-bold py-2 rounded-b-md ${viewType === "timeGridWeek" ? "pl-13" : ""}`}>
            <div>Edição Final</div>
            <div>Ilustração</div>
            <div>Revisão LP+LSE</div>
            <div>Decupagem</div>
            <div>Ajustes e Entrega</div>
          </div>
        )}
      </div>
      <div className="w-1/5 bg-white/5 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Processos em andamento</h2>
        {initialEvents.map((_, index) => (
          <div key={index} className="mb-4">
            <hr className="mb-4 text-[#B4B9C7]"></hr>
            <div className="flex justify-between items-center mb-2">
              <div>{initialEvents[index].title}</div>
            </div>
            <ul className="list-disc list-inside text-[#B4B9C7]">
              <li>Fase atual: {initialEvents[index].fase}</li>
              <li>Prazo de entrega: {initialEvents[index].fase}</li>
            </ul>
            <div className="mt-2">
              <div className="text-sm text-[#B4B9C7]">{index + 2 /* Aqui será colocado*/}/7 etapas concluídas</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(index + 2) * 14.3}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
