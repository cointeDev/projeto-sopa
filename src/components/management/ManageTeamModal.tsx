/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { UserPlus, Trash2, X } from "lucide-react";
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
        <div className="bg-black/60 backdrop-blur-sm fixed flex inset-0 items-center justify-center z-60 p-4">
            <div className="bg-[#161825] max-h-[80vh] max-w-2xl overflow-hidden flex flex-col rounded-2xl shadow-2xl text-white w-full border border-white/10">
                <header className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div className="flex flex-col">
                        <h2 className="font-black text-xl text-indigo-400 uppercase tracking-tight flex items-center gap-2">
                            <UserPlus size={20} /> Gestão de Equipa
                        </h2>
                        <p className="text-[10px] text-[#B4B9C7] uppercase mt-1">Cadastro de profissionais para atribuição de tarefas</p>
                    </div>
                    <button 
                        className="text-[#B4B9C7] hover:text-white transition-colors"
                        type="button"
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </header>

                <div className="p-6 overflow-y-auto flex-1 space-y-8">
                    {/* Formulário de Cadastro */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Adicionar Novo Profissional</label>
                        <form className="bg-[#0F111A] p-4 rounded-xl border border-white/5 flex flex-wrap md:flex-nowrap gap-3" onSubmit={adicionarFuncionario}>
                            <div className="flex-1 min-w-50">
                                <input 
                                    className="bg-transparent border-b border-white/10 w-full p-2 outline-none focus:border-indigo-500 transition-all text-sm"
                                    placeholder="Nome completo do profissional..."
                                    value={nome}
                                    onChange={(event) => { setNome(event.target.value); }}
                                />
                            </div>
                            <select 
                                className="bg-[#161825] border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500"
                                value={cargo}
                                onChange={(event) => { setCargo(event.target.value as Funcionario["cargo"]); }}
                            >
                                <option value="Editor">Editor</option>
                                <option value="Cinegrafista">Cinegrafista</option>
                                <option value="Designer">Designer</option>
                                <option value="Libras">Tradutor Libras</option>
                                <option value="Gestor">Gestor de Fluxo</option>
                            </select>
                            <button 
                                className="bg-indigo-500 hover:bg-indigo-400 px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-indigo-500/10 active:scale-95 whitespace-nowrap"
                                type="submit"
                            >
                                Adicionar
                            </button>
                        </form>
                    </div>

                    {/* Listagem de Profissionais */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-[#B4B9C7] uppercase tracking-widest">Equipa do Estúdio</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {funcionarios.length === 0 ? (
                                <div className="text-center py-10 bg-white/5 rounded-xl border border-dashed border-white/10">
                                    <p className="text-white/20 text-sm italic">Nenhum profissional cadastrado no sistema.</p>
                                </div>
                            ) : (
                                funcionarios.map((funcionario) => (
                                    <div 
                                        key={funcionario.id} 
                                        className="flex items-center justify-between bg-white/5 p-4 rounded-xl group hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase">
                                                {funcionario.nome.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{funcionario.nome}</p>
                                                <span className="text-[9px] text-indigo-400 uppercase font-black tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">
                                                    {funcionario.cargo}
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            className="text-red-500/30 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100"
                                            type="button"
                                            onClick={() => { removerFuncionario(funcionario.id); }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <footer className="p-4 bg-[#0F111A] border-t border-white/10 flex justify-end">
                    <button 
                        className="text-sm font-bold text-indigo-400 px-8 py-2 hover:bg-indigo-500/10 rounded-lg transition-all"
                        type="button"
                        onClick={onClose}
                    >
                        Concluir
                    </button>
                </footer>
            </div>
        </div>
    );
}