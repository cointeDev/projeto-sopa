/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "./FormFunctions";
import { Footer } from "../common/Footer";

export default function Step4() {
    const { passo, setPassoAtual, validarPassoAtual, updateField } = useFormContext();
    const formData = useFormContext().formData;

    return (
        <>
            <h3 className="text-2xl font-extrabold text-white mb-6">
                Prazos e roteiro
            </h3>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xg pb-3 pl-1.5 font-semibold text-white">
                        Data Limite para Entrega
                    </h2>
                    <input 
                        className="input" 
                        type="date" 
                        value={formData.dataLimite || ""}
                        onChange={(event) => { updateField("dataLimite", event.target.value); }}
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
                        value={formData.pessoas || ""}
                        onChange={(event) => { updateField("pessoas", event.target.value); }}
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
                                        ? (formData.roteiro).name
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
                        onChange={(event) => { updateField("observacoes", event.target.value); }}
                    />
                </div>
            </div>

            <div className="flex justify-between mt-10">
                <button 
                    className="btn-secundario" 
                    type="button"
                    onClick={() => { setPassoAtual(3); }}
                >
                    ← Voltar
                </button>
                <button
                    className="btn-primario"
                    type="button"
                    onClick={() => {
                        // Validação baseada na lógica da branch
                        if (!validarPassoAtual()) {
                            alert("Por favor, preencha os dados obrigatórios.");
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