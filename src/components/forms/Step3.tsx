/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from './FormFunctions';

export default function Step3() {

    const { passo, setPassoAtual, validarPassoAtual } = useFormContext();

    return (
        <>
            <h3 className="text-2xl font-extrabold text-white mb-6">
                Conteúdo
            </h3>

            <div className="space-y-6">
                <input className="input" placeholder="Título do vídeo" />
                <textarea
                    className="input min-h-35"
                    placeholder="Descreva o conteúdo do material"
                />
                <input className="input" type="file" />
            </div>

            <div className="flex justify-between mt-10">
                <button className="btn-secundario" onClick={() => { setPassoAtual(2); }}>
                    ← Voltar
                </button>
                <button
                    className="btn-primario"
                    onClick={() => {
                        // if (!validarPassoAtual()) return;
                        setPassoAtual(passo + 1);
                    }}
                >
                    Continuar →
                </button>

            </div>
        </>
    );
}