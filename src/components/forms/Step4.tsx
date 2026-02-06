/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import { useRef, useState } from "react";

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
		<>
			<h3 className="text-2xl font-extrabold text-white mb-6">
				Prazos e roteiro
			</h3>

			<div className="space-y-6">
				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Local de Gravação
					</h2>
					<select
						ref={localRef}
						className="input md:col-span-2"
						defaultValue={formData.local}
						onChange={(e) => {
							setLocalValue(e.target.value);
							updateField("local", e.target.value);
						}}
					>
						<option value="">Selecione o estúdio</option>
						<option value="NATAL">Natal</option>
						<option value="MOSSORO">Mossoró</option>
						<option value="PAU_DOS_FERROS">Pau dos Ferros</option>
						<option value="CAICO">Caicó</option>
						<option value="Externo">Externo</option>
					</select>
				</div>

				{localValue === "Externo" && (
					<div className="md:col-span-2">
						<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
							Especificar Local de Gravação
						</h2>
						<input
							ref={localExternoRef}
							className="input"
							defaultValue={formData.localExterno}
							placeholder="Especificar local de gravação"
						/>
					</div>
				)}

				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Data e Hora da Gravação
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<input
							ref={dataRef}
							className="input md:col-span-2"
							defaultValue={formData.data}
							type="date"
							min={hoje}
							onChange={(event) => {
								updateField("data", event.target.value);
							}}
						/>
						<input
							ref={horaRef}
							className="input md:col-span-1"
							defaultValue={formData.hora}
							type="time"
							min="09:00"
							max="17:00"
							step="900"
							onChange={(event) => {
								updateField("hora", event.target.value);
							}}
						/>
					</div>
				</div>

				<div>
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Data Limite para Entrega
					</h2>
					<input
						className="input"
						type="date"
						value={formData.dataLimite || ""}
						onChange={(event) => {
							updateField("dataLimite", event.target.value);
						}}
					/>
				</div>

				<div>
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Quantidade de Pessoas na Gravação
					</h2>
					<input
						className="input"
						placeholder="Quantidade de pessoas"
						type="number"
						min={1}
						max={maxPessoas}
						value={formData.pessoas || ""}
						onChange={(event) => {
							updateField("pessoas", Number(event.target.value));
						}}
					/>
				</div>

				<div>
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Anexar Roteiro
					</h2>
					<label className="flex flex-col items-center justify-center w-full h-32 border border-zinc-800 rounded-lg cursor-pointer bg-[#0F111A] hover:bg-zinc-900/50 transition-all group">
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<svg
								className="w-8 h-8 mb-3 text-zinc-400 group-hover:text-zinc-300"
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
							<p className="mb-2 text-sm text-zinc-400 group-hover:text-zinc-300">
								<span className="font-semibold">
									{formData.roteiro
										? formData.roteiro.name
										: "Clique para anexar o roteiro"}
								</span>
							</p>
							<p className="text-xs text-zinc-500">
								PDF, DOCX ou TXT (Máx. 10MB)
							</p>
						</div>
						<input
							accept=".pdf,.doc,.docx,.txt"
							className="hidden"
							type="file"
							onChange={(event) => {
								const file = event.target.files?.[0];
								if (file) updateField("roteiro", file);
							}}
						/>
					</label>
				</div>

				<div>
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Observações finais
					</h2>
					<textarea
						className="input min-h-35"
						placeholder="Observações finais"
						value={formData.observacoes || ""}
						maxLength={144}
						onChange={(event) => {
							updateField("observacoes", event.target.value);
						}}
					/>
				</div>
			</div>

			<div className="flex justify-between mt-10">
				<button
					className="btn-secundario"
					onClick={() => {
						setPassoAtual(3);
					}}
				>
					← Voltar
				</button>
				<button
					className="btn-primario"
					onClick={() => {
						if (!validarPassoAtual()) return;
						setPassoAtual(passo + 1);
					}}
				>
					Continuar →
				</button>
			</div>
			<Footer />
		</>
	);
}
