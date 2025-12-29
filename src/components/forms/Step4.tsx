/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from './FormFunctions';

export default function Step4() {

    const { passo, setPassoAtual, validarPassoAtual } = useFormContext();

    return (
        <>
            <h3 className="text-2xl font-extrabold text-white mb-6">
                Prazos e roteiro
            </h3>

            <div className="space-y-6">
                <input className="input" type="date" />
                <input
                    className="input"
                    placeholder="Quantidade de pessoas"
                    type="number"
                />
                <input className="input" type="file" />
                <textarea
                    className="input min-h-35"
                    placeholder="Observações finais"
                />
            </div>

            <div className="flex justify-between mt-10">
                <button className="btn-secundario" onClick={() => { setPassoAtual(3); }}>
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
        </>
    );
}