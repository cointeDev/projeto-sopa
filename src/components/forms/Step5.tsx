/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from './FormFunctions';

export default function Step5() {

    const { formData, setPassoAtual } = useFormContext();

    return (
        <>
            <h3 className="text-2xl font-extrabold text-white mb-6">
                Revisar informações
            </h3>

            <div className="space-y-3 text-[#B4B9C7]">
                <p><strong>Solicitante:</strong> {formData.solicitante}</p>
                <p><strong>Setor:</strong> {formData.setor}</p>
                <p><strong>Tipo:</strong> {formData.tipo}</p>
                <p><strong>Título:</strong> {formData.titulo}</p>
                <p><strong>Descrição:</strong> {formData.descricao}</p>
            </div>

            <div className="flex justify-between mt-10">
                <button className="btn-secundario" onClick={() => { setPassoAtual(4); }}>
                    ← Ajustar
                </button>
                <button className="btn-primario" onClick={() => { setPassoAtual(6); }}>
                    Confirmar envio
                </button>
            </div>
        </>
    );
}