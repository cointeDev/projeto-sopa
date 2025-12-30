/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "./FormFunctions";
import { Footer } from "../common/Footer";

export default function Step3() {
	const { passo, setPassoAtual, validarPassoAtual, updateField } =
		useFormContext();
	const formData = useFormContext().formData;

	const handleAcessibilidade = (opcao: string) => {
		let novaLista = [...(formData.acessibilidade || [])];

		if (opcao == "Não se aplica") {
			novaLista = ["Não se aplica"];
		} else {
			novaLista = novaLista.filter((item) => item != "Não se aplica");

<<<<<<< HEAD
			if (novaLista.includes(opcao)) {
				novaLista = novaLista.filter((item) => item != opcao);
			} else {
				novaLista.push(opcao);
			}
		}
		updateField("acessibilidade", novaLista);
	};
=======
            <div className="space-y-6">
                <input className="input" placeholder="Título do vídeo" />
                <textarea
                    className="input min-h-35"
                    placeholder="Descreva o conteúdo do material"
                />
                <input className="input" type="file" />
            </div>
>>>>>>> 195f90c7c166bb08026010ecb11f2331db6114e2

	return (
		<>
			<h3 className="text-2xl font-extrabold text-white mb-6">Conteúdo</h3>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="md:col-span-4">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Nome do projeto
					</h2>
					<input
						className="input"
						placeholder="Digite aqui o nome do projeto"
						value={formData.nomeProjeto}
						onChange={(e) => updateField("nomeProjeto", e.target.value)}
					/>
				</div>

				<div className="md:col-span-4">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Título do vídeo
					</h2>
					<input
						className="input"
						placeholder="Digite aqui o título do vídeo"
						value={formData.titulo}
						onChange={(e) => updateField("titulo", e.target.value)}
					/>
				</div>
				<div className="md:col-span-4">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Descrição do Material
					</h2>

					<textarea
						className="input min-h-[140px]"
						placeholder="Descreva o conteúdo do material"
						value={formData.descricao}
						onChange={(e) => updateField("descricao", e.target.value)}
					/>
				</div>

				<div className="md:col-span-4">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Thumbnail (Capa)
					</h2>
					<label className="relative flex flex-col items-center justify-center w-full h-44 border border-zinc-800 rounded-lg cursor-pointer bg-[#0F111A] hover:bg-zinc-900/50 transition-all group overflow-hidden">
						{formData.thumbnail ? (
							<div className="absolute inset-0 w-full h-full">
								<img
									src={URL.createObjectURL(formData.thumbnail)}
									alt="Preview"
									className="w-full h-full object-cover opacity-40"
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<p className="text-white font-semibold bg-black/50 px-4 py-2 rounded-lg text-sm">
										Clique para alterar a imagem
									</p>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-3 text-zinc-400 group-hover:text-zinc-300"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="mb-2 text-sm text-zinc-400">
									Clique para enviar a capa
								</p>
							</div>
						)}
						<input
							type="file"
							className="hidden"
							accept="image/*"
							onChange={(e) => {
								if (e.target.files?.[0])
									updateField("thumbnail", e.target.files[0]);
							}}
						/>
					</label>
				</div>

				<div className="md:col-span-4 mt-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Acessibilidade
					</h2>
					<div className="flex flex-wrap gap-6 pl-1.5">
						{["Incluir LIBRAS", "Incluir Legenda", "Não se aplica"].map(
							(item) => (
								<label
									key={item}
									className="flex items-center space-x-3 cursor-pointer group"
								>
									<input
										type="checkbox"
										className="w-5 h-5 rounded border-zinc-700 bg-zinc-900/50 text-indigo-500 focus:ring-indigo-500"
										checked={formData.acessibilidade?.includes(item)}
										onChange={() => handleAcessibilidade(item)}
									/>
									<span className="text-zinc-300 group-hover:text-white transition-colors">
										{item}
									</span>
								</label>
							)
						)}
					</div>
				</div>

				{/* Destribuição */}
				<div className="md:col-span-4">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Distribuição de Material
					</h2>
					<div className="relative">
						<select
							className="w-full bg-zinc-900/50 border border-zinc-700 text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3.5 appearance-none cursor-pointer hover:bg-zinc-800 transition-colors"
							value={formData.distribuicao || ""}
							onChange={(e) => updateField("distribuicao", e.target.value)}
						>
							<option value="" disabled>
								Selecione onde será distribuído...
							</option>
							<option value="interna" className="bg-zinc-900">
								Veiculação Interna
							</option>
							<option value="seec" className="bg-zinc-900">
								Canal da SEEC
							</option>
							<option value="instagram" className="bg-zinc-900">
								Instagram da SEEC
							</option>
							<option value="outro" className="bg-zinc-900">
								Outro
							</option>
						</select>

						{/* Ícone da setinha customizado para combinar com o estilo dark */}
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-between mt-10">
				<button
					className="btn-secundario"
					onClick={() => {
						setPassoAtual(2);
					}}
				>
					← Voltar
				</button>
				<button
					className="btn-primario"
					onClick={() => {
						// if (!validarPassoAtual()) return;
						if (
							!formData.nomeProjeto ||
							!formData.titulo ||
							!formData.descricao ||
							!formData.thumbnail ||
							!formData.distribuicao ||
							formData.acessibilidade?.length === 0
						) {
							alert("Por favor, preencha os campos obrigatórios");
							return;
						}
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
