/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Local } from "../../common/types/solicitacao";
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import { useRef, useState } from "react";
import { OPCOES_LOCAL, LOCAL_LABELS } from "../../common/types/solicitacao";

export default function Step4() {
	const {
		passo,
		setPassoAtual,
		validarPassoAtual,
		updateField,
		getMaxPessoasPorFormato,
	} = useFormContext();
	const formData = useFormContext().formData;

	const [localValue, setLocalValue] = useState(formData.local);

	const localRef = useRef<HTMLSelectElement>(null);
	const localExternoRef = useRef<HTMLInputElement>(null);
	const dataRef = useRef<HTMLInputElement>(null);
	const horaRef = useRef<HTMLInputElement>(null);
	const hoje = new Date().toLocaleDateString("en-CA");

	const maxPessoas = getMaxPessoasPorFormato();

	return (
		<div className="font-inter text-left">
			<h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
				Prazos e roteiro
			</h3>

			<div className="space-y-8">
				{/* Local de Gravação - Estilo Select Light */}
				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Local de Gravação
					</h2>
					<div className="relative">
						<select
							ref={localRef}
							className="w-full bg-[#F8FAFC] border border-slate-300 text-[#334155] text-sm font-bold rounded-2xl p-5 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20"
							defaultValue={formData.local}
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

				{localValue === "Externo" && (
					<div className="md:col-span-2 animate-in fade-in slide-in-from-top-4 duration-300">
						<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
							Especificar Local de Gravação
						</h2>
						<input
							ref={localExternoRef}
							className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
							defaultValue={formData.localExterno}
							placeholder="Descreva o local externo"
						/>
					</div>
				)}

				<div className="md:col-span-2">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Data e Hora da Gravação
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<input
							ref={dataRef}
							className="md:col-span-2 bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm"
							defaultValue={formData.data}
							min={hoje}
							type="date"
							onChange={(event_) => {
								updateField("data", event_.target.value);
							}}
						/>
						<input
							ref={horaRef}
							className="md:col-span-1 bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm"
							defaultValue={formData.hora}
							max="17:00"
							min="09:00"
							step="900"
							type="time"
							onChange={(event_) => {
								updateField("hora", event_.target.value);
							}}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
							Data Limite para Entrega
						</h2>
						<input
							className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm"
							type="date"
							value={formData.dataLimite || ""}
							onChange={(event_) => {
								updateField("dataLimite", event_.target.value);
							}}
						/>
					</div>

					<div>
						<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
							Quantidade de Pessoas
						</h2>
						<input
							className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm"
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

				{/* Área de Roteiro - Estilo Glassmorphism Light */}
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

				<div>
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Observações finais
					</h2>
					<textarea
						className="w-full bg-[#F8FAFC] border border-slate-300 rounded-4xl px-6 py-5 text-sm font-bold text-[#334155] outline-none shadow-sm min-h-32"
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
					className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-slate-50"
					onClick={() => {
						setPassoAtual(3);
					}}
				>
					← Voltar
				</button>
				<button
					className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3]"
					onClick={() => {
						if (!validarPassoAtual()) return;
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
