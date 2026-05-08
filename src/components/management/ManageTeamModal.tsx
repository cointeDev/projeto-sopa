/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { UserPlus, Trash2, X, Users } from "lucide-react";
import type { Funcionario } from "../../pages/GestorLocal";

interface ManageTeamProps {
    onClose: () => void;
    funcionarios: Array<Funcionario>;
    setFuncionarios: React.Dispatch<React.SetStateAction<Array<Funcionario>>>;
}

export function ManageTeamModal({ onClose, funcionarios, setFuncionarios }: ManageTeamProps) {
    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState<Funcionario["cargo"]>("Editor");

    const adicionarFuncionario = (event: React.FormEvent) => {
        event.preventDefault();
        if (!nome.trim()) return;

        const novo: Funcionario = {
            id: Math.random().toString(36).substring(2, 9),
            nome,
            cargo
        };

        setFuncionarios((previous) => [...previous, novo]);
        setNome("");
    };

    const removerFuncionario = (id: string) => {
        setFuncionarios((previous) => previous.filter((funcionario) => funcionario.id !== id));
    };

    return (
        <div className="bg-slate-900/60 backdrop-blur-md fixed flex inset-0 items-center justify-center z-60 p-6">
            <div className="bg-white max-h-[90vh] max-w-3xl overflow-hidden flex flex-col rounded-[3rem] shadow-2xl text-[#334155] w-full border border-white/20 animate-fade-in">
                <header className="p-10 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center relative">
                    <div className="absolute left-0 top-0 h-[3px] w-full bg-[#4f46e5]" />
                    <div className="flex flex-col">
                        <h2 className="font-black text-2xl text-[#334155] uppercase tracking-tighter flex items-center gap-3">
                            <Users className="text-[#4f46e5]" size={24} /> Gestão de Equipe
                        </h2>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Controle de profissionais do Estúdio RIEH</p>
                    </div>
                    <button 
                        className="p-4 bg-white rounded-2xl shadow-xl shadow-slate-200/50 text-slate-400 hover:text-red-500 transition-all"
                        type="button"
                        onClick={onClose}
                    >
                        <X size={28} />
                    </button>
                </header>

                <div className="p-10 overflow-y-auto flex-1 space-y-12 custom-scrollbar">
                    {/* Formulário de Cadastro */}
                    <section className="space-y-4">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-2">Adicionar Novo Profissional</label>
                        <form className="bg-[#F8FAFC] p-6 rounded-4xl border border-slate-100 flex flex-wrap md:flex-nowrap gap-4" onSubmit={adicionarFuncionario}>
                            <div className="flex-1 min-w-[200px]">
                                <input 
                                    className="bg-white border border-slate-200 rounded-xl w-full p-4 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm font-bold text-[#334155]"
                                    placeholder="Nome completo..."
                                    value={nome}
                                    onChange={(event_) => { setNome(event_.target.value); }}
                                />
                            </div>
                            <select 
                                className="bg-white border border-slate-200 rounded-xl px-4 py-4 text-xs font-black uppercase outline-none focus:ring-4 focus:ring-indigo-50"
                                value={cargo}
                                onChange={(event_) => { setCargo(event_.target.value as Funcionario["cargo"]); }}
                            >
                                <option value="Editor">Editor</option>
                                <option value="Cinegrafista">Cinegrafista</option>
                                <option value="Designer">Designer</option>
                                <option value="Libras">Libras</option>
                                <option value="Gestor">Gestor</option>
                            </select>
                            <button 
                                className="bg-[#4f46e5] hover:bg-[#3730a3] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-indigo-100 active:scale-95 whitespace-nowrap"
                                type="submit"
                            >
                                <UserPlus className="inline mr-2" size={16} /> Cadastrar
                            </button>
                        </form>
                    </section>

                    {/* Listagem de Profissionais */}
                    <section className="space-y-6">
                        <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-2">Profissionais Ativos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {funcionarios.length === 0 ? (
                                <div className="col-span-2 text-center py-16 bg-[#F8FAFC] rounded-[2.5rem] border border-dashed border-slate-200">
                                    <p className="text-slate-300 text-xs font-black uppercase italic tracking-widest">Nenhum profissional cadastrado.</p>
                                </div>
                            ) : (
                                funcionarios.map((funcionario) => (
                                    <div 
                                        key={funcionario.id} 
                                        className="flex items-center justify-between bg-white p-5 rounded-2xl group hover:shadow-xl hover:shadow-slate-100 transition-all border border-slate-100"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#4f46e5] font-black text-lg uppercase">
                                                {funcionario.nome.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-[#334155] uppercase tracking-tight">{funcionario.nome}</p>
                                                <span className="text-[8px] text-[#4f46e5] uppercase font-black tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                                                    {funcionario.cargo}
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            className="text-slate-200 hover:text-red-500 p-3 transition-colors opacity-0 group-hover:opacity-100"
                                            type="button"
                                            onClick={() => { removerFuncionario(funcionario.id); }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                <footer className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                    <button 
                        className="text-[10px] font-black text-[#4f46e5] px-12 py-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all uppercase tracking-widest"
                        type="button"
                        onClick={onClose}
                    >
                        Concluir Gestão
                    </button>
                </footer>
            </div>
        </div>
    );
}