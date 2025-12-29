/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRef, useState } from 'react';
import { useFormContext } from './FormFunctions';

export default function Step1() {

    const { formData, setPassoAtual, updateField } = useFormContext();
    const [localValue, setLocalValue] = useState(formData.local);
    const responsavelRef = useRef<HTMLInputElement>(null);
    const setorRef = useRef<HTMLInputElement>(null);
    const telefoneRef = useRef<HTMLInputElement>(null);
    const localRef = useRef<HTMLSelectElement>(null);
    const localExternoRef = useRef<HTMLInputElement>(null);
    const dataRef = useRef<HTMLInputElement>(null);
    const horaRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <h3 className="text-2xl font-extrabold text-white mb-10">
                Informações iniciais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="md:col-span-4">
                    <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Nome do Responsável</h2>
                    <input
                        ref={responsavelRef}
                        className="input"
                        defaultValue={formData.responsavel}
                        placeholder="Digite aqui o nome do responsável"
                    />
                </div>

                <div className="md:col-span-2">
                    <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Setor do Responsável</h2>
                    <input
                        ref={setorRef}
                        className="input"
                        defaultValue={formData.setor}
                        placeholder="Sigla do setor"
                    />
                </div>

                <div className="md:col-span-2">
                    <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Telefone do Responsável</h2>
                    <input
                        ref={telefoneRef}
                        className="input"
                        defaultValue={formData.telefone}
                        maxLength={15}
                        placeholder="(xx) xxxxx-xxxx"
                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 11) value = value.slice(0, 11);
                            
                            let formatted = '';
                            if (value.length > 0) formatted += `(${value.slice(0, 2)}`;
                            if (value.length > 2) formatted += `) ${value.slice(2, 7)}`;
                            if (value.length > 7) formatted += `-${value.slice(7, 11)}`;
                            
                            e.target.value = formatted;
                        }}
                    />
                </div>

                <div className="md:col-span-2">
                    <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Local de Gravação</h2>
                    <select
                        ref={localRef}
                        className="input md:col-span-2"
                        defaultValue={formData.local}
                        onChange={(e) => { setLocalValue(e.target.value); }}
                    >
                        <option value="">Selecione o estúdio</option>
                        <option value="Natal">Natal</option>
                        <option value="Mossoró">Mossoró</option>
                        <option value="Pau dos Ferros">Pau dos Ferros</option>
                        <option value="Caicó">Caicó</option>
                        <option value="Externo">Externo</option>
                    </select>
                </div>

                {localValue === "Externo" && (
                    <div className="md:col-span-2">
                        <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Especificar Local de Gravação</h2>
                        <input
                            ref={localExternoRef}
                            className="input"
                            defaultValue={formData.localExterno}
                            placeholder="Especificar local de gravação"
                        />
                    </div>
                )}

                <div className="md:col-span-2">
                    <h2 className='text-xg pb-3 pl-1.5 font-semibold text-white'>Data e Hora da Gravação</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input
                            ref={dataRef}
                            className="input md:col-span-2"
                            defaultValue={formData.data}
                            type="date"
                        />
                        <input
                            ref={horaRef}
                            className="input md:col-span-1"
                            defaultValue={formData.hora}
                            type="time"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-10">
                <button 
                    className="btn-primario" 
                    onClick={() => {
                        const errors: Array<string> = [];
                        
                        if (!responsavelRef.current?.value.trim()) errors.push("Nome do Responsável");
                        if (!setorRef.current?.value.trim()) errors.push("Setor do Responsável");
                        if (!telefoneRef.current?.value.trim() || telefoneRef.current?.value.replace(/\D/g, '').length !== 11) errors.push("Telefone do Responsável");
                        if (!localRef.current?.value) errors.push("Local de Gravação");
                        if (localRef.current?.value === "Externo" && !localExternoRef.current?.value.trim()) {
                            errors.push("Especificar Local de Gravação");
                        }
                        if (!dataRef.current?.value) errors.push("Data da Gravação");
                        if (!horaRef.current?.value) errors.push("Hora da Gravação");

                        if (errors.length > 0) {
                            alert(`Por favor, preencha os seguintes campos:\n• ${errors.join("\n• ")}`);
                            return;
                        }

                        setPassoAtual(2);
                        updateField("responsavel", responsavelRef.current!.value);
                        updateField("setor", setorRef.current!.value);
                        updateField("telefone", telefoneRef.current!.value);
                        updateField("local", localRef.current!.value);
                        if (localRef.current?.value === "Externo") {
                            updateField("localExterno", localExternoRef.current!.value);
                        }
                        updateField("data", dataRef.current!.value);
                        updateField("hora", horaRef.current!.value);
                    }}
                >
                    Continuar →
                </button>
            </div>
        </>
    );
}