/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { X, Plus, ListFilter } from "lucide-react";
import type { Card, Projeto } from "../../pages/GestorLocal";

const etapasPadrao = ["Gravação", "Edição 1", "Edição 2", "Edição 3", "Edição Final", "Libras", "Revisão LP", "Produção LSE"];

export function CreateCardModal({ onClose, onSave, projetosAtuais, onCreateProject }: { 
    onClose: () => void; 
    onSave: (dadosCard_: Omit<Card, "id" | "etapa">) => void;
    projetosAtuais: Array<Projeto>;
    onCreateProject: (projetoNovo_: Projeto) => void;
}) {
    const [modoVisualizacao, setModoVisualizacao] = useState<"card" | "projeto">("card");
    const [listaOpcoesEtapas, setListaOpcoesEtapas] = useState<Array<string>>(etapasPadrao);
    const [etapasSelecionadas, setEtapasSelecionadas] = useState<Array<string>>(["Standby", "Publicado"]);
    const [projetoSelecionado, setProjetoSelecionado] = useState(projetosAtuais[0]?.nome || "");
    const [nomeNovaColuna, setNomeNovaColuna] = useState("");

    const adicionarColunaCustomizada = () => {
        const nomeLimpo_ = nomeNovaColuna.trim();
        if (nomeLimpo_ && !listaOpcoesEtapas.includes(nomeLimpo_)) {
            // Adiciona à lista de opções visíveis com checkbox
            setListaOpcoesEtapas([...listaOpcoesEtapas, nomeLimpo_]);
            // Marca automaticamente a nova coluna como selecionada
            setEtapasSelecionadas([...etapasSelecionadas, nomeLimpo_]);
            setNomeNovaColuna("");
        }
    };

    const alternarSelecaoEtapa = (etapaAlvo_: string) => {
        setEtapasSelecionadas(lista_ => 
            lista_.includes(etapaAlvo_) 
                ? lista_.filter(item_ => item_ !== etapaAlvo_) 
                : [...lista_, etapaAlvo_]
        );
    };

    const tratarEnvioCard = (event_: React.FormEvent<HTMLFormElement>) => {
        event_.preventDefault();
        const dadosFormulario_ = new FormData(event_.currentTarget);
        const projetoEncontrado_ = projetosAtuais.find(p => p.nome === projetoSelecionado);
        
        onSave({
            titulo: dadosFormulario_.get("titulo") as string,
            projeto: projetoSelecionado,
            responsavel: dadosFormulario_.get("responsavel") as string,
            fluxoEtapas: projetoEncontrado_ ? projetoEncontrado_.etapas : etapasSelecionadas,
            setor: "SEEC/RN",
            nucleo: "Núcleo Natal",
            tipoProducao: "Vídeo",
            etiquetas: [projetoSelecionado],
            caracteristicas: { participantes: Number(dadosFormulario_.get("participantes")) },
            formato: dadosFormulario_.get("formato") as string,
            roteiro: { texto: dadosFormulario_.get("roteiro") as string }
        });
    };

    const tratarEnvioProjeto = (event_: React.FormEvent<HTMLFormElement>) => {
        event_.preventDefault();
        const dadosFormulario_ = new FormData(event_.currentTarget);
        const projetoNovo_ = {
            id: Math.random().toString(36).substring(2, 9),
            nome: dadosFormulario_.get("nomeProjeto") as string,
            etapas: etapasSelecionadas
        };
        onCreateProject(projetoNovo_);
        setProjetoSelecionado(projetoNovo_.nome);
        setModoVisualizacao("card");
    };

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-md">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col text-left animate-fade-in ring-1 ring-white/20">
                <header className="p-10 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center relative">
                    <div className="absolute left-0 top-0 h-[3px] w-full bg-[#4f46e5]" />
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-[#334155] uppercase tracking-tighter">
                            {modoVisualizacao === "card" ? "Novo Processo" : "Configurar Novo Projeto"}
                        </h2>
                        <nav className="flex gap-4 mt-2">
                            <button className={`text-[9px] font-black uppercase tracking-widest ${modoVisualizacao === "card" ? "text-[#4f46e5]" : "text-slate-400"}`} type="button" onClick={() => { setModoVisualizacao("card"); }}>1. Dados da Aula</button>
                            <button className={`text-[9px] font-black uppercase tracking-widest ${modoVisualizacao === "projeto" ? "text-[#4f46e5]" : "text-slate-400"}`} type="button" onClick={() => { setModoVisualizacao("projeto"); }}>2. Fluxo do Projeto</button>
                        </nav>
                    </div>
                    <button className="p-4 bg-white rounded-2xl shadow-xl hover:text-red-500 transition-all" type="button" onClick={onClose}><X size={28} /></button>
                </header>

                <div className="p-12 overflow-y-auto custom-scrollbar">
                    {modoVisualizacao === "card" ? (
                        <form className="space-y-10" onSubmit={tratarEnvioCard}>
                            <div className="grid grid-cols-2 gap-8 text-left">
                                <div className="col-span-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Título da Gravação</label>
                                    <input required className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-bold text-[#334155] outline-none focus:ring-4 focus:ring-indigo-50" name="titulo" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Projeto Vinculado</label>
                                    <div className="flex gap-2">
                                        <select className="flex-1 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-bold text-[#334155] outline-none" value={projetoSelecionado} onChange={(event_) => { setProjetoSelecionado(event_.target.value); }}>
                                            {projetosAtuais.map(p_ => <option key={p_.id} value={p_.nome}>{p_.nome}</option>)}
                                        </select>
                                        <button className="p-5 bg-indigo-50 text-[#4f46e5] rounded-2xl hover:bg-indigo-100" type="button" onClick={() => { setModoVisualizacao("projeto"); }}><Plus size={20}/></button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Responsável</label>
                                    <input required className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-bold text-[#334155] outline-none" name="responsavel" />
                                </div>
                            </div>
                            <footer className="flex justify-end pt-10 border-t"><button className="bg-[#4f46e5] text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" type="submit">Criar Card</button></footer>
                        </form>
                    ) : (
                        <form className="space-y-10" onSubmit={tratarEnvioProjeto}>
                            <div className="text-left">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nome Identificador do Projeto</label>
                                <input required className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 font-bold text-[#334155] outline-none focus:ring-4 focus:ring-indigo-50" name="nomeProjeto" placeholder="Ex: Novo Curso 2026" />
                            </div>

                            <section className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 text-left">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-black text-[#334155] uppercase flex items-center gap-2"><ListFilter className="text-[#4f46e5]" size={18} /> Seleção de Colunas</h3>
                                    <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-dashed border-slate-300">
                                        <input className="px-4 text-[10px] font-bold outline-none uppercase w-32" placeholder="Criar coluna..." value={nomeNovaColuna} onChange={(event_) => { setNomeNovaColuna(event_.target.value); }} />
                                        <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700" type="button" onClick={adicionarColunaCustomizada}><Plus size={14} /></button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {listaOpcoesEtapas.map(etapa_ => (
                                        <label key={etapa_} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${etapasSelecionadas.includes(etapa_) ? 'bg-white border-[#4f46e5] shadow-md' : 'bg-transparent border-slate-200 opacity-60'}`}>
                                            <input checked={etapasSelecionadas.includes(etapa_)} className="h-4 w-4 accent-[#4f46e5]" type="checkbox" onChange={() => { alternarSelecaoEtapa(etapa_); }} />
                                            <span className="text-[9px] font-black text-[#334155] uppercase">{etapa_}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>
                            <footer className="flex justify-end pt-10 border-t"><button className="bg-[#334155] text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase shadow-xl hover:scale-105 transition-all" type="submit">Salvar Projeto e Voltar</button></footer>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}