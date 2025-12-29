/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const initialEvents = [ // Exemplos de tarefas, usaremos as do banco de dados depois
  { id: "1", title: "Se liga no ENEM | Química - Aula 02", start: "2026-01-05T09:00:00", end: "2026-01-05T12:30:00", fase: "1", description: "Edição Final", url: "https://www.google.com/" },
  { id: "2", title: "Se liga no ENEM | História - Aula 03", start: "2026-01-06T15:00:00", end: "2026-01-06T16:30:00", fase: "2", description: "Ilustração", url: "https://www.google.com/" },
  { id: "3", title: "Se liga no ENEM | Matemática - Aula 05", start: "2026-01-07T17:00:00", end: "2026-01-07T19:00:00", fase: "4", description: "Revisão LP+LSE", url: "https://www.google.com/" },
  { id: "4", title: "Se liga no ENEM | Física - Aula 02", start: "2026-01-08T12:00:00", end: "2026-01-08T15:00:00", fase: "6", description: "Decupagem", url: "https://www.google.com/" },
  { id: "5", title: "Se liga no ENEM | Biologia - Aula 03", start: "2026-01-09T10:00:00", end: "2026-01-09T16:35:00", fase: "3", description:"Ajustes e Entrega" , url:"https://www.google.com/" }
];

function Diario() {
  const [date, setDate] = useState(new Date());

  const formatDate = (date: number | Date | undefined) => {
    return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(date);
  };

  const filteredEvents = initialEvents.filter(event => {
    const eventDate = new Date(event.start).toDateString();
    return eventDate === date.toDateString();
  });

  return (
    <div className="flex max-h-screen p-6">
      {/* Sidebar */}
      <div className=" bg-white shadow-lg p-6 rounded-xl flex flex-col h-full">
        <h2 className="text-center text-xl font-bold mb-4 text-gray-700">Calendário</h2>
        <Calendar
          calendarType="gregory"
          className="w-full border border-gray-300 rounded-lg p-2"
          locale="pt-BR"
          next2Label={null}
          prev2Label={null}
          value={date}
          onChange={setDate}
        />
        
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
            <span className="text-sm">Completo</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-sm">Disponível</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
            <span className="text-sm">Com atraso</span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 w-full h-full">
        <h1 className="text-3xl font-bold text-gray-800">Diário de atividades</h1>
        <p className="text-gray-500 text-lg mb-4">{formatDate(date)}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto p-4 rounded-lg bg-white shadow-lg">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.id} className="bg-white border border-gray-200 shadow-md rounded-lg p-6 hover:shadow-xl transition-all flex flex-col h-auto cursor-pointer hover:scale-105 duration-200" onClick={() => window.open(event.url, "_blank") }>
                <p className="text-sm text-gray-500 font-semibold mb-1">{new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600 wrap-break-word">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-2 text-center">Nenhuma demanda para esta data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diario;