import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	value?: string; // Espera "YYYY-MM-DD"
	onChange: (dateString: string) => void;
	disabledDates?: Date[];

	minDate?: Date; // Data mínima permitida
}

export function DatePicker({
	value,
	onChange,
	disabledDates = [],
	minDate,
}: DatePickerProps) {
	const [open, setOpen] = useState(false);
	const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				type="button"
				className="w-full min-w-0 bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm focus:ring-2 focus:ring-indigo-500/20 flex items-center justify-between text-left hover:bg-white transition-all"
			>
				<span className="truncate">
					{selectedDate ? (
						format(selectedDate, "PPP", { locale: ptBR })
					) : (
						<span className="text-slate-400">Selecione uma data...</span>
					)}
				</span>

				<CalendarIcon className="w-4 h-4 text-black-100 ml-2 shrink-0" />
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0 rounded-2xl" align="start">
				<Calendar
					mode="single"
					locale={ptBR}
					selected={selectedDate}
					onSelect={(date) => {
						if (date) {
							// Atualiza a data no formulário
							onChange(format(date, "yyyy-MM-dd"));

							// Fecha o calendário após selecionar
							setOpen(false);
						} else {
							onChange("");
						}
					}}
					disabled={[
						{
							before: (minDate ?? new Date()) || new Date(0), // Se minDate não for fornecida, desabilita datas antes de hoje
						},

						{ dayOfWeek: [0, 6] },

						...disabledDates,
					]}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
