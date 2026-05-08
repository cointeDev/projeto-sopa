/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import {
	OPCOES_ACESSIBILIDADE,
	OPCOES_DISTRIBUICAO,
	DISTRIBUICAO_LABELS,
	//type Acessibilidade,
	type Distribuicao,
	ACESSIBILIDADE_LABELS,
} from "../../common/types/solicitacao";

export default function Step3() {
	const { passo, setPassoAtual, updateField, validarPassoAtual } =
		useFormContext();
	const formData = useFormContext().formData;

	return (
		<div className="font-inter text-left">
			<h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
				Conteúdo
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div className="md:col-span-4">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Nome do projeto
					</h2>
					<input
						className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm placeholder:text-slate-300"
						placeholder="Digite aqui o nome do projeto"
						value={formData.nomeProjeto || ""}
						onChange={(event_) => {
							updateField("nomeProjeto", event_.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-4">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Título do vídeo
					</h2>
					<input
						className="w-full bg-[#F8FAFC] border border-slate-300 rounded-2xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm placeholder:text-slate-300"
						placeholder="Digite aqui o título do vídeo"
						value={formData.titulo || ""}
						onChange={(event_) => {
							updateField("titulo", event_.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-4">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Descrição do Material
					</h2>
					<textarea
						className="w-full bg-[#F8FAFC] border border-slate-300 rounded-4xl px-6 py-5 text-sm font-bold text-[#334155] outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-40 shadow-sm placeholder:text-slate-300"
						maxLength={144}
						placeholder="Descreva o conteúdo do material"
						value={formData.descricao || ""}
						onChange={(event_) => {
							updateField("descricao", event_.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-4">
					<h2 className="text-[10px] pb-3 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Thumbnail (Capa)
					</h2>
					<label className="relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-200 rounded-[2.5rem] cursor-pointer bg-[#F8FAFC] hover:bg-white transition-all group overflow-hidden shadow-inner">
						{formData.thumbnail ? (
							<div className="absolute inset-0 w-full h-full">
								<img
									alt="Preview"
									className="w-full h-full object-cover opacity-60"
									src={URL.createObjectURL(formData.thumbnail)}
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<p className="text-[#334155] font-black bg-white/90 px-6 py-3 rounded-2xl text-[10px] uppercase shadow-xl tracking-widest">
										Clique para alterar
									</p>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<div className="p-5 bg-white rounded-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform border border-slate-50">
									<svg
										className="w-8 h-8 text-[#4f46e5]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
										/>
									</svg>
								</div>
								<p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
									Clique para enviar a capa
								</p>
							</div>
						)}
						<input
							accept="image/*"
							className="hidden"
							type="file"
							onChange={(event_) => {
								if (event_.target.files?.[0])
									updateField("thumbnail", event_.target.files[0]);
							}}
						/>
					</label>
				</div>

				<div className="md:col-span-4 mt-2">
					<h2 className="text-[10px] pb-4 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Acessibilidade
					</h2>

					<div className="flex flex-wrap gap-6 pl-1.5">
						{OPCOES_ACESSIBILIDADE.map((item) => (
							<label
								key={String(item)}
								className="flex items-center space-x-3 cursor-pointer group"
							>
								<input
									checked={formData.acessibilidade === item}
									className="w-5 h-5 border-slate-400 text-[#4f46e5] focus:ring-[#4f46e5]"
									name="acessibilidade"
									type="radio"
									onChange={() => {
										updateField("acessibilidade", item);
									}}
								/>
								<span className="text-sm font-bold text-slate-600 group-hover:text-[#4f46e5] transition-colors">
									{ACESSIBILIDADE_LABELS[item]}
								</span>
							</label>
						))}
					</div>

					{formData.acessibilidade === "INCLUIR_LIBRAS" && (
						<div className="mt-4 pl-1.5 animate-in fade-in duration-300">
							<p className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium rounded-2xl p-4 italic">
								⚠️ Atenção: a RIEH{" "}
								<strong>não fornece intérpretes de Libras</strong>. Caso
								necessário, a contratação deverá ser providenciada pelo
								solicitante.
							</p>
						</div>
					)}
				</div>

				<div className="md:col-span-4 mt-2">
					<h2 className="text-[10px] pb-4 pl-1.5 font-black uppercase text-slate-400 tracking-widest">
						Distribuição de Material
					</h2>
					<div className="relative">
						<select
							className="w-full bg-[#F8FAFC] border border-slate-300 text-[#334155] text-sm font-bold rounded-2xl p-5 appearance-none cursor-pointer hover:bg-white transition-all shadow-sm focus:ring-2 focus:ring-indigo-500/20"
							value={formData.distribuicao}
							onChange={(event_) => {
								updateField(
									"distribuicao",
									event_.target.value as Distribuicao
								);
							}}
						>
							<option disabled value="">
								Selecione onde será distribuído...
							</option>
							{OPCOES_DISTRIBUICAO.map((item) => (
								<option key={String(item)} value={item}>
									{DISTRIBUICAO_LABELS[item]}
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
			</div>

			<div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
				<button
					className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-slate-50"
					onClick={() => {
						setPassoAtual(2);
					}}
				>
					← Voltar
				</button>
				<button
					className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3]"
					onClick={() => {
						if (!validarPassoAtual()) return;

						if (formData.TipoProducao === "EDICAO") {
							setPassoAtual(7);
						} else {
							setPassoAtual(4);
						}
					}}
				>
					Continuar →
				</button>
			</div>
			<Footer />
		</div>
	);
}
