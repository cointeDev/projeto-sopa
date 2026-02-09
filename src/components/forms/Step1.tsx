 
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRef } from "react";
import { Footer } from "../common/Footer";
import { useFormContext } from "../../context/FormContext";

export default function Step1() {
	const { passo, formData, setPassoAtual, updateField, validarPassoAtual } =
		useFormContext();

	const responsavelRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const setorRef = useRef<HTMLInputElement>(null);
	const telefoneRef = useRef<HTMLInputElement>(null);

	return (
		<div className="font-inter text-left">
			<h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
				Informações iniciais
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* Nome do Responsável */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Nome do Responsável
					</h2>
					<input
						ref={responsavelRef}
						className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300 shadow-sm"
						defaultValue={formData.responsavel}
						placeholder="Digite o nome completo"
						onChange={(event_) => {
							updateField("responsavel", event_.target.value);
						}}
					/>
				</div>

				{/* E-mail */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						E-mail do Responsável
					</h2>
					<input
						ref={emailRef}
						className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300 shadow-sm"
						defaultValue={formData.email}
						placeholder="exemplo@instituicao.com"
						type="email"
						onChange={(event_) => {
							updateField("email", event_.target.value);
						}}
					/>
				</div>

				{/* Setor */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Setor do Responsável
					</h2>
					<input
						ref={setorRef}
						className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300 shadow-sm"
						defaultValue={formData.setor}
						placeholder="Sigla do setor"
						onChange={(event_) => {
							updateField("setor", event_.target.value);
						}}
					/>
				</div>

				{/* Telefone */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Telefone do Responsável
					</h2>
					<input
						ref={telefoneRef}
						className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300 shadow-sm"
						defaultValue={formData.telefone}
						maxLength={15}
						placeholder="(00) 00000-0000"
						onChange={(event_) => {
							let value = event_.target.value.replace(/\D/g, "");
							if (value.length > 11) value = value.slice(0, 11);

							let formatted = "";
							if (value.length > 0) formatted += `(${value.slice(0, 2)}`;
							if (value.length > 2) formatted += `) ${value.slice(2, 7)}`;
							if (value.length > 7) formatted += `-${value.slice(7, 11)}`;

							event_.target.value = formatted;
							updateField("telefone", event_.target.value);
						}}
					/>
				</div>
			</div>

			{/* Navegação */}
			<div className="flex justify-end mt-12 pt-8 border-t border-slate-50">
				<button
					className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 hover:bg-[#3730a3] hover:-translate-y-0.5 uppercase tracking-widest active:scale-95 transition-all"
					onClick={() => {
						if (!validarPassoAtual()) return;
						setPassoAtual(passo + 1);
					}}
				>
					Continuar →
				</button>
			</div>
			<Footer />
		</div>
	);
}