/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { X, Plus, Palette, User, FileText, Layout, CheckSquare } from "lucide-react";
import type { Projeto } from "../../pages/GestorLocal";

const coresAreas = {
    matematica: { bg: "#fdde82", label: "Matemática" },
    linguagens: { bg: "#bec658", label: "Linguagens" },
    humanas: { bg: "#c3dcf6", label: "Humanas" },
    natureza: { bg: "#4068a7", label: "Natureza" }
};

const etapasPadrao = ["STANDBY", "PARA PRODUÇÃO SEMANAL", "AO VIVO", "GRAVADO", "EDIÇÃO 1", "EDIÇÃO 2", "EDIÇÃO 3", "EDIÇÃO FINAL", "LIBRAS", "REVISÃO LP", "PRODUÇÃO LSE", "CONCLUÍDO", "PUBLICADO"];

export interface NovoCardInterface {
    titulo: string;
    responsavel: string;
    projeto: string;
    etiquetaArea: string;
    corDestaque: string;
    etapa: string;
    fluxoEtapas: Array<string>;
}

interface CreateCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    projetosAtuais: Array<Projeto>;
    onSave: (novoCard: NovoCardInterface) => void;
    onCreateProject: (novoProjeto: Projeto) => void;
}

export function CreateCardModal({ isOpen, onClose, projetosAtuais, onSave, onCreateProject }: CreateCardModalProps) {
    const [passo, setPasso] = useState<1 | 2>(1);
    const [projetoId, setProjetoId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [areaConhecimento, setAreaConhecimento] = useState<keyof typeof coresAreas>("matematica");
    
    const [etapasSelecionadas, setEtapasSelecionadas] = useState<Array<string>>(["STANDBY", "CONCLUÍDO"]);
    const [listaEtapas, setListaEtapas] = useState<Array<string>>(etapasPadrao);
    const [novaEtapaNome, setNovaEtapaNome] = useState("");

    if (!isOpen) return null;

    const handleAdicionarEtapa = () => {
        const formatada = novaEtapaNome.trim().toUpperCase();
        if (formatada && !listaEtapas.includes(formatada)) {
            setListaEtapas(previous => [...previous, formatada]);
            setEtapasSelecionadas(previous => [...previous, formatada]);
            setNovaEtapaNome("");
        }
    };

    const handleNovoProjeto = () => {
        const nome = prompt("Nome do novo projeto:");
        if (nome) {
            const novo: Projeto = { id: Math.random().toString(36).substring(2, 9), nome, etapas: etapasPadrao };
            onCreateProject(novo);
            setProjetoId(novo.id);
        }
    };

    const handleFinalizar = () => {
        if (!titulo || !projetoId) { alert("Preencha os dados básicos."); return; }
        const projetoObject = projetosAtuais.find(p => p.id === projetoId);
        onSave({
            titulo,
            responsavel,
            projeto: projetoObject?.nome || "Geral",
            etiquetaArea: coresAreas[areaConhecimento].label,
            corDestaque: coresAreas[areaConhecimento].bg,
            etapa: etapasSelecionadas[0] || "STANDBY",
            fluxoEtapas: etapasSelecionadas
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 text-left font-inter">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <header className="p-8 pb-4 flex items-center justify-between border-b border-slate-100 shrink-0">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800 leading-none">Novo Processo</h2>
                        <div className="flex gap-4 mt-2 font-black uppercase">
                            <button className={`text-[10px] ${passo === 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-300'}`} type="button" onClick={() => { setPasso(1); }}>1. Dados Básicos</button>
                            <button className={`text-[10px] ${passo === 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-300'}`} type="button" onClick={() => { setPasso(2); }}>2. Personalizar Fluxo</button>
                        </div>
                    </div>
                    <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600" type="button" onClick={onClose}><X size={20} /></button>
                </header>

                <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                    {passo === 1 ? (
                        <div className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"><Layout size={12} /> Projeto Vinculado</label>
                                <div className="flex gap-2">
                                    <select className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none appearance-none" value={projetoId} onChange={(event_) => { setProjetoId(event_.target.value); }}>
                                        <option value="">Selecione o Projeto</option>
                                        {projetosAtuais.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                    </select>
                                    <button className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100" type="button" onClick={handleNovoProjeto}><Plus size={20} /></button>
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"><FileText size={12} /> Título da Gravação</label>
                                <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none" type="text" value={titulo} onChange={(event_) => { setTitulo(event_.target.value); }} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"><User size={12} /> Responsável</label>
                                    <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 outline-none" type="text" value={responsavel} onChange={(event_) => { setResponsavel(event_.target.value); }} />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"><Palette size={12} /> Área</label>
                                    <div className="flex gap-2">
                                        {(Object.keys(coresAreas) as Array<keyof typeof coresAreas>).map((k) => (
                                            <button key={k} className={`w-10 h-10 rounded-xl border-2 transition-all ${areaConhecimento === k ? 'ring-2 ring-indigo-500 scale-110 border-white' : 'border-transparent opacity-60'}`} style={{ backgroundColor: coresAreas[k].bg }} type="button" onClick={() => { setAreaConhecimento(k); }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex gap-2 mb-4">
                                <input className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold outline-none" placeholder="Criar nova etapa..." value={novaEtapaNome} onChange={(event_) => { setNovaEtapaNome(event_.target.value); }} />
                                <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-sm" type="button" onClick={handleAdicionarEtapa}><Plus size={18} /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {listaEtapas.map((etapa) => (
                                    <label key={etapa} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${etapasSelecionadas.includes(etapa) ? 'bg-indigo-50 border border-indigo-100' : 'bg-slate-50 opacity-60'}`}>
                                        <span className="text-[10px] font-black uppercase text-slate-600">{etapa}</span>
                                        <input checked={etapasSelecionadas.includes(etapa)} className="hidden" type="checkbox" onChange={() => { setEtapasSelecionadas(previous => previous.includes(etapa) ? previous.filter(index => index !== etapa) : [...previous, etapa]); }} />
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${etapasSelecionadas.includes(etapa) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 bg-white'}`}>
                                            {etapasSelecionadas.includes(etapa) && <CheckSquare size={14} />}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <footer className="p-8 bg-slate-50/50 flex justify-end gap-4 border-t border-slate-100 shrink-0">
                    <button className="bg-indigo-600 text-white px-12 py-4 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95" type="button" onClick={handleFinalizar}>Finalizar e Criar</button>
                </footer>
            </div>
        </div>
    );
}