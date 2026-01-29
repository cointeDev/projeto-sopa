/* eslint-disable unicorn/prevent-abbreviations */
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
		<>
			<h3 className="text-2xl font-extrabold text-white mb-10">
				Informações iniciais
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Nome do Responsável
					</h2>
					<input
						ref={responsavelRef}
						className="input"
						defaultValue={formData.responsavel}
						placeholder="Digite aqui o nome do responsável"
						onChange={(event) => {
							updateField("responsavel", event.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						E-mail do Responsável
					</h2>
					<input
						ref={emailRef}
						className="input"
						defaultValue={formData.email}
						placeholder="Digite aqui o e-mail do responsável"
						type="email"
						onChange={(event) => {
							updateField("email", event.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Setor do Responsável
					</h2>
					<input
						ref={setorRef}
						className="input"
						defaultValue={formData.setor}
						placeholder="Sigla do setor"
						onChange={(event) => {
							updateField("setor", event.target.value);
						}}
					/>
				</div>

				<div className="md:col-span-2">
					<h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
						Telefone do Responsável
					</h2>
					<input
						ref={telefoneRef}
						className="input"
						defaultValue={formData.telefone}
						maxLength={15}
						placeholder="(xx) xxxxx-xxxx"
						onChange={(e) => {
							let value = e.target.value.replace(/\D/g, "");
							if (value.length > 11) value = value.slice(0, 11);

							let formatted = "";
							if (value.length > 0) formatted += `(${value.slice(0, 2)}`;
							if (value.length > 2) formatted += `) ${value.slice(2, 7)}`;
							if (value.length > 7) formatted += `-${value.slice(7, 11)}`;

							e.target.value = formatted;
							updateField("telefone", e.target.value);
						}}
					/>
				</div>
			</div>

			<div className="flex justify-end mt-10">
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
